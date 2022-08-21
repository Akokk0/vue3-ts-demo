export interface RoleInt {
    role: number
    roleName: string
}

export interface UserListInt {
    id: number
    nickName: string
    role: RoleInt[]
    userName: string
}

export interface RoleListInt {
    authority: number[]
    roleId: number
    roleName: string
}

export interface SelectDataInt {
    role: number
    nickName: string
}

export interface DialogFormInt {
    id: number
    nickName: string
    role: number[]
    userName: string
}
