<!--
    Author: earl
    Create Time: 2018-06-03 23:10
    Description:
-->
<template>
  <div class="login_page fillcontain">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showLogin">
        <div class="manage_tip">
          <p>vue-project</p>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="email">
            <el-input v-model="loginForm.email" @keyup.enter.native="submitForm('loginForm')"
                      placeholder="邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input @keyup.enter.native="submitForm('loginForm')" type="password" placeholder="密码"
                      v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登录</el-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </div>
</template>

<script>
  import http from '../../config/http'
  import {setStore} from '../../utils/save_util'
  import api from '../../api/api'

  export default {
    data() {
      return {
        loginForm: {
          email: '',
          password: '',
        },
        rules: {
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur,change'},
            {max: 50, message: '最多输入50个字符！', trigger: 'blur,change'},
            {type: 'email', message: '邮箱格式错误!', trigger: 'blur,change'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur,change'},
            {max: 20, message: '最多输入20个字符！', trigger: 'blur,change'}
          ],
        },
        showLogin: false,
      }
    },
    mounted() {
      this.showLogin = true;
    },
    methods: {
      uploadLoading(tag) {
        if (tag) {
          this.uploadLoadingObj = this.$loading({
            lock: true,
            text: '拼命登录中，请等待...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
        } else {
          if (!this.uploadLoadingObj) return;
          this.uploadLoadingObj.close();
        }
      },
      submitForm: async function (loginForm) {
        this.$refs[loginForm].validate((valid) => {
          if (valid) {
            this.uploadLoading(true);
            let params = {email: this.loginForm.email, password: this.loginForm.password};
            http.post(api.login, params).then(res => {
              if (res.code === 0) {
                let expireHours = 60 * 60 * 6;//登录状态6小时后过期
                this.setCookie('session', res.data.token, expireHours);
                this.$router.push('/index');
                this.$message({
                  type: 'success',
                  message: res.msg,
                  duration: 1000
                });
              } else {
                this.$message({
                  type: 'error',
                  message: res.msg
                });
              }
              this.uploadLoading(false);
            })
          } else {
            this.regFun(); //校验邮箱和密码
            return false;
          }
        });
      },
      regFun: function () {
        let regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        if (!this.loginForm.email && !this.loginForm.password) return this.$notify.error({
          title: '错误',
          message: '请输入邮箱！',
          offset: 100
        });

        if (!this.loginForm.email) return this.$notify.error({
          title: '错误',
          message: '请输入邮箱！',
          offset: 100
        });

        if (!regEmail.test(this.loginForm.email)) return this.$notify.error({
          title: '错误',
          message: '邮箱格式错误！',
          offset: 100
        });

        if (this.loginForm.email.length > 50) return this.$notify.error({
          title: '错误',
          message: '邮箱最多输入50个字符！',
          offset: 100
        });

        if (!this.loginForm.password) return this.$notify.error({
          title: '错误',
          message: '请输入密码！',
          offset: 100
        });

        if (this.loginForm.password.length > 20) return this.$notify.error({
          title: '错误',
          message: '密码最多输入20个字符！',
          offset: 100
        });
      }
    },
    watch: {}
  }
</script>

<style lang="less" scoped>
  @import "../../../static/css/mixin";

  .login_page {
    height: 100%;
    width: 100%;
    position: absolute;
    background-color: #324057;
  }

  .manage_tip {
    position: absolute;
    width: 100%;
    top: -100px;
    left: 0;
    p {
      font-size: 34px;
      color: #fff;
    }
  }

  .form_contianer {
    .wh(320px, 210px);
    .ctp(320px, 210px);
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    background-color: #fff;
    .submit_btn {
      width: 100%;
      font-size: 16px;
    }
  }

  .form-fade-enter-active, .form-fade-leave-active {
    transition: all 1s;
  }

  .form-fade-enter, .form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
  }
</style>
