const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// 환경변수에따라 다른값이 담긴다.
const config = require('./config/key');
const { auth } = require('./middleware/auth');
const { User } = require('./models/User');
const { Favorite } = require('./models/Favorite');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');
const { restart } = require('nodemon');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => { console.log('MongoDB Connected...') })
    .catch(error => console.log(error))


// 여기서부터 user DB 관리

app.post('/api/users/register', (req, res) => {
    //회원 가입할 때 필요한 정보들을 client에서 가져오면 
    //그것들을 데이터 베이스에 넣어준다.

    const user = new User(req.body);

    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })// 실패시
        return res.status(200).json({// 성공시
            success: true
        })
    });
})

app.post('/api/users/login', (req, res) => {

    // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "일치하는 이메일이 존재하지 않습니다."
            })
        }
        // 요청된 이메일이 데이터베이스에 있다면 비밀번호 일치 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) {
                return res.json({
                    loginSuccess: false,
                    message: '비밀번호가 일치하지 않습니다.'
                })
            }
            // 비밀번호까지 맞다면 토큰을 생성하기
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);

                //토큰을 쿠키에 저장한다.
                res.cookie('x_auth', user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id })
            })
        })
    })
})

app.get('/api/loginSuccess', (req, res) => {
    res.send('login success !!!');
})

// 0 이면 일반유저 0 이 아니면 관리자
app.get('/api/users/auth', auth, (req, res) => {
    //여기 까지 미들웨어를 통과해 왔다는 얘기는 Authentication 이 true 라는 말.
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user._id },
        { token: '' },
        (err, user) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            })
        })
})



// 여기서부터 Favorite DB 관리

app.post('/api/favorite/favoriteNumber', (req, res) => {
    // mongoDB에서 favorite 숫자 가져오기
    Favorite.find({
        "movieId": req.body.movieId
    }).exec((err, info) => {
        if (err) return res.status(400).send(err)
        // 가져온 favorite 숫자 정보를 프론트에 다시 보내주기
        res.status(200).json({ success: true, favoriteNumber: info.length })

    })
})

app.post('/api/favorite/favorited', (req, res) => {
    Favorite.find({
        "movieId": req.body.movieId,
        "userFrom": req.body.userFrom
    }).exec((err, info) => {
        if (err) return res.status(400).send(err)

        let result = false;
        if (info.length !== 0) {
            result = true;
        }

        res.status(200).json({ success: true, favorited: result })
    })
})

app.post('/api/favorite/addToFavorite', (req, res) => {

    const favorite = new Favorite(req.body);

    favorite.save((err, doc) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({ success: true });
    })
})

app.post('/api/favorite/removeFromFavorite', (req, res) => {
    Favorite.findOneAndDelete({
        movieId: req.body.movieId,
        userFrom: req.body.userFrom
    }).exec((err, doc) => {
        if (err) return res.status(400), send(err)
        res.status(200).json({ success: true, doc })
    })
})

app.post('/api/favorite/getFavoriteMovie', (req, res) => {
    Favorite.find({ 'userFrom': req.body.userFrom })
        .exec((err, favorites) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, favorites })
        })
})

app.post('/api/favorite/removeFromFavoriteMovie', (req, res) => {
    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec((err, result) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true })
        })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})