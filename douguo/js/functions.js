//获取DOM元素
function getEl(Sel, isAll) {
    if(isAll) {
        return document.querySelectorAll(Sel);
    }else {
        return document.querySelector(Sel);
    }
}


//获取非行内样式
function getStyle(el, attr) {
    // 兼容IE
    if (el.currentStyle) {
        return el.currentStyle[attr];
    } else {
        return getComputedStyle(el, null)[attr];
    }
}

//获取url中的参数
function getUrlParam(name) {
    //构造一个含有目标参数的正则表达式对象
    var reg = new RegExp("(^|&)"+ name + "=([^&]*)(&|$)");
    console.log(reg);
    //匹配目标参数
    var r = window.location.search.substr(1).match(reg);
    console.log(r);
    //返回参数值
    if(r != null)
        return unescape(r[2]);
    return null;
} 

 
//获取随机验证码
function getVerificationCode(length) {
    // 定义随机源
    var str = "";
    str += "QWERTYUIOPASDFGHJKLZXCVBNM";
    str += "1234567890";
    str += "qwertyuiopasdfghjklzxcvbnm";
    // 根据长度截取字符
    var resStr = "";
    for(var i = 0; i < length; i++) {
        // 获取随机下标
        var index = Math.floor(Math.random() * str.length);
        resStr += str.slice(index, index + 1);
    }
    return resStr;
}

//用户登录状态 
function userState(){
    var _flag = false;
    //判断是否有用户登录
    if(sessionStorage.state){
        _flag = sessionStorage.getItem('state');
    }else{
        _flag = false;      
    }
    var loginBox   = getEl('.login-box');
    var loginedBox = getEl('.logined-box');
    
    
    //判断用户登录状态
    if(_flag){
        //修改显示状态
        loginBox.style.display   = "none";
        loginedBox.style.display = "block";
    }else{
        loginBox.style.display   = "block";
        loginedBox.style.display = "none";
    }
}

//保存多个用户信息
function save(user) {

    // 定义变量存储学生数据集合
    var users = null;
    if(localStorage.User) {
        users = JSON.parse(localStorage.User);
    }else {
        users = [];
    }
    // 异常处理
    // 判断本地是否已经存在该用户
    for(var i = 0, len = users.length; i < len; i++) {
        if(users[i].userId === user.userId) {
            new LHYAlertView({
                type: "alert",
                message: "该用户已被注册！"
            });
            return;
        }
    }  
    // 录入用户
    users.push(user);
    new LHYAlertView({
        type: "default",
        autoClose: 1000,
        message: "注册成功！"
    }); 
    // 将js对象转换为JSON数据
    var jsonObj = JSON.stringify(users);
    // 存储到本地
    localStorage.User = jsonObj;
    console.log(users);
    window.location.href="/douguo/index.html";
}

//回到顶部
function goToTop(){
    var goToTopBtn = getEl('.goto-top');
    var offset  = 0;
    window.onscroll = function(){
        offset = document.body.scrollTop || document.documentElement.scrollTop;
        if(offset > 500){
            goToTopBtn.style.display = "block";
        }else{
            goToTopBtn.style.display = "none";
        }
    }
    goToTopBtn.onclick = function(){
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }
}

//菜单切换
function menuSwitch(){
    var navBars = Array.from(getEl('.navbar li a',true));
    navBars.forEach(function(bar,index){
        bar.onclick = function(){
            for(var i = 0,len = navBars.length; i < len; i++){
                if(bar.classList.contains('selected')){
                    bar.classList.remove('selected');
                }
            }
            bar.classList.add('selected');
        }
    });
}

