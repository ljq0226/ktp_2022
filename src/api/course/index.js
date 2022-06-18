import { get, post } from "@/hooks/axios";
const courseService = {
  //获取所有课程
  async getAllNormalCourse(id) {
    return await get(`course/selectAllNormalCourses?userId=${id}`);
  },
  //加入课程
  async joinCourse(courseId, userid) {
    return await post(
      `course/joinCourse?courseId=${courseId}&userId=${userid}`
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
  //创建课程
  async createCourse(createCourseDto) {
    return await post("course/createCourse", createCourseDto);
  },
};

export default courseService;
