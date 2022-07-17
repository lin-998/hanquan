<template>
  <view class="contain">
    <view class="tabal">
      <u-table bg-color="#2c0d33" color="#CCCCCC">
        <u-tr>
          <u-th>会员编号</u-th>
          <u-th>昵称</u-th>
          <u-th>KYC(是/否)</u-th>
          <u-th>注册时间</u-th>
        </u-tr>
        <u-tr v-for="(item, index) in directList" :key="index">
          <u-td>{{ item.username }}</u-td>
          <u-td>{{ item.nickname }}</u-td>
          <u-td>{{ item.isreal == 0 ? "否" : "是" }}</u-td>
          <u-td>{{ item.createtime.substring(0, 10) }}</u-td>
        </u-tr>
      </u-table>
    </view>
  </view>
</template>

<script>
import { getDirectInfo } from "@/api/profile.js";
export default {
  data() {
    return {
      directList: [],
      page: 1,
      totalpage: undefined,
    };
  },
  onLoad() {
    this.getDirectInfo();
  },
  onReachBottom() {
    this.getDirectInfo();
  },
  methods: {
    async getDirectInfo() {
      if (this.page > this.totalpage) return;
      let { data, totalpage, page } = await getDirectInfo({ page: this.page });
      console.log(totalpage);
      this.directList.push(...data);
      this.page++;
      this.totalpage = totalpage;
    },
  },
};
</script>

<style lang="scss" scoped>
.contain {
  padding: 20rpx 30rpx;
}

.tabal {
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
}
</style>
