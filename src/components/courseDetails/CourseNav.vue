<template>
  <div class="course-nav">
    <div class="left">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/homepage' }"
          >课堂
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <router-link
            style="cursor: pointer"
            :to="{
              path: `/course/${course.cno}`,
            }"
            >{{ course.courseName }}</router-link
          >
        </el-breadcrumb-item>
      </el-breadcrumb>

      <div>
        <ul class="ul-icon">
          <li>
            <img src="../../assets/img/tool_icon.png" alt="工具" />
          </li>

          <li>
            <i class="el-icon-bell" style="font-size: 25px"></i>
          </li>

          <li>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <div class="avatar"><img :src="avatar" /></div>
              </span>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <div
                    class="title-icon"
                    style="background-position: 50% 56%"
                  />
                  开通VIP
                </el-dropdown-item>
                <el-dropdown-item>
                  <div
                    class="title-icon"
                    style="background-position: 50% 30%"
                  />
                  机构账号绑定
                </el-dropdown-item>
                <el-dropdown-item>
                  <div class="title-icon" style="background-position: 50% 2%" />
                  <span @click="gotoProfile">个人设置</span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div
                    class="title-icon"
                    style="background-position: 50% 83%"
                  />
                  <span @click="logout">退出账号</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, defineProps } from "vue";
const course = reactive({});
const avatar = ref("");

const props = defineProps({ cno: String });

onMounted(() => {});

const logout = () => {};
const gotoProfile = () => {};
</script>
<style lang="scss" scoped>
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

.avatar > img {
  width: 35px;
  height: 35px;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 50%;
}

.title-icon {
  margin: 5px 6px 0 0;
  width: 25px;
  height: 25px;
  background-image: url("../../assets/img/user-info-icon-bg.png");
}

.ul-icon li:nth-child(3) {
  padding-top: 19px;
}

.ul-icon li:nth-child(1) img {
  width: 25px;
  height: 25px;
}

.ul-icon li {
  padding: 25px 10px 0 10px;
}

.ul-icon {
  display: inline-flex;
  list-style: none;
  vertical-align: middle;
  padding: 0 40px 0 0;
  margin: 0;
}

.left {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.breadcrumb {
  margin-left: 45px;
  line-height: 70px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.icon {
  font-size: 30px;
  padding-left: 40px;
  color: #5f6368;
  cursor: pointer;
  line-height: 70px;
}

.course-nav {
  width: 100%;
  position: fixed;
  top: 0;
  height: 72px;
  background: white;
  box-sizing: border-box;
  z-index: 5;
  display: flex;
}
</style>
