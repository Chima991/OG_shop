const path = require('path')
const fs = require('fs')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'card.json'
)

class Card {

    static async add(good) {
        const card = await Card.fetch()


        const idx = card.goods.findIndex(с => с.id === good.id)
        const candidate = card.goods[idx]

        if (candidate) {
            // курс уже есть
            candidate.count ++
            card.goods[idx] = candidate
        } else {
            // нужно добавить
            good.count = 1
            card.goods.push(good)
        }

        card.price += +good.price 

        return new Promise ((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(card), err => {
                if (err) {
                    reject(err)
                } else {
                    resolve(card)
                }
            })
        })
    }

    static async remove(id) {
        const card = await Card.fetch()

        const idx = card.goods.findIndex(g => g.id === id)
        const good = card.goods[idx]

        if (good.count === 1) {
            // удалить товар
            card.goods = card.goods.filter(g =>g.id !== id)
        } else {
            // изменить количество
            card.goods[idx].count--
        }

        card.price -= good.price

        return new Promise ((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(card), err => {
                if (err) {
                    reject(err)
                } else {
                    resolve(card)
                }
            })
        })
    }

    static async fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(p, 'utf-8', (err, content) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(JSON.parse(content))
                }
            })
        })
    }
}

module.exports = Card