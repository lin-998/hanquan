<template>
  <view class="p30">
    <view class="p20 radius-6px" style="background-color: #45324a">
      <u-table
        bg-color="#45324A"
        border-color="transparent"
        color="#CCCCCC"
        font-size="24"
      >
        <u-tr>
          <u-th>{{ $t("chong-zhi-lei-xing") }}</u-th>
          <u-th>{{ $t("shi-jian") }}</u-th>
          <u-th>{{ $t("chong-zhi-jin-e") }}</u-th>
          <u-th>{{ $t("zhuang-tai") }}</u-th>
        </u-tr>
        <u-tr v-for="item in list" :key="item.id">
          <u-td>{{ `${item.wallet_type}-USDT` }}</u-td>
          <u-td>{{ item.createtime }}</u-td>
          <u-td>{{ item.amount }}USDT</u-td>
          <u-td>{{ item.status_name }}</u-td>
        </u-tr>
      </u-table>
    </view>
  </view>
</template>

<script>
import { getRechargeRecord } from "@/api/profile.js";

export default {
  data() {
    return {
      list: [],
      query: {
        page: 1,
        totalPage: undefined,
      },
    };
  },
  onLoad() {
    this.getList();
  },
  methods: {
    async getList() {
      let { page, totalPage } = this.query;
      console.log(page > totalPage);
      if (page > totalPage) return;
      let { data, totalpage } = await getRechargeRecord({ page });
      this.query.page++;
      this.query.totalPage = totalpage;
      this.list.push(...data);
    },
  },
};
</script>

<style lang="scss" scoped>
.u-th {
  background-color: #45324a !important;
  color: #999999;
  font-size: 22rpx;
}
</style>
