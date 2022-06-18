<template>
  <div class="outer">
    <navigation />
    <!-- 上部分 -->
    <div class="layer-top">
      <div>
        <img :src="avatar" :alt="user.name" />
        <!--data:传递的参数-->
        <!--
                :headers="{token: $store.state.token}"
                    :data="{uid: $store.state.uid}"
                    -->
        <el-upload
          class="avatar-uploader"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          :on-change="onChange"
          :file-list="fileList"
          action=""
          :auto-upload="false"
          :before-upload="beforeAvatarUpload"
        >
          <div>选择图片</div>
        </el-upload>
        <el-button @click="submitUpload" style="position: relative; right: 10px"
          >上传头像</el-button
        >
      </div>
    </div>
    <div class="layer-bottom">
      <div>
        <div>
          <h3>基本资料</h3>
          <ul>
            <li>
              <p>姓名：</p>
              <div class="edit-box">
                <span v-if="!editBasic">{{ user.name }}</span>
                <input
                  v-else
                  type="text"
                  name="name"
                  v-model="name"
                  placeholder="请输入姓名"
                />
              </div>
              <div v-if="!editBasic" @click="changeEdit(1)">编辑资料</div>
              <div v-else @click="changeEdit(1)">放弃编辑</div>
            </li>
            <li>
              <p>学校：</p>
              <div class="edit-box">
                <span v-if="!editBasic">{{ showSchool }}</span>
                <input
                  v-else
                  type="text"
                  name="school"
                  v-model="school"
                  placeholder="请输入学校"
                />
              </div>
            </li>
          </ul>
          <div v-if="editBasic" class="save-btn" @click="save(1)">保存</div>
        </div>
        <div>
          <h3>身份角色</h3>
          <ul>
            <li>
              <p>角色：</p>
              <div class="edit-box">
                <span v-if="!editPermission">{{ showPermission }}</span>
                <div v-else>
                  <el-radio v-model="role" :label="1">学生</el-radio>
                  <el-radio v-model="role" :label="2">教师</el-radio>
                </div>
              </div>
              <div v-if="!editPermission" @click="changeEdit(2)">变更身份</div>
              <div v-else @click="changeEdit(2)">放弃变更</div>
            </li>
          </ul>
          <div v-if="editPermission" class="save-btn" @click="save(2)">
            保存
          </div>
        </div>
        <div>
          <h3>账号设置</h3>
          <ul>
            <li>
              <p v-if="!editUser">账号：</p>
              <p v-else>新密码：</p>
              <div class="edit-box">
                <span v-if="!editUser">{{ user.username }}</span>
                <input
                  v-else
                  type="password"
                  name="password"
                  v-model="pwd"
                  placeholder="请输入新密码"
                />
              </div>
              <div v-if="!editUser" @click="changeEdit(3)">修改</div>
              <div v-else @click="changeEdit(3)">放弃修改</div>
            </li>
            <li>
              <p v-if="!editUser">密码：</p>
              <p v-else>确认密码：</p>
              <div class="edit-box">
                <span v-if="!editUser">******</span>
                <input
                  v-else
                  type="password"
                  name="passwordAgain"
                  v-model="pwdAgain"
                  placeholder="请再次输入密码"
                  @focus="pwdChange(2)"
                  @blur="pwdChange(1)"
                />
                <b>两次密码不一致</b>
              </div>
            </li>
          </ul>
          <div v-if="editUser" class="save-btn" @click="save(3)">保存</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navigation from "@/components/homepage/Navigation";
import { ref, reactive, onMounted } from "vue";

const files = reactive([]);
// 文件数组
const fileList = reactive([]);
const schools = reactive([]);
const user = reactive([]);
let avatar = ref("");
let school = ref("");
let name = ref("");
let role = ref("");
let pwd = ref("");
let pwdAgain = ref("");
let editBasic = ref(false);
let editPermission = ref(false);
let editUser = ref(false);

const showSchool = computed(() =>
  user.school === undefined ? "" : user.school.schoolName
);
const showPermission = computed(() => (user.role === "2" ? "教师" : "学生"));
onMounted(() => {});

const onChange = (file, fileList) => {};
const changeEdit = (index) => {};
const pwdChange = (flag) => {};
const beforeAvatarUpload = (file) => {};
const uploadSuccess = (res) => {};
const uploadError = (res) => {};

const submitUpload = () => {};

