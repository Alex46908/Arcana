// Вход в ак
function Login() {
    input_username = document.getElementById('login').value;
    input_password = document.getElementById('password').value;
    login_url =  `${ServerName}/prowerka.php?name=${input_username}&pass='${input_password}'`;
    // чек действительностит данных
    request(login_url, function (err, res, body) {
        if (err) throw err;
        body = body.replace('<div>', '');
        body = body.replace('</div>', '');
        if (body == '') {
            alert('Неверные данные')
        }else{
            //если все ок в local их
            db.get('local')
                .push({"user": input_username, "pass": input_password})
                .write()
            setTimeout(Href, 2000)
        }
    });

}
// регистрация
function Regisration() {
    input_username = document.getElementById('login').value;
    input_password = document.getElementById('password').value;

        name_used_url = `${ServerName}/prowerka.php?name=${input_username}`;
        reg_new_user_url = `${ServerName}/conect2.php?name=${input_username}&pass=${input_password}`;
        // используется ли имя
        request(name_used_url, function (err, res, body) {

            if (err) throw err;
            body = body.replace('<div>', '');
            body = body.replace('</div>', '');

            if (body == '') {
                // если все норм регаем нового юзера
                request(reg_new_user_url, function (err, res, body) {
                    if (err) throw err;


                });
                // и в local его
                db.get('local')
                    .push({"user": input_username, "pass": input_password})
                    .write()
                setTimeout(Href, 2000)


            } else {
                // тут все ясно
                alert('Данный ник уже зарегистрирован')
            }

        });

}
function Href() {
    window.location.href = 'index.html';
}
