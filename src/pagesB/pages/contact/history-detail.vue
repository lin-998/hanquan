<template>
  <view class="p30">
    <view class="box-wrap">
      {{ info.question }}
    </view>

    <view class="box-wrap mt20">
      <view class="flex u-flex-wrap">
        <u-image
          v-for="(img, idx) in info.img"
          :key="idx"
          width="190"
          height="190"
          bg-color="#2C0D33"
          :src="img"
          border-radius="12"
        ></u-image>
      </view>
    </view>

    <u-line margin="20rpx 0"></u-line>

    <view v-for="item in info.message" :key="item.id" class="box-wrap mb20">
      <view>
        <text>{{ item.role === 1 ? $t("wo") : $t("ke-fu") }}</text>
        <text class="color-999 fontsize-20 ml20">{{ item.createtime }}</text>
      </view>
      <u-line margin="14rpx 0"></u-line>
      <view>{{ item.content }}</view>
    </view>

    <view v-if="info.status === 1" class="box-wrap">
      <view class="mb20">{{
        $t("hui-fu-huo-ti-gong-geng-duo-wen-ti-miao-shu")
      }}</view>
      <u-input
        v-model="content"
        type="textarea"
        border
        :height="100"
        auto-height
        :custom-style="inputStyle"
      />
      <view class="mt20">
        <app-button
          type="success"
          width="128rpx"
          height="60rpx"
          font-size="22"
          @click="addFeedbackDetail"
        >
          {{ $t("hui-fu") }}
        </app-button>
      </view>
    </view>

    <view v-if="info.status != 2" class="mt50">
      <app-button width="100%" height="80rpx" @click="feedbackClose">
        {{ $t("que-ren-bing-jie-shu-ben-ci-fan-kui") }}
      </app-button>
    </view>
  </view>
</template>

<script>
import {
  feedbackDetail,
  addFeedbackDetail,
  feedbackClose,
} from "@/api/server.js";
export default {
  data() {
    return {
      info: {},
      content: "",
      inputStyle: {
        color: "#fff",
      },
      id: "",
    };
  },
  onLoad(op) {
    this.id = op.id;
    this.feedbackDetail();
  },
  methods: {
    async addFeedbackDetail() {
      if (!this.content) {
        this.$toast(this.$t("qing-shu-ru-nei-rong"));
        return;
      }
      let { msg } = await addFeedbackDetail({
        id: this.id,
        content: this.content,
      });
      this.content = "";
      this.$toast(msg);
    },
    async feedbackDetail() {
      let { data } = await feedbackDetail({ id: this.id });
      this.info = data;
    },
    async feedbackClose() {
      let { msg } = await feedbackClose({ id: this.id });
      this.$toast(msg);
      setTimeout(uni.navigateBack.bind(uni), 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .u-line {
    border-bottom: 1rpx solid rgba($color: #f5f5f5, $alpha: 0.2) !important;
  }
  .u-image {
    overflow: hidden;

    &:not(:nth-child(3n)) {
      margin-right: calc((100% - 190rpx * 3) / 2);
      margin-bottom: 30rpx;
    }
  }
}
</style>
