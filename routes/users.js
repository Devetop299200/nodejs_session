var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

//修改router/users.js，判断用户是否登陆。
router.get('/', function(req, res, next) {
    console.log('users session', req.session.username)
    console.log('cookie', req.cookies)
    // req.session.lastPage = '/users'
    if(req.session.username){
        var user=req.session.username;
        var name=user.name;
        res.send('你好'+user+'，欢迎来到我的家园。');
    }else{
        res.send('你还没有登录，先登录下再试试！');
    }
});

module.exports = router;
