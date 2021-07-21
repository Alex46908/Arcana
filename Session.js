//Создание новой сессии (типа: нашел нового пользователя)
SessionCreate = () => {
//генрируем ключ и id
    GenerateKeyAndId()

    search_nik = document.getElementById('search').value
   user_exist_url  = `${ServerName}/prowerka.php?name=${search_nik}`;
    //Проверяем сушествование userа
    request(user_exist_url, function (err, res, body) {
        if (err) throw err;
        body = body.replace('<div>', '');
        body = body.replace('</div>', '');
        if (body == '') {
            alert('Пользователь не найден.')

        }else{
            //если user сушествует отправляем на сервер информацию созданую до этого через GenerateKeyAndId для сессии с ним
            get_user_info_url = `${ServerName}/conect3.php?id=${session_id}&shifrr=${all_key}&from=${search_nik}&out=${nik_this_user[0].user}`;
            request(get_user_info_url, function (err, res, body) {
                if (err) throw err;
            });
// и также добавляем информация о сессии с ним в local бд
            db.get('active_session')
                .push({key: all_key, username: search_nik, id: session_id})
                .write()
        }
        // закрываем окно открытой сессии (если она есть ) просто что бы не багало
    SessionClose();
    });
}
// Алгаритм постоянно работает с промежутком в 1 сек для обработки свежих заявок на сессию с нами
SessionActive =() => {

    all_active_session = '';

    new_request_for_session_url = `${ServerName}/new.php?name=${nik_this_user[0].user}`;
// получение данных новых заявок
    request(new_request_for_session_url, function (err, res, body) {
        if (err) throw err;
        body = body.replace('<div>', '');
        body = body.replace('</div>', '');

        if (body == '') { // если новых записей нет , то резултат (после удаления divов) будет пуст и мы ничего не меняем

        }else if (body.indexOf('Лимит ресурсов исчерпан') != '-1') { //если сервак полетел
            console.log('Сервер упал')
        }else{ //если новый запрос:
// сохраняем в local бд
            db.get('active_session')
                .push({id: body.split('<br>')[0], key: body.split('<br>')[1], username: body.split('<br>')[2]})
                .write()

            dell_request_from_server = `${ServerName}/dell.php?key=${body.split('<br>')[1]}`;
            // удаляем с сервера
            request(dell_request_from_server, function (err, res, body) {
            });
        }
    });
    // цыклом прогоняем все записи о сессиях из local бд и получаем нужную инфу
    for (let brute_sessions_info_array = 0; brute_sessions_info_array < all_sessions_info_array.length; brute_sessions_info_array++) {
        let active_session_username = all_sessions_info_array[brute_sessions_info_array].username;
        all_active_session += `<p onclick="SessionStart('${active_session_username}')">${active_session_username}</p>`;
    }
    // выводим результат в интерфэйс
    sidebar_content.innerHTML = all_active_session;
// ждем 1 сек и повторяем
    setTimeout(SessionActive, 1000);
}
// При нажатии на пользователя создоет с ним чат
SessionStart = (session_nik) => {


// по нику пользователя находим всю инфу о сессии  с ним и заливаем ее
    for (let brute_sessions_info_array = 0; brute_sessions_info_array < all_sessions_info_array.length; brute_sessions_info_array++) {

        if ( session_nik == all_sessions_info_array[brute_sessions_info_array].username ) {
            all_key = all_sessions_info_array[brute_sessions_info_array].key;
            key = all_key.split('-')[0];
            key2 = all_key.split('-')[1];
            session_id = all_sessions_info_array[brute_sessions_info_array].id;
            message_url = `${ServerName}/message.php?id=${session_id}`;
            send_message_url = `${ServerName}/conect1.php?id=${session_id}&mess=`;
            exit_session_url = `${ServerName}/exit.php?id=${session_id}`;

// выводим поле для ввода
            f.innerHTML = `<form>
    <input type="text" id="input">
    <input type="button" value="Подтведить" onclick="Shifrator()">
</form>`;

        }else{

        }

    }
    // включаем дешифратор
    DeShifrator()

}
// закрываем поле ввода сообшений
SessionClose = () => {
    all_key = '';
    session_id = 0;
    message_url = `${ServerName}/message.php?id=${session_id}`;
    cc.innerHTML = `<div id="content1"></div>
        <div id="content"></div>
        <div id="f"></div>`;
}
// вызываем SessionActive
SessionActive();

