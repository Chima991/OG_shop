const {Router} = require('express')
const Good = require('../models/good')
const router = Router()

router.get('/', (req, res) => {
    res.render('add', {
        title: 'Добавить свой товар',
        isAdd: true
    })
})

router.post('/', async (req, res) => { // создание нового товара
    const good = new Good({ // создание текущего товара и принимаем параметры
        title: req.body.title,
        price: req.body.price,
        img: req.body.img
    })

    try { //  метод save и проверка на ошибки
        await good.save()
        res.redirect('/goods')
    } catch (e) {
        console.log(e)
    }
})


module.exports = router