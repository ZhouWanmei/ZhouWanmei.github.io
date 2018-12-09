(function(){
    // 获取随机验证码
    var oSpan         = getEl('.verification-code');
    oSpan.textContent = getVerificationCode(5);
    oSpan.onclick     = function() {
        oSpan.textContent = getVerificationCode(5);
    } 
     // 表单验证
    var valObj    = {},
        inputs    = Array.from(getEl('.Form input', true)),
        inputTips = Array.from(getEl('.form-item',true)),
        tips      = Array.from(getEl('.tips',true)),
        regBtn    = getEl('.registerBtn');
    var userNumIpt = document.getElementById('userid'),
        firPasswordIpt = document.getElementById('firPassword');
    var error = false;   
    inputs.forEach(function(input,index) {
         input.dataset.index = index;
         var inputIdx = input.dataset.index;
         input.onfocus = function(){
            inputTips.forEach(function(_tip,index){
                //为提示文本框添加自定义下标属性
                _tip.dataset.idx = index;
                var tipsIdx = _tip.dataset.idx;
                if(inputIdx === tipsIdx){
                    _tip.classList.add('display');
                }
            });
         }
         // 实时验证
         input.oninput = function() {
             // this -> 
             var val  = this.value;
             var flag = false;
             // 存储表单输入的数据
             valObj[this.id] = val;
             switch(this.id) {
                 case "userid": {
                     // 4位以上的数字
                     if(/\d{4}/.test(val)) {
                         flag = true;
                     }
                 } break; 
                 case "firPassword": {
                     // 密码长度为6-20位，不能含有空格
                     if(/^[\w*]{6,20}$/.test(val)) {
                         flag = true;
                     }
                 } break;
                 case "secPassword": {
                     if(val === valObj.firPassword) {
                         flag = true;
                     }
                 } break;
                 case "verificationCode": {
                     var reg = new RegExp(oSpan.textContent, "i");
                     if(reg.test(val)) {
                         flag = true;
                     }
                 } break;
             }
             // 判断是否显示异常提示
             if(flag) {
                tips.forEach(function(tip,index){
                    //为提示文本框添加自定义下标属性
                    tip.dataset.idx = index;
                var tipsIdx = tip.dataset.idx;
                    if(inputIdx === tipsIdx){
                        tip.classList.remove("error");
                        error = false;
                        tip.classList.add("success");
                    }
                });
                 
             }else{
                tips.forEach(function(tip,index){
                    //为提示文本框添加自定义下标属性
                    tip.dataset.idx = index;
                var tipsIdx = tip.dataset.idx;
                    if(inputIdx === tipsIdx){
                        tip.classList.add("error");
                        error = true;
                        tip.classList.remove("success");
                    }
                });                 
             }
         }
    });


    //为注册按钮添加点击事件
    regBtn.onclick = function(){
        //异常处理
        var isEmpty = false;
        for(var i = 0, len = inputs.length; i < len; i++) {
            if(inputs[i].value.length == 0) {
                isEmpty = true;
                break;
            }
        }
        if(isEmpty) {
            new LHYAlertView({
                type: "alert",
                message: "请完善信息!!!",
            });
            // 终止后续操作
            return;
        }
        if(error) {
            new LHYAlertView({
                type: "alert",
                message: "格式错误，请重新输入!!!",
            });
            error = false;
            // 终止后续操作
            return;
        }
        var userId   = userNumIpt.value;
        var password = firPasswordIpt.value;
        //创建用户对象
        var user = {
            userId, 
            password
        }; 
        save(user);

        //设置一个变量，用于监听用户注册或登陆状态
        sessionStorage.setItem("state", "true");
        //保存该用户信息到本地
        var _curUser = {};
        _curUser.id = user.userId;
        _curUser.password = user.password;
        localStorage.curUser = JSON.stringify(_curUser);
    }   
})();