<template>
  <div class="top"></div>
  <div class="table">
    <el-table :data="taskGrades" style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column fixed prop="stno" label="学号" width="180" sortable />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="score" label="成绩" width="150" sortable>
        {{ score }}/100
      </el-table-column>
      <el-table-column prop="score" label="批阅状态" width="150">
        {{ score ? "已批阅" : "未批阅" }}
      </el-table-column>
      <el-table-column prop="summitTime" label="作业提交时间" width="180">
        {{ summitTime ? moment(summitTime).format("MM/DD HH:mm") : "未提交" }}
      </el-table-column>
      <el-table-column prop="path" label="作业提交时间" width="180">
        {{ path }}
      </el-table-column>
      <el-table-column fixed="right" label="" width="120">
        <template #default>
          <el-button link type="primary" size="small" @click="handleClick()"
            >进入批阅</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog v-model="correctTaskDialog" title="批改作业" width="70%">
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="correctTaskDialog = false">Cancel</el-button>
        <el-button type="primary" @click="correctTaskDialog = false"
          >Confirm</el-button
        >
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
let taskGrades = computed(() => taskStore.taskGrades);
let taskId = ref("");
const correctTaskDialog = ref(false);
const handleClick = () => {
  correctTaskDialog.value = true;
};
onMounted(() => {
  taskId.value = route.query.taskId;
  taskStore.getAllGrades(taskId.value);
  console.log(taskGrades);
});
</script>
<style lang="scss" scoped>
.table {
  padding: 3vh;
  margin-top: 5vh;
  width: 80vw;
}
</style>
