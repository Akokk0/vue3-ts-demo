<template>
  <div>
    <div class="select-box">
      <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="selectData.nickName" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="selectData.role" class="m-2" placeholder="请选择" size="large">
            <el-option label="全部" :value="0"/>
            <el-option
                v-for="item in roleList"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="userList" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="nickName" label="昵称" width="180" />
      <el-table-column fixed="right" label="角色" width="180">
        <template #default="scope">
          <el-button
              link
              v-for="item in scope.row.role"
              size="small"
              :key="item.role"
          >
            {{ item.roleName }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template #default="scope">
          <el-button
              type="primary"
              size="small"
              @click.prevent="changeUser(scope.row)"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog v-model="dialogFormVisible" title="编辑信息">
    <el-form :model="dialogForm">
      <el-form-item label="姓名" label-width="50px">
        <el-input v-model="dialogForm.nickName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色" label-width="50px">
        <el-select multiple v-model="dialogForm.role" placeholder="请选择角色">
          <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updateUser"
        >更改</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {getUserList, getRoleList, login} from "@/request/api";
  import {RoleListInt, UserListInt, SelectDataInt, DialogFormInt, RoleInt} from "@/type/user";
  import {reactive, ref, watch} from "vue";

  // 数据
  const dialogFormVisible = ref(false)
  const dialogForm = reactive<DialogFormInt>({
    id: 0, nickName: "", role: [], userName: ""
  })

  const selectData = reactive<SelectDataInt>({
    role: 0,
    nickName: ''
  })

  const userList = ref<UserListInt[]>([])
  const roleList = ref<RoleListInt[]>([])
  let originList: UserListInt[] = []

  // 使用原始数据不用再发生请求请求数据
  watch([() => selectData.nickName, () => selectData.role], () => {
    if (!selectData.nickName && !selectData.role) {
      userList.value = originList
    }
  })

  // 函数
  const initUserList = async () => {
    const {data: res} = await getUserList()
    originList = res
    // 将原始数据赋值给响应式数据
    userList.value = originList
  }

  const initRoleList = async () => {
    const {data: res} = await getRoleList()
    roleList.value = res
  }

  const onSubmit = () => {
    let queryList: UserListInt[] = []
    if (!selectData.role && !selectData.nickName) {
      queryList = userList.value
    } else {
      if (selectData.nickName) {
        queryList = originList.filter((value) => {
          return value.nickName.indexOf(selectData.nickName) !== -1
        })
      }
      if (selectData.role) {
        queryList = (selectData.nickName ? queryList : originList).filter((value) => {
          return value.role.find((item) => item.role === selectData.role)
        })
      }
    }
    userList.value = queryList
  }

  const changeUser = (row: UserListInt) => {

    dialogForm.id = row.id
    dialogForm.userName = row.userName
    dialogForm.nickName = row.nickName
    dialogForm.role = row.role.map((value) => value.role)

    dialogFormVisible.value = true

  }

  const updateUser = () => {
    let user: UserListInt = userList.value.find(value => value.id === dialogForm.id)!
    user.nickName = dialogForm.nickName

    let uRole: RoleInt[] = [];
    roleList.value.filter(value => dialogForm.role.indexOf(value.roleId) !== -1).forEach((value, index) => {
      uRole[index] = {
        role: 0, roleName: ""
      }
      uRole[index].role = value.roleId
      uRole[index].roleName = value.roleName
    })

    user.role = uRole
    userList.value.forEach((item, index) => {
      if (item.id === user.id) userList.value[index] = user
    })
    dialogFormVisible.value = false
  }

  // 生命周期 beforeCreated Created
  initUserList()
  initRoleList()

</script>

<style scoped>

</style>
