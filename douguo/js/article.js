(function(){

    //更新用户登录状态
    userState();
    //菜单切换
    menuSwitch();
    //回到顶部
    goToTop(); 

    //模糊搜索
    search();
    
     //获取DOM
     var articlesList = getEl('.articles-list');
     var prev         = getEl('.prev');
     var cur          = getEl('.cur');
     var total        = getEl('.total');
     var next         = getEl('.next');
     var curIndex     = 1;
     var allPage      = 0;
     var datas        = null;
 
     //数据请求
     GET("../json/article.json",function(response){
         //加载数据
         datas = response;
         loadingArticles(articlesList,datas,1,cur);
         allPage = Math.ceil(datas.length / 5);
         total.textContent = allPage;    
     });
 
     prev.onclick = function(){
         if(curIndex == 1){ return;}
         curIndex--;
         loadingArticles(articlesList,datas,curIndex,cur);
     }
     next.onclick = function(){
         if(curIndex == allPage){ return;}
         curIndex++;
         loadingArticles(articlesList,datas,curIndex,cur);
     }



    //  广告
    advertisement();
})();