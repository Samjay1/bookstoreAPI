const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

const router = express.Router();

let Books = [
    { 
        id:'1',
        title: 'Book one',
        author: 'John',
        genre: 'Action',
        price: 200
    },
    { 
        id:'2',
        title: 'Book two',
        author: 'Ama',
        genre: 'Adventure',
        price: 300
    },
    { 
        id:'3',
        title: 'Book three',
        author: 'Mike',
        genre: 'Fiction',
        price: 100
    }
]

let Carts = []


router.get('/list', (req, res) => { 
    console.log('list :>> ', list);
    try {
        res.status(200).json({
            status: true,
            response:Books
        })
    } catch (error) {
        return res.status(500).send({
            status: false,
            message:"Something went wrong, Please try again."
        })
    }
})

router.get('/search/:value', (req, res) => { 
    const value = req.params.value;
    try {
        if (!value) {
            res.status(404).json({
                status: false,
                message: 'Must not be empty'
            })
        } else { 
            let bookFound = Books.map((book) => { 
                return Object.values(book).join(" ").toLowerCase().includes(value);
            })
    
            if (bookFound.length !== 0) { 
                res.status(200).json({
                    status: true,
                    response:bookFound
                })
            }
        }
    } catch (error) {
        return res.status(500).send({
            status: false,
            message:"Something went wrong, Please try again."
        })
    }
})

router.post('/cart', (req, res) => { 
    let { userID, bookID, title, quantity, price } = req.body
    try {
        if (!userID || !bookID || !title || !quantity || !price) {
            res.status(404).json({
                status: false,
                message: 'Must not be empty'
            })
        } else { 
            let cartID = Math.random();
            let cartItem = {cartID, userID, bookID, title, quantity, price }
            Carts.push(cartItem)
            res.status(201).json({
                status: true,
                message: 'Item added successfully',
                response: Carts
            })
        }
    } catch (error) {
        return res.status(500).send({
            status: false,
            message:"Something went wrong, Please try again."
        })
    }
})

router.get('/cart', (req, res) => { 
    try {
        res.status(200).json({
            status: true,
            response: Carts
        })
    } catch (error) {
        return res.status(500).send({
            status: false,
            message:"Something went wrong, Please try again."
        })
    }
})

router.post('/update/cart/:id', (req, res) => { 
    let cartID = req.params.id;
   
    try {
        let cartSelectedIndex = Carts.findIndex((dict => dict.id == parseInt(cartID)));
        const updatedQuantity = parseInt(req.body['quantity'])
        Carts[cartSelectedIndex].quantity = updatedQuantity

        res.status(201).json({
            status: true,
            messasge: "Updated successfully"
        })
    } catch (error) {
        return res.status(500).send({
            status: false,
            message:"Something went wrong, Please try again."
        })
    }
    
})




module.exports = router; 

