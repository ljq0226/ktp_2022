<template>
  <div class="module_all">
    <div class="module_func">
      <div class="m_item" @click="status = 1">目录</div>
      <div class="m_item" @click="noServer">互动课件</div>
      <div class="m_item" @click="status = 3">作业</div>
      <div class="m_item" @click="noServer">测试</div>
      <div class="m_item" @click="noServer">资料</div>
      <div class="m_item" @click="noServer">公告</div>
      <div class="m_item" @click="noServer">话题</div>
      <div class="func_space"></div>
    </div>
    <div class="module_show">
      <div class="m_directory" v-show="status == 1">
        <img src="@/assets/noData.png" alt="" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
let status = ref(1); //自增对应目录 互动课件 作业 测试 。。

const noServer = () => {
  ElMessage.warning("暂未开放，尽请期待！");
};
</script>
<style lang="scss" scoped>
.module_all {
  .module_func {
    display: flex;
    justify-content: space-between;
    .m_item {
      padding: 2vh 0;
      cursor: pointer;
      &:hover {
        border-bottom: 3px solid $ktp-color;
        color: $ktp-color;
      }
    }
    .func_space {
      flex: 0.6;
    }
  }
  .module_show {
    img {
      width: 40vw;
      height: 40vh;
      padding: 10vh 20vw;
    }
  }
}
</style>
