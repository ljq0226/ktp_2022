<template>
  <Navigation info="课程成员" />
  <div>
    <div class="outer">
      <div class="content">
        <div class="lstyle">
          <div>
            <ul>
              <li @click="showTeacher">
                教学团队（教师{{ teachers.length }}人）
              </li>
              <li @click="showStudent" style="border-radius: 0">
                全部学生（学生{{ students.length }}人）
              </li>
            </ul>
          </div>
        </div>
        <div class="rstyle">
          <div class="members">
            <div class="tittle">{{ title }}</div>
            <div class="tittle" style="background-color: white"></div>
            <div class="infoTable">
              <el-table
                :data="courseStore.showCurrentCourseMembers"
                :default-sort="{ prop: 'name', order: 'descending' }"
                style="width: 100%"
              >
                <el-table-column
                  prop="name"
                  label="全部成员"
                  sortable
                  width="130"
                />
                <el-table-column
                  prop="stno"
                  label="学号"
                  sortable
                  width="180"
                />
                <el-table-column prop="userId" label="账号" />
                <el-table-column
                  prop="status"
                  label="身份"
                  :formatter="formatter"
                />
                <el-table-column prop="updateTime" label="加入时间" sortable />
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, toRaw } from "vue";
import Navigation from "@/components/homepage/Navigation.vue";
import { useRouter } from "vue-router";
import { useCourseStore } from "@/store/course";
const courseStore = useCourseStore();
const students = computed(() => courseStore.currentCourseStudents);
const teachers = computed(() => courseStore.currentCourseTeachers);
let title = ref(`教师(${courseStore.currentCourseTeachers.length})`);
const router = useRouter();

const formatter = (row, column) => {
  if (row.status == 0) return "学生";
  else return "老师";
};
onMounted(() => {
  courseStore.init();
  courseStore.selectAllMembers(router.currentRoute.value.params.cno);
});
const showTeacher = () => {
  title.value = `教师(${courseStore.currentCourseTeachers.length})`;
  courseStore.asd(courseStore.currentCourseTeachers);
};
const showStudent = () => {
  title.value = `学生(${courseStore.currentCourseStudents.length})`;
  courseStore.asd(courseStore.currentCourseStudents);
};
</script>
<style scoped lang="scss">
.outer {
  width: 1224px;
  padding-top: 112px;
  padding-bottom: 60px;
  margin-left: auto;
  margin-right: auto;
}
ul {
  margin: 0;
  padding: 0;
}
.content {
  background: #fff;
  border: 1px solid rgba(226, 230, 237, 1);

  min-height: 600px;
  border-radius: 8px;
  position: relative;
  zoom: 1;
}

.lstyle {
  width: 286px;
  min-height: 300px;
  float: left;
}
.lstyle ul li {
  height: 55px;
  line-height: 55px;
  padding: 0 24px;
  cursor: pointer;
  font-weight: 500;
  color: rgba(59, 61, 69, 1);
  font-family: PingFangSC-Medium;
  font-size: 16px;
  border-radius: 8px 0 0;
  list-style: none;
}
.lstyle ul li:hover {
  background-color: #e4edfd;
}

.lstyle ul li.active {
  background: #32baf0 !important;
  color: #fff;
}

.rstyle {
  width: 936px;
  border-left: 1px solid rgba(226, 230, 237, 1);
  min-height: 600px;
  margin-left: -1px;
  float: left;
}

.members .tittle {
  padding: 0 12px 0 25px;
  height: 55px;
  background: rgba(241, 243, 244, 1);
  border-radius: 0 8px 0 0;
  line-height: 55px;
}

.members ul {
  padding-bottom: 60px;
  max-height: 430px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.members ul li {
  height: 60px;
  padding: 0 25px;
  list-style: none;
}

.members ul li p.tname {
  width: 300px;
}
</style>
