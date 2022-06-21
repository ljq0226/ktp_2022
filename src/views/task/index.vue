<template>
  <Navigation info="作业详情"></Navigation>
  <div>123</div>
</template>
<script setup>
import Navigation from "@/components/homepage/Navigation.vue";
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
let courseId = ref("");
let taskId = ref("");
onMounted(() => {
  //通过路由获取课程id 和作业id
  courseId = router.currentRoute.value.query.courseId;
  taskId = router.currentRoute.value.params.taskId;
});
</script>
<style lang="scss" scoped></style>
