(function(){

    //更新用户登录状态
    userState();
    //菜单切换
    menuSwitch();
    //回到顶部
    goToTop(); 

    //模糊搜索
    search();

    //加载数据 
    var dietList = getEl('.diet-list');
    $.ajax({
        url:"../json/writeFoods.json",
        success:function(list){
            var htmlStr="";
            list.forEach(function(obj,index){
                htmlStr+=`
                <li>
                <a href="javascript:;"><img class="food" src="../images/diet/${obj.img}" alt="图片加载失败..."></a>
                <div class="mask">
                    <p class="foodTitle">${obj.title}</p>
                    <span class="cookPlace"><i></i>${obj.place}</span>
                    <span class="like"><i></i>${obj.like}</span>
                    <span class="cook">by ${obj.cook}</span>
                </div>
            </li>`;
            });
            dietList.innerHTML = htmlStr;
        }
    })

    //推荐餐厅数据加载
    var restaurantList = getEl('.restaurant-list');
    $.ajax({
        url:"../json/recommendRestaurant.json",
        success:function(lists){
            var htmlStr="";
            lists.forEach(function(obj,index){
                htmlStr+=`
                <li>
                <a class="name" href="#">${obj.name}</a>
                <p class="recommendReasons"><span>推荐理由：</span>${obj.recommendReasons}</p>
                <p class="address"><span>地址：</span>${obj.address}</p>
                <p class="perCost"><span>人均：</span>${obj.perCost}</p>
                <ul class="specialDishes clearFix">
                    ${(function(){
                        var specialDishesStr = "";
                        obj.specialDishes.forEach(function(listStr,index){
                            specialDishesStr += `
                                <li>
                                    <a href="javascript:;">
                                        <img src="../images/diet/restaurant/${obj.specialDishes[index].img}">
                                        <span class="title">${obj.specialDishes[index].title}</span>
                                    </a>
                                </li>`;
                        });
                        return specialDishesStr;
                    })()}
                </ul>
            </li>`;
            });
            restaurantList.innerHTML = htmlStr;
        }
    })

    // 本周热门餐厅
    var hotRestaurantList = getEl('.hotRestaurant-list');
    $.ajax({
        url:"../json/hotRestaurant.json",
        success:function(lists){
            var htmlStr = ``;
            lists.forEach(function(list){
                htmlStr += `
                    <li>
                        <a href="javascript:;"><img src="../images/diet/hotRestaurant/${list.img}" alt="图片加载失败..."></a>
                        <div class="des clearFix">
                            <a href="#" class="name">${list.name}</a>
                            <span class="like">${list.like}</span>
                        </div>
                    </li>`;
            });
            hotRestaurantList.innerHTML = htmlStr;
        }
    })


})();