
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const session = require('express-session');
const userController = require('./controllers/users')

const app = express();

let PORT = process.env.PORT || 4000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(cors({
    origin: '*'
}));


// users controllers
app.use('/',userController)


app.get('/', (req, res)=>{
  res.status(200).json({
      status: true,
      message:'Welcome to online Bookstore'
    })
})


app.listen(PORT, console.log(`server on ${PORT}`))
