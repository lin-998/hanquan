<template>
  <view class="contain">
    <view class="image-wrap" @click="toIntroduce">
      <u-image width="100%" height="300rpx" :src="info.deposit_img"></u-image>
    </view>
    <view class="info">
      <!-- 我要投资 -->
      <view class="invest-wrap">
        <view class="left-btn">
          <AppButton width="212rpx" height="60rpx" @click="submit"
            >我要投资
          </AppButton>
        </view>
        <view class="invest-info">
          <text>当前剩余系统投资数：{{ info.remain_all }}PI </text>
          <text>当前剩余个人投资数：{{ info.reamin_user }}PI </text>
        </view>
      </view>
      <!-- 中间余额 -->
      <view class="invest-balance">
        <view class="item">
          <text class="value">{{ info.invest_user }}</text>
          <text class="title">当前投资</text>
        </view>
        <view class="item">
          <text class="value">{{ info.interest_num }} </text>
          <text class="title">未发利息</text>
        </view>
        <view class="item item-ex">
          <text class="value">{{ info.interest_all }}</text>
          <text class="title">累积利息</text>
        </view>
      </view>
      <view class="mt20 invest-tab">
        <u-tabs
          :list="tabList"
          :is-scroll="false"
          :current="current"
          active-color="#8D3D9D"
          inactive-color="#999999"
          bg-color="#2C0D33"
          bar-width="82"
          bar-height="4"
          @change="tabChange"
        >
        </u-tabs>
      </view>
      <!-- 明细表格 -->
      <view class="invest-tabal">
        <u-table v-if="current == 0" bg-color="#2c0d33" color="#CCCCCC">
          <u-tr>
            <u-th>投资数(PI)</u-th>
            <u-th>利息数(PI)</u-th>
            <u-th>结算时间</u-th>
            <u-th>状态</u-th>
          </u-tr>
          <u-tr v-for="(item, index) in list" :key="index">
            <u-td>{{ item.invest_num }}</u-td>
            <u-td>{{ item.interest_num }}</u-td>
            <u-td>{{ item.createtime }}</u-td>
            <u-td>{{ item.done == 0 ? "未发放" : "已发放" }}</u-td>
          </u-tr>
        </u-table>
        <u-table v-if="current == 1" bg-color="#2c0d33" color="#CCCCCC">
          <u-tr>
            <u-th>投资数(PI)</u-th>
            <u-th>当前投资总数(PI)</u-th>
            <u-th>投资时间</u-th>
          </u-tr>
          <u-tr v-for="(item, index) in list" :key="index">
            <u-td>{{ item.num }}</u-td>
            <u-td>{{ item.current_all }}</u-td>
            <u-td>{{ item.createtime }}</u-td>
          </u-tr>
        </u-table>
        <u-table v-if="current == 2" bg-color="#2c0d33">
          <u-tr v-for="(item, index) in list" :key="index" class="tui-cang">
            <u-td
              ><text>退仓数(PI)</text><text>{{ item.num }}</text></u-td
            >
            <u-td
              ><text>退仓时间</text><text>{{ item.returntime }}</text></u-td
            >
          </u-tr>
        </u-table>
      </view>
      <view v-show="list.length >= 5" class="load-more">
        <u-loadmore :status="status" :load-text="loadText" />
      </view>
    </view>
    <!-- 输入密码 -->
    <pwd-modal v-model="isPwd" @confirm="pwdConfirm"></pwd-modal>
    <!-- 投资弹窗 -->
    <u-popup
      v-model="show"
      mode="center"
      width="583"
      border-radius="20"
      @close="show = false"
    >
      <view class="popup-wrap">
        <view class="title">投资</view>
        <view class="con-wrap">
          <view class="form">
            <view class=""> PI余额 </view>
            <view class=""> {{ investInfo.user_credit2 }}PI </view>
          </view>
          <view class="form">
            <view class=""> 个人剩余投资PI数量 </view>
            <view class=""> {{ investInfo.reamin_user }}PI </view>
          </view>
          <view class="form">
            <view class=""> 当前投资数量 </view>
            <view class=""> {{ investInfo.invest_user }} PI </view>
          </view>
          <view class="form form-input">
            <view class=""> 本次投资数量 </view>
            <view class="input-wrap">
              <u-input
                v-model="num"
                placeholder="请输入投资数量"
                height="66"
                placeholder-style="color: #666"
              ></u-input>
            </view>
          </view>
          <view class="tip"> 注意:投资成功后,本金会于次月退还PI余额 </view>
          <view class="btn-wrap">
            <AppButton
              type="primary"
              width="132rpx"
              height="50rpx"
              @click="cancel"
            >
              取消
            </AppButton>
            <AppButton width="186rpx" height="50rpx" @click="confirm">
              确认投资
            </AppButton>
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import pwdModal from "@/components/pwd-modal/pwd-modal.vue";
import {
  depositInfo,
  userInvestInfo,
  userInvestList,
  returnInvestList,
  userInvest,
  interestList,
} from "@/api/deposit.js";
export default {
  components: {
    pwdModal,
  },
  data() {
    return {
      list: [], //明细列表
      info: "", //存款页面详情
      investInfo: "", //我要投资
      num: "", //投资数量
      isPwd: false,
      page: 1,
      totalpage: undefined,
      password: "",
      show: false,
      loadMoreShow: false,
      interestList: [{}, {}, {}, {}, {}],
      status: "loadmore",
      current: 0,
      tabList: [
        {
          name: "利息明细",
          type: 1,
        },
        {
          name: "投资明细",
          type: 2,
        },
        {
          name: "退仓明细",
          type: 3,
        },
      ],
      loadText: {
        loadmore: "下拉加载更多数据",
        loading: "努力加载中",
        nomore: "实在没有了",
      },
    };
  },
  onReachBottom() {
    // this.status = 'loading';
    this.getDetailList();
  },
  onLoad() {
    this.getDetailList();
    this.getDepositInfo();
  },
  methods: {
    async pwdConfirm(value) {
      let form = {
        num: this.num,
        pwd: value,
      };
      await userInvest(form);
      this.isPwd = false;
      this.num = "";
      this.getDepositInfo();
      this.page = 1;
      this.totalpage = undefined;
      this.list = [];
      this.getDetailList();
    },
    async getDepositInfo() {
      let { data } = await depositInfo();
      this.info = data;
    },
    async getUserInvestInfo() {
      let { data } = await userInvestInfo();
      this.investInfo = data;
    },

    async getDetailList() {
      let getListKey;
      switch (this.current) {
        case 0:
          getListKey = interestList;
          break;
        case 1:
          getListKey = userInvestList;
          break;
        case 2:
          getListKey = returnInvestList;
          break;
        default:
          break;
      }
      console.log(this.totalpage);
      console.log(this.page);
      if (this.page > this.totalpage) return;
      let { data, totalpage, page } = await getListKey({ page: this.page });
      this.list.push(...data);
      this.page++;
      this.totalpage = totalpage;
    },
    toIntroduce() {
      uni.navigateTo({
        url:
          "/pages/tabbar/deposit/deposit-introduce?text=" +
          this.info.deposit_text,
      });
    },
    cancel() {
      this.show = false;
      this.num = "";
    },
    submit() {
      this.getUserInvestInfo();
      this.show = true;
    },
    confirm() {
      this.show = false;
      this.isPwd = true;
    },
    tabChange(index) {
      this.current = index;
      this.page = 1;
      this.totalpage = undefined;
      this.list = [];
      this.getDetailList();
    },
  },
};
</script>

