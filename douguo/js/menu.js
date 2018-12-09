(function(){

    //更新用户登录状态
    userState();

     //回到顶部
     goToTop();

    //菜单切换
    menuSwitch();

    //模糊搜索
    search();


    var menuList = getEl('.menu-list');
    $.ajax({
        url:"/douguo/json/menu.json",
        success:function(menus){
            var htmlStr = "";
            menus.forEach(function(obj){
                htmlStr += ` 
                <li>
                    <a href="/douguo/html/menuDetails.html?menusId=${obj.id}" target="_self"><img class="foodImg" src="/douguo/images/menu/foods/food-${obj.id}/${obj.img}" alt="图片加载失败..."></a>
                    <a class="title"  href="/douguo/html/menuDetails.html?menusId=${obj.id}" target="_self">${obj.title}</a>
                    <a class="authorInfo" href="#">
                        <img class="HeadPortrait" src="/douguo/images/menu/authors/${obj.authorHeadPortrait}" alt="图片加载失败...">
                        ${obj.authorName}
                    </a>
                    <a class="levelIcon" href="#"></a>
                    <p class="des">
                        <span class="browsingVolume">${obj.browsingVolume}浏览 · </span>
                        <span class="collection">${obj.collection}收藏 · </span>
                        <span class="alreadyLearned">${obj.alreadyLearned}已学做</span>
                    </p>
                </li>`;
            });
            menuList.innerHTML = htmlStr;
        }
    })
})();