const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()
const Wallet = require('./wallet/wallet.model');


mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
})
.then(() => console.log('Connect to db successfully'))
.catch((e) => console.log(e))




app.use(express.json())

app.get('/', async (req,res) => {
    const wallet = new Wallet(Wallet.generatePrivateKey())
    await wallet.save();
    res.json(wallet);
});


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));

