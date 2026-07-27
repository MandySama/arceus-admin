import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const { code } = await readBody(event)
  if (code) {
    return {
      code: 200,
      data: 'eyJhbGciOiJIUzM4NCJ9.eyJsb2dpbl91c2VyOiI6IjY3ZDg2NGY2LTA1ZTEtNDg4Yi05MjQ3LTQ5NmM2Y2RkMmE3MyJ9.ofqim-37vqhFIV_qqeV99Wldgr0DBsruuMYSyCjsL4u0bkkHxQG6Mxa93ySi1Gyf',
      message: null,
    }
  }
  return {
    code: 500,
    data: null,
    message: '验证码错误',
  }
})