//模糊搜索
function search(){
    var searchIpt  = getEl('.search-input'),
        searchBtn  = getEl('.searchBtn'),
        searchList = getEl('.search-list'),
        searchkey  = Array.from(getEl('.search-list li',true));
    //定义一个变量记录搜索输入框是否获取了焦点
    var isOnfocus = false; 
    searchIpt.onfocus = function(){
        isOnfocus = true;
        this.placeholder = "";
        searchList.style.display = "block";
        searchkey.forEach(function(key,index){
            key.onclick = function(){
                console.log(this.textContent);
                searchIpt.value = this.textContent;
                localStorage.keyWord = JSON.stringify(this.textContent);
                searchList.style.display = "none";
            }
        });
    }
    if(!isOnfocus){
        this.placeholder = "请输入关键字...";
        searchList.style.display = "none";
        isOnfocus = false;
    }
    searchIpt.oninput = function(){
        var _keywords = this.value;
        localStorage.keyWord = JSON.stringify(_keywords);
    }
    searchBtn.onclick = function() {
        //跳转到搜索结果展示页
        window.location.href="/douguo/html/searchDisplay.html";
    }
}
function searchResult(keywords){
    var searchResultList = getEl('.searchResult-list'),
        datas = null;
    $.ajax({
        url:"/douguo/json/shoppingMall.json",
        success: function(recommend) {
            datas = recommend;
            //处理搜索数据
            if(keywords) {
                datas = datas.filter(function(goods) {
                    var reg = new RegExp(keywords, "i");
                    console.log(reg);
                    var flag = reg.test(JSON.stringify(goods));
                    return flag;     
                })     
            }
            //拼接元素
            var htmlStr = "";
            datas.forEach(function(obj, index){
                    htmlStr += `
                        <li class="clearFix">
                            <a href="/douguo/html/goodsDetail.html?goodsId=${obj.id}" target="_self"><img class="fl" src="../images/mall/goods-${obj.id}/${obj.img}" alt="图片加载失败..."></a>
                            <div class="goods-infos fl">
                                <p class="title">商品名称：<a href="/douguo/html/goodsDetail.html?goodsId=${obj.id}" target="_blank">${obj.describe}</a></p>
                                <p class="price">商品价格：<span>${obj.curPrice}</span></p>
                                <p class="introduce">商品说明：<span>${obj.advantages}</span></p>
                            </div>
                        </li>`;
                
            });
            searchResultList.innerHTML = htmlStr;
                
        }
    })
}




