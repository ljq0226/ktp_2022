import { get, post } from "@/hooks/axios";

const userService = {
  //登录
  async login(username, password) {
    return await post(`/user/login?username=${username}&password=${password}`);
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
  //修改用户信息
  async updateUserInfo(infoDto) {
    return await post("/user/update", infoDto);
  },
  //通过用户id获取用户信息
  async getInfoById(id) {
    return await get(`/user/getInfoById?userId=${id}`);
  },
};
export default userService;
