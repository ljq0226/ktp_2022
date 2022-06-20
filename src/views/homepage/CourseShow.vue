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
                @childDeleteCourse="childDeleteCourse"
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
onMounted(() => {});
//传递给子组件的归档方法
const childArchiveCourse = (course) => {
  archiveCourseDialog.value = true;
  courseStore.awaitArchiveCourse = course;
};
//课程归档处理
const courseArchive = async (courseId) => {
  archiveCourseDialog.value = false;
  await courseStore.archiveCourse(courseId);
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
