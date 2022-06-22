<template>
  <navigation info="用户设置" />
  <div class="userInfo">
    <div class="top">
      <div class="userImg">
        <el-avatar :size="120" src="/src/assets/dsm.jpeg" />
      </div>
      <div class="noImg">
        <div></div>
        <div class="hasInfo">
          <div class="no-name">
            {{ state.userInfo.name }}
          </div>
          <div class="no-func" @click="noServer">
            <p>开通课堂派vip</p>
          </div>
        </div>

        <div></div>
      </div>
    </div>
    <div class="func">
      <div class="funcitem func1" @click="func = 1">
        <p>账户信息</p>
      </div>
      <div class="funcitem func2" @click="func = 2">
        <p>通知设置</p>
      </div>
    </div>

    <div class="showPanel">
      <div class="showPanel1" v-show="func == 1">
        <p>基础信息</p>
        <div class="baseInfo">
          <div class="info-item">
            <div class="item-type">姓名</div>
            <div class="item-value">
              <el-input v-model="state.userInfo.name" />
            </div>
            <div class="item-space"></div>
          </div>
          <div class="info-item">
            <div class="item-type">学号</div>
            <div class="item-value">
              <el-input v-model="state.userInfo.stno" />
            </div>
            <div class="item-space"></div>
          </div>
          <div class="info-item">
            <div class="item-type">学校</div>
            <div class="item-value">
              <!-- <el-input v-model="state.userInfo.schoolId" /> -->
              <el-input v-model="state.userInfo.schoolId" />
            </div>
            <div class="item-space"></div>
          </div>
          <div class="info-item">
            <div class="item-type">ID</div>
            <div class="item-value">
              <el-input v-model="state.userInfo.userId" disabled />
            </div>
            <div class="item-space"></div>
          </div>
        </div>

        <p>账号设置</p>
        <div class="baseInfo">
          <div class="info-item">
            <div class="item-type">账号</div>
            <div class="item-value">
              <el-input v-model="state.userInfo.username" />
            </div>
            <div class="item-space"></div>
          </div>
          <div class="info-item">
            <div class="item-type">所属角色</div>
            <div class="item-value">
              <el-input
                :value="state.userInfo.status ? '老师' : '学生'"
                disabled
              />
            </div>
            <div class="item-space"></div>
          </div>
        </div>
      </div>

      <div class="showPanel2" v-show="func == 2">
        <p>消息推送</p>
        <div class="panel2Table">
          <template v-for="item in func2Content" :key="item.type">
            <div class="panel2item">
              <p class="itemType">{{ item.type }}</p>
              <p class="itemDes">{{ item.description }}</p>
              <el-switch
                class="itemSwitch"
                v-model="item.switchVal"
                @change="noServer"
              />
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
  <div class="bottomBut" style="float: right; margin-right: 12vw">
    <ElButton type="primary" @click="update"> 提交修改</ElButton>
  </div>
</template>

<script setup>
import Navigation from "@/components/Navigation";
import { ref, reactive, onMounted } from "vue";
import storage from "@/hooks/storage";
import { useUserStore } from "@/store/user";
const userStore = useUserStore();
let func = ref(1);
let state = reactive({ userInfo: {} });
const func2Content = reactive([
  {
    type: "作业到期",
    description: "作业到截止日期接收消息推送",
    switchVal: true,
  },
  {
    type: "课堂私信",
    description: "有老师/同学私信后接受消息推送",
    switchVal: true,
  },
  {
    type: "话题类型",
    description: "有老师/同学发起话题后接受消息推送",
    switchVal: true,
  },
]);
onMounted(() => {
  init();
});
const init = () => {
  state.userInfo = storage.get("userInfo");
  console.log(state.userInfo);
};
const noServer = () => {
  ElMessage.warning("暂无此服务，尽情期待!!");
};
const update = () => {
  console.log("1");
  userStore.updateUserInfo(state.userInfo);
};
</script>
<style lang="scss" scoped>
.userInfo {
  display: flex;
  flex-flow: column;
  height: 100vh;
  overflow: auto;
  margin: 0 18vw;
  margin-top: 15vh;
  background-color: white;
  .func {
    width: 100%;
    height: 23vh;
    display: flex;
    justify-content: flex-start;

    .funcitem {
      display: flex;
      align-items: center;
      margin-right: 3vw;
      p {
        cursor: pointer;
        font-size: 20px;
        &:hover {
          color: $ktp-color;
        }
      }
    }
  }
  .showPanel {
    display: flex;
    height: 40vh;
    background-color: rgb(248, 249, 250);
    .showPanel1 {
      p {
        font-size: 20px;
        margin: 2vh 2vw;
      }
      .baseInfo {
        margin-bottom: 10vh;
        .info-item {
          display: flex;
          flex-flow: row;
          justify-content: space-around;
          align-items: center;
          height: 10vh;
          width: 56vw;
          border: 0.1px solid gray;
          margin: 0 2vw;
          border-left: 4px solid $ktp-color;
          .item-type {
            flex: 0.1;
            font-size: 18px;
          }
          .item-value {
            flex: 0.3;
          }
          .item-space {
            flex: 0.5;
          }
        }
      }
    }
    .showPanel2 {
      p {
        font-size: 20px;
        margin: 2vh 2vw;
      }
      .panel2Table {
        margin: 2vh 2vw;
        border-left: 4px solid $ktp-color;
        .panel2item {
          border: 0.1px solid gray;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 10vh;
          width: 57vw;
          border-spacing: 0;
          border-collapse: collapse;
          .itemType {
            flex: 0.12;
            font-size: 18px;
          }
          .itemDes {
            font-size: 18px;
            color: rgb(95, 99, 104);
            flex: 0.78;
          }
          .itemSwitch {
            flex: 0.1;
          }
        }
      }
    }
  }
  .top {
    display: flex;
    width: 100%;
    height: 26vh;
    background-color: rgb(248, 249, 250);
    .userImg {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 10vw;
      margin: 2vw;
    }
    .noImg {
      display: flex;
      flex-flow: column;
      justify-content: space-around;
      .hasInfo {
        flex: 0.4;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        .no-name {
          font-size: 24px;
          font-weight: 400;
        }
        .no-func {
          cursor: pointer;
          font-size: 18px;
          color: rgb(38, 117, 253);
        }
      }
    }
  }
}
</style>
