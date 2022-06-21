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
      updateArchiveCourses: [], //处理过后的归档课程
      updateShowArchive: [], //需要展示的
      archiveSemesterArr: [], //不同学习学年将归档课程进行分组
      currentCourse: {}, //当前课程详情
      currentCourseStudents: [], //当前课程学生
      currentCourseTeachers: [], //当前课程老师
      showCurrentCourseMembers: [],
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
        this.updateCourse = [];
        this.groupCourese(res.data);
        this.getAllArchiveCourse();
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
      for (let i = 0; i < newArr.length; i++) {
        for (const item of rawData) {
          if (item.semesterInfo == newArr[i]) {
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
    async deleteCourse(courseId) {
      const res = await courseService.deleteCourse(courseId);
      if (res.code === 200) {
        this.getAllArchiveCourse();
        this.updateShowArchive = [];
        ElMessage.success(res.msg);
      } else if (res.code === 500) {
        ElMessage.error(res.msg);
      }
    },
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
    //归档课程
    async archiveCourse(courseId) {
      const { userId } = storage.get("userInfo");
      const res = await courseService.archiveCourse(courseId, userId);
      if (res.code === 200) {
        this.getAllArchiveCourse();
        this.init();

        ElMessage.success(res.msg);
      } else if (res.code === 500) {
        ElMessage.error(res.msg);
      }
    },
    //课程恢复归档
    async recoverArchiveCourse(courseId) {
      const { userId } = storage.get("userInfo");
      const res = await courseService.recoverCourse(courseId, userId);
      if (res.code === 200) {
        this.getAllArchiveCourse();
        this.init();
        this.updateShowArchive = [];
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
        this.updateArchiveCourses = [];
        this.groupArchiveCourese(res.data);
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
    //对所有归档课程进行处理分组
    groupArchiveCourese(allCourses) {
      //取出所有的学年学期
      let rawData = allCourses;
      let arr = [];
      for (let i = 0; i < rawData.length; i++) {
        const res = this.getTermYear(rawData[i]);
        rawData[i]["semesterInfo"] = res;
        arr.push(res);
      }
      let newArr = Array.from(new Set(arr));
      this.archiveSemesterArr = newArr;
      let a = [];
      for (let i = 0; i < newArr.length; i++) {
        for (const item of rawData) {
          if (item.semesterInfo == newArr[i]) {
            a.push(item);
          } else {
            continue;
          }
        }
        this.updateArchiveCourses.push(a);
        a = [];
      }
    },
    showArchive(index) {
      console.log(index);
      this.updateShowArchive = this.updateArchiveCourses[index];
    },
    //查询课程成员
    async selectAllMembers(courseId) {
      const res = await courseService.selectAllMembers(courseId);
      if (res.code === 200) {
        this.currentCourseStudents = res.data.students;
        this.currentCourseTeachers = res.data.teachers;
        this.showCurrentCourseMembers = this.currentCourseTeachers;
      } else {
        ElMessage.error(res.code);
      }
    },
    asd(items) {
      console.log(items);
      this.showCurrentCourseMembers = items;
    },
  },
});
