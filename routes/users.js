var express = require('express');
var router = express.Router();
var productHelpers = require('../helpers/product-helpers');
const userHelpers = require('../helpers/user-helpers')
const verifyLogin=(req,res,next)=>{
  if(req.session.loggedIn){
    next()
  }else{
    res.redirect('/login')
  }
}

/* GET home page. */
router.get('/', function (req, res, next) {
  let user=req.session.user
  console.log(user)
  productHelpers.getAllProducts().then((products) => {
   // console.log(products);

    //check here adarsh
    res.render('user/view-products', { products ,user})

  })
  // res.render('index', { products ,admin:false });
});
router.get('/login', (req, res) => {
  if(req.session.loggedIn){
    res.redirect('/')
  }else
    res.render('user/login',{"loginErr":req.session.loginErr})
    req.session.loginErr=false
  
})


router.get('/signup', (req, res) => {
  res.render('user/signup')
})
/*
router.post('/signup',(req,res)=>{
userHelpers.dosignup(req.body).then((response)=>{
  console.log(response)
})
})*/
//chatgpt
router.post('/signup', (req, res) => {
  // const userdata = req.body; // Make sure the form field names match the object keys
  //console.log(req.body);//here i edited

  userHelpers.dosignup(req.body)
    .then((response) => {
      console.log(response);
      // Redirect to a success page or display a success message
      res.render('user/login', { message: 'User registration successful' });
    })
    .catch((error) => {
      console.error(error);
      // Redirect to an error page or display an error message
      res.render('user/signup', { errorMessage: 'User registration failed' });
    });
});
router.post('/login', (req, res) => {
  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn=true
      req.session.user=response.user
      res.redirect('/')
    } else {
      req.session.loginErr=true
      res.redirect('/login')
      
    }
  })
})
router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})
router.get('/cart',verifyLogin,(req,res)=>{

  res.render('user/cart')
})

module.exports = router;
