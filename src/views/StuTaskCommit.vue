<template>
  <div class="wrapper-stu-commit" v-if="this.renderKey">
    <task-commit-nav
      :cname="course.courseName"
      :tno="task.tno"
      :cno="course.cno"
      @back="back"
    />
    <div class="task-info">
      <div class="task-head">
        <div class="task-title">
          <span>{{ task.taskName }}</span>
        </div>
        <div class="task-word">
          <span v-html="task.taskContent"></span>
        </div>
      </div>
      <div class="task-props">
        <span
          >截止日期：{{ date_format(task.cutOffTime) }}
          {{ time_format(task.cutOffTime) }}</span
        >
        <span>个人作业</span>
      </div>
    </div>
    <div class="submit">
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <div class="submit-box">
        <el-button
          style="width: 102px"
          type="primary"
          :disabled="isDisabled"
          plain
          @click="submit"
          >{{ grade.answer == null ? "提交" : "更新提交" }}</el-button
        >
      </div>
      <span style="float: right">{{
        grade.answer === null ? "未完成" : "已提交"
      }}</span>
    </div>
    <div class="work-text">
      <span>答：</span>
      <el-input
        style="width: 97%; float: right"
        type="textarea"
        :autosize="{ minRows: 5 }"
        placeholder="点击编辑作业内容（仅老师可看）..."
        @input="canDisabled"
        v-model="answer"
      >
      </el-input>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import TaskCommitNav from "components/utils/TaskCommitNav";

const course = reactive({});
const task = reactive({});
const grade = reactive({});

let renderKey = ref(false);
let isDisabled = ref(true);
let end_date = ref("");
let answer = ref("");
const fileList = reactive([
  {
    name: "food.jpeg",
    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
  },
  {
    name: "food2.jpeg",
    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
  },
]);

onMounted(() => {});
const submit = () => {};
const canDisabled = () => {};
const date_format = (date) => {};
const time_format = (date) => {};
const back = () => {};
const handleExceed = () => {};
const handleRemove = () => {};
const handlePreview = () => {};
const beforeRemove = () => {};
</script>
<style lang="scss" scoped>
.submit-box {
  margin-left: 968px;
}
.wrapper-stu-commit {
  width: 83%;
  margin: 0 auto;
  font-size: 14px;
  font-family: "PingFang SC", tahoma, arial, "helvetica neue",
    "hiragino sans gb", "microsoft yahei ui", "microsoft yahei", simsun,
    sans-serif;
}
.task-info {
  padding-top: 100px;
}
.submit {
  margin-top: 40px;
}
.task-title {
  font-size: 18px;
}
.task-word {
  font-size: 12px;
  margin-top: 14px;
  color: #5f6368;
}
.task-props {
  margin-top: 30px;
}
.task-props span {
  background-color: #f1f3f4;
  font-size: 12px;
  color: #5f6368;
  padding: 3px 5px;
  margin-right: 10px;
}
.work-text {
  margin-top: 20px;
}
</style>
