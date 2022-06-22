<template>
  <Navigation info="我的课堂" />
  <div class="container">
    <div class="main-all">
      <div class="main-top">
        <div class="two-button">
          <div class="createCourseBtn" v-show="status == 1">
            <ElButton type="primary" @click="createCourseDialog = true"
              ><el-icon><Plus /></el-icon>创建课程</ElButton
            >
          </div>
          <div class="addCourseBtn">
            <ElButton type="primary" @click="joinCourseDialog = true"
              ><el-icon><Plus /></el-icon>加入课程</ElButton
            >
          </div>
        </div>

        <div class="archiveMng">
          <div class="archiveMng-space"></div>

          <ElButton @click="archiveDialog = true">归档管理</ElButton>
          <el-input
            v-model="input2"
            class="w-20 m-2"
            placeholder="搜索我学的课程"
            :suffix-icon="Search"
            input-style="border-radius: 20px;width:8vw"
          />
        </div>
      </div>

      <div class="courseShow">
        <div class="demo-collapse">
          <CourseShow :status="status"></CourseShow>
        </div>
        <div class="allCourses"></div>
      </div>
    </div>

    <!-- 创建课程模态框 -->
    <el-dialog
      v-model="createCourseDialog"
      width="60vw"
      top="25vh"
      title="创建课程"
      draggable
    >
      <div class="createCourse">
        <div>
          课程名：<el-input
            class="createCourseInput"
            v-model="createCourse.courseName"
            placeholder="请输入课程名称"
            maxlength="10"
          />
        </div>
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
          @click="handleCreateCourse"
          >创建
        </el-button>
      </div>
    </el-dialog>

    <!-- 删除课程 模态框 -->
    <el-dialog v-model="deleteCourseDialog" width="450px" top="30vh">
      <p class="joinCourseTitle">确定要删除此课程吗?</p>
      <div class="delete-tips">
        <p>您的这个课程的任何信息或评论将被永久删除</p>
        <p>警告：此操作无法撤消</p>
      </div>
      <div class="joinCourseFooter">
        <div></div>
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
        <div></div>
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
    <el-dialog v-model="archiveDialog" title="归档管理" width="62vw" top="10vh">
      <el-divider></el-divider>
      <div class="archieveTable">
        <div class="left">
          <template v-for="(item, index) in archiveSemesterArr" :key="item">
            <div class="left_card" @click="showArchive(index)">
              {{ item }}
            </div>
          </template>
        </div>
        <div class="right">
          <template v-for="item in updateShowArchive" :key="item">
            <div class="rightCard">
              <div class="cardImg">
                <p class="cardQrCode">课堂码{{ item.addCourseCode }}</p>
              </div>
              <div class="cardInfo">
                <p class="info1">120230201,120230202</p>
                <p class="info2">{{ item.courseName }}</p>
                <p class="info3">成员{{ item.studentNum }}人</p>
              </div>
              <div class="cardTools">
                <div class="cardToolsSapce">
                  <div></div>
                  <div class="set">
                    <el-dropdown trigger="click">
                      <span class="el-dropdown-link">
                        <el-icon><More /></el-icon>
                      </span>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item
                            @click="recoverCourse(item.courseId)"
                            >恢复</el-dropdown-item
                          >
                          <el-dropdown-item
                            @click="deleteCourse(item.courseId)"
                            v-if="status == 1"
                            >删除</el-dropdown-item
                          >
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import Navigation from "@/components/Navigation";
import CourseShow from "./CourseShow.vue";
import { More } from "@element-plus/icons-vue";
import hooks from "@/hooks/index.js";
import { Plus, Search } from "@element-plus/icons-vue";
import { ref, reactive, onMounted, computed, toRaw } from "vue";
import storage from "@/hooks/storage";
import { useRouter } from "vue-router";
import { useCourseStore } from "@/store/course";
const router = useRouter();
const courseStore = useCourseStore();
let status = ref(0); //当前角色为 0为学生 1为老师
//模态框
let createCourseDialog = ref(false); // 创建课程
let joinCourseDialog = ref(false);
let deleteCourseDialog = ref(false);
let archiveDialog = ref(false);

