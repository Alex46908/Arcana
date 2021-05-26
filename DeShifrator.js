DeShifrator = () => {
    // получение переписки
    request(message_url, function (err, res, encrypt_text) {
        if (err) throw err;
        encrypt_text = encrypt_text.replace('<div>', '');
        encrypt_text = encrypt_text.replace('</div>', '');
        result = '';
        // Прогоняем всю str по числам (/ делит)
        for ( let message_chare_position = 0; message_chare_position < encrypt_text.split('/').length - 1; message_chare_position++) {

            encrypt_chare = encrypt_text.split('/')[message_chare_position];
            // формула расшифровки
            decrypt_chare_position_in_array = (encrypt_chare - key2) / key ;
            // если не смогли расшифровать значит он не зашифрован
            if (alphabet[decrypt_chare_position_in_array] == undefined) {
                result += encrypt_chare;
            }else{
                // если расшифровали
                result += alphabet[decrypt_chare_position_in_array];
            }
        }
        // выводим в интерфэйс
        result = `<p>${result}</p>`
        content.innerHTML = result;
    });

    setTimeout(DeShifrator, 500)

}