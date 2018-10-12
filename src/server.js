// 封装js文件，用来解决代理跨域问题
import axios from 'axios';
import qs from 'qs'
let http = {
    post:"",
    get:""
};
http.post = function (api,data){
    // let params = qs.stringify(data)
    let params = data;
    return new Promise((resolve,reject)=>{
        axios.post(api,params).then((res)=>{
            resolve(res)
        })
    })
};
http.get = function (api,data){
    let params = qs.stringify(data)
    return new Promise((resolve,reject)=>{
        axios.get(api,params).then((res)=>{
            resolve(res)
        })
    })
};
export default http;
