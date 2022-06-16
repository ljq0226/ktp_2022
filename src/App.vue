<template>
  <div>
    <button class="color" @click="$router.push('/home')">home</button>
    <button @click="$router.push('/about')">about</button>
    <el-button type="primary" @click="show">Primary</el-button>
  </div>

  <router-view></router-view>
</template>

<script setup>
import {useStore} from "@/store/index";

const userStore = useStore();
const show = ()=>{
   ElMessage.error('Oops, this is a error message.')
}

console.log(userStore.name);
</script>

<style lang="scss">
</style>