const joinCode = ref(""); // 加入课程的课程码
let archiveSemesterArr = computed(() => courseStore.archiveSemesterArr);
let updateArchiveCourses = computed(() => courseStore.updateArchiveCourses);
let updateShowArchive = computed(() => courseStore.updateShowArchive);

// 新创建的课程
const createCourse = reactive({
  semester: "1",
  courseName: "",
  semesterYear: "",
  ownerId: storage.get("userInfo").userId,
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
onMounted(() => {
  getStatus();
  courseStore.init();
});

//获取当前用户的角色状态
const getStatus = () => {
  const userInfo = storage.get("userInfo");
  status.value = userInfo.status;
};
//加入课程
const joinCourse = async () => {
  console.log("加入", typeof joinCode.value);
  joinCourseDialog.value = false;
  const { userId } = storage.get("userInfo");
  await courseStore.joinCourse(joinCode.value, userId);
  joinCode.value = "";
};
//点击课程归档后 显示分类归档信息
const showArchive = (index) => {
  courseStore.showArchive(index);
};
//恢复归档课程
const recoverCourse = (courseId) => {
  courseStore.recoverArchiveCourse(courseId);
  archiveDialog.value = false;
};
//删除归档课程
const deleteCourse = (courseId) => {
  courseStore.deleteCourse(courseId);
  archiveDialog.value = false;
};
//创建课程
const handleCreateCourse = () => {
  createCourse.semesterYear = createCourse.semesterYear
    .toString()
    .split(" ")[3];
  courseStore.createCourse(createCourse);
  createCourse.semesterYear = "";
  createCourseDialog.value = false;
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  margin-top: 12vh;
  .main-all {
    padding: 0 10vw;
    .main-top {
      display: flex;
      flex-flow: column;
      width: 100%;
      height: 20vh;
      justify-content: space-around;
      align-items: flex-end;
      .two-button {
        display: flex;
        .addCourseBtn {
          margin-left: 2vw;
        }
      }

      .archiveMng {
        display: flex;
        flex-flow: row;
        align-items: space-around;
        .archiveMng-space {
          flex: 0.7;
        }
        el-input {
          flex: 0.2;
        }
      }
    }
  }
}
.joinCourseFooter {
  display: flex;
  flex-flow: row;
  justify-content: flex-end;
  margin-top: 3vh;
}

::v-deep .el-divider {
  margin: 0;
}
::v-deep .el-dialog__header {
  padding-bottom: 0;
}
.archieveTable {
  height: 70vh;
  display: flex;
  flex-flow: row;
  .right {
    width: 69%;
    overflow: hidden;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    .rightCard {
      margin: 3vh;
      margin-right: 0;
      width: 50vw;
      height: 15vh;
      display: flex;
      border: 1px solid $border;
      border-radius: 5px;
      .cardTools {
        flex: 0.5;
      }
      .cardInfo {
        flex: 0.3;
        display: flex;
        flex-flow: column;
        p {
          margin: 0.5vh 0;
        }
        .info2 {
          font-size: 16px;
          font-weight: bold;
        }
      }
      .cardImg {
        background: url("@/assets/bg/1.png") no-repeat center;
        width: 7vw;
        height: 10vh;
        margin: 2vh;
        flex: 0.16;
        .cardQrCode {
          margin: 0 0.8vh;
          margin-top: 7vh;

          font-size: 12px;
          font-weight: 350;
          color: white;
        }
      }
      .cardTools {
        display: flex;
        flex-flow: row;
        .cardToolsSpace {
          flex: 0.6;
        }
      }
    }
  }
  .left {
    width: 30%;
    overflow: hidden;
    border-right: 1px solid gray;
    .left_card {
      padding: 2vw;
      cursor: pointer;
      &:hover {
        color: $ktp-color;
        background-color: $light-blue;
      }
    }
  }
}
</style>
