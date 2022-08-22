export interface RoleInt {
    authority: number[]
    roleId: number
    roleName: string
}

export interface RoleListInt {
    name: string
    roleId: number
    roleList?: RoleListInt[]
    viewRole?: string
}
