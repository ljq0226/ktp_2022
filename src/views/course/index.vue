<template>
  <Navigation info="课程详情"></Navigation>
  <div class="courseCard">
    <div class="bg">
      <img :src="bg" />
    </div>
    <div class="coursetop">
      <div class="courseInfo">
        <div class="courseName">
          {{ currentCourse.courseName }}
        </div>

        <div class="courseQrCode">
          <p>
            <span >加课码{{ " " + currentCourse.addCourseCode }}</span>
            <span @click="toCourseMember">已有{{ currentCourse.studentNum }}人加入</span>
          </p>
        </div>
      </div>

      <div class="coursemoudle">
        <div class="coursemoudleSpace"></div>
        <div class="routerLink">
          <el-button round @click="showCourseStudy">课程学习</el-button>
          <el-button round @click="noServer">学情分析</el-button>
          <el-button round @click="noServer">成绩管理</el-button>
          <el-button round @click="noServer">课程介绍</el-button>
        </div>
        <div class="coursemoudleSpace"></div>
      </div>
    </div>

    <div class="showMoudle">
      <CourserStudy :courseId="currentCourse.courseId"></CourserStudy>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import Navigation from "@/components/homePage/navigation";
import CourserStudy from "./CourseStudy.vue";
import storage from "@/hooks/storage";
import { useRouter } from "vue-router";
import { useCourseStore } from "@/store/course";
const courseStore = useCourseStore();
let router = useRouter();

let status = ref(0); //当前角色为 0为学生 1为老师
let bg = ref("");
const currentCourse = computed(() => courseStore.currentCourse);
const routerId = ref(""); //当前路径下的课程id
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
  init();
});
const init = () => {
  //设置课程背景图片
  let randomNumber = Math.floor(Math.random() * 14) + 1;
  bg.value = `src/assets/bg/${randomNumber}.png`;
  getCourseInfo();
  getStatus();
};
//获取当前课程信息
const getCourseInfo = async () => {
  routerId.value = router.currentRoute.value.params.cno;
  await courseStore.getCourseByCourseId(routerId.value);
};
//获取当前用户的角色状态
const getStatus = () => {
  const userInfo = storage.get("userInfo");
  status.value = userInfo.status;
};
const showCourseStudy = () => {
  // router.push(`/course/${routerId.value}/courseStudy`)
};
const noServer = () => {
  ElMessage.warning("暂未开放，尽请期待！");
};
const toCourseMember = () => {
  console.log('object');
  router.push(`/courseMember/${routerId.value}`)
}
</script>
<style lang="scss" scoped>
.courseCard {
  margin-top: 5vh;
  padding: 10vh 8vw;

  .coursetop {
    width: 80vw;
    border-radius: 1vh;
    border: 1px solid rgb(212, 214, 216);
    .courseInfo {
      .courseName {
        margin-left: 2vw;
        margin-top: 2vh;
        font-size: 22px;
        color: white;
        font-weight: 350;
      }
      .courseQrCode {
        font-size: 13px;
        color: white;
        margin: 10vh 0;
        p {
          margin-left: 2vw;
          span {
            padding-right: 1vw;
            cursor:pointer;
          }
        }
      }
    }
    .coursemoudle {
      display: flex;
      flex-flow: row;
      justify-content: space-between;
      margin-top: -3vh;
      padding-bottom: 1vh;
      .routerLink {
        flex: 0.4;
        display: flex;
        justify-content: space-around;
      }
      .coursemoudleSpace {
        flex: 0.2;
      }
    }
  }
  .showMoudle {
    width: 80vw;
  }
}

.bg {
  position: absolute;
  z-index: -1;
  img {
    width: 80vw;
    height: 24vh;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
}
</style>
