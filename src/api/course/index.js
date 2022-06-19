import { get, post } from "@/hooks/axios";
const courseService = {
  //获取所有课程
  async getAllNormalCourse(id) {
    return await get(`course/selectAllNormalCourses?userId=${id}`);
  },
  //创建课程
  async createCourse(createCourseDto) {
    return await post("course/createCourse", createCourseDto);
  },
  //加入课程
  async joinCourse(addCourseCode, userid) {
    return await post(
      `course/joinCourse?addCourseCode=${addCourseCode}&userId=${userid}`
    );
  },
  //查询课程成员
  async selectAllMembers(courseId) {
    return await get(`course/selectAllMembers?courseId=${courseId}`);
  },
  //获取所有归档课程
  async getAllArchiveCourse(id) {
    return await get(`course/selectAllArchiveCourses?userId=${id}`);
  },
  //编辑课程
  async editCourse(courseDto) {
    return await post("course/editCourse", courseDto);
  },
  //删除课程
  async deleteCourse(id) {
    return await get(`course/deleteCourse?courseId=${id}`);
  },
  //学生退课
  async exitCourse(courseId) {
    return await post(`course/exitCourse?courseId=${courseId}`);
  },
};

export default courseService;
