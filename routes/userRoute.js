
const {User,validateLogin,validate} = require('../model/userModel');
const auth = require('../middleware/auth')
const bcrypt = require('bcrypt')
const config = require('config');
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router();



// ENDPOINT TO REGISTER USER
router.post('/register', async (req, res) => {
try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');
   
    const salt = await bcrypt.genSalt(10);
    
    user = new User({
        name: req.body.name,
        email: req.body.email, password: req.body.password,
        password: await bcrypt.hash(req.body.password,salt),
    });
   
    await user.save();

    const token = jwt.sign(
        { _id:user._id,name:user.name },
        config.get('jwtSecret')
    );
    
    return res
    .header('x-auth-token',token)
    .header('access-control-expose-headers','x-auth-token')
    .send({ 
        _id: user._id, name: user.name, 
        email: user.email });
     
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`); }
    });

    //ENDPOINT TO LOGIN

    router.post('/', async (req, res) => 
    
    { try {
        const { error } = validateLogin(req.body);
        if (error) return res.status(400).send(error.details[0].message);
       
        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('Invalid email or password.');
       
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        
        if (!validPassword) return res.status(400).send('Invalid email or password.')
        const token = jwt.sign({_id:user._id, name:user.name},config.get('jwtSecret'));
        
        return res.send(token); 
        
        } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`); }
        });


        // endpoint to CREATE usershopping cart
router.post('/:userId/shoppingcart/:productId',auth, async (req, res) => 
{ try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).send(`The user with id "${req.params.userId}" does not exist.`);
    
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(400).send(`The product with id "${req.params.productId}" does not exist.`);
    
    user.shoppingCart.push(product);
    await user.save();
    
    return res.send(user.shoppingCart); 
} catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`); }
    });

    //endpoint to UPDATE shoppingcart
    router.put('/:userId/shoppingcart/:productId',auth, async (req, res) => 
    { try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error);
        
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(400).send(`The user with id "${req.params.userId}" does not exist.`);
        
        const product = user.shoppingCart.id(req.params.productId);
        if (!product) return res.status(400).send(`The product with id "${req.params.productId}" does not in the users shopping cart.`);
        
        product.name = req.body.name; 
        product.description = req.body.description; 
        product.category = req.body.category; 
        product.price = req.body.price;
        product.dateModified = Date.now();
        
        await user.save();
        return res.send(product); 
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`); }
        });
       
        module.exports = router