import { defineStore } from "pinia";
export const useStore = defineStore("user", {
  state() {
    return {
      name: "张三",
      age: 18,
    };
  },
  getters: {},
  actions: {},
});
