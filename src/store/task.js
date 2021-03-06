import { defineStore } from "pinia";
import storage from "@/hooks/storage";
import { taskService, gradeService } from "@/api";
export const useTaskStore = defineStore("task", {
  state() {
    return {
      courseTask: [], //某一课程所有作业
      currentTask: {}, //当前作业详情
      taskGrades: [], //当前作业所有学生数据
      submitStatus: {}, //当前学生当前作业提交情况
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
    //提交作业
    async submitTask(taskId, remarks, file) {
      const { userId } = storage.get("userInfo");
      const res = await taskService.submit(taskId, userId, remarks, file);
      if (res.code === 200) {
        ElMessage.success("文件提交成功");
      } else {
        ElMessage.error(res.msg);
      }
    },
    //发布作业
    async createTask(taskDto, file) {
      const res = await taskService.createTask(taskDto, file);
      if (res.code === 200) {
        ElMessage.success(res.msg);
      } else {
        ElMessage.error(res.msg);
      }
    },
    //获取该课程下所有成绩
    async getAllGrades(taskId) {
      const res = await taskService.getAllGrades(taskId);
      if (res.code === 200) {
        this.taskGrades = res.data;
      } else {
        ElMessage.error(res.msg);
      }
    },
    //批改作业
    async correct(correctDto) {
      console.log(correctDto);
      const res = await gradeService.correct(correctDto);
      if (res.code === 200) {
        ElMessage.success("批改成功");
      } else {
        ElMessage.error(res.msg);
      }
    },
    //获取指定学生否一作业的提交情况
    async getSubmitStatus(taskId, userId) {
      const res = await taskService.getSubmitStatus(taskId, userId);
      if (res.code === 200) {
        this.submitStatus = res.data;
      } else {
        ElMessage.error(res.msg);
      }
    },
  },
});
