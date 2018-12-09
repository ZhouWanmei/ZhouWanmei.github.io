(function(){
    //更新用户登录状态
    userState();

     //回到顶部
     goToTop();

    //菜单切换
    menuSwitch();

    //模糊搜索
    search();

    var goodsList = getEl('.goods-list');
    $.ajax({
        url:"/douguo/json/shoppingMall.json",
        success: function(recommend) {
            var htmlStr = "";
            recommend.forEach(function(obj, index){
                htmlStr += `
                    <li>
                        <a href="../html/goodsDetail.html?goodsId=${obj.id}" target="blank">
                            <img src="../images/mall/goods-${obj.id}/${obj.img}" alt="图片加载失败...">
                        </a>
                        <p class="describe"><a href="../html/goodsDetail.html?goodsId=${obj.id}" target="blank" title="${obj.describe}">${obj.describe}</a></p>
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
            });
            goodsList.innerHTML = htmlStr;
        }
    })
})();