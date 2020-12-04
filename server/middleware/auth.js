const { User } = require('../models/User');
// 임포트해올때 { User }처럼 괄호 안에 넣는거랑 안 넣는거 차이는 export default 인 것은 {} 없이 가져올 수 있다.    하지만 default 인 것들은 {} 해서 가지고 와야 됩니다 
let auth = (req, res, next) => {
    // 인증 처리를 하는곳
    // 클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;

    // 토큰을 복호화 한 후 유저를 찾는다.
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true });

        req.token = token; //auth 미들웨어 다음 콜백함수에서 사용하기위해서 대입
        req.user = user;
        next(); // next 메서드를 사용해야지 미들웨어 다음 콜백을 실행

    })
}

module.exports = { auth };