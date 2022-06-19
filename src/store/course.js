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
      const {userId} = storage.get('userInfo');
      const res = await courseService.getAllNormalCourse(userId);
      if (res.code === 200) {
        this.allCourses = res.data;
        console.log(this.allCourses);
      } else {
        ElMessage.error(res.msg);
      }
    },
    //删除课程
    async deleteCourse(id) {},
  },
});
