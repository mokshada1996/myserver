const express = require('express')
const db = require('../db')
const utils = require('../utils')

const router = express.Router()

router.get('/',(request,response) =>{
    const connection = db.connect()
    const statement = `select id,title,price from product`
    connection.query(statement,(error,data)=>{
        connection.end();
        response.send(utils.createResult(error,data))
    })
})

router.post('/',(request,response) =>{
    const {title,price} = request.body
    const connection = db.connect()
    const statement = `insert into product (title,price) values ('${title}',${price})`
    connection.query(statement,(error,data)=>{
        connection.end();
        response.send(utils.createResult(error,data))
    })
})

router.put('/:id',(request,response) =>{
    var id = request.params.id;
    var title = request.body.title;
    var price = request.body.price;
    const connection = db.connect()
    const statement = `update product set title='${title}', price= ${price} where id=${id}`
    connection.query(statement,(error,data)=>{
        connection.end();
        response.send(utils.createResult(error,data))
    })
})

router.delete('/:id',(request,response) =>{
    var id = request.params.id;
   
    const connection = db.connect()
    const statement = `delete from product where id = ${id}`
    connection.query(statement,(error,data)=>{
        connection.end();
        response.send(utils.createResult(error,data))
    })
})
module.exports = router
