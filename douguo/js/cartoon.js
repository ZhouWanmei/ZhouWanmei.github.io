(function(){

    //更新用户登录状态
    userState();
    //菜单切换
    menuSwitch();

    //模糊搜索
    search();

    var cartoonsList = getEl('.cartoons-list');
    $.ajax({
        url:"../json/cartoon.json",
        success: function(recommend) {
            var htmlStr = "";
            recommend.forEach(function(obj, index){
                htmlStr += `
                    <li>
                        <a href="javascript:;">
                            <div class="img-box">
                                <img src="../images/cartoon/${obj.img}" alt="图片加载失败...">
                            </div>
                            <p class="title">${obj.title}</p>
                            <div class="leftTop item"></div>
                            <div class="rightTop item"></div>
                            <div class="rightBottom item"></div>
                            <div class="leftBottom item"></div>
                        </a>
                    </li>`;   
            });
            cartoonsList.innerHTML = htmlStr;
        }
    })
})();