<style lang="scss" scoped>
.popup-wrap {
  background-color: #341e3a;

  .title {
    height: 107rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1rpx solid rgba(245, 245, 245, 0.39);
    margin-bottom: 20rpx;
  }

  .btn-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30rpx 40rpx;
  }

  .con-wrap {
    padding: 0 46rpx;

    .form {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10rpx 0 10rpx 0;

      :nth-child(1) {
        color: #bfbfbf;
        font-size: 26rpx;
      }

      :nth-child(2) {
        color: #cccccc;
        font-size: 24rpx;
      }
    }

    .form-input {
      .input-wrap {
        width: 300rpx;
      }
    }

    .tip {
      font-size: 20rpx;
      color: #f29209;
      margin: 30rpx 0 40rpx 0;
    }
  }
}

.contain {
  padding: 20rpx 30rpx;
}

.info {
  .invest-wrap {
    margin-top: 30rpx;
    display: flex;

    .left-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 70rpx;
    }

    .invest-info {
      display: flex;
      flex-direction: column;
      color: #999999;
      font-size: 24rpx;

      :nth-child(1) {
        margin-bottom: 12rpx;
      }
    }
  }

  .invest-balance {
    margin-top: 40rpx;
    background: #45324a;
    padding: 40rpx 35rpx 40rpx 35rpx;
    display: flex;
    justify-content: space-around;
    border-radius: 8rpx;

    .item {
      display: flex;

      align-items: center;
      flex-direction: column;

      .title {
        white-space: nowrap;
        margin-top: 20rpx;
        color: #999999;
      }
    }
  }

  .invest-tab {
  }

  .invest-tabal {
    /deep/.u-table,
    .u-th,
    .u-td {
      border: none !important;
    }

    /deep/.u-th {
      background: #2c0d33;
      color: #999999;
      font-size: 22rpx;
    }

    /deep/.u-td {
      color: #cccccc;
      padding: 30rpx 0 30rpx 0 !important;
      border-bottom: 1rpx solid rgba(245, 245, 245, 0.1) !important;
    }

    .tui-cang /deep/ .u-td {
      display: flex;
      flex-direction: row;

      > text {
        color: #999999;
        font-size: 22rpx;
      }

      :nth-child(2) {
        font-size: 24rpx !important;
        margin-left: 30rpx;
        color: #cccccc;
      }
    }
  }

  .load-more {
  }
}
</style>
