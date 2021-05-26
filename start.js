const ServerName = 'http://localhost:8888';
var request = require('request');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
nik_this_user = db.get('local').value();
all_sessions_info_array = db.get('active_session').value();
alphabet = [ 'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я', ' ', 'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я', 'A', 'E', 'I', 'O', 'U',  'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z', 'a', 'e', 'i', 'o', 'u',  'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z', '/', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
 //Вспомогательный генератор
function Generate(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
//Генератор id и key сессии
function GenerateKeyAndId() {
    key = Generate(1000000000, 9000000000);
    key2 = Generate(10000000, 90000000);
    all_key = key + '-' + key2;
    session_id = Generate(1000000, 9000000);
}
