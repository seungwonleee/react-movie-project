const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

// 데이터를 저장하기 전에 암호화 실행
userSchema.pre('save', function (next) {
    var user = this; //userSchema 를 가르킨다.

    if (user.isModified('password')) {
        //비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function (err, salt) {

            if (err) return next(err);
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();// 종료되어 다음 코드 실행 index.js에서 user.save
            });
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err)
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function (cb) {

    var user = this; //userSchema 를 가르킨다.

    //jsonwebtoken을 이용해서 token 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken');

    user.token = token
    user.save(function (err, user) {
        if (err) return cb(err);
        cb(null, user);
    })
}

userSchema.statics.findByToken = function (token, cb) {
    var user = this;
    // 토큰을 decode 한다.
    jwt.verify(token, 'secretToken', function (err, decoded) {
        // 유저의 아이디를 이용하여 유저를 찾고
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
        user.findOne({ "_id": decoded, "token": token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema);

module.exports = { User };