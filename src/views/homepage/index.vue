<template>
  <Navigation info="我的课堂" />
  <div class="container">
    <div class="main">
      <div class="addCoureBtn">
        <ElButton type="primary" @click="joinCourseDialog = true"
          ><el-icon><Plus /></el-icon>加入课程</ElButton
        >
      </div>

      <div class="courseShow">
        <div class="allCourses">
          <template
            v-for="course in courseStore.allCourses"
            :key="course.courseId"
            class="courseCard"
          >
            <CourseCard
              @childDeleteCourse="childDeleteCourse"
              @childArchiveCourse="childArchiveCourse"
              :course="course"
              :status="status"
            />
          </template>
        </div>
      </div>
    </div>

    <!-- 快速发布任务模态框 -->
    <!--发布未实现-->
    <el-dialog :visible="quickReleaseDialog" width="40%" top="30vh">
      <p class="quickRelease">选择要发布的类型</p>
      <div class="quickReleaseSelect">
        <div class="quickReleaseIcon">
          <div></div>
          <p>公告</p>
        </div>

        <div class="quickReleaseIcon">
          <div></div>
          <p>话题</p>
        </div>

        <div class="quickReleaseIcon">
          <div></div>
          <p>课堂互动</p>
        </div>

        <div class="quickReleaseIcon">
          <div></div>
          <p>作业</p>
        </div>

        <div class="quickReleaseIcon">
          <div></div>
          <p>测试</p>
        </div>
      </div>
    </el-dialog>

    <!-- 创建课程模态框 -->
    <el-dialog
      v-if="status == 1"
      :visible="createCourseDialog"
      width="660px"
      top="30vh"
    >
      <p class="createCourseTitle">新建课程</p>
      <div class="createCourse">
        <el-input
          class="createCourseInput"
          v-model="createCourse.courseName"
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
            v-model="createCourse.semesterYear"
            type="year"
            placeholder="选择学年"
          >
          </el-date-picker>
          <el-select v-model="createCourse.semester">
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
        <el-button style="width: 100px" @click="createCourseDialog = false"
          >取消
        </el-button>
        <el-button
          type="primary"
          :disabled="createCourse.courseName.length <= 0"
          style="width: 100px"
          @click="create()"
          >创建
        </el-button>
      </div>
    </el-dialog>
    <!-- 归档课程 模态框 -->
    <el-dialog :visible="fileCourseDialog" width="450px" top="30vh">
      <p class="joinCourseTitle">确定要归档"{{ this.course.name }}"吗?</p>
      <div class="file-tips">
        <p>您可以在“课堂”-“归档管理”中查看此课程</p>
        <p>【归档】，学生的课程也会一起被归档</p>
      </div>

      <div class="joinCourseFooter">
        <el-button @click="fileCourseDialog = false" style="width: 100px"
          >取消
        </el-button>

        <el-button style="width: 100px" @click="courseArchive"
          >归档全部
        </el-button>
      </div>
    </el-dialog>

    <!-- 删除课程 模态框 -->
    <el-dialog :visible="deleteCourseDialog" width="450px" top="30vh">
      <p class="joinCourseTitle">
        确定要删除"{{ this.deleteCourseObj.courseName }}"吗?
      </p>

      <div class="delete-tips">
        <p>您的这个课程的任何信息或评论将被永久删除</p>
        <p>警告：此操作无法撤消</p>
        <p>提醒：已用课程数包含了“删除课程数”</p>
      </div>
      <div class="joinCourseFooter">
        <el-button @click="deleteCourseDialog = false" style="width: 100px"
          >取消
        </el-button>
        <el-button type="primary" style="width: 100px" @click="deleteCourse()"
          >删除
        </el-button>
      </div>
    </el-dialog>

    <!-- 加入课程 模态框 -->
    <el-dialog
      v-model="joinCourseDialog"
      title="加入课程"
      width="50vw"
      top="30vh"
      :before-close="handleClose"
    >
      <div class="joinCourseTitle">
        <el-input
          v-model="joinCode"
          class="joinCourseInput"
          placeholder="请输入课程加课码"
          style="font-size: 16px"
          maxlength="8"
          minlength="1"
        />
      </div>
      <div class="joinCourseFooter">
        <el-button @click="joinCourseDialog = false" style="width: 100px"
          >取消
        </el-button>
        <el-button
          type="primary"
          style="width: 100px"
          :disabled="joinCode.length !== 8"
          @click="joinCourse"
          >确认
        </el-button>
      </div>
    </el-dialog>

    <!-- 课程排序和归档管理 模态框-->
    <el-dialog :visible="SFDialog" width="810px" top="30vh">
      <div class="SFtitle">
        <p @click="selectSF(0)">课程排序</p>
        <p class="SFClick" @click="selectSF(1)">归档管理</p>
      </div>
      <!--课程排序-->
      <div v-if="SFState == 0">
        <!--draggable为true表示可拖拽-->
        <div
          ref="sortCourse"
          class="sortCourse"
          v-for="course of courseList"
          :key="course.cno"
          draggable="true"
        >
          <span></span>
          {{ course.courseName }}
        </div>
        <div ref="test"></div>
      </div>
      <!--课程存档-->
      <div v-else class="archive">
        <!--ArchiveFile.vue-->
        <!--监听子组件定义函数(事件) childDeleteCourse，第二个childDeleteCourse为父组件函数用于接收子组件传值并进行相应数据处理，可定义为同一个名称-->
        <!--course: 父组件向子组件传值-->
        <!--拖动移除  @dropOut="dropOut"-->
        <archiveFile
          class="archiveFile"
          v-for="archiveCourse in archiveCourses"
          :key="archiveCourse.cno"
          :course="archiveCourse"
          @childDeleteCourse="childDeleteCourse"
          @childRecoveryCourse="childRecoveryCourse"
          @dragleave="dropOut"
        />
      </div>
    </el-dialog>

    <!-- 恢复课程提示 模态框 -->
    <el-dialog :visible="recoveryTipsDialog" width="350px" top="30vh">
      <p class="joinCourseTitle">确定要恢复"{{ course.courseName }}"吗?</p>
      <div class="delete-tips">
        <p>您和您的学生将可以重新在此课程中互动。</p>
        <p>此课程会在课堂页上显示。</p>
      </div>

      <div class="joinCourseFooter">
        <el-button @click="recoveryTipsDialog = false" style="width: 100px"
          >取消
        </el-button>
        <el-button type="primary" style="width: 100px" @click="courseRecover"
          >恢复课程
        </el-button>
      </div>
    </el-dialog>

    <!-- 退出课程 模态框 -->
    <el-dialog :visible="dropOutDialog" width="450px" top="30vh">
      <p class="joinCourseTitle">
        确定要删除"{{ this.dropOutObj.courseName }}"吗?
      </p>
      <div class="delete-tips">
        <p>您的这个课程的任何信息或评论将被永久删除</p>
        <p>警告：此操作无法撤消</p>
        <p>提醒：已用课程数包含了“删除课程数”</p>
      </div>

      <div class="joinCourseFooter">
        <el-button @click="dropOutDialog = false" style="width: 100px"
          >取消
        </el-button>
        <el-button type="primary" style="width: 100px" @click="dropOut"
          >退出课程
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import Navigation from "@/components/homepage/Navigation";
import CourseCard from "@/components/homepage/CourseCard";
import ArchiveFile from "@/components/homepage/ArchiveFile";
import hooks from "@/hooks/index.js";
import { Plus } from "@element-plus/icons-vue";
import { ref, reactive, onMounted } from "vue";
import storage from "@/hooks/storage";
import { useRouter } from "vue-router";
import { useCourseStore } from "@/store/course";
const router = useRouter();
const courseStore = useCourseStore();

