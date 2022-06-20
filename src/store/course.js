import { defineStore } from "pinia";
import storage from "@/hooks/storage";
import { courseService } from "@/api";
export const useCourseStore = defineStore("course", {
  state() {
    return {
      allCourses: [], //获取的所有原生课程数据
      updateCourse: [], //处理过后用于展示的课程数据
      awaitArchiveCourse: {}, //执行被归档的课程
      archiveCourses: [], //获取所有归档课程
      currentCourse: {}, //当前课程详情
      semesterArr: [], //通过不同学习学年将课程进行分组
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
      //取出所有的学年学期
      let rawData = allCourses;
      let arr = [];
      for (let i = 0; i < rawData.length; i++) {
        const res = this.getTermYear(rawData[i]);
        rawData[i]["semesterInfo"] = res;
        arr.push(res);
      }
      let newArr = Array.from(new Set(arr));
      this.semesterArr = newArr;
      let a = [];
      console.log(rawData);
      for (let i = 0; i < newArr.length; i++) {
        for (const item of rawData) {
          if (item.semesterInfo == newArr[i]) {
            console.log(item.courseName);
            a.push(item);
          } else {
            continue;
          }
        }
        this.updateCourse.push(a);
        a = [];
      }
    },
    //处理学期
    getTermYear(item) {
      return `${item.semesterYear}-${parseInt(item.semesterYear) + 1}${
        item.semester == 1 ? " 第一学期" : " 第二学期"
      }`;
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
    //更具课程id获取课程信息
    async getCourseByCourseId(id) {
      const res = await courseService.getCourseByCourseId(id);
      if (res.code === 200) {
        this.currentCourse = res.data;
      } else {
        ElMessage.error(res.msg);
      }
    },
  },
});
