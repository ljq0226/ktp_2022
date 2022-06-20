import { defineStore } from "pinia";
import storage from "@/hooks/storage";
import { taskService } from "@/api";
export const useTaskStore = defineStore("task", {
  state() {
    return {
      courseTask: [], //某一课程所有作业
    };
  },
  getters: {},
  actions: {
    //获取当前课程所有作业
    async selectAllTask(courseId) {
      const res = await taskService.selectAll(courseId);
      console.log(res);
      if (res.code === 200) {
        this.courseTask = res.data;
      } else {
        ElMessage.error(res.msg);
      }
    },
  },
});
