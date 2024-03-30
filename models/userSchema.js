/*
{
    "iss": "https://accounts.google.com",
    "nbf": 1678333830,
    "aud": "305937744211-8v5vok62adns8jiok8dcrqltdmlhoqkl.apps.googleusercontent.com",
    "sub": "117851415965395892713",
    "email": "rmnprjrrr@gmail.com",
    "email_verified": true,
    "azp": "305937744211-8v5vok62adns8jiok8dcrqltdmlhoqkl.apps.googleusercontent.com",
    "name": "RMN P",
    "picture": "https://lh3.googleusercontent.com/a/AGNmyxaHMQjh9urJ3ohT8ZC48-x_gg7bT1aDaN-ZuAp6EQ=s96-c",
    "given_name": "RMN",
    "family_name": "P",
    "iat": 1678334130,
    "exp": 1678337730,
    "jti": "75d63c081988cd28ec2975b972df2133344913ca"
}
*/
const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    token:{
        type:String,
        required:true
    },
    given_name:{
        type:String,
        required:true
    },
    family_name:{
        type:String,
        required:true
    },

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    picture:{
        type:String,
        required:true
    }
});
const users=new mongoose.model("Channel",userSchema);
module.exports=users
