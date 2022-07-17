<template>
  <view class="p30">
    <view class="appeal">
      <!-- <view>
        <text class="fontsize-26 color-999">申诉状态</text>
        <text class="ml20 color-red fontsize-24">审核中</text>
      </view> -->
      <view class="">
        <view class="fontsize-26 color-999">{{ $t("shen-su-li-you") }}</view>
        <view class="color-ccc fontsize-24">
          <u-input
            v-model="form.contents"
            type="textarea"
            :placeholder="$t('shen-su-li-you-0')"
            :custom-style="{ color: '#ccc' }"
          ></u-input>
        </view>
      </view>
      <view class="mt50 fontsize-26 color-999 flex u-flex-wrap">
        <text>{{ $t("bu-chong-cai-liao") }}</text>
        <view class="ml20">
          <u-upload
            :action="action"
            :file-list="fileList"
            :header="uploadHeader"
            :max-count="9"
            upload-text="选择材料"
            @on-success="uplodSuccess"
          ></u-upload>
        </view>
      </view>
    </view>
    <view class="tips"> {{ $t("gai-bi-ding-dan-jiang-bei-dong-jie") }} </view>
    <view class="row--center__center pl40 pr40 mt80">
      <app-button height="80rpx" @click="submitlick">{{
        $t("ti-jiao-shen-su")
      }}</app-button>
    </view>
  </view>
</template>

<script>
import { complaint } from "@/api/order.js";

import { VUE_APP_API } from "@/config/index.js";

const baseURL =
  process.env.NODE_ENV === "development" &&
  process.env.VUE_APP_PLATFORM === "h5"
    ? ""
    : VUE_APP_API;

export default {
  name: "Appeal",
  data() {
    return {
      action: baseURL + "/api/upload/upFileCurrency",
      form: {
        orderid: "",
        contents: "",
        images: "",
      },
      fileList: [],
      uploadHeader: {
        token: uni.getStorageSync("token"),
      },
    };
  },
  onLoad(options) {
    this.form.orderid = options.id;
  },
  methods: {
    async uplodSuccess(data, index, lists) {
      let file = { url: VUE_APP_API + data.data };
      lists[index] = file;
      this.fileList = lists;
    },
    async submitlick() {
      if (!this.form.contents) {
        this.$toast(this.$t("qing-tian-xie-shen-su-li-you"));
        return;
      }
      this.form.images = this.fileList.map((item) => item.url).toString();
      await complaint(this.form);
      this.$toast(this.$t("ti-jiao-cheng-gong"));
      setTimeout(() => {
        uni.navigateBack({ delta: 2 });
      }, 1000);
    },
  },
};
</script>

<style scoped>
.appeal {
  padding: 30rpx 40rpx 40rpx;
  background-color: #45324a;
  border-radius: 8rpx;
  margin-top: 20rpx;
}
.tips {
  background-color: rgba(242, 146, 9, 0.09);
  padding: 20rpx 30rpx;
  margin-top: 40rpx;
  border-radius: 8rpx;
  color: #f29209;
  font-size: 20rpx;
}
</style>
