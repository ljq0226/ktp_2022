<template>
  <div class="module_all">
    <div class="module_func">
      <div class="m_item" @click="status = 1">目录</div>
      <div class="m_item" @click="noServer">互动课件</div>
      <div class="m_item" @click="showTask">作业</div>
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
      <div class="allTask" v-show="status == 3">
        <template v-for="item in taskStore.courseTask" :key="item.taskId">
          <div class="taskItem">
            <div class="taskImg"></div>
            <div class="taskInfo">
              <p class="taskName" @click="toTaskInfo(item.taskId)">
                {{ item.taskName }}
              </p>
              <p class="taskTime">
                提交截止时间{{ item.cutOffTime }}|<span>已结束</span>|<span
                  >个人作业</span
                >
              </p>
              <p class="taskStatus">
                {{ item.situation }} <span>{{ item.grade }}</span>
              </p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { useTaskStore } from "@/store/task";
import { useCourseStore } from "@/store/course";
import storage from "@/hooks/storage";
import { useRouter } from "vue-router";
import moment from "moment";
const router = useRouter();
const props = defineProps({ courseId: String });
const taskStore = useTaskStore();
const courseStore = useCourseStore();
let courseId = ref("");
let status = ref(1); //自增对应目录 互动课件 作业 测试 。。

onMounted(() => {
  courseId.value = router.currentRoute.value.params.cno;
  init();
});
//获取该课程从所有作业
const init = async () => {
  await taskStore.selectAllTask(courseId.value);
};
//展示所有作业
const showTask = () => {
  status.value = 3;
  const userInfo = storage.get("userInfo");
  const identity = userInfo.status;
  if (!identity) {
    //如果为学生
    if (taskStore.courseTask.length == 0)
      ElMessage.warning("老师暂未发布作业！");
    setTimeout(() => {
      status.value = 1;
    }, 1500);
  }
};
//跳转到作业详情
const toTaskInfo = (taskId) => {
  let path = `/task/${taskId}`;
  router.push({ path, query: { courseId: courseId.value } });
};

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
      border-bottom: 3px solid white;
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
    .allTask {
      border: 1px solid $ktp-color;
      .taskItem {
        display: flex;
        flex-flow: row;
        .taskImg {
          width: 6vw;
          height: 12vh;
          margin: 2.3vh 4vh;
          background: url("@/assets/task.png") no-repeat center center;
          background-size: cover;
        }
        .taskInfo {
          border-bottom: 1px solid $border;
          flex: 1;
          p {
            margin: 0;
          }
          .taskName {
            cursor: pointer;
            font-size: 16px;
            font-weight: 350;
            margin: 2vh 0;
          }
          .taskTime {
            font-size: 12px;
            color: rgb(138, 141, 144);
            margin: 1vh 0;
          }
          .taskStatus {
            font-size: 12px;
            color: rgb(78, 140, 244);
          }
        }
      }
    }

    img {
      width: 40vw;
      height: 40vh;
      padding: 10vh 20vw;
    }
  }
}
</style>
