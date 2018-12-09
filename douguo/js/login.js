(function(){
    var inputs         = getEl(".Form input",true), 
        userNumIpt     = document.getElementById('userid'),
        passwordIpt    = document.getElementById('password'), 
        valObj         = {},
        forgetPassword = getEl(".forget-password");
        inputs.forEach(function(input,index) {
            // 实时验证
            input.oninput = function() {
                var val  = this.value;
                // 存储表单输入的数据
                valObj[this.id] = val;
                switch(this.id) {
                    case "userid": {
                        if((/\d{4,}/.test(val))) {
                            forgetPassword.dataset.msg="";
                            forgetPassword.classList.remove("error");
                        }else{
                            forgetPassword.dataset.msg="账号错误";
                            forgetPassword.classList.add("error");
                        }
                    } break;
                    case "password": {
                        // 不少于6个字符
                        if(/\w{6,}/.test(val)) {
                            forgetPassword.dataset.msg="";
                            forgetPassword.classList.remove("error");
                        }
                        else{
                            forgetPassword.dataset.msg="密码不少于6个字符";
                            forgetPassword.classList.add("error");
                        }
                    } break;
                }
            }
        });


    
        //获取本地数据并转换成json对象
        var users = JSON.parse(localStorage.User);
        console.log(users);
        

    var loginBtn = getEl('.loginBtn');
    loginBtn.onclick = function(){
        //异常处理
        for(var i = 0, len = inputs.length; i < len; i++) {
            if(inputs[0].value.length == 0) {
                new LHYAlertView({
                    type: "alert",
                    message: "请输入用户名!",
                });
                return;
            }
            
            if(inputs[1].value.length == 0) {
                new LHYAlertView({
                    type: "alert",
                    message: "请输入密码!",
                });
                // 终止后续操作
                return;
            }
        }

        var userId   = userNumIpt.value;
        var password = passwordIpt.value;
        //创建用户对象
        var _user = {
            userId, 
            password
        };
        
        console.log(_user);

        var user = null;
        for(var i = 0; i < users.length; i++) {
            console.log(users[i].userId);
            console.log(_user.userId);
            if(users[i].userId == _user.userId) {
                user = users[i];
                console.log(user);
                // 跳出循环
                break;
            }
        }
        if(user == null) {
            // 用户不存在
            new LHYAlertView({
                type: "alert",
                message: "不存在该用户，请先注册!",
            });
        }else if((user.userId == _user.userId) &&  (user.password == _user.password)){
            new LHYAlertView({
                type: "default",
                autoClose: 1000,
                message: "登陆成功！"
            });
            //设置一个变量，用于监听用户注册或登陆状态
            sessionStorage.setItem("state", "true");
            //保存该用户信息到本地
            var _curUser = {};
            _curUser.id = users[i].userId;
            _curUser.password = users[i].password;
            localStorage.curUser = JSON.stringify(_curUser);

            //返回首页
            window.location.href="/douguo/index.html";
            
        }else {
            new LHYAlertView({
                type: "alert",
                message: "密码错误，请重新输入密码!",
            });
        }


        
        
        
        
        
            
           
                
          


        


        
    }
})();