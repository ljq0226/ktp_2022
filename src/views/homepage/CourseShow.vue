<template>
  <div class="allCourses">
    <el-collapse v-model="activeNames" @change="handleChange" accordion>
      <template v-for="(item, index) in semesterArr" :key="item">
        <el-collapse-item :title="item" :name="index">
          <template
            v-for="course in updateCourse[index]"
            :key="course.courseId"
          >
            <div class="rowCard">
              <CourseCard
                @childDropOutCourse="childDropOutCourse(course)"
                @childArchiveCourse="childArchiveCourse(course)"
                :course="course"
                :status="props.status"
              />
            </div>
          </template>
        </el-collapse-item>
      </template>
    </el-collapse>
  </div>
  <!-- 归档课程 模态框 -->
  <el-dialog
    v-model="archiveCourseDialog"
    width="32vw"
    top="28vh"
    draggable
    title="要归档此课程吗"
  >
    <div class="archiveCourseDialog">
      <p class="ach-p2">您可以在<span>“课堂”-“归档管理”</span>中查看此课程</p>
      <div class="archiveCourseFooter">
        <div></div>
        <el-button @click="archiveCourseDialog = false" style="width: 100px"
          >取消
        </el-button>

        <el-button
          style="width: 100px"
          @click="courseArchive(courseStore.awaitArchiveCourse.courseId)"
          >归档自己
        </el-button>
      </div>
    </div>
  </el-dialog>
  <!-- 退出课程 模态框 -->
  <el-dialog v-model="dropOutCourseDialog" width="450px" top="30vh">
    <p class="joinCourseTitle">确定要退出此课程吗?</p>
    <div class="delete-tips">
      <p>您的这个课程的任何信息或评论将被永久删除</p>
      <p>警告：此操作无法撤消</p>
    </div>
    <div class="joinCourseFooter">
      <el-button @click="dropOutCourseDialog = false" style="width: 100px"
        >取消
      </el-button>
      <el-button type="primary" style="width: 100px" @click="handleDropOut"
        >退出
      </el-button>
    </div>
  </el-dialog>
</template>
<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useCourseStore } from "@/store/course";
import CourseCard from "@/components/homepage/CourseCard";
const props = defineProps({ status: String });
const courseStore = useCourseStore();
let collapseItem = ref(null);
let semesterArr = computed(() => courseStore.semesterArr);
let updateCourse = computed(() => courseStore.updateCourse);
const activeNames = reactive([]);
let archiveCourseDialog = ref(false);
let dropOutCourseDialog = ref(false);
onMounted(() => {});
//传递给子组件的归档方法
const childArchiveCourse = (course) => {
  archiveCourseDialog.value = true;
  courseStore.awaitArchiveCourse = course;
};
//传递给子组件的退课方法
const childDropOutCourse = (course) => {
  dropOutCourseDialog.value = true;
  //
};
//课程归档处理
const courseArchive = async (courseId) => {
  archiveCourseDialog.value = false;
  await courseStore.archiveCourse(courseId);
};
//课程退出处理
const handleDropOut = async () => {
  dropOutCourseDialog.value = false;
  await courseStore.exitCourse(course.courseId);
};

const handleChange = (val) => {};
</script>
<style lang="scss" scoped>
::v-deep .el-collapse-item__content {
  display: flex;
  flex-flow: row nowrap;
  .rowCard {
    margin-right: 3vw;
  }
}
.archiveCourseDialog {
  p {
    border-top: 0.01px solid gray;
    border-bottom: 0.01px solid gray;
    padding: 2vh;
    span {
      color: $ktp-color;
    }
  }
  .archiveCourseFooter {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
