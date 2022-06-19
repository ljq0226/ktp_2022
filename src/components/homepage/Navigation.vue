<template>
  <div class="all">
    <div class="container">
      <div class="logo" @click="backHome">
        <img src="@/assets/ktpLogo.png" alt="" />
      </div>
      <div class="middle active">
        <div>
          <a href="javascript:">{{ props.info }}</a>
        </div>
      </div>
      <div class="right">
        <div class="all-el-icon">
          <el-icon class="el-icon" :size="25"><Message /></el-icon>
          <el-icon class="el-icon" :size="25"><Bell /></el-icon>
        </div>
        <div class="userSetting">
          <el-dropdown trigger="click" size="large">
            <div class="avatar">
              <el-avatar :size="50" src="/src/assets/dsm.jpeg" />
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <div
                    class="icon"
                    style="background-position: 50% 56%"
                    @click="noServe"
                  >
                    开通VIP
                  </div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div
                    class="icon"
                    style="background-position: 50% 30%"
                    @click="noServe"
                  >
                    机构账号绑定
                  </div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link to="/profile" style="display: flex">
                    <div class="icon" style="background-position: 50% 2%" />
                    个人设置
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div class="icon" style="background-position: 50% 83%" />
                  <span @click="logout">退出账号</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Message, Bell } from "@element-plus/icons-vue";
import { ref, reactive, defineProps, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({ info: String });
const imgURL = ref("@/assets/img/default.jpg");
const state = 1; // 1 课堂 2 精品慕课 3 我的精品 4 双选会 5论文管理

onMounted(() => {});

const changeState = (val) => {};
const logout = () => {
  console.log("退出登录");
};
const backHome = () => {
  router.push("/homepage");
};
const noServe = () => {
  ElMessage.warning("暂未开通该服务,尽请期待!");
};
</script>
<style lang="scss" scoped>
.all {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 999;
}
.container {
  width: 100%;
  height: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  display: flex;
  background-color: white;

  .logo {
    cursor: pointer;
  }
  .middle {
    flex: 0.95;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      height: 100%;
      border-bottom: 3px solid rgb(85, 145, 245);
      display: flex;
      align-items: center;
      a {
        font-size: 20px;
        color: rgb(85, 145, 245);
      }
    }
  }
  .right {
    display: flex;
    flex-flow: row;
    .all-el-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      .el-icon {
        font-weight: bold;
        margin: 0 0.5vw;
      }
    }
    .userSetting {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 2vh;
    }
  }
}
.avatar {
  text-align: center;
  display: table-cell;
  vertical-align: middle;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background: #fff;
  cursor: pointer;
}
a {
  outline: none;
  text-decoration: none;
  color: #5f6368;
}
</style>

<style>
.el-dropdown-menu__item {
  display: flex;
}
</style>
