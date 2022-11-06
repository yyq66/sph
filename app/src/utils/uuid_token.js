import {v4 as uuidv4} from "uuid"
// 生成一个随机字符串，且每次执行不能发生变化，游客身份持久存储
export const getUUID = () => {
    // 先从本地存储中获取uuid
    let uuid_token =  localStorage.getItem("UUIDTOKEN")
    // 如果本地存储中没有，则通过uuid生成，并本地存储
    if(!uuid_token){
        uuid_token = uuidv4();
        localStorage.setItem("UUIDTOKEN",uuid_token)
    }
    return uuid_token;
}