Shifrator = () => {
    found_chare = false;
    // получаем введенный текст для дальнейшей обработки
    let message_text = document.getElementById('input').value;
    // encrypt_text -- будет изменяться, а message_text -- останится исходным, что бы удобно переработать все символы
    encrypt_text = message_text;

// прогоняем все символы сообшения...
    for (let message_chare_position = 0; message_chare_position < message_text.length; message_chare_position++) {
        chare_message_text = message_text.substr(message_chare_position, 1)


// через проверку если есть в массиве заминяется и шифруется если нет то остоется (не взовисимости от исхода после символа ставится /)

        for (let brute_chare_in_array = 0; brute_chare_in_array < alphabet.length; brute_chare_in_array++) {

            if (chare_message_text == alphabet[brute_chare_in_array]) {
                // формула шифровки
                chare_message_shifr = +brute_chare_in_array * +key + +key2;
                chare_message_shifr += '/';
                encrypt_text = encrypt_text.replace( chare_message_text, chare_message_shifr);
                found_chare = true;

            }


        }
// проверка нашли символ или нет
        if (found_chare == true) {
            found_chare = false;
        }else{
            encrypt_text = encrypt_text.replace( chare_message_text, chare_message_text + '/');
        }
    }
    console.log(encrypt_text)



    send_message_url += encrypt_text;
// отправка зашифровоного сообшения на сервер
    request(send_message_url, function (err, res, body) {
        if (err) throw err;
    });
    send_message_url = `${ServerName}/conect1.php?id=${session_id}&mess=`;


    document.getElementById('input').value = '';
}

