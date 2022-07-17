<template>
  <view class="container">
    <u-swiper :list="list" height="300"></u-swiper>

    <view class="notice fontsize-24">
      <image src="@/static/notice.png" mode="aspectFill" class="notice-icon" />
      <u-image
        width="61rpx"
        height="25rpx"
        src="@/static/notice-text.png"
      ></u-image>
      <view class="flex--1 ml15">
        <swiper
          autoplay
          vertical
          :interval="3000"
          :duration="1000"
          circular
          disable-touch
          style="height: 60rpx; line-height: 60rpx"
        >
          <swiper-item v-for="item in noticeList" :key="item.id">
            <view class="swiper-item" @tap="noticeClick(item)">
              {{ item.title }}
            </view>
          </swiper-item>
        </swiper>
      </view>
      <view
        class="row--center__left color-999"
        @tap="navigatePage('/pagesA/pages/notice/noticeList')"
      >
        <u-image
          width="30rpx"
          height="30rpx"
          src="@/static/right-icon.png"
        ></u-image>
      </view>
    </view>

    <view class="row--center__center">
      <view class="total-wrap">
        <text class="fontsize-30 mr30">{{ $t("zong-ren-shu") }}</text>
        <text class="fontsize-50">{{ realname_num }}</text>
      </view>
    </view>
    <view class="col--center__center mt50">
      <view v-for="(item, key) in realname_table" :key="key" class="prog">
        <view class="prog-left"> {{ key }} </view>
        <view class="prog-cen">
          <u-line-progress
            :percent="+item.percent"
            height="18"
            :show-percent="false"
            inactive-color="#AF9DB1"
            active-color="#F6F6F6"
          ></u-line-progress>
        </view>
        <view class="prog-right"> {{ item.percent }}% </view>
      </view>
    </view>
  </view>
</template>

<script>
import { bannerList, noticeList, homeInfo } from "@/api/home.js";
export default {
  data() {
    return {
      list: [],
      noticeList: [],
      realname_num: 0,
      realname_table: {
        "10K": {},
        "20K": {},
        "30K": {},
      },
    };
  },
  onLoad() {
    this._bannerList();
    this._noticeList();
    this._homeInfo();
  },
  methods: {
    async _homeInfo() {
      let { data } = await homeInfo();
      console.log(data);
      this.realname_num = data.realname_num;
      this.realname_table = data.realname_table;
    },
    async _bannerList() {
      let { data } = await bannerList();
      this.list = data;
    },
    async _noticeList() {
      let { data } = await noticeList();
      this.noticeList = data;
    },
    navigatePage(url) {
      uni.navigateTo({
        url,
      });
    },
    noticeClick(item) {
      uni.navigateTo({
        url: "/pagesA/pages/notice/noticeDetail?id=" + item.id,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 20rpx 30rpx;
}

.notice {
  margin-top: 24rpx;
  margin-bottom: 40rpx;
  height: 60rpx;
  background: #523359;
  border-radius: 10rpx;
  display: flex;
  align-items: center;
  padding: 0 20rpx;
  box-sizing: border-box;
  margin-bottom: 28rpx;
  &-icon {
    width: 30rpx;
    height: 30rpx;
    margin-right: 12rpx;
  }
}
.total-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: bold;
  width: 462rpx;
  height: 114rpx;
  background: linear-gradient(314deg, #8d3d9d 0%, #5b3ac7 100%);
  border-radius: 10rpx;
}
.prog {
  display: flex;
  align-items: center;
  width: 538rpx;
  padding: 12rpx;
  box-sizing: border-box;
  background: #a18fb9;
  border-radius: 10rpx;
  margin-bottom: 30rpx;
  &-left {
    width: 54rpx;
    height: 54rpx;
    font-size: 20rpx;
    color: #fff;
    text-align: center;
    line-height: 54rpx;
    background: #5a3091;
    border-radius: 10rpx;
  }
  &-cen {
    flex: 1;
    height: 54rpx;
    display: flex;
    align-items: center;
    background: #5a3091;
    border-radius: 10rpx;
    margin: 0 12rpx;
    box-sizing: border-box;
    padding: 0 10rpx;
  }
  &-right {
    width: 64rpx;
    height: 54rpx;
    font-size: 20rpx;
    color: #fff;
    text-align: center;
    line-height: 54rpx;
    background: #5a3091;
    border-radius: 10rpx;
  }
}
</style>
