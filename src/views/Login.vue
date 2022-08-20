<template>
  <div class="login-box">
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="80px"
        class="demo-ruleForm"
    >
      <h2>后台管理系统</h2>
      <el-form-item label="账号：" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)" class="login-btn"
        >登录</el-button
        >
        <el-button @click="resetForm(ruleFormRef)" class="login-btn">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
  import {reactive, ref} from "vue";
  import {LoginDataInt} from "@/type/login";
  import type {FormInstance, FormRules} from "element-plus";
  import {login} from "@/request/api";
  import {useRouter} from "vue-router";

  const $router = useRouter()
  const ruleFormRef = ref<FormInstance>()
  const ruleForm = reactive<LoginDataInt>({
    username: '',
    password: ''
  })

  const rules:FormRules = {
    username: [
      { required: true, message: '请输入你的账号', trigger: 'blur' },
      { min: 3, max: 10, message: '账号的长度在3到10之间', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入你的密码', trigger: 'blur' },
      { min: 3, max: 10, message: '密码的长度在3到10之间', trigger: 'blur' },
    ]
  }

  // 表单数据提交
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        const {data: res} = await login(ruleForm)
        localStorage.setItem('token', res.token)
        $router.push('/')
      } else {
        console.log('error submit!', fields)
      }
    })
  }

  // 表单数据重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }

</script>

<style lang="scss" scoped>
.login-box {
  width: 100%;
  height: 100%;
  background: url('../assets/bg.JPG');
  padding: 1px;
  text-align: center;
  .demo-ruleForm {
    width: 500px;
    margin: 200px auto;
    background-color: #fff;
    padding: 40px;
    border-radius: 20px;
  }
  .login-btn {
    width: 48%;
  }
  h2 {
    margin-bottom: 10px;
  }
}
</style>
