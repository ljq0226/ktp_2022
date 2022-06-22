<template>
  <div class="module_all">
    <div class="module_func">
      <div class="m_item" @click="item = 1">目录</div>
      <div class="m_item" @click="noServer">互动课件</div>
      <div class="m_item" @click="showTask">作业</div>
      <div class="m_item" @click="noServer">测试</div>
      <div class="m_item" @click="noServer">资料</div>
      <div class="m_item" @click="noServer">公告</div>
      <div class="m_item" @click="noServer">话题</div>
      <div class="func_space"></div>
    </div>
    <div class="module_show">
      <div class="m_directory" v-show="item == 1">
        <img src="@/assets/noData.png" alt="" />
      </div>
      <div v-show="item == 3">
        <div class="createTask" v-show="status == 1">
          <ElButton type="primary" @click="dialogFormVisible = true"
            >发布作业</ElButton
          >
        </div>
        <div class="allTask">
          <template v-for="item in taskStore.courseTask" :key="item.taskId">
            <div class="taskItem">
              <div class="taskImg"></div>
              <div class="taskInfo">
                <p class="taskName" @click="toTaskInfo(item.taskId)">
                  {{ item.taskName }}
                </p>
                <p class="p2">
                  <span class="span1">个人作业</span
                  ><span class="span1"
                    >提交起止时间：{{
                      `${moment(item.releaseTime).format(
                        "YY/MM/DD HH:mm"
                      )}~ ${moment(item.cutOffTime).format("YY/MM/DD HH:mm")}`
                    }}</span
                  ><span class="span2">5分</span><span class="span2">查重</span>
                </p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
  <!-- 发布作业 -->
  <el-dialog v-model="dialogFormVisible" title="发布作业" draggable>
    <el-form :model="form" label-width="120px">
      <el-form-item label="作业名称">
        <el-input v-model="form.taskName" />
      </el-form-item>
      <el-form-item label="作业要求">
        <el-input v-model="form.remarks" type="textarea" />
      </el-form-item>
      <el-form-item label="截止日期">
        <!-- <el-col :span="11">
          <el-date-picker
            v-model="form.date1"
            type="date"
            placeholder="Pick a date"
            style="width: 100%"
          />
        </el-col>
        <el-col :span="2" class="text-center">
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="11">
          <el-time-picker
            v-model="form.date2"
            placeholder="Pick a time"
            style="width: 100%"
          />
        </el-col> -->
        <el-date-picker
          v-model="form.defaultTime"
          type="daterange"
          start-placeholder="Start date"
          end-placeholder="End date"
        />
      </el-form-item>
      <el-form-item label="是否查重" v-model="form.check">
        <el-switch />
      </el-form-item>
      <el-form-item label="上传附件📎">
        <el-upload
          class="upload-demo"
          action="#"
          :http-request="uploadAction"
          :limit="1"
          :show-file-list="true"
          :auto-upload="true"
        >
          <el-button type="primary">Click to upload</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="publishTask()">发布</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { useTaskStore } from "@/store/task";
import { useCourseStore } from "@/store/course";
import storage from "@/hooks/storage";
import { useRouter } from "vue-router";
import moment from "moment";
const router = useRouter();
const props = defineProps({ courseId: String });
const taskStore = useTaskStore();
const courseStore = useCourseStore();
let courseId = ref("");
let item = ref(1); //自增对应目录 互动课件 作业 测试 。。
let status = ref(0);

const dialogFormVisible = ref(false);
const form = reactive({
  taskName: "",
  remarks: "",
  defaultTime: [],
});
let toSubmitFile;
//上传附件
const uploadAction = async (option) => {
  toSubmitFile = option.file;
  let param = new FormData();
  param.append("file", option.file);
  toSubmitFile = param;
};

onMounted(() => {
  courseId.value = router.currentRoute.value.params.cno;
  init();
});
//获取该课程从所有作业
const init = async () => {
  await taskStore.selectAllTask(courseId.value);
};
//展示所有作业
const showTask = () => {
  item.value = 3;
  const userInfo = storage.get("userInfo");
  status.value = userInfo.status;
  if (!status.value) {
    //如果为学生
    if (taskStore.courseTask.length == 0)
      ElMessage.warning("老师暂未发布作业！");
    setTimeout(() => {
      item.value = 1;
    }, 1500);
  }
};
//跳转到作业详情
const toTaskInfo = (taskId) => {
  let path = `/task/${taskId}`;
  router.push({ path, query: { courseId: courseId.value, taskId } });
};
//发布作业
const publishTask = async () => {
  dialogFormVisible.value = false;
  const taskInfo = {
    courseId: courseId.value,
    taskName: form.taskName,
    remarks: form.remarks,
    releaseTime: moment(form.defaultTime[0]).format("YYYY-MM-DD HH:mm:ss"),
    cutOffTime: moment(form.defaultTime[1]).format("YYYY-MM-DD HH:mm:ss"),
  };
  await taskStore.createTask(taskInfo, toSubmitFile);
  init();
};
const noServer = () => {
  ElMessage.warning("暂未开放，尽请期待！");
};
</script>
<style lang="scss" scoped>
.module_all {
  .module_func {
    display: flex;
    justify-content: space-between;
    .m_item {
      padding: 2vh 0;
      cursor: pointer;
      border-bottom: 3px solid white;
      &:hover {
        border-bottom: 3px solid $ktp-color;
        color: $ktp-color;
      }
    }
    .func_space {
      flex: 0.6;
    }
  }
  .createTask {
    margin: 2vh 0;
  }
  .module_show {
    .allTask {
      border: 1px solid $ktp-color;
      .taskItem {
        display: flex;
        flex-flow: row;
        .taskImg {
          width: 6vw;
          height: 12vh;
          margin: 2.3vh 4vh;
          background: url("@/assets/task.png") no-repeat center center;
          background-size: cover;
        }
        .taskInfo {
          border-bottom: 1px solid $border;
          flex: 1;
          p {
            margin: 0;
          }
          .taskName {
            cursor: pointer;
            font-size: 16px;
            font-weight: 350;
            margin: 2vh 0;
          }
          .p2 {
            span {
              margin-right: 1vh;
              font-size: 12px;
            }
            .span1 {
              color: rgb(98, 152, 246);
              background-color: rgb(235, 243, 254);
            }
            .span2 {
              color: rgb(192, 195, 198);
              background-color: rgb(248, 249, 250);
            }
          }
        }
      }
    }

    img {
      width: 40vw;
      height: 40vh;
      padding: 10vh 20vw;
    }
  }
}
</style>
