import { get, post } from "@/hooks/axios";
const taskService = {
  //获取所有作业
  async selectAll(courseId) {
    return await get(`task/selectAll?courseId=${courseId}`);
  },
  //发布作业
  async createTask(taskDto) {
    return await post("task.createTask", createTask);
  },
  //上传附件
  async uploadAnnex(taskId, userId, file) {
    return await post(
      `annex/uploadAnnex?taskId=${taskId}&userId=${userId}`,
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
};
export default taskService;
