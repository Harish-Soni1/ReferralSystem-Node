const mongoose = require('mongoose');
const validator = require('validator');

let models = {
    users: new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: [true, 'Email already in use'],
            validate(value){
                if (!validator.isEmail(value)){
                    throw new Error('Invalid Email')
                }
            }
        },
        referralCode: {
            type: String,
            required: true
        },
        refereeCode: {
            type: String,
            required: false,
            default: ''
        },
        isDelete: {
            type: Number,
            default: 0
        },
        createdDate: {
            type: Date,
            default: Date.now()
        }
    }),
    myReferral: new mongoose.Schema({
        userId: {
            type: String,
            required: true
        },
        referredBy: {
            type: String,
            required: true
        },
        isDelete: {
            type: Number,
            default: 0
        },
        createdDate: {
            type: Date,
            default: Date.now()
        }
    })
}

module.exports = {
    users: mongoose.model('users', models.users), 
    myReferral: mongoose.model('myReferral', models.myReferral)
};
