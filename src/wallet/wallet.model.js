const mongoose = require('mongoose');
const { ec } = require('elliptic');

const EC = new ec('secp256k1');


const walletSchema = new mongoose.Schema({
    publicKey: String,
    privateKey: String,
});

walletSchema.statics.generatePrivateKey = () => {
    const keyPair = EC.genKeyPair();
    const privateKey = keyPair.getPrivate();
    const key = EC.keyFromPrivate(privateKey, 'hex');
    return {
        privateKey: privateKey.toString(16),
        publicKey: key.getPublic().encode('hex')
    }
}

module.exports = mongoose.model('Wallet', walletSchema);

