<template>
  <div style="display: flex">
    <div class="upp-left-corner">
      <img src="../assets/img/logo_blue.png" alt="" />
    </div>
    <div class="login-bg">
      <img src="../assets/img/newbg.png" alt="" />
    </div>
    <!--    <div class="login-bg2"></div>-->

    <div class="login-box">
      <div class="">
        <div class="title active">账号登录</div>

        <div class="main">
          <div class="useAccount">
            <input
              type="text"
              name="account"
              v-model="user.username"
              placeholder="账号"
            />
            <input
              v-model="user.password"
              type="password"
              autocomplete="off"
              name="pass"
              placeholder="密码"
            />
          </div>
        </div>
        <div class="bottom">
          <div class="firstLine">
            <div class="autoLogin">
              <input
                type="checkbox"
                v-model="autoLogin"
                @click="autoLogin_Status"
              />
              <p>下次自动登录</p>
            </div>

            <a href="javascript:">忘记密码?</a>
          </div>
          <div class="secondLine">
            <button class="loginBtn" @click="login">登录</button>
          </div>
          <div class="third">
            <router-link to="register">
              <p>还没有账号?<span style="color: #32baf0">去注册</span></p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const user = reactive({
  username: "",
  password: "",
});

let autoLogin = ref(false);

const autoLogin_Status = () => {};
const login = () => {
  router.push("/homepage");
};
</script>
<style lang="scss" scoped>
.resultInput {
  height: 30px;
}

.YZM-img {
  height: 150px;
}

.upp-left-corner {
  display: block;
  width: 10%;
  height: 10%;
  margin-left: 7%;
  margin-top: 3%;
  /*position: absolute;*/
  /*left: 10%;*/
  /*top: 10%;*/
}

.login-bg {
  /*离用户的距离，负数为更远*/
  z-index: -1;
}

.login-bg2 {
  background: rgba(20, 27, 47, 0.6);
}

.login-bg,
.login-bg2 {
  /*width: 100%;*/
  /*height: 100%;*/
  /*position: fixed;*/
  /*top: 0;*/
  /*position: absolute;*/
  /*left: 10%;*/
  /*top: 10%;*/
  width: 45%;
  height: 100%;
  margin-left: -1%;
  margin-top: 6%;
}

img {
  width: 100%;
  height: 100%;
  /*垂直居中*/
  vertical-align: middle;
}

.login-box {
  background: white;
  width: 28%;
  height: 24%;
  margin-left: -2%;
  margin-top: 6%;
  /*position: absolute;*/
  /*left: 60%;*/
  /*top: 20%;*/
  /*transform: translate(-50%, -50%);*/
  border-radius: 1%;
  box-shadow: 2px 2px 10px #909090;
}

.title {
  display: flex;
  justify-content: center;
  padding: 47px 41px 58px 0;
  font-size: 16px;
}

a {
  padding: 0 15px;
  outline: none;
  text-decoration: none;
  color: #5f6368;
}

.title a:nth-child(2)::after,
.title a:nth-child(2)::before {
  content: "";
  position: absolute;
  height: 16px;
  width: 1px;

  background: #e2e6ed;
  top: 11%;
}

.title a:nth-child(2)::after {
  left: 0;
}

.title a:nth-child(2)::before {
  right: 0;
}

.title a:nth-child(2) {
  position: relative;
}

.active {
  font-size: 26px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(59, 61, 69, 1);
}

.main,
.bottom {
  overflow: hidden;
  padding: 0 30px 30px;
}

.bottom .firstLine {
  display: flex;
  justify-content: space-between;
}

.useMessage .secondLine input {
  width: 60%;
}

input {
  width: 98%;
  height: 64px;
  border-radius: 4px;
  /* float: left; */
  font-size: 16px;
  padding-left: 12px;
  margin-bottom: 24px;

  /* 去除input获得焦点时的黑色边框 */
  outline: none;

  border: 1px solid rgba(226, 230, 237, 1);
  box-sizing: border-box;

  /* 添加边框过渡效果 */
  transition: all 0.3s;
}

input:focus {
  border: 1px solid rgb(41, 105, 216);
}

.autoLogin input {
  width: 16px;
  height: 16px;
  margin-right: 4px;
  margin-left: 4px;
}

.autoLogin {
  display: flex;
}

.bottom .firstLine .autoLogin p {
  font-size: 12px;
  margin: 0;
  padding: 0;
}

.bottom .firstLine a {
  font-size: 12px;
}

.loginBtn {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #32baf0;
  text-align: center;
  border-radius: 5px;
  border-color: white;
  color: #fff;
  font-size: 16px;
  margin-top: 25px;
  outline: none;
}

.bottom .third {
  text-align: right;
  color: #afb1b3;
  font-size: 14px;
  margin-top: 9px;
}

.bottom .third p span {
  color: #32baf0;
}

.cancelBtn {
  width: 90%;
  color: white;
  background-color: #328eeb;
}
</style>