//轮播图
function scroll() {
    // 获取DOM元素
    var _prevBtn     = getEl('.prev');
    var _nextBtn     = getEl('.next');
    var _idots       = getEl('.idot',true);
    var wrapper      = getEl('.scroll-flash');
    var _wrapper     = getEl('.img-box img');
    var _imgBox      = getEl('.img-box');
    var _curIndex    = 1; 
    var _timer       = null;  // 存储定时器/自动播放使用
    var _isAnimating = false; // 记录动画状态
    var _kWidth      = parseInt(getStyle(_wrapper, "width"));

    
    // 默认显示第一张图片
    _imgBox.style.left     = "-" + _kWidth + "px";
    // 监听窗口变化/重新计算容器尺寸
    window.onresize = function() {
        _kWidth   = parseInt(getStyle(_wrapper, "width"));
        _wrapper.style.height  = getStyle(_imgBox, "height");
        //更新left值
        _imgBox.style.left     = "-" + _curIndex * _kWidth + "px";

    }
    // 左右切换
    _prevBtn.onclick = function() {
        // 异常处理
        if(_isAnimating) { return; }
        if(_curIndex === 1) {
            _curIndex = 5;
        }else {
            _curIndex--;
        }
        tab(+_kWidth);
        updateIdot();
    }
    _nextBtn.onclick = function() {
        if(_isAnimating) { return; }
        if(_curIndex === 5) {
            _curIndex = 1;
        }else {
            _curIndex++;
        }

        tab(-_kWidth);
        updateIdot();
    }
    // 小圆点切换
    _idots.forEach(function(idot, index) {
        idot.dataset.index = index + 1;
        idot.onclick = function() {
            var index = parseInt(this.dataset.index);
            if(index === _curIndex || _isAnimating) {
                return;
            }
            // 计算偏移
            var offset = -(index - _curIndex) *  _kWidth;
            // 切换
            tab(offset);
            // 更新下标显示
            _curIndex = index ;
            // 更新小圆点显示
            updateIdot();
        }
    });
    // 自动播放
    play();
    // 异常处理 
    // 鼠标移入 停止定时器
    // 鼠标移出 启动定时器
    wrapper.onmouseenter = stop;
    wrapper.onmouseleave = play;

    // 函数封装
    function play() {
        _timer = setInterval(function() {
            _nextBtn.onclick();
        }, 3000);
    }
    function stop() {
        clearInterval(_timer);
    }
    function updateIdot() {
        for(var i = 0, len = _idots.length; i < len; i++) {
            if(_idots[i].classList.contains('selected')) {
                _idots[i].classList.remove('selected');
                break;
            }
        }
        _idots[_curIndex - 1].classList.add('selected');
    }
    function tab(offset) {
        // 更新动画状态
        _isAnimating = true;
        // 滚动效果
        var duration = 500,
            interval = 10,
            frames   = duration / interval,
            speed    = Math.ceil(offset / frames);
        var curLeft  = parseInt(_imgBox.style.left);
        var desLeft  = curLeft + offset;
        var isScroll = false;
        var t = setInterval(function() {
            // 更新当前偏移
            curLeft  = parseInt(_imgBox.style.left);
            isScroll = (offset < 0 && curLeft > desLeft) || (offset > 0 && curLeft < desLeft);
            if(isScroll) {
                _imgBox.style.left = curLeft + speed + "px";
            }else {
                // 清除定时器
                clearInterval(t);
                // 更新动画状态
                _isAnimating = false;
                // 更新偏移
                _imgBox.style.left = desLeft + 'px';
                // 无限滚动
                if(desLeft < -5 * _kWidth) {
                    _imgBox.style.left = -_kWidth + 'px';
                }else if(desLeft > -_kWidth) {
                    _imgBox.style.left = -5 * _kWidth + 'px';
                }
            }
        }, interval);
    }
}

//广告切换
function advertisement(){
    // 获取元素
    var wrapper       = getEl('.advertisement-wrapper'),
        menus         = getEl('.advertisement-menu li',true),
        content       = getEl('.advertisement-content'),
        contents      = getEl('.advertisement-content>a',true),
        titles        = getEl('.advertisement-content .title',true),
        mask          = getEl('.advertisement-content .mask'),
        _titleContent = getEl('.advertisement-content .mask .arrowl'),
        timer         = null,
        curIndex      = 0;
    // 为菜单项添加点击事件切换内容
    menus.forEach(function(menu, index) {
        // 添加自定义下标属性
        menu.dataset.index = index;
        menu.onmouseenter = function() {
            // 获取点击菜单项的下标
            var index = this.dataset.index;
            // 清除上一次的样式
            for(var i = 0, len = menus.length; i < len; i++) {
                if(menus[i].classList.contains('selected')) {
                    menus[i].classList.remove('selected');
                    contents[i].classList.remove('show');
                }
            }
            // 切换选中菜单
            menus[index].classList.add('selected');
            // 切换内容
            contents[index].classList.add('show');
            //鼠标移入显示遮罩
            content.onmouseenter=function(){
                //记录当前的标题
                var _title=titles[index].textContent;
                mask.style.display="block";
                _titleContent.textContent=_title;
                titles[index].style.display="none";
            }
            content.onmouseleave=function(){
                mask.style.display="none";
                titles[index].style.display="block";
            }
        }
        
    });
    
    // 自动播放
    play();
    // 移入停止/移出播放
    wrapper.onmouseenter = stop;
    wrapper.onmouseleave = play;

   

    function play() {
        timer = setInterval(function() {
            if(curIndex === 7) {
                curIndex = 0;
            }else {
                curIndex++;
            }
            menus[curIndex].onmouseenter();
        }, 3000);
    }
    function stop() {
        clearInterval(timer);
    }
}

 


