import { get, post } from "@/hooks/axios";

const userService = {
  //登录
  async login(username, password) {
    const res = await post(
      `/user/login?username=${username}&password=${password}`
    );
    if (res.code === 200) {
      return res.data;
    } else if (res.code === 500) {
      return res.msg;
    }
  },
  //注册
  async register(registerDto) {
    const res = await post("/user/register", registerDto);
    if (res.code === 200) {
      return res.msg;
    }
  },
  //检测用户名是否已经存在
  async isRepeat(username) {
    return await get(`/user/isRepeat?username=${username}`);
  },
};
export default userService;
