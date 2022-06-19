<template>
  <div>
    <div class="upp-left-corner">
      <img src="../assets/img/logo_blue.png" alt="" />
    </div>
    <div class="reg-bg">
      <img src="../assets/img/newbg.png" alt="" />
    </div>

    <div class="main">
      <div v-if="state === 0" class="regSwitch">
        <p>注册账号</p>
        <p>请选择您在日常教学的实际身份</p>
        <div class="firstLine">
          <img
            src="../assets/img/teacher.png"
            alt="teacher"
            @click="state = 1"
          />
          <div @click="state = 1" class="cursor">我是老师/助教</div>
        </div>

        <div class="secondLine">
          <img
            src="../assets/img/student.png"
            alt="student"
            @click="state = 2"
          />
          <div @click="state = 2" class="cursor">我是学生</div>
        </div>
      </div>

      <div v-else-if="state !== 0" class="regMessage">
        <img
          src="../assets/img/returnReg.png"
          class="back"
          alt="返回"
          @click="state = 0"
        />
        <h3 v-if="state === 1">老师/助教注册</h3>
        <h3 v-if="state === 2">学生注册</h3>

        <el-input
          v-model="regAccount.username"
          class="el-input"
          placeholder="用户名"
          @blur="checkAccount()"
        />
        <el-input
          show-password
          v-model="regAccount.password"
          class="el-input"
          placeholder="密码"
        />

        <el-input
          show-password
          v-model="againPassword"
          class="el-input"
          placeholder="再次输入确认密码"
          @blur="checkPassword"
        />
        <el-input
          v-model="regAccount.name"
          class="el-input"
          placeholder="姓名"
        />
        <el-input
          v-model="regAccount.id"
          v-if="state === 2"
          class="el-input"
          placeholder="学号"
        />
        <el-select
          class="el-input"
          v-model="regAccount.schoolId"
          filterable
          remote
          reserve-keyword
          placeholder="学校"
          :remote-method="remoteMethod"
          :loading="loading"
        >
          <el-option
            v-for="item in options"
            :key="item.sid"
            :label="item.schoolName"
            :value="item.sid"
          >
          </el-option>
        </el-select>

        <el-button type="primary" class="el-button" @click="register()">
          <span v-if="state == 1">注册为老师/助教</span>
          <span v-else>注册为学生</span>
        </el-button>
      </div>

      <div class="bottom">
        <router-link to="login">
          <a href="">已有账号?</a>
          <a href="">去登录</a>
        </router-link>
      </div>
    </div>

    <el-dialog title="注册成功" :visible="successDialog" width="380px">
      <p>
        <i class="el-icon-circle-check green-font"></i>
        您的账号{{ regAccount.username }}注册成功,可以登录!
      </p>

      <span class="dialog-footer">
        <el-button type="primary" @click="login">直 接 登 录</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { userService } from "@/api";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
const userStore = useUserStore();
const router = useRouter();
//注册账号信息
const regAccount = reactive({
  username: "",
  password: "",
  stno: "",
  schoolId: "",
  status: "",
});
let againPassword = ref("");

const state = ref(0); // 模态框分三个状态: 0选择身份 1教师注册 2学生注册
const loading = ref(false);
const successDialog = ref(false);
const schools = reactive([]);
const options = reactive([
  {
    sid: "1537076005879681025",
    schoolName: "重庆理工大学",
  },
  {
    sid: "1537325500244795393",
    schoolName: "bilibili大学",
  },
  {
    sid: "1537325656851701762",
    schoolName: "夕阳红大学",
  },
]);

const login = () => {
  console.log("login");
};

const checkNull = () => {
  console.log("checkNull");
};
//点击注册
const register = async () => {
  if (state.value == 2) regAccount.status = "0";
  else regAccount.status = "1";
  const res = userStore.register(regAccount);
  if (res) router.push("/login");
};

const remoteMethod = (query) => {
  console.log("remoteMethod");
};

//检测用户名是否存在
const checkAccount = async () => {
  const isRepeat = await userService.isRepeat(regAccount.username);
  if (isRepeat) {
    ElMessage.warning("该用户名已存在，请重新输入！");
    regAccount.username = "";
  }
};
//检测两次输入密码是否一致
const checkPassword = () => {
  const flag = regAccount.password == againPassword.value;
  console.log(flag);
  if (!flag) {
    ElMessage.warning("两次输入密码不相同，请重新输入！");
    againPassword.value = "";
  }
};
</script>

<style lang="scss" scoped>
.green-font {
  color: greenyellow;
}

.getCaptcha {
  cursor: pointer;
  line-height: 36px;
  margin-top: 14px;
  width: 126px;
  height: 40px;
  box-sizing: border-box;
  text-align: center;
  color: #818181;
  border: 1px solid #dcdcdc;
  background: #f2f2f2;
  border-radius: 3px;
}

.not-allowed {
  cursor: not-allowed;
}

.yellow-font {
  color: #f93;
}

.red-font {
  color: indianred;
}

.YZM-img {
  height: 50px;
  margin-top: 10px;
  border: solid 1px black;
  width: 157px;
}

.el-input {
  margin-top: 14px;
  font-size: 14px;
}

.cursor {
  cursor: pointer;
}

.el-button {
  margin-top: 10px;
  font-size: 16px;
}

.YZMdiv {
  display: flex;
  justify-content: space-between;
}

.regMessage h3 {
  line-height: 40px;
  font-size: 32px;
  color: #3b3d45;
  font-weight: 400;
  margin-left: 20px;
  display: inline-flex;
}

.regMessage .back {
  width: 40px;
  height: 40px;
  margin-top: -11px;
}

.regMessage {
  flex-wrap: wrap;
}

.regSwitch {
  height: 394px;
}

.bottom {
  text-align: right;
  margin: 15px 0;
  font-size: 14px;
}

a {
  outline: none;
  text-decoration: none;
  color: #5f6368;
}

.bottom a:nth-child(2) {
  color: #32baf0;
}

.main .firstLine,
.main .secondLine {
  margin-top: 70px;
  display: flex;
}

.main .firstLine img,
.main .secondLine img {
  width: 60px;
  height: 60px;
}

.main .firstLine div,
.main .secondLine div {
  width: 330px;
  height: 60px;
  background-color: #32baf0;
  margin-left: 40px;
  text-align: center;
  line-height: 64px;
  color: white;
  border-radius: 5px;
  font-size: 16px;
}

.upp-left-corner {
  display: block;
  width: 148px;
  height: 37px;
  position: absolute;
  left: 69px;
  top: 53px;
}

.reg-bg {
  position: fixed;
  left: 13%;
  top: 10%;
}

img {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}

.main {
  width: 410px;
  padding: 30px 30px 0;
  background-color: white;
  position: absolute;
  left: 70%;
  top: 49%;
  transform: translate(-50%, -50%);
  border-radius: 1%;
  text-align: left;
  box-shadow: 2px 2px 10px #909090;
}

.main p:nth-child(1) {
  font-size: 32px;
}

.main p:nth-child(2) {
  margin-top: 20px;
  font-size: 14px;
}
</style>
