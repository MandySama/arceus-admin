<script setup>
import request from '@/utils/request'
import { Cookie } from '@/utils/storage'
import { encrypt, decrypt } from '@/utils/crypto'

const loginRef = ref()

const loginForm = reactive({
  username: 'admin',
  password: '123456',
  uuid: '',
  code: '',
})

const loginRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
}

const title = import.meta.env.VITE_APP_TITLE

const captchaEnabled = ref(true)

const captcha = ref('')

const rememberMe = ref(false)

const loading = ref(false)

const router = useRouter()

const route = useRoute()

const registerEnabled = ref(false)

const getCookie = () => {
  Object.assign(loginForm, {
    username: Cookie.get('username') || loginForm.username,
    password: decrypt(Cookie.get('password')) || loginForm.password,
  })
  rememberMe.value = Boolean(Cookie.get('rememberMe')) || rememberMe.value
}

const getCaptcha = () => {
  if (captchaEnabled.value) {
    request.get('/captcha').then(({ data }) => {
      loginForm.uuid = data.uuid
      captcha.value = data.captcha
    })
  }
}

const handleLogin = () => {
  loginRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      if (rememberMe.value) {
        Cookie.set('username', loginForm.username, 30)
        Cookie.set('password', encrypt(loginForm.password), 30)
        Cookie.set('rememberMe', rememberMe.value, 30)
      } else {
        Cookie.remove('username')
        Cookie.remove('password')
        Cookie.remove('rememberMe')
      }
      request
        .post('/login', { ...loginForm })
        .then(({ data }) => {
          Cookie.set('token', data)
          router.push(route.query.redirect || '/index')
        })
        .catch(() => {
          getCaptcha()
        })
        .finally(() => {
          loading.value = false
        })
    }
  })
}

onMounted(() => {
  getCookie()
  getCaptcha()
})
</script>

<template>
  <!-- https://gitee.com/wyanhui02/html_css_demo/blob/master/html/57.html -->
  <div class="login-container">
    <el-form ref="loginRef" class="login-form" :model="loginForm" :rules="loginRules" @keyup.enter="handleLogin">
      <div class="login-title">{{ title }}</div>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="用户名">
          <template #prefix>
            <i-ant-design-user-outlined />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" placeholder="密码" show-password>
          <template #prefix>
            <i-ant-design-lock-outlined />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="captchaEnabled" prop="code">
        <el-input class="!w-[150px]" v-model="loginForm.code" placeholder="验证码">
          <template #prefix>
            <i-ant-design-safety-outlined />
          </template>
        </el-input>
        <div
          class="w-[122px] ml-2 h-8 flex justify-center items-center rounded-(--el-border-radius-base) shadow-[0_0_0_1px_var(--el-border-color)_inset]"
        >
          <img class="rounded-(--el-border-radius-base) cursor-pointer" :src="captcha" alt="" @click="getCaptcha" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-checkbox class="!h-5 !mr-54" v-model="rememberMe">记住我</el-checkbox>
      </el-form-item>
      <el-form-item class="w-70">
        <el-button :loading="loading" loading-icon="ad-LoadingOutlined" @click="handleLogin">登 录</el-button>
        <div v-if="registerEnabled" class="w-full leading-5 text-right mt-[18px]">
          <router-link to="/register">注册</router-link>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(200deg, #e3c5eb, #a9c1ed);
  overflow: hidden;

  .login-form {
    background-color: #fff;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 350px;
    height: 500px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);

    .login-title {
      font-size: 26px;
      margin: 65px auto 70px auto;
    }

    .el-input {
      width: 280px;
    }

    button {
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
}
</style>
