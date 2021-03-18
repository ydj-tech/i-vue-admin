<!-- Discription: 登陆, author: ydj, Date: 2020-11-25 15:19:32 -->
<template>
  <div>
    <div class="login-container">
      <el-form
        autocomplete="on"
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-position="top"
        label-width="150px"
        class="card-box login-form"
      >
        <h3 class="title">保健食品注册管理系统</h3>
        <el-form-item prop="username" label="用户名">
          <el-input
            name="username"
            type="text"
            v-model="loginForm.username"
            autocomplete="new-password"
            placeholder="输入用户名"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            name="password"
            type="password"
            @keyup.enter.native="handleLogin"
            v-model="loginForm.password"
            autocomplete="new-password"
            placeholder="输入密码"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="validateCode" class="login-validateCode">
          <el-col :span="18">
            <el-input
              v-model="loginForm.validateCode"
              placeholder="请输入图片码"
              @input="checkPictureCode"
              @keyup.enter.native="handleLogin"
              clearable
            ></el-input>
          </el-col>
          <el-col :span="6">
            <picture-code
              :codeHeight="codeHeight"
              ref="validateCode"
              @getValidateCode="getValidateCode"
            ></picture-code>
          </el-col>
        </el-form-item>
        <el-form-item>
          <div class="clearfix">
            <!-- <div class="regist-btn" @click="regist">注册用户</div> -->
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="width:100%;"
            :loading="loading"
            @click.native.prevent="handleLogin"
            :disabled="!isValidatePass"
          >登录</el-button>
        </el-form-item>
      </el-form>
      <div class="login-right"></div>
    </div>
    <div class="footer">Power by 国家市场监督管理总局©2020 </div>
  </div>
</template>

<script>
import PictureCode from '@/components/PictureCode'
export default {
    name: 'login',
    components: {
        PictureCode
    },
    data() {
        var validatePictureCode = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入图片码'))
            } else if (value.toLowerCase() !== this.pictureCode) {
                callback(new Error('图片码不正确'))
            } else {
                this.isValidatePass = true
                callback()
            }
        }
        return {
            loginForm: {
                username: ''
            },
            loginRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                validateCode: [
                    {
                        required: true,
                        message: '请输入图片码',
                        trigger: 'blur'
                    },
                    { validator: validatePictureCode, trigger: 'blur' }
                ]
            },
            loading: false,
            codeHeight: 40,
            pictureCode: '', // 生成的图片码
            isValidatePass: false
        }
    },
    methods: {
    // 验证码
        getValidateCode(val) {
            this.pictureCode = val
        },
        // 登录方法
        handleLogin() {
            console.log('登录成功')
            this.$router.push({ path: '/' })
            // this.$refs.loginForm.validate(valid => {
            //     if (valid) {
            //         this.loading = true
            //         this.$store
            //             .dispatch('Login', this.loginForm)
            //             .then(res => {
            //                 // 登录后，跳转到首页
            //                 console.log('登陆成功')
            //                 this.$router.push({ path: '/' })
            //             })
            //             .catch(res => {
            //                 this.loading = false
            //                 this.$message.error(res)
            //                 this.$refs.validateCode.drawCode('')
            //                 this.loginForm.validateCode = ''
            //                 this.isValidatePass = false
            //             })
            //     } else {
            //         console.log('error submit!!')
            //         return false
            //     }
            // })
        },
        regist() {
            this.$router.push({ path: '/regist' })
        },
        checkPictureCode() {
            this.$refs.loginForm.validateField('validateCode', res => {
                if (!res) {
                    this.isValidatePass = true
                } else {
                    this.isValidatePass = false
                }
            })
        }
    }
}
</script>

<style rel="stylesheet/less" lang="scss">
$bg: #ffffff;
$dark_gray: #889aa4;
$light_gray: #eeeeee;
$title_black: #333333;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #cae7ff;
  background-image: url("../../assets/pages/login/bg.gif");
  background-repeat: no-repeat;
  background-position: left bottom;
  display: flex;
  justify-content: center;
  align-items: center;
  input:-webkit-autofill {
    //表单填充时的颜色设置
    -webkit-box-shadow: 0 0 0px 1000px #ffffff inset !important;
    -webkit-text-fill-color: #454545 !important;
  }
  .tips {
    font-size: 14px;
    color: #ffffff;
    margin-bottom: 10px;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $title_black;
    margin: 0px 0 50px 0;
    font-weight: bold;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
  .el-form-item .el-form-item__content .el-input {
    width: 390px;
  }
  .el-form-item.login-validateCode .el-form-item__content .el-input {
    width: 294px;
    input {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  .login-form {
    box-sizing: border-box;
    width: 540px;
    height: 567px;
    padding: 60px 0 0 50px;
    background-color: #ffffff;
    vertical-align: middle;
    .el-form-item {
      color: #454545;
      width: 392px;
      margin-bottom: 19px;
    }
    .el-form-item__label {
      line-height: 16px;
      font-size: 16px;
      color: #666666;
    }
    .el-input-group__append {
      left: 10px;
      border-left: 1px solid #dcdfe6;
      border-radius: 0;
    }
    .el-input.el-input-group.el-input-group--append {
      width: 380px;
    }
    .regist-btn {
      float: right;
      margin-bottom: 11px;
      line-height: 16px;
      font-size: 16px;
      color: #008cff;
      cursor: pointer;
    }
  }
  .login-right {
    width: 540px;
    height: 567px;
    background-image: url("../../assets/pages/login/login-right.png");
    vertical-align: middle;
  }
  .el-input-group__append {
    padding: 0;
  }
  .get_code {
    height: 38px;
  }
  .validate-error-message {
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
  }
}
.footer {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
}

</style>
