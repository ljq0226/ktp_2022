import { defineStore } from "pinia";
import { userService } from "@/api";
import storage from "@/hooks/storage";
export const useUserStore = defineStore("user", {
  state() {
    return {
      userInfo: {},
    };
  },
  getters: {},
  actions: {
    async login(username, password) {
      const res = await userService.login(username, password);
      if (res.code === 200) {
        this.userInfo = res.data;
        storage.set("userInfo", res.data.userInfo);
        storage.set("token", res.data.token);
        return true;
      } else if (res.code === 500) {
        ElMessage.error(res.msg);
        return false;
      }
    },
    async register(regAccount) {
      const res = await userService.register(regAccount);
      if (res.code === 200) {
        ElMessage.success(res.msg);
        return true;
      } else if (res.code === 500) {
        ElMessage.error(res.msg);
        return false;
      }
    },
    async updateUserInfo(userInfo) {
      const res = await userService.updateUserInfo(userInfo);
      if (res.code === 200) {
        ElMessage.success(res.msg);
        return true;
      } else {
        ElMessage.error(res.msg);
        return false;
      }
    },
    async getInfoById(id) {
      const res = await userService.getInfoById(id);
      if (res.code === 200) {
        return res.data;
      } else {
        console.log(res.msg);
      }
    },
  },
});
