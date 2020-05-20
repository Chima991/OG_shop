const {Router} = require('express')
const Good = require ('../models/good')
const router = Router()

router.get('/', async (req, res) => { // получаем все товары из базы данных
    const goods = await Good.find() // 
    res.render('goods', {
        title: 'Товары',
        isGoods: true,
        goods
    })
})

router.get('/:id/edit', async (req, res) => { // редактирование карточки товара
    if (!req.query.allow) {
        return res.redirect('/')
    }
    
    const good = await Good.findById(req.params.id) // получаем курс и передаём в него айди

    res.render('good-edit', {
        title: `Редактировать ${good.title}`,
        good
    })
})

router.post('/edit', async (req, res) => { // post метод изменения
    const {id} = req.body
    delete req.body.id
    await Good.findByIdAndUpdate(id, req.body)
    res.redirect('/goods')
})

router.get('/:id', async (req, res) => {
    const good = await Good.findById(req.params.id)
    res.render('good', {
        layout: 'empty',
        title: `Товар ${good.title}`,
        good

    })
})


module.exports = router
