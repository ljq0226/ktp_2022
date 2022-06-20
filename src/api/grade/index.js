import { get, post } from "@/hooks/axios";
const gradeService = {
  async correct(correctDto) {
    return await post("grade/correct", correctDto);
  },
};
export default gradeService;
