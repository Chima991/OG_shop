/* создаём модель и регистрируем её в монгуз,
для модели делаем схему которая описывает поля, 
значение, валидаторы - все свойства
*/

const {Schema, model} = require('mongoose')

const good = new Schema ({ // новый класс
    title: { // описываем параметры и их ключи в объекте "good"
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: String
    // id не добавляем, так как его будет сам делать mongoose
})

module.exports = model('Good', good) 