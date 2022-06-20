<template>
  <Navigation></Navigation>
  <div></div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import Navigation from "@/components/homePage/navigation";
import storage from "@/hooks/storage";
let status = ref(0); //当前角色为 0为学生 1为老师
let bg = ref("");

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

// 课程成员展示
const courseMember = () => {};
const updateCourse = () => {};
const clickOption = () => {};
const getCourse = () => {};
onMounted(() => {
  let randomNumber = Math.floor(Math.random() * 14) + 1;
  bg.value = `src/assets/bg/${randomNumber}.png`;
  getStatus();
});
//获取当前用户的角色状态
const getStatus = () => {
  const userInfo = storage.get("userInfo");
  status.value = userInfo.status;
};
</script>
<style lang="scss" scoped></style>
