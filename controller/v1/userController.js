const models = require('../../models/userModel');
var query = {};

exports.addMyReferral = async function (req, res) {
    try {

        let refereeCode = req.query.code;

        if (refereeCode) {
            query = { email: req.body.email };
            const checkMail = await models.users.findOne(query)
            if (checkMail){
                res.json({ status: 400, message: "Email already in use" })
            }
            else{
                query = {referralCode: refereeCode};
                const checkReferralCode = await models.users.findOne(query)
                if (checkReferralCode){
                    let referralCode = await getReferralCode()
                    query = {
                        name: req.body.firstName,
                        email: req.body.email,
                        referralCode: referralCode.code,
                        refereeCode: refereeCode
                    };
                    const newUser = new models.users(query)
                    const insertNewReferral = await newUser.save()
                    if (insertNewReferral){
                        query = {
                            userId: insertNewReferral._id,
                            referredBy: checkReferralCode._id
                        };
                        const newReferral = new models.myReferral(query)
                        const mapReferral = await newReferral.save()
                        if (mapReferral){
                            const newUserInfo = await models.users.findById(insertNewReferral._id)
                            if (newUserInfo){
                                res.json({ status: 200, message: "Success", data: newUserInfo })
                            }
                            else{
                                res.json({ status: 400, message: "Something went Wrong" })
                            }   
                        }
                        else{
                            res.json({ status: 400, message: "Something went Wrong" })
                        }
                    }
                    else{
                        res.json({ status: 400, message: "User not created. Please try again" })
                    }
                }
                else{
                    res.json({ status: 400, message: "invalid referral code" })
                }
            }
        }
        else{
            res.send("invalid URL")
        }

    } catch (error) {
        res.json({ status: 400, message: error.toString() })
    }
}

exports.addNewUser = async function(req, res){
    try {

        let referralCode = await getReferralCode()

        query = {
            name: req.body.firstName,
            email: req.body.email,
            referralCode: referralCode.code
        };

        const newUser = new models.users(query)
        const newUserInfo = await newUser.save()
        res.json({status: 200, message: "Success", data: newUserInfo})
        
    } catch (error) {
        res.json({status: 400, message: error.toString()})
    }
}

exports.getAllUser = async function(req, res){
    try {

        const allUsers = await models.users.find({},{__v: 0})
        res.json({status: 200, message: "Success", data: allUsers})
        
    } catch (error) {
        res.json({status: 400, message: error.toString()})
    }
}

exports.getAllMyReferrals = async function(req, res){
    try {
        
        const getMyReferralsId = await models.myReferral.find(
            {referredBy: req.body.userId}, 
            {_id: 0, userId: 1}
        )

        if (getMyReferralsId){
            const getMyReferrals = await models.users.find(
                {_id: getMyReferralsId[0].userId},
                {__v: 0}
            )
            if (getMyReferrals){
                res.json({status: 200, message: "Success", data: getMyReferrals})
            }
            else{
                res.json({status: 400, message: "Something wen wrong", data: {}})
            }
        }
        else{
            res.json({status: 400, message: "No Referrals Found"})
        }
        
    } catch (error) {
        res.json({status: 400, message: error.toString()})
    }
}

function getReferralCode() {
    return new Promise(async(resolve, reject) => {
        var newCode = '';
        let arr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

        for (var i = 8; i > 0; i--) {
            newCode += arr[Math.floor(Math.random() * arr.length)];
        }

        const getNewReferralCode = await models.users.findOne({referralCode: newCode})
        if (getNewReferralCode){
            getReferralCode()
        }
        else{
            resolve({ code: newCode })
        }

    })
}

