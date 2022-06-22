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
                @childSetCourse="setCourse(course)"
                :course="course"
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
          v-show="props.status == 1"
          @click="archiveAll(awaitArchiveCourse.courseId)"
          >归档全部
        </el-button>
        <el-button
          style="width: 100px"
          @click="courseArchive(awaitArchiveCourse.courseId)"
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
  <!-- 编辑课程 模态框  -->
  <el-dialog
    v-model="setCourseDialog"
    width="60vw"
    top="25vh"
    title="编辑课程"
    draggable
  >
    <div class="createCourse">
      <div>
        课程名：<el-input
          class="createCourseInput"
          v-model="toSetCourse.courseName"
          placeholder="请输入课程名称"
          maxlength="10"
        />
      </div>
      <div class="selectSemester">
        <p>选择学期:</p>
        <el-date-picker
          v-model="toSetCourse.semesterYear"
          type="year"
          placeholder="选择学年"
        >
        </el-date-picker>
        <el-select v-model="toSetCourse.semester">
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
    <div class="updateCourseFooter">
      <el-button style="width: 100px" @click="setCourseDialog = false"
        >取消
      </el-button>
      <el-button
        type="primary"
        :disabled="toSetCourse.courseName.length <= 0"
        style="width: 100px"
        @click="handleUpdateCourse(awaitArchiveCourse.courseId)"
        >编辑
      </el-button>
    </div>
  </el-dialog>
</template>
<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useCourseStore } from "@/store/course";
import CourseCard from "@/components/CourseCard";
const props = defineProps({ status: String });
const courseStore = useCourseStore();
let collapseItem = ref(null);
let semesterArr = computed(() => courseStore.semesterArr);
let updateCourse = computed(() => courseStore.updateCourse);
let awaitArchiveCourse = computed(() => courseStore.awaitArchiveCourse);
const activeNames = reactive([]);
//模态框
let archiveCourseDialog = ref(false);
let dropOutCourseDialog = ref(false);
let setCourseDialog = ref(false);
// 新创建的课程
const toSetCourse = reactive({
  semester: "",
  courseName: "",
  semesterYear: "",
  courseId: "",
});

// 可供选择的学期
const optionSemester = [
  {
    value: "1",
    label: "第一学期",
  },
  {
    value: "2",
    label: "第二学期",
  },
];

onMounted(() => {});
//传递给子组件的归档方法
const childArchiveCourse = (course) => {
  archiveCourseDialog.value = true;
  courseStore.awaitArchiveCourse = course;
};
//传递给子组件的退课方法
const childDropOutCourse = (course) => {
  dropOutCourseDialog.value = true;
  courseStore.awaitArchiveCourse = course;
};
//传递给子组件的编辑课程方法
const setCourse = (course) => {
  setCourseDialog.value = true;
  courseStore.awaitArchiveCourse = course;
  toSetCourse.courseName = course.courseName;
  toSetCourse.semester = course.semester;
  toSetCourse.semesterYear = course.semesterYear;
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
//课程编辑处理
const handleUpdateCourse = async (courseId) => {
  toSetCourse.semesterYear = toSetCourse.semesterYear
    .toString()
    .split(" ")[3]
    .toString();
  toSetCourse.courseId = courseId;
  await courseStore.editCourse(toSetCourse);
  setCourseDialog.value = false;
};
//归档全部
const archiveAll = async (courseId) => {
  archiveCourseDialog.value = false;
  await courseStore.archiveAllCourse(courseId);
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
.updateCourseFooter {
  display: flex;
  flex-flow: row;
  justify-content: flex-end;
  margin-top: 3vh;
}
</style>
