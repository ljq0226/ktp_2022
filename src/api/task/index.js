import { get, post } from "@/hooks/axios";
const taskService = {
  //获取所有作业
  async selectAll(courseId) {
    return await get(`task/selectAll?courseId=${courseId}`);
  },
  //发布作业
  async createTask(taskInfo, file) {
    console.log(file);
    return await post(
      `task/createTask?courseId=${taskInfo.courseId}&taskName=${taskInfo.taskName}
    &releaseTime=${taskInfo.releaseTime}&cutOffTime=${taskInfo.cutOffTime}&remarks=${taskInfo.remarks}`,
      file
    );
  },
  //提交作业
  async submit(taskId, userId, remarks, file) {
    return await post(
      `annex/uploadAnnex?taskId=${taskId}&userId=${userId}&remarks=${remarks}`,
      file
    );
  },
  //通过id获取作业详情
  async selectById(taskId) {
    return await get(`task/selectById?taskId=${taskId}`);
  },
  //通过作业id获取所有学生提交情况
  async getAllGrades(taskId) {
    return await get(`task/getAllGrades?taskId=${taskId}`);
  },
};
export default taskService;
