// 환경변수에 따라 MongoDb URI 설정
// 환경변수에는 development 와 production 이있다.
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}