//加载每日编辑推荐数据
function loadingEverydayRecommendData(){
    var reList = getEl('.recommend-list');
    $.ajax({
        url:"/douguo/json/everydayRecommend.json",
        success: function(recommend) {
            var htmlStr = "";
            recommend.forEach(function(obj, index){
                if(obj.video){
                    htmlStr += `
                    <li>
                        <a href="javascript:;">
                            <img src="/douguo/images/index/everydayRecommend/${obj.img}" alt="图片加载失败...">
                            
                        </a>
                        <p class="describe"><a href="javascript:;">${obj.describe}</a></p>
                        <p class="author">${obj.author}</p>
                    </li>`;
                }else{
                    htmlStr += `
                    <li>
                        <a href="javascript:;">
                            <img src="/douguo/images/index/everydayRecommend/${obj.img}" alt="图片加载失败...">
                        </a>
                        <p class="describe"><a href="#">${obj.describe}</a></p>
                        <p class="author">${obj.author}</p>
                    </li>`; 
                }
                  
            });
            reList.innerHTML = htmlStr;
            
        }
    })
}

//加载商城精选数据
function loadingShoppingMallData(){
    var goodsList = getEl('.goods-list');
    $.ajax({
        url:"/douguo/json/shoppingMall.json",
        success: function(recommend) {
            var htmlStr = "";
            recommend.forEach(function(obj, index){
                if(index < 4){ 
                    htmlStr += `
                        <li>
                            <a href="/douguo/html/goodsDetail.html?goodsId=${obj.id}" target="_self">
                                <img src="/douguo/images/mall/goods-${obj.id}/${obj.img}" alt="图片加载失败...">
                            </a>
                            <p class="describe"><a href="/douguo/html/goodsDetail.html?booksId=${obj.id}" target="_self" title="${obj.describe}">${obj.describe}</a></p>
                            <p class="price">
                                <span class="curPrice">${obj.curPrice}</span>
                                ${(function(){
                                    if(obj.oldPrice){
                                        return `<span class="oldPrice">${obj.oldPrice}</span>`;
                                    }else{
                                        return "";
                                    }
                                })()}
                            </p>
                            <p class="others clearFix">
                                <span class="sales fl">${obj.sales}</span>
                                ${(function(){
                                    if(obj.sendPrice){
                                        return `<span class="sendPrice fr">${obj.sendPrice}</span>`;
                                    }else{
                                        return `<span class="sendPrice fr">${obj.freight}</span>`;
                                    }
                                })()}
                                
                            </p>
                        </li>`;
                }   
            });
            goodsList.innerHTML = htmlStr;
        }
    })   
}

//加载时令食材数据
function loadingSeasonableFoodData(){
    var foodsList = getEl('.foods-list');
    $.ajax({
        url:"/douguo/json/seasonableFood.json",
        success: function(foods) {
            var htmlStr = "";
            foods.forEach(function(obj, index){
                htmlStr += `
                    <li>
                        <a href="javascript:;">
                            <img src="/douguo/images/index/seasonableFood/${obj.img}" alt="图片加载失败...">
                            ${obj.title}
                        </a>
                    </li>`;   
            });
            foodsList.innerHTML = htmlStr;
        }
    })
}

