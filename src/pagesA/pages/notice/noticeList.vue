<template>
  <view class="notice-list">
    <view
      v-for="item in noticeList"
      :key="item.id"
      class="notice-item"
      @tap="noticeClick(item)"
    >
      <view class="ml12 mr20">
        <view class="fontsize-32">{{ item.year }}</view>
        <view class="fontsize-24 color-999">{{ item.month_day }}</view>
      </view>
      <view class="flex--1" style="overflow: hidden">
        <view class="fontsize-32">{{ item.title }}</view>
        <view class="color-999 fontsize-24">
          <u-parse :html="item.contents"></u-parse>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { notices } from "api/home.js";

export default {
  data() {
    return {
      noticeList: [],
      query: {
        page: 1,
        totalPage: undefined,
      },
    };
  },
  onLoad() {
    this._noticeList();
  },
  onReachBottom() {
    this._noticeList();
  },
  methods: {
    noticeClick(item) {
      uni.navigateTo({
        url: "/pagesA/pages/notice/noticeDetail?id=" + item.id,
      });
    },
    async _noticeList() {
      let { page, totalPage } = this.query;
      if (page > totalPage) return;
      let { data, totalpage } = await notices({ page });
      this.query.page++;
      this.query.totalPage = totalpage;
      this.noticeList.push(...data);
    },
  },
};
</script>

<style scoped>
.notice-list {
  padding: 20rpx;
}
.notice-item {
  display: flex;
  /* height: 154rpx; */
  padding: 20rpx;
  background: #45324a;
  box-shadow: 0px 3rpx 20rpx rgba(0, 0, 0, 0.04);
  border-radius: 20rpx;
  margin-bottom: 23rpx;
}
</style>
