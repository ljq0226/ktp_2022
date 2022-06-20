<template>
<Navigation info="课程成员" />
  <div>
    <div class="outer">
      <div class="content">
        <div class="lstyle">
          <div>
            <ul>
              <li  @click="change(1)">
                教学团队（{{ teaCount }}）
              </li>
              <li
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
              style="background-color: white"
            >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import Navigation from "@/components/homepage/Navigation.vue";

const isActive = ref(1); // 1 代表教师团队高亮、 2 代表学生团队高亮

onMounted(() => {});
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
