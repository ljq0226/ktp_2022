<template>
  <Navigation info="作业详情"></Navigation>
  <div class="taskMain">
    <div class="routerLink">
      <router-link
        :to="{ name: 'TaskInfo', query: router.currentRoute.value.query }"
        >作业详情</router-link
      >
      <router-link
        :to="{ name: 'SubmitTask', query: router.currentRoute.value.query }"
        >提交作业</router-link
      >
      <router-link
        :to="{ name: 'CorrectTask', query: router.currentRoute.value.query }"
        >批改作业</router-link
      >
    </div>
    <div class="routerView">
      <routerView />
    </div>
  </div>
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
  console.log(router.currentRoute.value.query);
});
</script>
<style lang="scss" scoped>
.taskMain {
  margin: 0 5vw;
  margin-top: 14vh;
  background-color: white;
  .routerLink {
    a {
      text-decoration: none;
      color: black;
      border-bottom: 1px solid white;
      margin-right: 2vw;
      &:hover {
        color: $ktp-color;
        border-bottom: 2.5px solid $ktp-color;
      }
    }
  }
  .routerView {
    width: 100%;
    overflow: auto;
  }
}
</style>
