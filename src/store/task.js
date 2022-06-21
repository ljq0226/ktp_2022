import { defineStore } from "pinia";
import storage from "@/hooks/storage";
import { taskService } from "@/api";
export const useTaskStore = defineStore("task", {
  state() {
    return {
      courseTask: [], //某一课程所有作业
      currentTask: {}, //当前作业详情
    };
  },
  getters: {},
  actions: {
    //获取当前课程所有作业
    async selectAllTask(courseId) {
      const res = await taskService.selectAll(courseId);
      if (res.code === 200) {
        this.courseTask = res.data;
      } else {
        ElMessage.error(res.msg);
      }
    },
    //通过taskid获取作业详情
    async selectById(taskId) {
      const res = await taskService.selectById(taskId);
      if (res.code === 200) {
        this.currentTask = res.data;
      } else {
        ElMessage.error(res.msg);
      }
    },
  },
});
