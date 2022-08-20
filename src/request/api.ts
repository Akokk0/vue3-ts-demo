import request from "@/request/index";
import { LoginDataInt } from "@/type/login";

export function login(data: LoginDataInt) {
    return request({
        url: '/login',
        method: 'post',
        data
    })
}
