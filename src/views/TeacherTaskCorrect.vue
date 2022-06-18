<template>
  <div class="wrapper-tsc">
    <task-commit-nav
      :cname="cname"
      :cno="$route.params.cno"
      :tno="$route.params.tno"
      @back="back"
    />
    <el-table :data="gradeData" style="width: 100%; padding-top: 100px">
      <el-table-column type="expand" width="100px">
        <template>
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="学生答案">
              <span>{{ props.row.answer }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="学号" prop="user.id"> </el-table-column>
      <el-table-column label="姓名" prop="user.name"> </el-table-column>
      <el-table-column label="成绩">
        <template v-slot="scope">
          <el-input
            class="score-input"
            v-show="scope.row.isShow"
            v-model="scope.row.score"
            size="mini"
            @blur="score_in_handler(scope.row)"
          >
          </el-input>
          <span
            v-show="!scope.row.isShow"
            class="score-in"
            @click="showInput(scope.row)"
            >{{ scope.row.score }}</span
          >
          /100
        </template>
      </el-table-column>
      <el-table-column label="批改状态">
        <template v-slot="scope">
          <span>{{
            scope.row.correctStatus === false ? "未批改" : "已批改"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-link type="primary" @click="into_judge(scope.row.user.id)"
            >进入批阅</el-link
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="学生答案" :visible="markModalVisible">
      <div class="mark-modal">
        <el-carousel
          ref="markCarousel"
          :autoplay="false"
          trigger="click"
          height="300px"
        >
          <el-carousel-item
            v-for="item in gradeData"
            :key="item.user.uid"
            :name="item.user.id"
          >
            <div class="modal-answer">
              <div class="score-modal-wrapper">
                <span>成绩：</span>
                <el-input
                  class="score-modal"
                  v-model="item.score"
                  :id="item.user.uid"
                  size="mini"
                  @blur="score_in_handler(item)"
                >
                </el-input>
                <span>/100</span>
              </div>
              <div>学生{{ item.user.name }}的答案：</div>
              <div class="answer-box">{{ item.answer }}</div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="dialog-footer">
        <el-button @click="markModalVisible = false">取 消</el-button>
        <el-button type="primary" @click="markModalVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import TaskCommitNav from "components/utils/TaskCommitNav";
import { ref, reactive, onMounted } from "vue";

const course = reactive({});
const tasks = reactive([]);
let editCourseDialog = ref(false);
let editCourseThemeDialog = ref(false);
let bg = ref("");
let optionState = ref(0); // 0为课堂互动 1为教师作业 2为学生作业 3为话题
const editCourseObj = reactive({
  courseName: "",
});
const optionSemester = [
  {
    value: 1,
    label: "第一学期",
  },
  {
    value: 2,
    label: "第二学期",
  },
];

onMounted(() => {});
const showInput = (grade_row) => {};
const score_in_handler = (row) => {};
const into_judge = (i_no) => {};
const back = () => {};
</script>
<style lang="scss" scoped>
.wrapper-tsc {
  position: relative;
  width: 83%;
  margin: auto;
  font-size: 14px;
  font-family: "PingFang SC", tahoma, arial, "helvetica neue",
    "hiragino sans gb", "microsoft yahei ui", "microsoft yahei", simsun,
    sans-serif;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-dropdown-link:hover {
  color: #4d90fe;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.score-input {
  width: 60px;
}
.score-in {
  display: inline-block;
  border-bottom: 1px #818181 solid;
  width: 60px;
  text-align: center;
  font-size: 18px;
}
.mark-modal {
  height: 300px;
}
.score-modal-wrapper {
  float: right;
  width: 131px;
}
.score-modal,
.mark-input {
  width: 60px;
}
.modal-answer {
  padding: 20px 60px;
}
.answer-box {
  padding: 20px;
  text-indent: 20px;
  border: 1px solid gold;
  border-radius: 8px;
  margin-top: 20px;
}
.el-carousel__item {
  background-color: #99a9bf;
}
</style>
