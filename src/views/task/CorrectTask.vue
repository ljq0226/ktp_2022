<template>
  <div class="top"></div>
  <div class="table">
    <el-table :data="taskGrades" style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column fixed prop="stno" label="学号" width="250" sortable />
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="score" label="成绩" width="120" sortable>
        <span style="textdecoration: underline">{{ score ? score : "0" }}</span
        >/100
      </el-table-column>
      <el-table-column prop="summitTime" label="提交时间" width="120">
        {{ summitTime ? moment(summitTime).format("MM/DD HH:mm") : "未提交" }}
      </el-table-column>
      <el-table-column fixed="right" label="" width="120">
        <template #default>
          <el-button link type="primary" size="small" @click="handleClick"
            >进入批阅</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { useTaskStore } from "@/store/task";
import { useRoute } from "vue-router";
const route = useRoute();
const taskStore = useTaskStore();
let taskGrades = computed(() => taskStore.taskGrades);
let taskId = ref("");
const handleClick = () => {
  console.log("click");
};
onMounted(() => {
  taskId.value = route.query.taskId;
  taskStore.getAllGrades(taskId.value);
});

const getData = () => {};
</script>
<style lang="scss" scoped>
.table {
  padding: 3vh;
  margin-top: 5vh;
  width: 80vw;
}
</style>
