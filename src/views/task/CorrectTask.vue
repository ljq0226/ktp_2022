<template>
  <div class="top"></div>
  <div class="table">
    <vxe-table :data="tableData" :row-config="{ isHover: true }">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="name" title="Name" sortable width="150"></vxe-column>
      <vxe-column field="stno" title="学号" sortable width="150"></vxe-column>
      <vxe-column field="score" title="分数" sortable width="150">
        <template #default="{ row }">
          <span style="textdecoration: underline">{{
            row.score == 0 ? "未批阅" : row.score
          }}</span>
          /100
        </template>
      </vxe-column>
      <vxe-column field="summitTime" title="提交时间" show-overflow>
        <template #default="{ row }">
          <span v-if="row.summitTime">{{ row.summitTime }}</span>
          <span v-else>未提交</span>
        </template>
      </vxe-column>
      <vxe-column title="批阅" show-overflow>
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="handleClick(row)"
            >进入批阅</el-button
          >
        </template>
      </vxe-column>
    </vxe-table>
  </div>
  <el-dialog v-model="correctTaskDialog" title="批改作业" width="70%">
    <a :href="correctTask.path">进行查看</a>
    <div>分数:<el-input v-model="score" /></div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="correctTaskDialog = false">返回</el-button>
        <el-button type="primary" @click="handleCorrect">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { useTaskStore } from "@/store/task";
import { useRoute } from "vue-router";
import moment from "moment";
const route = useRoute();
const taskStore = useTaskStore();
let taskId = ref("");
let score = ref("");
let tableData = ref([]);
let correctTask = reactive({});
let correctTaskDialog = ref(false);
const handleClick = (row) => {
  correctTaskDialog.value = true;
  correctTask = row;
};
onMounted(() => {
  taskId.value = route.query.taskId;
  getData();
});
const getData = async () => {
  await taskStore.getAllGrades(taskId.value);
  tableData.value = taskStore.taskGrades;
};
//确认提交
const handleCorrect = () => {
  let correctDto = {
    taskId: taskId.value,
    studentId: correctTask.studentId,
    score: score.value,
  };
  correctTaskDialog = false;
  taskStore.correct(correctDto);
  taskStore.getAllGrades(taskId.value);
};
</script>
<style lang="scss" scoped>
.table {
  padding: 3vh;
  margin-top: 5vh;
  width: 80vw;
}
</style>