let status = ref(0); //当前角色为 0为学生 1为老师
const topList = reactive([]); // 置顶课程
let allCourses = reactive([]); // 所有课程 拿来操作
const archiveCourses = reactive([]); // 存档课程
const courseList = reactive([]); // 所有课程
const fileCourses = reactive([]); // 归档文件
const quickReleaseDialog = ref(false); //快速发布活动
let createCourseDialog = ref(false); // 创建课程
const SFDialog = ref(false); // 课程排序与归档
const SFState = ref(1); // 0为课程排序 1为归档管理 最开始登录页面时默认展示 归档管理
// 新创建的课程
const createCourse = reactive({
  semester: 1,
  courseName: "",
  semesterYear: "",
  owner: {
    // 从vuex仓库中拿全局状态值
    uid: "", //uid
  },
});
// 可供选择的学期
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
let joinCourseDialog = ref(false);
const deleteCourseDialog = ref(false);
const fileCourseDialog = ref(false);
const recoveryTipsDialog = ref(false);
const transferCourseDialog = ref(false);
const dropOutDialog = ref(false);
const joinCode = ref(""); // 加入课程的课程码
const deleteCourseObj = reactive({}); // 要删除的课程
const course = reactive({}); // 要恢复的课程
const dropOutObj = reactive({}); // 要退出的课程

onMounted(() => {
  getStatus();
  courseStore.init();
});

//获取当前用户的角色状态
const getStatus = () => {
  const userInfo = storage.get("userInfo");
  status.value = userInfo.status;
};
const showsth = () => {
  allCourses = [1, 2, 3];
};
const joinCourse = async () => {
  console.log("加入", typeof joinCode.value);
  joinCourseDialog.value = false;
  const { userId } = storage.get("userInfo");
  await courseStore.joinCourse(joinCode.value, userId);
};
</script>
<style lang="scss" scoped>
@import url("@/styles/Homepage.scss");
</style>
