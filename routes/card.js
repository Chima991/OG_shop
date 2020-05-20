const {Router} = require('express')
const Card = require('../models/card')
const Good = require('../models/good')
const router = Router()



router.post('/add', async (req, res) => {
    const good = await Good.getById(req.body.id)
    await Card.add(good)
    res.redirect('/card')
})


router.delete('/remove/:id', async (req, res) => {
    const card = await Card.remove(req.params.id)
    res.status(200).json(card)
})


router.get('/', async (req, res) => {
    const card = await Card.fetch()
    res.render('card', {
        title: 'Корзина',
        isCard: true,
        goods: card.goods,
        price: card.price
    })
})

module.exports = router