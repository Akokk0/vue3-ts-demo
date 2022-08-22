<template>
  <div>
    <div class="select-box">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button type="primary" @click="addRole">添加角色</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="roleList" border style="width: 100%">
      <el-table-column prop="roleId" label="ID" width="180" />
      <el-table-column prop="roleName" label="角色名" width="180" />
      <el-table-column prop="authority" label="操作" width="180">
        <template #default="scope">
          <el-button
              type="primary"
              size="small"
              @click="changeRole(scope.row)"
          >
            修改权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
  import {getRoleList} from "@/request/api";
  import {ref} from "vue";
  import {useRouter} from "vue-router";
  import {RoleListInt} from "@/type/role";
  import {ElMessage, ElMessageBox} from 'element-plus'
  import 'element-plus/es/components/message-box/style/css'
  import 'element-plus/es/components/message/style/css'

  const $router = useRouter()
  const roleList = ref<RoleListInt[]>([])

  const initRoleList = async () => {
    const {data: res} = await getRoleList()
    roleList.value = res
  }

  // 函数
  const addRole = () => {
    ElMessageBox.prompt('请输入角色名', '添加', {
      confirmButtonText: '添加',
      cancelButtonText: '取消',
    })
        .then(({ value }) => {
          if (value) {
            roleList.value.push({
              authority: [], roleId: roleList.value.length + 1, roleName: value
            })
          }
          ElMessage({
            type: 'success',
            message: `成功添加角色:${value}`,
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '操作取消',
          })
        })
  }

  /*const changeRole = (row: RoleListInt) => {
    $router.push({
      path: '/role/auth',
      query: {
        id: row.roleId,
        roleName: row.roleName,
        authority: row.authority.join(',')
      }
    })
  }*/

  const changeRole = (row: RoleListInt) => {
    $router.push({
      name: 'auth',
      params: {
        roleId: row.roleId,
        roleName: row.roleName,
        authority: row.authority
      }
    })
  }

  // 生命周期beforeCreate Created
  initRoleList()

</script>

<style scoped>

</style>
