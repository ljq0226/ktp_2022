<template>
  <div>
    <courseNav :cno="$route.params.cno" />

    <div class="course-header">
      <img :src="bg" alt="theme" />
      <div class="top">
        <div class="change-bg" @click="editCourseThemeDialog = true">
          <i class="el-icon-edit"></i>
          <span>更改背景</span>
        </div>

        <div class="top-main">
          <div>
            <h1>
              {{ course.courseName }}
              <i
                class="el-icon-edit-outline courseEdit-icon"
                @click="editCourseDialog = true"
              ></i>
            </h1>
            <h2>{{ course.courseName }}</h2>

            <div>
              <ul class="ul-function">
                <li>
                  <i class="el-icon-mobile-phone"></i>
                  加课二维码
                </li>

                <li>加课码:{{ course.addCourseCode }}</li>

                <li @click="courseMember()" style="cursor: pointer">
                  <i class="el-icon-service"></i>
                  成员{{ course.studentNum }}人
                </li>

                <li>
                  <i class="el-icon-share"></i>
                  数据分析
                </li>

                <li>
                  <i class="el-icon-document"></i>
                  成绩管理
                </li>
              </ul>
            </div>
          </div>

          <div class="top-right">
            <ul class="ul-number">
              <li>{{ tasks.length }}</li>
              <li>互动个数</li>
            </ul>
            <ul class="ul-number">
              <li>{{ tasks.length }}</li>
              <li>发布作业</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="bottom">
        <ul>
          <li
            :class="{ 'click-option': optionState === 0, option: true }"
            @click="clickOption(0)"
          >
            课堂互动
          </li>

          <!--老师端-->
          <li
            v-if="this.$store.state.role === '2'"
            :class="{ 'click-option': optionState === 1, option: true }"
            @click="clickOption(1)"
          >
            作业
          </li>
          <!--学生端-->
          <li
            v-if="this.$store.state.role === '3'"
            :class="{ 'click-option': optionState === 2, option: true }"
            @click="clickOption(2)"
          >
            作业
          </li>

          <li
            :class="{ 'click-option': optionState === 3, option: true }"
            @click="clickOption(3)"
          >
            话题
          </li>
        </ul>
      </div>
    </div>

    <div class="show">
      <router-view />
    </div>

    <!-- 编辑课程模态框 -->
    <el-dialog
      :visible="editCourseDialog"
      width="660px"
      top="30vh"
      v-if="this.$store.state.role === '2'"
    >
      <p class="createCourseTitle">编辑课程</p>
      <div class="createCourse">
        <el-input
          class="createCourseInput"
          v-model="editCourseObj.courseName"
          placeholder="请输入课程名称"
          maxlength="20"
        />
        <el-input
          class="createCourseInput"
          placeholder="请输入班级名称(选填)"
          maxlength="20"
        />
        <div class="selectSemester">
          <p>选择学期:</p>
          <el-date-picker
            v-model="editCourseObj.semesterYear"
            type="year"
            placeholder="选择学年"
          >
          </el-date-picker>

          <el-select v-model="editCourseObj.semester">
            <el-option
              v-for="item in optionSemester"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="createCourseFooter">
        <el-button style="width: 100px" @click="editCourseDialog = false"
          >取消
        </el-button>
        <el-button
          type="primary"
          :disabled="editCourseObj.courseName.length <= 0"
          style="width: 100px"
          @click="updateCourse"
          >保存
        </el-button>
      </div>
    </el-dialog>

    <!-- 更改背景 模态框 -->
    <el-dialog :visible="editCourseThemeDialog" width="970px" top="30vh">
      <p class="createCourseTitle">选择课程图片</p>

      <div style="display: flex; align-content: flex-start; flex-wrap: wrap">
        <div class="pictureShow" v-for="i of 10" :key="i">
          <img
            class="picture"
            :src="require(`../assets/theme/${i}.png`)"
            alt=""
          />
          <div class="select-icon"></div>
        </div>
      </div>

      <div class="createCourseFooter">
        <el-button style="width: 100px" @click="editCourseThemeDialog = false"
          >取消
        </el-button>
        <el-button
          type="primary"
          style="width: 100px"
          @click="editCourseThemeDialog = false"
          >保存</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";

const course = reactive({});
// 任务
const tasks = reactive([]);
const editCourseDialog = ref(false);
const editCourseThemeDialog = ref(false);
let bg = ref("");
let optionState = ref(0); // 0为课堂互动 1为教师作业 2为学生作业 3为话题
const editCourseObj = reactive({
  courseName: "",
});

const optionSemester = [
  {
    value: 1,
    label: "第一学期",
  },
  {
    value: 2,
    label: "第二学期",
  },
];

// 课程成员展示
const courseMember = () => {};
const updateCourse = () => {};
const clickOption = () => {};
const getCourse = () => {};
onMounted(() => {
  bg.value = import(
    `../../assets/file/${Math.floor(Math.random() * 44) + 1}.png`
  );
});
</script>
<style lang="scss" scoped>
.pictureShow {
  margin: 2px;
  position: relative;
  width: 460px;
  height: 110px;
}

