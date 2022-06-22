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
      <ElButton type="primary" @click="submitTask">确认提交</ElButton>
    </div>
    <div class="submitFile">
      <p>作业附件</p>
      <el-upload
        class="upload-demo"
        action="#"
        :http-request="uploadAction"
        :limit="1"
        :show-file-list="true"
        :auto-upload="true"
        :file-list="fileList"
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
  </div>
</template>
<script setup>
import { Clock } from "@element-plus/icons-vue";
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useTaskStore } from "@/store/task";
import { annexService } from "@/api";
import moment from "moment";
import storage from "@/hooks/storage";
const taskStore = useTaskStore();
const router = useRouter();
const { userId } = storage.get("userInfo");
let startAndEndTime = ref("");
let fileList = ref([]);
let remarks = ref("");
//上传附件
const uploadAction = async (option) => {
  let param = new FormData();
  param.append("file", option.file);
  const taskId = taskStore.currentTask.taskId;
  const res = await annexService.uploadAnnex(taskId, userId, param);
  if (res.code === 200) {
    ElMessage.success("附件上传成功");
  } else {
    ElMessage.error(res.msg);
  }
};

let task = computed(() => taskStore.currentTask);

onMounted(() => {
  init();
});
const init = () => {
  startAndEndTime.value = `${moment(task.releaseTime).format(
    "YY/MM/DD HH:mm"
  )}~ ${moment(task.cutOffTime).format("YY/MM/DD HH:mm")}`;
};
//提交作业
const submitTask = async () => {
  console.log(task.taskId);
  console.log(remarks);
  console.log(fileList);

  // await taskStore.submitTask(task.taskId,remarks,file)
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
  justify-content: space-between;
  align-items: center;
  margin: 2vh 0;
  p {
    font-size: 19px;
  }
}
.submitFile {
  .upload-demo {
  }
}
</style>
