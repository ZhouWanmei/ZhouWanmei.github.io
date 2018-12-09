(function(){
    //更新用户登录状态
    userState();

    //模糊搜索
    search();

    //修改网页标题
    var keywords = JSON.parse(localStorage.keyWord);
    document.title = keywords;

    //获取DOM元素
    var searchIpt = getEl('.search-input');
        
    // 返回搜索结果
    searchResult(keywords);

    searchIpt.oninput = function(){
        var _keywords = this.value;
        //修改网页标题
        document.title = _keywords;
        // 返回搜索结果
        searchResult(_keywords);
    }   
})();