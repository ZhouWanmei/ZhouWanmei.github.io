/**
 * 说明：axios二次封装
 * 1、基本原理是通过 axios 提供的请求拦截和响应拦截的接口，控制 loading 的显示或者隐藏。同时在请求失败时还会自动弹出消息提示框显示错误信息。
 * 2、loding 效果这里采用的是 Element UI 中提供的 Loading 组件来实现。而错误消息提示框则用的是 Element UI 中的 Notification 组件来实现。
 * 3、内部有个计数器，确保同一时刻如果有多个请求的话，不会同时出现多个 loading，而是只有 1 个。并且在所有请求结束后才会隐藏 loading。
 * 4、使用了 lodash 的 debounce 防抖。因为有时会碰到在一次请求完毕后又立刻又发起一个新的请求的情况（比如删除一个表格条目后立刻进行刷新）。这种情况会造成连续 loading 两次，并且中间有一次极短的闪烁。通过防抖可以让 300ms 间隔内的 loading 便合并为一次，避免闪烁的情况。
 * 5、默认所有请求都会自动有 loading 效果。如果某个请求不需要 loading 效果，可以在请求 header 中 showLoading 设置为 false。
 * 6、默认的 loading 效果时全屏的（覆盖在 body 上）。如果某个请求是需要在某个指定元素上显示 loading 效果，可以将请求 header 中 loadingTarget 设置为该元素的选择符。
 */

import axios from 'axios';
import { Notification,Loading  } from 'element-ui';
import _ from 'lodash';

// axios.defaults.timeout = 5000;
axios.defaults.baseURL ='http://47.92.116.17:46000';

//loading对象
let loading;

//当前正在请求的数量
let needLoadingRequestCount = 0;

//显示loading
function showLoading(target) {
    // 后面这个判断很重要，因为关闭时加了抖动，此时loading对象可能还存在，
    // 但needLoadingRequestCount已经变成0.避免这种情况下会重新创建个loading
    if (needLoadingRequestCount === 0 && !loading) {
        loading = Loading.service({
        lock: true,
        text: "Loading...",
        background: 'rgba(255, 255, 255, 0.5)',
        target: target || "body"
        });
    }
    needLoadingRequestCount++;
}

//隐藏loading
function hideLoading() {
    needLoadingRequestCount--;
    needLoadingRequestCount = Math.max(needLoadingRequestCount, 0); //做个保护
    if (needLoadingRequestCount === 0) {
        //关闭loading
        toHideLoading();
    }
}
    
//防抖：将 300ms 间隔内的关闭 loading 便合并为一次。防止连续请求时， loading闪烁的问题。
var toHideLoading = _.debounce(()=>{
    loading.close();
    loading = null;
}, 300);

//http request 拦截器
axios.interceptors.request.use(
config => {
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    config.data = JSON.stringify(config.data);
    config.headers = {
    'Content-Type':'application/json; charset=UTF-8'
    }
    // if(token){
    //   config.params = {'token':token}
    // }

    //判断当前请求是否设置了不显示Loading
    if(config.headers.showLoading !== false){
        showLoading(config.headers.loadingTarget);
    }
    
    return config;
},
error => {
    //判断当前请求是否设置了不显示Loading
    if(config.headers.showLoading !== false){
        hideLoading();
    }
    Notification.error({
        title: '错误',
        message: '请求超时!'
    }); 
    return Promise.reject(err);
}
);


//http response 拦截器
axios.interceptors.response.use(
response => {
    if(response.data.errCode ==2){
    router.push({
        path:"/login",
        querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
    })
    }
    //判断当前请求是否设置了不显示Loading（不显示自然无需隐藏）
    if(response.config.headers.showLoading !== false){
        hideLoading();
    }
    return response;
},
error => {
    //判断当前请求是否设置了不显示Loading（不显示自然无需隐藏）
    if(error.config.headers.showLoading !== false){
        hideLoading();
    }
    // if(error.response && error.response.data && error.response.data.message) {
    //     var jsonObj = JSON.parse(error.response.data.message);
    //     Notification.error({
    //         title: '错误',
    //         message: jsonObj.message
    //     });
    // }else{
    //     Notification.error({
    //         title: '错误',
    //         message: error.message
    //     });  
    // }
    if (error.response.status) {            
        switch (error.response.status) {                
            // 401: 未登录                
            // 未登录则跳转登录页面，并携带当前页面的路径                
            // 在登录成功后返回当前页面，这一步需要在登录页操作。                
            case 401:                    
                // router.replace({                        
                //     path: '/login',                        
                //     query: { redirect: router.currentRoute.fullPath } 
                // });
                break;
            // 403 token过期                
            // 登录过期对用户进行提示                
            // 清除本地token和清空vuex中token对象                
            // 跳转登录页面                
            case 403:  
                Notification.error({
                    title: '错误',
                    message: '登录过期，请重新登录'
                });                    
                // 清除token                    
                // localStorage.removeItem('token');                    
                // store.commit('loginSuccess', null);                    
                // // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                // setTimeout(() => {                        
                //     router.replace({                            
                //         path: '/login',                            
                //         query: { 
                //             redirect: router.currentRoute.fullPath 
                //         }                        
                //     });                    
                // }, 1000);                    
                break; 
            // 404请求不存在                
            case 404: 
                Notification.error({
                    title: '错误',
                    message: '网络请求不存在'
                });                    
            break;   
            // 500               
            case 500: 
                Notification.error({
                    title: '错误',
                    message: '服务器错误'
                });                    
            break;  
            // 503               
            case 503: 
                Notification.error({
                    title: '错误',
                    message: '服务器错误'
                });                    
            break;            
            // 其他错误，直接抛出错误提示                
            default:  
                Notification.error({
                    title: '错误',
                    message: error.response.data.message
                });          
        }            
        return Promise.reject(error.response);
    } 
})


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url,params={}){
return new Promise((resolve,reject) => {
        axios.get(url,{
            params:params
        })
        .then(response => {
            resolve(response.data);
            
        })
        .catch(err => {
            reject(err)
        })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url,data = {}){
return new Promise((resolve,reject) => {
    axios.post(url,data)
        .then(response => {
            resolve(response.data);
        },err => {
            reject(err)
        })
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
return new Promise((resolve,reject) => {
    axios.patch(url,data)
        .then(response => {
            resolve(response.data);
        },err => {
            reject(err)
        })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
return new Promise((resolve,reject) => {
    axios.put(url,data)
        .then(response => {
            resolve(response.data);
        },err => {
            reject(err)
        })
    })
}