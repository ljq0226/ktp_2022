import { defineStore } from "pinia";
import { userService } from "@/api";
export const useUserStore = defineStore("user", {
  state() {
    return {
      userInfo: {}
    };
  },
  getters: {},
  actions: {
    async updateUserInfo(userInfo){
      console.log(userInfo)
      const res =await userService.updateUserInfo(userInfo)
      if(res.code ===200){
        ElMessage.success(res.msg)
      }else{
        ElMessage.error(res.msg)
      }
    }
  },
});
