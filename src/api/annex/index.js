import { get, post } from "@/hooks/axios";
const annexService = {
  //附件上传
  async uploadAnnex(taskId, userId, file) {
    console.log(taskId, userId, file);
    return await post(
      `/annex/uploadAnnex/?taskId=${taskId}&userId=${userId}`,
      file
    );
  },
};
export default annexService;
