<template>
  <div>
    <courseNav :cno="$route.params.cno" />
    <div class="outer">
      <div class="content">
        <div class="lstyle">
          <div>
            <ul>
              <li :class="{ active: isActive === 1 }" @click="change(1)">
                教学团队（{{ teaCount }}）
              </li>
              <li
                :class="{ active: isActive === 2 }"
                @click="change(2)"
                style="border-radius: 0"
              >
                全部学生（学生{{ stuCount }}）
              </li>
            </ul>
          </div>
        </div>
        <div class="rstyle">
          <div class="members">
            <div class="tittle">
              <span :class="{ hide: isActive !== 1 }"
                >教学团队（老师{{ teaCount }}）</span
              >
              <span :class="{ hide: isActive !== 2 }"
                >全部学生（学生{{ stuCount }}）</span
              >
            </div>
            <div
              class="tittle"
              v-if="$store.state.role === '2'"
              :class="{ hide: isActive !== 2 }"
              style="background-color: white"
            >
              <span>
                <el-checkbox
                  @change="selectAll()"
                  style="margin-right: 440px"
                  v-model="checked"
                  >全选 已选（{{ multipleSelection.length }}）人
                </el-checkbox>
                <el-button type="primary" @click="delAll">删除成员</el-button>
              </span>
            </div>
            <ul :class="{ hide: isActive !== 1 }">
              <li v-for="item in teachers" :key="item">
                <p class="tname">
                  <span
                    style="margin-left: 24px; margin-top: 20px"
                    :title="item.username"
                    >{{ item.username }}</span
                  >
                </p>
                <p class="mail" title="item.userId">{{ item.uid }}</p>
                <span style="line-height: 60px"
                  >（{{ item.school.schoolName }}）</span
                >
              </li>
            </ul>
            <ul :class="{ hide: isActive !== 2 }">
              <li
                class="stu-list"
                v-for="(item, index) in students"
                :key="item"
              >
                <el-checkbox
                  v-if="$store.state.role === '2'"
                  v-model="checkStatus[index]"
                  style="line-height: 55px; margin-right: 30px"
                  @change.stop="mutiplySelectionMethod(item, index)"
                >
                </el-checkbox>
                <p class="sname">
                  <span
                    style="margin-left: 24px; margin-top: 20px"
                    :title="item.name"
                    >{{ item.name }}</span
                  >
                </p>
                <p style="margin-left: 50px; margin-top: 20px" :title="item.id">
                  {{ item.id }}
                </p>
                <p class="mail" title="item.uid">{{ item.uid }}</p>
                <p
                  v-if="$store.state.role === '2'"
                  @click="delHandle(index)"
                  class="delete"
                  style="line-height: 60px; color: #32baf0"
                >
                  删除
                </p>
              </li>
            </ul>
            <!-- 删除提示框 -->
            <el-dialog title="提示" :visible="delVisible" width="300px" center>
              <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
              <span class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
              </span>
            </el-dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import courseNav from "../components/courseDetails/CourseNav";
import { ref, reactive, onMounted } from "vue";

const teachers = reactive([]);
const students = reactive([]);
const delarr = reactive([]); //待删除的某个学生
const multipleSelection = reactive([]); //多选学生数组
const checkStatus = reactive([]);
const stuCount = ref(0);
const teaCount = ref(0);
const isActive = ref(1); // 1 代表教师团队高亮、 2 代表学生团队高亮

const checked = ref(false);
const delVisible = ref(false); //删除模态框状态
const cname = ref("");

onMounted(() => {});
const cancel = () => {};
const change = (num) => {};
//单删
const delHandle = (index) => {};
//多删
const delAll = () => {};
//多选
const mutiplySelectionMethod = (item, index) => {};
const selectAll = () => {};
const clearSelect = () => {};
const factor = () => {};
const deleteRow = () => {};
const back = () => {};
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

.members ul li p.sname {
  width: 150px;
}

.members ul li p {
  float: left;
  margin-right: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.members ul li:hover {
  background: rgba(241, 243, 244, 1);
}

.tname img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-top: 15px;
}

.sname img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-top: 15px;
}

.members ul li p.tname span {
  display: inline-block;
  max-width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: top;
  margin-top: 20px;
}

.members ul li p.sname span {
  display: inline-block;
  max-width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: top;
  line-height: 20px;
}

.mail {
  min-width: 150px;
  max-width: 100px;
  margin-top: 20px;
}

.delete {
  cursor: pointer;
}

li.tname > p.mail {
  width: 300px;
}

li.sname > p.mail {
  width: 300px;
}

.hide {
  display: none;
}

.el-pagination {
  padding: 2px 400px;
}

.el-checkbox {
  float: left;
}

.stu-list p {
  width: 150px;
}

.stu-list p:last-child {
  text-align: right;
}
</style>
