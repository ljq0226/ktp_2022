<template>
  <Navigation info="作业详情"></Navigation>
  <div class="taskMain">
    <div class="routerLink">
      <router-link
        :to="{ name: 'TaskInfo', query: router.currentRoute.value.query }"
        >作业详情</router-link
      >
      <router-link
        v-show="status == 0"
        :to="{ name: 'SubmitTask', query: router.currentRoute.value.query }"
        >提交作业</router-link
      >
      <router-link
        v-show="status == 1"
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
import Navigation from "@/components/Navigation.vue";
import { ref, reactive, onMounted } from "vue";
import storage from "@/hooks/storage";
import { useRouter } from "vue-router";
const router = useRouter();
let status = ref("");
onMounted(() => {
  router.push({ name: "TaskInfo", query: router.currentRoute.value.query });
  //获取当前用户的角色状态
  status.value = storage.get("userInfo").status;
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
