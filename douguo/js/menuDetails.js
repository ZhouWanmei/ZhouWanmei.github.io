(function(){
    //接收URL中的参数menusId
    var id = getUrlParam('menusId');
    console.log('id:'+id);

    var menuDetail = getEl('.menuDetail');
    $.ajax({
        url:"../json/menu.json",
        success:function(menus,index){
            var htmlStr = "";
            menus.forEach(function(menu,index){
                if(id == menu.id ){
                    //修改网页标题
                    document.title = `${menu.title}`;
                    htmlStr = `
                    <section class="foodInfos clearFix">
                    <img class="fl" src="../images/menu/foods/food-${menu.id}/${menu.img}" alt="图片加载失败...">
                    <section class="infos fr">
                        <h1 class="title">${menu.title}</h1>
                        <p class="others">
                            <span class="browsingVolume"><strong>${menu.browsingVolume}</strong>浏览</span>
                            <span class="collection"><strong>${menu.collection}</strong>收藏</span>
                        </p>
                        <section class="authorInfos">
                            <a href="javascript:;" class="author">
                                <img src="../images/menu/authors/${menu.authorHeadPortrait}" alt="">
                                ${menu.authorName}
                            </a>
                            <p class="des">${menu.des}</p>
                        </section>
                    </section>
                </section>
                <section class="making clearFix">
                    <section class="step fl">
                            <h2 class="s-title">制作步骤:</h2>
                            <ul class="steps">
                                ${(function(){
                                    var stepStr = ``;
                                    menu.steps.forEach(function(step,index){
                                            stepStr += `<li class="clearFix"><img src="../images/menu/foods/food-${menu.id}/${menu.steps[index].stepImg}" alt="图片加载失败..."><span><strong>${index+1}.</strong> ${menu.steps[index].stepDes}</span></li>`;
                                
                                    });
                                    return stepStr;
                                })()}
                                </ul>
                    </section>
                    <section class="material  fr">
                            <h2 class="m-title">原材料</h2>
                            <ul class="materials">
                            ${(function(){
                                var materialStr = ``;
                                menu.materials.forEach(function(material,index){
                                    materialStr += `<li class="clearFix"><span class="m-name fl">${menu.materials[index].materialName}</span><span class="m-quantity fr">${menu.materials[index].materialQuantity}</span></li>`;
                            
                                });
                                return materialStr;
                            })()}
                                 </ul>
                    </section>
                    
                </section>
                    `;
                } 

            });
            menuDetail.innerHTML = htmlStr;          
        }
    })
    
})();