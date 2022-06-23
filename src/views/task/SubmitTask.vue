<template>
  <div class="submitAll">
    <div class="card">
      <div class="taskItem">
        <div class="taskImg"></div>
        <div class="taskInfo">
          <p class="taskName">
            {{ task.taskName }}
            <span @click="showVip">查看谁交了</span>
          </p>
          <p class="p2">
            <span class="span1">个人作业</span
            ><span class="span1"
              >提交起止时间：{{
                `${moment(task.releaseTime).format("YY/MM/DD HH:mm")}~ ${moment(
                  task.cutOffTime
                ).format("YY/MM/DD HH:mm")}`
              }}</span
            ><span class="span2">5分</span><span class="span2">查重</span>
          </p>
        </div>
      </div>
    </div>
    <div class="submitWord">
      <p>
        提交内容
        <span style="font-size: 13px; color: rgb(85, 145, 245); cursor: pointer"
          ><el-icon><Clock /></el-icon>提交历史</span
        >
      </p>
      <div class="buttons">
        <ElButton
          type="primary"
          @click="submitTask"
          v-show="!taskStaus.isSubmit"
          >确认提交</ElButton
        >
        <ElButton type="primary" @click="checkRes" v-show="taskStaus.isSubmit"
          >查重结果</ElButton
        >
        <ElButton type="primary" @click="showVip" v-show="taskStaus.isSubmit"
          >更新提交</ElButton
        >
      </div>
    </div>
    <div class="submitFile" v-if="!taskStaus.isSubmit">
      <p>作业附件</p>
      <el-upload
        class="upload-demo"
        action="#"
        :http-request="uploadAction"
        :limit="1"
        :show-file-list="true"
        :auto-upload="true"
      >
        <el-button type="primary">Click to upload</el-button>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500kb
          </div>
        </template>
      </el-upload>
      <p>
        作业留言<span
          style="font-size: 12px; padding-left: 1vh; color: rgb(160, 161, 163)"
          >选填</span
        >
      </p>
      <el-input
        v-model="remarks"
        :rows="4"
        type="textarea"
        placeholder="作业以附件形式提交，留言仅作备注使用哦！"
      />
    </div>

    <div class="updateFile" v-if="taskStaus.isSubmit">
      <div class="top">
        <div class="d1">老师评语</div>
        <div class="d2">暂无<span>已提交</span></div>
      </div>
      <div class="d3">作业附件<span>1个</span></div>
      <div class="d4">
        <!-- <img src="@/assets/fileicons/doc.png" alt="" /> -->

        <a :href="taskStaus.path">下载作业</a>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Clock } from "@element-plus/icons-vue";
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useTaskStore } from "@/store/task";
import moment from "moment";
import storage from "@/hooks/storage";
const taskStore = useTaskStore();
const router = useRouter();
const { userId } = storage.get("userInfo");
let startAndEndTime = ref(""); //格式化时间
let toSubmitFile; //提交文件
let remarks = ref(""); //提交留言
let task = computed(() => taskStore.currentTask); //当前作业信息
let taskStaus = computed(() => taskStore.submitStatus); //当前作业信息

//上传附件
const uploadAction = async (option) => {
  toSubmitFile = option.file;
};
onMounted(() => {
  init();
  getTaskStatus();
});
const init = () => {
  //格式化时间
  startAndEndTime.value = `${moment(task.releaseTime).format(
    "YY/MM/DD HH:mm"
  )}~ ${moment(task.cutOffTime).format("YY/MM/DD HH:mm")}`;
};
//提交作业
const submitTask = async () => {
  const taskId = taskStore.currentTask.taskId;
  let param = new FormData();
  param.append("file", toSubmitFile);
  await taskStore.submitTask(taskId, remarks.value, param);
  getTaskStatus();
};
//获取该作业下的提交情况
const getTaskStatus = async () => {
  const { userId } = storage.get("userInfo");
  await taskStore.getSubmitStatus(taskStore.currentTask.taskId, userId);
};
const checkRes = () => {
  ElMessage.success("请充值VIP后再试！！！");
};
const showVip = () => {
  ElMessage.success("请充值SVIP!");
};
</script>
<style lang="scss" scoped>
.taskItem {
  display: flex;
  flex-flow: row;
  .taskImg {
    width: 6vw;
    height: 12vh;
    margin: 1vh 1vh;
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
      span {
        font-size: 14px;
        color: rgb(66, 132, 244);
        float: right;
      }
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
    .taskStatus {
      font-size: 12px;
      color: rgb(78, 140, 244);
    }
  }
}
.submitWord {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 2vh 0;
  .buttons {
    flex: 1;
    display: flex;
    flex-flow: row;
    justify-content: flex-end;
  }
  p {
    font-size: 19px;
  }
}
.updateFile {
  display: flex;
  flex-flow: column;
  .top {
    background-color: rgb(248, 249, 250);
    padding: 3vh;
    .d1 {
      margin: 2.5vh 0;
    }
    .d2 {
      line-height: 20px;
      width: 35vw;
      padding: 2.5vh 0;
      padding-right: 20vw;
      background-color: rgb(255, 255, 255);
      span {
        float: right;
        color: $ktp-color;
        font: 34px;
      }
    }
  }
  .d3 {
    margin: 4vh 0;
  }
  .d4 {
    border: 1px solid $border;
    img {
      width: 10vw;
      height: 10vh;
    }
  }
}
</style>
