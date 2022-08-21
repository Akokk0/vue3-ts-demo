import request from "@/request/index";
import { LoginDataInt } from "@/type/login";

// 登录接口
export function login(data: LoginDataInt) {
    return request({
        url: '/login',
        method: 'POST',
        data
    })
}

// 商品列表接口
export function getGoodsList() {
    return request({
        url: 'getGoodsList',
        method: 'GET'
    })
}

// 用户列表接口
export function getUserList() {
    return request({
        url: '/getUserList',
        method: 'GET'
    })
}

// 用户角色接口
export function getRoleList() {
    return request({
        url: '/getRoleList',
        method: 'GET'
    })
}
