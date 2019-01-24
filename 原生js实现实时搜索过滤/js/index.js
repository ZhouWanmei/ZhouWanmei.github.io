(function() {  
    // 定义数据
    let countries = ["China中国","Japan日本","Viet Nam越南","Laos老挝","Cambodia柬埔寨","Myanmar缅甸","Thailand泰国","Malaysia马来西亚","Brunei文莱","Indonesia印度尼西亚","Philippines菲律宾","Turkey土耳其","RUSSIA俄罗斯","GERMANY德国","UNITED KINGDOM英国","FRANCE法国","ITALY意大利","PORTUGAL葡萄牙"];
    loading(countries);
    // 获取输入框
    let ipt = document.querySelector(".my-form input");
    ipt.oninput = function() {
        let val = this.value;
        if(val == "") {
            countries = ["China中国","Japan日本","Viet Nam越南","Laos老挝","Cambodia柬埔寨","Myanmar缅甸","Thailand泰国","Malaysia马来西亚","Brunei文莱","Indonesia印度尼西亚","Philippines菲律宾","Turkey土耳其","RUSSIA俄罗斯","GERMANY德国","UNITED KINGDOM英国","FRANCE法国","ITALY意大利","PORTUGAL葡萄牙"];
        }else {
            countries = countries.filter(function(country) {
                var reg = new RegExp(val, "i");
                return reg.test(JSON.stringify(country));
            });
        }
        loading(countries);
    }

    function loading(datas) {
        // 获取容器
         let resultWrapper = document.querySelector(".result-list");
        // 定义变量存储拼接的子元素标签
        let resultStr = "";
        // 遍历数据
        datas.forEach(country => {
            // 拼接子节点li
            resultStr += `<li>${country}</li>`;
        });
        // 将子节点添加至容器中
        resultWrapper.innerHTML = resultStr;
    }
})();