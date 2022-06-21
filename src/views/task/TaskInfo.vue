<template>
  <div class="allInfo">
    <div class="taskInfo">
      <div class="work">
        <div class="workWord">作业</div>
        <div class="workSpace"></div>
      </div>
      <p class="p1">{{ task.taskName }}</p>
      <p class="p2">
        <span class="span1">个人作业</span
        ><span class="span1">提交起止时间：{{ startAndEndTime }}</span
        ><span class="span2">5分</span><span class="span2">查重</span>
      </p>
      <p class="p3">{{ task.remarks }}</p>
      <p class="p4">提交要求:Word文档</p>
      <div class="d5"></div>
    </div>
    <div class="comment">
      <el-input
        v-model="textarea"
        :rows="2"
        type="textarea"
        placeholder="说点什么吧"
      />
    </div>
    <div class="commentBtn">
      <div class="d1">
        <el-radio>实名发表</el-radio>
      </div>
      <div class="d2">
        <el-icon><Link /></el-icon>添加附件
      </div>
      <div class="d3"><ElButton type="primary">发表评论</ElButton></div>
    </div>
    <div class="allComment">全部评论</div>
    <div class="noData">
      <img src="@/assets/noData.png" alt="" />
    </div>
  </div>
</template>
<script setup>
import { Link } from "@element-plus/icons-vue";
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useTaskStore } from "@/store/task";
import moment from "moment";
const taskStore = useTaskStore();
const route = useRoute();
let task = computed(() => taskStore.currentTask);
let startAndEndTime = ref("");
onMounted(() => {
  init();
});
const init = async () => {
  await taskStore.selectById(route.query.taskId);
  startAndEndTime.value = `${moment(task.releaseTime).format(
    "YY/MM/DD HH:mm"
  )}~ ${moment(task.cutOffTime).format("YY/MM/DD HH:mm")}`;
};
</script>

<style lang="scss" scoped>
.allInfo {
  display: flex;
  flex-flow: column;
  .taskInfo {
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    border: 1px solid $border;
    margin-top: 4vh;
    .work {
      display: flex;
      height: 5vh;
      .workWord {
        background-color: rgb(49, 204, 210);
        font-size: 14px;
        color: white;
        line-height: 5vh;
        padding: 0 1.5vh;
      }
      .workSpace {
        flex: 0.85;
      }
    }
    p {
      margin: 0.2vh 1vw;
    }
    .p1 {
      font-size: 14px;
      font-weight: bold;
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
    .p3,
    .p4 {
      font-size: 15px;
    }
    .d5 {
      padding: 2vh 0;
    }
  }
  .comment {
    margin: 4vh 0;
  }
  .commentBtn {
    display: flex;
    flex-flow: row;
    justify-content: flex-end;
    align-items: center;
    font-size: 14px;
    div {
      margin: 0 1vh;
    }
  }
  .noData {
    img {
      width: 40vw;
      height: 40vh;
      padding: 10vh 25vw;
    }
  }
}
</style>
