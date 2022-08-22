<template>
  <div>
    <el-tree
        ref="treeRef"
        check-strictly
        :data="authorityList"
        show-checkbox
        node-key="roleId"
        :default-checked-keys="userAuthorityList.authority"
        :props="{
    children: 'roleList',
    label: 'name',
  }"
    />
    <el-button @click="updateAuth">确认修改</el-button>
  </div>
</template>

<script lang="ts" setup>
  import {getAuthorityList} from "@/request/api";
  import {useRoute} from "vue-router";
  import {RoleInt, RoleListInt} from "@/type/authority";
  import {reactive, ref} from "vue";

  const route = useRoute()
  const param: any = route.params
  const userAuthorityList = reactive<RoleInt>({
    authority: param.authority,
    roleId: param.roleId,
    roleName: param.roleName
  })
  const authorityList = ref<RoleListInt[]>([])
  const treeRef = ref(null)

  console.log(treeRef)

  // 函数
  const initAuthorityList = async () => {
    const {data: res} = await getAuthorityList()
    authorityList.value = res
  }

  const updateAuth = () => {
    userAuthorityList.authority = (treeRef.value as any).getCheckedKeys().sort((a: number, b: number) => a - b)
  }

  // 生命周期 beforeCreate Created
  initAuthorityList()

  /*class InitData{
    roleId: number
    roleName: string
    authority: number[]
    constructor(roleId: number, roleName: string, authority: number[]) {
      this.roleId = roleId
      this.roleName = roleName
      this.authority = authority
    }
  }*/

</script>

<style scoped>

</style>