//加载写食派数据
function loadingWriteFoodsData(){
    var writeFoodsList = getEl('.writeFoods-list');
    $.ajax({
        url:"/douguo/json/writeFoods.json",
        success:function(list){
            var htmlStr="";
            list.forEach(function(obj,index){
                if(index<=5){
                    htmlStr+=`
                    <li>
                        <a href="javascript:;"><img src="/douguo/images/diet/${obj.img}" alt="图片加载失败..."></a>
                        <p class="title"><a href="javascript:;">${obj.title}</a></p>
                        <p class="des">
                            <a href="javascript:;" class="author">${obj.cook}</a>
                            <span>在</span>
                            <a href="javascript:;" class="place">${obj.place}</a>
                        </p>
                        <p class="like">${obj.like}喜欢</p>
                    </li>`;
                }
            });
            writeFoodsList.innerHTML = htmlStr;
        }
    })
}

//加载笔记部分数据
function loadingNoteData(){
    var noteList = getEl('.note-list');
    $.ajax({
        url:"/douguo/json/note.json",
        success:function(list){
            var htmlStr="";
            list.forEach(function(obj){
                htmlStr+=`
                <li class="clearFix">
                    <img class="fl" src="/douguo/images/index/note/${obj.img}" alt="图片加载失败...">
                    <section class="write fl">
                        <h2 class="describe"><a href="#">${obj.describe}</a></h2>
                        <p class="number">对照菜谱做出来的作品<a href="#">${obj.number}</a>个</p>
                    </section>
                    <section class="exhibition fr">
                        <img src="/douguo/images/index/note/${obj.exhibition[0]}" alt="图片加载失败...">
                        <img src="/douguo/images/index/note/${obj.exhibition[1]}" alt="图片加载失败...">
                        <img src="/douguo/images/index/note/${obj.exhibition[2]}" alt="图片加载失败...">
                    </section>
                </li>`;
            });
            noteList.innerHTML = htmlStr;
        }
    })

}


//加载豆果达人数据
function loadingSupermanData(){
    var supermanList = getEl('.superman-list');
    $.ajax({
        url:"/douguo/json/superman.json",
        success:function(menus){
            var htmlStr="";
            menus.forEach(function(obj){
                htmlStr+=`
                <li class="clearFix">
                    <a class="fl" href="javascript:;"><img src="/douguo/images/index/superman/${obj.img}" alt="图片加载失败"></a>
                    <div class="write fl">
                        <a href="javascript:;" class="title">${obj.title}</a><span class="icon"></span>
                        <p class="grade">${obj.grade}</p>
                        <p class="fans">${obj.fans}粉丝</p>
                    </div>
                    <button class="follow fr" type="button">+关注</button>
                </li>`;
            });
            supermanList.innerHTML = htmlStr;
        }
    })
}

//分页
function GET(url,success){
    // 创建请求对象
    var xhr = new XMLHttpRequest();
    // 配置请求对象
    xhr.open("GET",url,true);
    //  发送请求
    xhr.send(null);
    //  监听请求
    xhr.onload = function(){
        //判断数据是否请求成功
        if(xhr.status == 200){
            success(JSON.parse(xhr.response));           
        }else{

        }
    }
}

function loadingArticles(parentNode,datas,curIndex,curSpan){
    var starIndex = (curIndex - 1) * 5;
    var endIndex  = starIndex + 4;
    if(curIndex == Math.ceil(datas.length / 5)){
        endIndex = datas.length -1;
    }
    //拼接
    var htmlStr = "";
    for(var i = starIndex; i <= endIndex; i++){
        htmlStr += `
            <li class="clearFix">
                <div class="img-box fl"><img src="/douguo/images/article/${datas[i].img}" alt="图片加载失败..."></div>
                <div class="des fl">
                    <a class="title">${datas[i].title}</a>
                    <p class="author-time">
                        <a href="javascript:;" class="author">${datas[i].author}</a>
                        <span class="time">${datas[i].time}</span>
                    </p>
                    <p class="others">
                        <span class="from fl">来自：<a href="javascript:;">${datas[i].from}</a>主题站</span>
                        <span class="readed fr">${datas[i].readed}</span>
                    </p>
                </div>
            </li>`;
    }
    curSpan.textContent = curIndex;
    parentNode.innerHTML = htmlStr;
}