.picture {
  width: 100%;
  height: 100%;
}

.select-icon {
  width: 20px;
  height: 20px;
  background-image: url("../assets/img/duion.png");
  position: absolute;
  top: 13px;
  left: 13px;
}

.courseEdit-icon {
  cursor: pointer;
  margin-left: 15px;
  font-size: 24px;
}

.show {
  width: 1224px;
  margin: auto;
  margin-top: 20px;
}

.option {
  vertical-align: middle;
  font-weight: 500;
  color: #818181;

  min-width: 80px;
  text-align: center;
  font-size: 16px;
  height: 67px;
  line-height: 70px;
  padding: 0 20px;
  cursor: pointer;
}

.click-option {
  border-bottom: 4px solid #328eeb;
  color: rgba(59, 61, 69, 1);
}

.bottom {
  margin-top: 28px;
  padding-left: 40px;
  height: 72px;
  background: #f1f3f4;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}

ul {
  list-style: none;
}

.top-right,
.bottom ul {
  display: flex;
}

.ul-number {
  list-style: none;
  text-align: center;
  margin: 50px 30px 0 30px;
}

.ul-number li:nth-child(1) {
  font-size: 40px;
}

.ul-number li:nth-child(2) {
  font-size: 12px;
}

.ul-function li {
  font-size: 12px;
  display: inline-block;
  height: 24px;
  line-height: 24px;
  margin-left: 10px;
  background: rgba(255, 255, 255, 0.4);
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
}

.ul-function {
  margin: 28px 0 0 -6px;
  display: flex;
  list-style: none;
}

.top-main h1 {
  font-size: 36px;
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.top-main h2 {
  font-size: 20px;
  font-family: PingFang SC, serif;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 7px 0 0 0;
}

.top-main {
  text-align: left;
  display: flex;
  justify-content: space-between;
  padding: 10px 40px 0 40px;
}

.change-bg {
  text-align: right;
  padding: 12px 13px 0 0;
  font-size: 14px;
  cursor: pointer;
}

.change-bg i {
  font-size: 20px;
  padding-right: 5px;
}

.top {
  z-index: 999;
}

.course-header img {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
}

.course-header {
  position: relative;
  height: 272px;
  border-radius: 10px;
  width: 1224px;

  color: white;
  margin: auto;
  margin-top: 105px;
  /* z-index: -2; */
}

.fill {
  height: 72px;
  width: 100%;
}

.createCourseInput {
  display: flex;
  border-bottom: 2px solid #c8c8c8;
}

.createCourseInput:hover {
  border-bottom: 2px solid #4d90fe;
}

.createCourseInput:nth-child(1)::before {
  content: "课程名称:";
  width: 80px;
  line-height: 66px;
  height: 40px;
}

.createCourseInput:nth-child(2)::before {
  content: "班级名称:";
  width: 80px;
  line-height: 66px;
  height: 40px;
}

.createCourseTitle {
  text-align: left;
  font-size: 18px;
}

.quickReleaseIcon p {
  font-size: 14px;
  font-weight: 600;
  color: rgba(67, 67, 67, 1);
}

.quickReleaseSelect {
  display: flex;
  justify-content: space-around;
  margin-bottom: 40px;
  cursor: pointer;
}

.quickReleaseIcon div {
  background: url("../assets/img/icon-gg.png") center no-repeat
    rgba(44, 87, 171, 1);
}

.quickReleaseSelect .quickReleaseIcon:nth-child(2) div {
  background: url("../assets/img/icon-ht.png") center no-repeat
    rgba(44, 87, 171, 1);
}

.quickReleaseSelect .quickReleaseIcon:nth-child(3) div {
  background: url("../assets/img/icon-hd.png") center no-repeat
    rgba(44, 87, 171, 1);
}

.quickReleaseSelect .quickReleaseIcon:nth-child(4) div {
  background: url("../assets/img/icon-zy.png") center no-repeat
    rgba(44, 87, 171, 1);
}

.quickReleaseSelect .quickReleaseIcon:nth-child(5) div {
  background: url("../assets/img/icon-cs.png") center no-repeat
    rgba(44, 87, 171, 1);
}

.quickReleaseIcon div {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}

.quickRelease {
  margin-bottom: 30px;
}

.quickRelease {
  font-size: 24px;
  color: rgba(112, 112, 112, 1);
  font-weight: 600;
}

.createCourseFooter {
  text-align: right;
}

.otherOptions {
  margin-left: 10px;
  text-align: left;
}

.createCourse p {
  text-align: left;
  font-size: 14px;
  color: #666;
}

.selectSemester p:nth-child(1) {
  line-height: 39px;
  margin-left: -18px;
}

.selectSemester {
  margin: 20px 0;
}

.selectSemester,
.joinCourseFooter {
  display: flex;
  justify-content: space-around;
}
</style>
