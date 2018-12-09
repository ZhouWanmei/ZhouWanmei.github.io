(function(){
    
    //更新用户登录状态
    userState();

    //注销用户
    var loginBox    = getEl('.login-box'),
        loginedBox  = getEl('.logined-box'),
        signOut     = getEl('.signOut');
    signOut.onclick = function(){
        new LHYAlertView({
            type: "alert",
            message: "你确定要退出吗？"
        });
        //更新用户登录状态
        loginBox.style.display="block";
        loginedBox.style.display="none";
        
        //修改state
        sessionStorage.setItem("state", "false");
    }


    //模糊搜索
    search();

    //回到顶部
    goToTop();

    //菜单切换
    menuSwitch();

    //图片轮播
    scroll();

    //每日编辑推荐
    loadingEverydayRecommendData();
    
    //商城精选 
    loadingShoppingMallData();

    
     //时令食材
     loadingSeasonableFoodData();
    
    // 广告
    advertisement();

    // 写食派
    loadingWriteFoodsData();

    // 笔记
    loadingNoteData();

    // 豆果达人
    loadingSupermanData()
   
})();