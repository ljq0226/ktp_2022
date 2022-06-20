import { defineStore } from "pinia";
import storage from "@/hooks/storage";
import { courseService } from "@/api";
export const useCourseStore = defineStore("course", {
  state() {
    return {
      allCourses: [],
      updateCourse: [],
      awaitArchiveCourse: {},
      archiveCourses: [],
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
        this.groupCourese(res.data);
      } else {
        ElMessage.error(res.msg);
      }
    },
    //对所有课程进行处理分组
    groupCourese(allCourses) {
      let courses = allCourses.sort((a, b) => {
        return parseInt(b.semesterYear) - parseInt(a.semesterYear);
      });
      courses = courses.sort(
        (a, b) => parseInt(a.semester) - parseInt(b.semester)
      );
    },
    //处理学期
    getTermYear(item) {
      let res = item.semesterYear + "-" + (parseInt(item.semesterYear) + 1);
      // return `${item.semesterYear}-${parseInt(item.semesterYear) + 1}${item.semester == 1 ? "第一学期" : "第二学期"}`
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
    //归档处理
    async archiveCourse(courseId) {
      const { userId } = storage.get("userInfo");
      console.log(userId);
      const res = await courseService.archiveCourse(courseId, userId);
      if (res.code === 200) {
        this.getAllArchiveCourse();
        ElMessage.success(res.msg);
      } else if (res.code === 500) {
        ElMessage.error(res.msg);
      }
    },
    //获取所有归档课程
    async getAllArchiveCourse() {
      const { userId } = storage.get("userInfo");
      const res = await courseService.getAllArchiveCourse(userId);
      if (res.code === 200) {
        this.archiveCourses = res.data;
      } else {
        ElMessage.error(res.msg);
      }
    },
  },
});
