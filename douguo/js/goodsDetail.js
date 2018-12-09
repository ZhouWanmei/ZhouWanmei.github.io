(function(){
    //更新用户登录状态
    userState();

    //模糊搜索
    search();
 
    //接收URL中的参数goodsId
    var id = getUrlParam('goodsId');
    console.log('id:'+id);

    var lists = getEl('.list');
    $.ajax({
        url: "/douguo/json/shoppingMall.json",
        success:function(goodss){
            var htmlStr = ``;
            goodss.forEach(function(goods,index){
                
            if(id == goods.id){
                //修改网页标题
                document.title = `${goods.describe}`;
                
                htmlStr = `
                <section class="location">
                    <a href="/douguo/html/mall.html">商城</a>
                    <span class="goodsTitle">>${goods.describe}</span>
                </section>
                <section class="tab-wrapper clearFix">
                    <ul class="tab-menu">
                    ${(function(){
                        var menuStr = ``;
                        goods.detail.forEach(function(img,index){
                            if(index === 0){
                                menuStr += `<li class="selected"><img src="/douguo/images/mall/goods-${goods.id}/${goods.detail[index]}" alt=""></li>`;
                            }else{
                                menuStr += `<li><img src="/douguo/images/mall/goods-${goods.id}/${goods.detail[index]}" alt=""></li>`;  
                            }
                        });
                        return menuStr;
                    })()}
                        
                    </ul>
                    <section class="tab-content">
                        <div class="mirror"></div>
                    ${(function(){
                        var menuStr = ``;
                        goods.detailEnlarge.forEach(function(smallImg,index){
                            if(index === 0){
                                menuStr += `<img class="small-img show" src="/douguo/images/mall/goods-${goods.id}/${goods.detailEnlarge[index]}" alt="图片加载失败...">`;
                            }else{
                                menuStr += `<img class="small-img" src="/douguo/images/mall/goods-${goods.id}/${goods.detailEnlarge[index]}" alt="图片加载失败...">`;  
                            }
                        });
                        return menuStr;
                    })()}
                    </section>
                    <div class="big-box">
                    ${(function(){
                        var imgStr = "";
                        goods.detailEnlarge.forEach(function(bigImg,index){
                            
                            if(index === 0){
                                imgStr += `<img class="big-img show" src="/douguo/images/mall/goods-${goods.id}/${goods.detailEnlarge[index]}" alt="">`;
                            }else{
                                imgStr += `<img class="big-img" src="/douguo/images/mall/goods-${goods.id}/${goods.detailEnlarge[index]}" alt="">`;
                            }
                        });
                        return imgStr;
                    })()}
                        
                    </div>  
                </section>
                
                <section class="goodsInfos fr">
                    <h1 class="title">${goods.describe}</h1>
                    <p class="price">
                        <span class="curPrice">${goods.curPrice}</span>
                        ${(function(){
                            if(goods.oldPrice){
                                return `<span class="oldPrice">${goods.oldPrice}</span>`;
                            }else{
                                return ``;
                            }
                        })()}
                        ${(function(){
                            if(goods.sendPrice){
                                return `<span class="sendPrice">${goods.sendPrice}</span>`;
                            }else{
                                return ``;
                            }
                        })()}    
                    </p>
                    <p class="advantages">${goods.advantages}</p>
                    <p class="others">
                        <span class="freight">${goods.freight} </span>
                        <span class="sales">${goods.sales}</span>
                        <span class="address">发货地：${goods.address}</span>
                    </p>
                    <section class="purchase-number clearFix">
                        <span class="reduce">-</span>
                        <input class="number" type="text" value="1">
                        <span class="plus">+</span>
                    </section>
                    <button class="purchase" type="button">立即购买</button>
                </section>
                `;
                return htmlStr;
            }

            
            
        });
        lists.innerHTML = htmlStr;

        

        var menus      = Array.from(getEl('.tab-menu li',true)),
            bigImgs    = Array.from(getEl('.big-img',true));
            container  = getEl('.tab-wrapper'),
            smallBox   = getEl('.tab-content'),
            mirror     = getEl('.mirror'),
            smallImgs  = Array.from(getEl('.small-img',true)),
            bigBox     = getEl('.big-box');
        menus.forEach(function(menu,index){
            menu.dataset.index = index;
            menu.onmouseenter = function(){
                //获取当前下标
                var index = this.dataset.index;
                //清除上一次样式
                for(var i = 0, len = menus.length; i < len; i++){
                    if(menus[i].classList.contains('selected')){
                        menus[i].classList.remove('selected');
                        smallImgs[i].classList.remove('show');
                        bigImgs[i].classList.remove('show');
                    }
                }
                menus[index].classList.add('selected');
                smallImgs[index].classList.add('show');
                bigImgs[index].classList.add('show');
                // 更新大图尺寸
                var _width  = parseInt(getStyle(smallImgs[index], "width"))   * parseInt(getStyle(bigBox, "width"))   / parseInt(getStyle(mirror, "width"));
                var _height = parseInt(getStyle(smallBox, "height"))  * parseInt(getStyle(bigBox, "height"))  / parseInt(getStyle(mirror, "height"));
                bigImgs[index].style.width  = _width + "px";
                bigImgs[index].style.height = _height + "px";


                // 鼠标移动
                smallBox.onmousemove = function(event) {
                    // 计算放大镜的位置
                    var _left = event.clientX - container.offsetLeft - smallBox.offsetLeft - parseInt(getStyle(mirror, "width")) / 2 + window.pageXOffset;
                    var _top  = event.clientY - container.offsetTop - smallBox.offsetTop - parseInt(getStyle(mirror, "height")) / 2  + window.pageYOffset;
                    // 计算放大镜/大图可移动的最大距离
                    var _mirrorMaxH = parseInt(getStyle(smallImgs[index], "width"))  - parseInt(getStyle(mirror, "width"));
                    var _mirrorMaxV = parseInt(getStyle(smallImgs[index], "height")) - parseInt(getStyle(mirror, "height"));
                    var _bigImgMaxH = parseInt(getStyle(bigImgs[index], "width"))    - parseInt(getStyle(bigBox, "width"));
                    var _bigImgMaxV = parseInt(getStyle(bigImgs[index], "height"))   - parseInt(getStyle(bigBox, "height"));

                    // 异常处理
                    // 水平
                    if(_left < 0) {
                        _left = 0;
                    }else if(_left > _mirrorMaxH) {
                        _left = _mirrorMaxH;
                    }
                    // 垂直
                    if(_top < 0) {
                        _top = 0;
                    }else if(_top > _mirrorMaxV) {
                        _top = _mirrorMaxV;
                    }
                    // 更新放大镜的位置
                    mirror.style.top  = _top  + "px";
                    mirror.style.left = _left + "px";
                    // 计算大图移动的距离
                    
                    // 大图移动的距离 = 放大镜移动的距离 * 大图的最大移动距离 / 放大镜的最大移动距离
                    bigImgs[index].style.top  = -_top  * _bigImgMaxH / _mirrorMaxH + "px";
                    bigImgs[index].style.left = -_left * _bigImgMaxV / _mirrorMaxV + "px";

                }
            }           
        });
        
        
    
    
    



        }
    })

})();