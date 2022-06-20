<template>
  <div class="card">
    <div class="bg">
      <img :src="bg" />
      <!-- <img src="../../assets/bg/1.png"  /> -->
    </div>
    <div class="main">
      <div class="head">
        <div class="semesterYear">
          {{ getTermYear }}
        </div>

        <div class="courseName">
          <router-link
            :to="{
              path: `/course/${props.course.courseId}`,
            }"
            >{{ props.course.courseName }}</router-link
          >
        </div>
        <div class="courseInfo">
          <div class="addCode">
            <p>
              课堂码:<span> {{ props.course.addCourseCode }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="main-space"></div>
      <div class="bottom">
        <div class="teacher">
          <div class="isTop">负责人:{{ owner }}</div>
        </div>
        <div class="set">
          <el-dropdown v-if="props.status == 1" trigger="click">
            <span class="el-dropdown-link">
              <el-icon><More /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>编辑</el-dropdown-item>
                <el-dropdown-item @click="deleteCourse()"
                  >删除</el-dropdown-item
                >
                <el-dropdown-item @click="archiveCourse()"
                  >归档</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <el-dropdown v-else trigger="click" placement="top">
            <span class="el-dropdown-link">
              <el-icon><More /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="archiveCourse()"
                  >归档</el-dropdown-item
                >
                <el-dropdown-item @click="dropOut">退课</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, onMounted, computed } from "vue";
import { More } from "@element-plus/icons-vue";
import { useCourseStore } from "@/store/course";
import { useUserStore } from "@/store/user";
const userStore = useUserStore();
const courseStore = useCourseStore();
const props = defineProps({ course: Object, status: String });
const emits = defineEmits(["childArchiveCourse"]);
const bg = ref("");
const owner = ref("");
//处理学期
const getTermYear = computed(
  () =>
    `${props.course.semesterYear}-${parseInt(props.course.semesterYear) + 1} ${
      props.course.semester == 1 ? "第一学期" : "第二学期"
    }`
);
//处理负责人
const handleOwner = async () => {
  const info = await userStore.getInfoById(props.course.ownerId);
  owner.value = info.name;
};

onMounted(() => {
  let randomNumber = Math.floor(Math.random() * 14) + 1;
  bg.value = `src/assets/bg/${randomNumber}.png`;
  handleOwner();
});

const detailCourse = () => {};
//退课
const dropOut = async () => {
  courseStore.exitCourse(props.course.courseId);
};
// 删除课程
const deleteCourse = () => {};
// 重置加课码 启用加课码
const addCodeReset = () => {};
</script>
<style lang="scss" scoped>
.iconMore {
  padding: 3px 0 0 10px;
  font-size: 18px;
  color: rgba(44, 88, 171, 1);
}

.isTop {
  font-size: 12px;
  padding-top: 5px;
}

.teacher p {
  font-size: 12px;
  margin: 5px 0 0 13px;
}

.teacher,
.set {
  display: flex;
}

.bottom {
  display: flex;
  justify-content: space-between;
  padding: 7px 10px;
}

.homework {
  cursor: pointer;
  margin-top: 11px;
  font-size: 14px;
  color: rgba(31, 32, 35, 1);
  font-weight: 500;
}

.homework-title {
  border-bottom: 1px solid #ffffff;
}

.homework:hover .homework-title {
  border-bottom: 1px solid #32baf0;
  color: #32baf0;
}
.courseInfo {
  .addCode {
    color: white;
    font-size: 13px;
  }
}

.courseName {
  font-size: 18px;
  color: white;
  margin-top: 0.5vh;
  margin-bottom: 6.5vh;
  a {
    color: white;
    outline: none;
    text-decoration: none;
  }
}
.bg {
  position: absolute;
  z-index: -1;
  img {
    width: 18vw;
    height: 23vh;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
}
.main {
  display: flex;
  flex-flow: column;
  .head {
    height: 23vh;
    padding: 1.3vw;

    .semesterYear {
      font-size: 13px;
      color: rgb(167, 202, 212);
    }
  }
  .main-space {
    flex: 0.2;
  }
}
.card {
  width: 18vw;
  height: 35vh;
  border: 1px solid #e2e6ed;
  border-radius: 8px;
  position: relative;
}
</style>
