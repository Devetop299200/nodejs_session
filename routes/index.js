var express = require('express');
var router = express.Router();
var users = require('../database/users')
var findUser = function(name, password){
    for (let item of users.items) {
        if (item.name === name && item.password === password) {
            return true
        }
    }
    // return users.find(function(item){
    //     return item.name === name && item.password === password;
    // });
};

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/info', function (req, res, next) {
    res.send('info --------> data')
});

// 修改router/index.js,第一次请求时我们保存一条用户信息。
router.get('/', function(req, res, next) {
    var user={
        name:"Chen-xy",
        age:"22",
        address:"bj"
    }
    req.session.username=user;
});

// 登录接口
router.post('/login', function(req, res, next){
    var user = findUser(req.body.name, req.body.password);

    if(user){
        console.log('test', req.session.username)
        if (!req.session.username) {
            console.log('session')
            // res.cookie('user',req.body.name ,{ maxAge :20*60*1000, signed : true});
        }
        console.log('victory', req.body.name)
        req.session.username = req.body.name;
        // console.log(req.session);
        // req.session.lastPage = '/login'
        res.json({ret_code: 0, ret_msg: '登录成功'});
    }else{
        res.json({ret_code: 1, ret_msg: '账号或密码错误'});
    }
});

// // 退出登录
// router.get('/logout', function(req, res, next){
//     // 备注：这里用的 session-file-store 在destroy 方法里，并没有销毁cookie
//     // 所以客户端的 cookie 还是存在，导致的问题 --> 退出登陆后，服务端检测到cookie
//     // 然后去查找对应的 session 文件，报错
//     // session-file-store 本身的bug
//
//     req.session.destroy(function(err) {
//         if(err){
//             res.json({ret_code: 2, ret_msg: '退出登录失败'});
//             return;
//         }
//
//         // req.session.loginUser = null;
//         res.clearCookie(identityKey);
//         res.redirect('/');
//     });
// });
//
// router.get('/', function(req, res, next){
//     var sess = req.session;
//     var loginUser = sess.loginUser;
//     var isLogined = !!loginUser;
//
//     res.render('index', {
//         isLogined: isLogined,
//         name: loginUser || ''
//     });
// });

module.exports = router;
