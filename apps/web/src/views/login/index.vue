<script setup>
import request from '@/utils/request'

const loginRef = ref(null)

const loginForm = reactive({
  username: '',
  password: '',
  uuid: '',
  code: '',
})

const loginRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  // code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
}

const title = import.meta.env.VITE_APP_TITLE

const enabledCaptcha = ref(true)

const captcha = ref('')

const rememberMe = ref(false)

const loading = ref(false)

const enabledRegister = ref(false)

const router = useRouter()

const route = useRoute()

const getRememberData = () => {
  const rememberData = JSON.parse(localStorage.getItem('remember_data'))
  if (rememberData) {
    loginForm.username = rememberData.username
    loginForm.password = rememberData.password
    rememberMe.value = true
  }
}

const getCaptcha = async () => {
  if (enabledCaptcha.value) {
    const data = await request.get('/captcha')
    loginForm.uuid = data.uuid
    captcha.value = data.captcha
  }
}

const handleLogin = () => {
  loginRef.value.validate((valid) => {
    if (valid) {
      if (rememberMe.value) {
        const rememberData = {
          username: loginForm.username,
          password: loginForm.password,
        }
        localStorage.setItem('remember_data', JSON.stringify(rememberData))
      } else {
        localStorage.removeItem('remember_data')
      }
      loading.value = true
      request
        .post('/login', { ...loginForm })
        .then((data) => {
          localStorage.setItem('token', data)
          router.replace(route.query.redirect || '/home')
        })
        .catch(() => {
          loading.value = false
          getCaptcha()
        })
    }
  })
}

onMounted(() => {
  getRememberData()
  getCaptcha()
})
</script>

<template>
  <!-- https://gitee.com/wyanhui02/html_css_demo/blob/master/html/57.html -->
  <div class="login-page">
    <el-form ref="loginRef" :model="loginForm" :rules="loginRules" @keyup.enter="handleLogin">
      <div class="login-page__title">{{ title }}</div>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="用户名">
          <template #prefix>
            <el-icon>
              <i-ant-design-user-outlined />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" placeholder="密码" show-password>
          <template #prefix>
            <el-icon>
              <i-ant-design-lock-outlined />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="enabledCaptcha" prop="code">
        <el-input class="w-[150px]!" v-model="loginForm.code" placeholder="验证码">
          <template #prefix>
            <el-icon>
              <i-ant-design-safety-outlined />
            </el-icon>
          </template>
        </el-input>
        <div
          class="ml-2 flex h-8 w-[122px] items-center justify-center rounded-(--el-border-radius-base) shadow-[0_0_0_1px_var(--el-border-color)_inset]"
        >
          <img
            class="cursor-pointer rounded-(--el-border-radius-base)"
            :src="captcha"
            @click="getCaptcha"
          />
        </div>
      </el-form-item>
      <el-form-item class="w-70">
        <el-checkbox class="h-5!" v-model="rememberMe">记住我</el-checkbox>
      </el-form-item>
      <el-form-item class="w-70">
        <el-button :loading="loading" @click="handleLogin">
          <template #loading>
            <el-icon class="is-loading">
              <i-ant-design-loading-outlined />
            </el-icon>
          </template>
          登录
        </el-button>
        <div v-if="enabledRegister" class="mt-[18px] w-70 text-right leading-5">
          <router-link to="/register">注册</router-link>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.login-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(200deg, #e3c5eb, #a9c1ed);
  overflow: hidden;

  .el-form {
    background-color: #fff;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 350px;
    height: 500px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  }

  .login-page__title {
    font-size: 26px;
    margin: 65px auto 70px auto;
  }

  .el-input {
    width: 280px;
  }

  .el-button {
    width: 280px;
    height: 36px;
    border-style: none;
    background-image: linear-gradient(-200deg, #fac0e7, #aac2ee);
    color: #fff;
    font-weight: 700;
    border-radius: 10px;
    transition: background-position 0.5s;

    &:hover {
      background-image: linear-gradient(-200deg, #aac2ee, #fac0e7);
      background-position-x: -280px;
    }
  }

  a {
    color: plum;
  }
}
</style>
