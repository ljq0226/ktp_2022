import { defineStore } from "pinia";
import storage from "@/hooks/storage";
import { courseService } from "@/api";
export const useCourseStore = defineStore("course", {
  state() {
    return {
      allCourses: [],
      age: 18,
    };
  },
  getters: {},
  actions: {
    //初始化 获取所有课程信息
    async init() {
      const { userId } = storage.get("userInfo");
      const res = await courseService.getAllNormalCourse(userId);
      if (res.code === 200) {
        this.allCourses = res.data;
      } else {
        ElMessage.error(res.msg);
      }
    },
    //删除课程
    async deleteCourse(id) {},
    //退出课程
    async exitCourse(courseId) {
      const res = await courseService.exitCourse(courseId);
      if (res.code === 200) {
        this.init();
        ElMessage.success(res.msg);
      } else if (res.code === 500) {
        ElMessage.error(res.msg);
      }
    },
    //加入课程
    async joinCourse(courseCode, userId) {
      const res = await courseService.joinCourse(courseCode, userId);
      if (res.code === 200) {
        this.init();
        ElMessage.success(res.msg);
      } else if (res.code === 500) {
        ElMessage.error(res.msg);
      }
    },
  },
});