const save = (status) => {};
</script>
<style lang="scss" scoped>
.outer {
  height: 100%;
  position: relative;
}

/* 上部分 */
.layer-top {
  height: 200px;
  margin-top: 65px;
  border-bottom: 1px solid #c8c8c8;
  text-align: center;
  margin-bottom: 40px;
  overflow: hidden;
}

.layer-top > div:first-child {
  margin: 45px auto 0;
  width: 73px;
}

.layer-top > div:first-child:hover > .avatar-uploader {
  opacity: 1;
}

.layer-top > div:first-child > img {
  height: 73px;
  width: 73px;
  margin: 0 auto;
  border-radius: 50%;
}

.layer-top > h1 {
  padding: 43px 0 10px;
  font-size: 28px;
  font-weight: 700;
  margin-top: -30px;
  line-height: 34px;
  height: 34px;
}

/* 下部分 */
.layer-bottom {
  border: 1px solid #c8c8c8;
  margin-top: 40px;
  margin-bottom: 60px;
  padding-bottom: 60px;
  background: #fff;
  font-size: 14px;
}

.layer-bottom > div {
  padding: 20px 120px 0;
}

.layer-bottom > div > div {
  margin-top: 20px;
}

.layer-bottom > div > div > h3 {
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #dcdcdc;
  padding-bottom: 20px;
  line-height: 1;
}

.layer-bottom > div > div > ul {
  padding-top: 10px;
}

.layer-bottom > div > div > ul > li {
  height: 32px;
  margin-top: 10px;
}

.layer-bottom > div > div > ul > li > p {
  float: left;
  min-width: 75px;
  line-height: 32px;
  color: #969696;
}

li {
  list-style: none;
}

.layer-bottom > div > div > ul > li > div:nth-child(2) > span {
  display: inline-block;
  color: #595959;
  line-height: 32px;
  height: 32px;
}

.layer-bottom > div > div > ul > li > div:nth-child(2) > input {
  width: 172px;
  height: 30px;
  line-height: 30px \9;
  border: 1px solid #c8c8c8;
  color: #595959;
  padding: 0 14px;
  border-radius: 3px;
  font-size: 14px;
  outline: none;
}

.layer-bottom > div > div > ul > li > div:nth-child(2) > input:focus {
  border: 1px solid #4d90fe;
}

.layer-bottom > div > div > ul > li:nth-child(2) > div:nth-child(2) > b {
  display: none;
  line-height: 32px;
  color: red;
  font-size: 12px;
  margin-left: 20px;
  font-weight: 400;
}

.layer-bottom > div > div > ul > li:first-child > div:last-child {
  float: right;
  min-width: 56px;
  height: 22px;
  text-align: center;
  line-height: 22px;
  font-size: 12px;
  border-radius: 3px;
  margin-top: 3px;
  padding-left: 5px;
  padding-right: 5px;
  cursor: pointer;
  user-select: none;
  color: #818181;
  border: 1px solid #c8c8c8;
  transition: 0.3s;
}

.layer-bottom
  > div
  > div:nth-child(1)
  > ul
  > li:first-child
  > div:last-child:hover,
.layer-bottom
  > div
  > div:nth-child(2)
  > ul
  > li:first-child
  > div:last-child:hover,
.layer-bottom
  > div
  > div:nth-child(3)
  > ul
  > li:first-child
  > div:last-child:hover {
  color: #2d2d2d;
  background: #e6e6e6;
}

.edit-box {
  float: left;
  position: relative;
}

.save-btn {
  display: block;
  margin-left: 75px;
  width: 56px;
  height: 26px;
  border-radius: 3px;
  background: #4d90fe;
  color: #fff;
  text-align: center;
  line-height: 26px;
  margin-top: 10px;
  cursor: pointer;
  user-select: none;
}

/* 上传头像 */
.avatar-uploader {
  position: absolute;
  top: 183px;
  color: #fff;
  background: rgba(0, 0, 0, 0.3);
  transition: 0.5s ease;
  font-size: 14px;
  border-radius: 50%;
  opacity: 0;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
}

.el-upload > div {
  height: 73px;
  width: 73px;
  border-radius: 50%;
  line-height: 73px;
  text-align: center;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 73px;
  height: 73px;
  border-radius: 50%;
  line-height: 73px;
  text-align: center;
}
.avatarUpdate {
  margin: 45px auto 0;
  width: 73px;
}
</style>
