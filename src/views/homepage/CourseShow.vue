<template>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange" accordion>
      <template v-for="(item, index) in semesterArr" :key="item">
        <el-collapse-item :title="item" :name="index">
          <div>1</div>
          <div>2</div>
        </el-collapse-item>
      </template>
      <!-- <el-collapse-item title="Consistency" name="1">
              <div>1</div>
              <div>2</div>
            </el-collapse-item>
            <el-collapse-item title="Feedback" name="2">
              <div>3</div>
              <div>4</div>
            </el-collapse-item>
            <el-collapse-item title="Efficiency" name="3">
              <div>5</div>
              <div>6</div>
              <div>7</div>
            </el-collapse-item>
            <el-collapse-item title="Controllability" name="4">
              <div>8</div>
              <div>9</div>
            </el-collapse-item> -->
    </el-collapse>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useCourseStore } from "@/store/course";
const courseStore = useCourseStore();
let semesterArr = computed(() => courseStore.semesterArr);
let updateCourse = computed(() => courseStore.updateCourse);
const activeNames = reactive([]);
const handleChange = (val) => {
  console.log(val);
};
</script>
<style lang="scss" scoped></style>
