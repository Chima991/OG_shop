const express = require('express')
const path = require('path')
const Handlebars = require('handlebars')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const cardRoutes = require('./routes/card')
const addRoutes = require('./routes/add')
const goodsRoutes = require('./routes/goods')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

// обьект для создания сервера
const app = express()
// создаём движок с название hbs
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

// регистриуем движок
app.engine('hbs', hbs.engine)
app.engine('handlebars', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

// готовим к запуску движок 
app.set('view engine', 'hbs')

// устанавливаем местонахождение страниц(папка views по умолчанию)
app.set('views', 'views')

//регистрируем папку паблик и JS файлы страниц
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/goods', goodsRoutes)
app.use('/card', cardRoutes)

// установка порта(3000 значение по умолчанию)
const PORT = process.env.PORT || 3000

async function start() {  // запуск сервера теперь записан в функцию старт
    try { // обработчик ошибок трай-кэтч
        const url = `mongodb+srv://Artem:38k9PysVVO3XGhWj@cluster0-ac2ci.mongodb.net/shop` // url базы данных
        await mongoose.connect(url, {useNewUrlParser: true}) // подключение к базе данных
        app.listen(PORT, () => { // запуск сервера
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }   
}



start() // запуск функции старт





