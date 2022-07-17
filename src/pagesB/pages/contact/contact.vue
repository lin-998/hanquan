<template>
  <view class="p30">
    <view>
      <text>{{ $t("ju-ti-wen-ti-miao-shu") }}</text>
      <text class="fontsize-22 color-999 ml20">
        {{ form.desc.length || 0 }}/500
      </text>
    </view>
    <view class="input-wrap mt20 pt30 pb30">
      <u-input
        v-model="form.desc"
        type="textarea"
        maxlength="500"
        height="262"
        :custom-style="{ color: '#999999' }"
        :placeholder="
          $t('qing-shu-ru-nin-suo-yu-dao-de-wen-ti-xiang-qing-miao-shu')
        "
        :clearable="false"
      ></u-input>
    </view>
    <view class="mt30">{{ $t("jie-tu") }}</view>
    <view class="input-wrap pt40 pb40 mt20">
      <u-upload
        ref="uUpload"
        :auto-upload="false"
        max-count="5"
        width="190"
        height="190"
        @on-list-change="(list) => (form.imgs = list)"
      ></u-upload>
    </view>
    <!-- 邮箱地址 -联系方式 -->
    <view class="mt30">
      <text class="bold">账号邮箱地址：</text>
      <view class="input-wrap mt20">
        <u-input
          v-model="form.email"
          placeholder="请输入您的账号邮箱地址"
          height="80"
        ></u-input>
      </view>
    </view>
    <view class="mt30">
      <text class="bold">联系方式：</text>
      <view class="input-wrap mt20">
        <u-input
          v-model="form.contact"
          placeholder="请输入您的联系方式"
          height="80"
        ></u-input>
      </view>
    </view>
    <view class="fixed-bottom-ex" style="justify-content: space-around">
      <AppButton width="212rpx" height="70rpx" @click="submit">{{
        $t("ti-jiao")
      }}</AppButton>
      <AppButton width="212rpx" height="70rpx" @click="toHistory">
        {{ $t("pages.history.feedback") }}
      </AppButton>
    </view>
  </view>
</template>

<script>
import { toBase64 } from "@/utils/tool.js";
import { uploadFile } from "@/api/common.js";
import { addFeedback } from "@/api/server.js";
export default {
  data() {
    return {
      form: {
        desc: "",
        imgs: [],
        contact: "",
        email: "",
      },
    };
  },
  methods: {
    async submit() {
      if (!this.form.desc)
        return this.$toast(this.$t("qing-shu-ru-wen-ti-miao-shu"));
      let form = {};
      form.token = uni.getStorageSync("token");
      form.question = this.form.desc;
      form.contact = this.form.contact;
      form.email = this.form.email;
      form.img = "";
      if (this.form.imgs.length) {
        let bs = await Promise.all(this.form.imgs.map((f) => toBase64(f.file)));
        let urls = await Promise.all(
          bs.map((b) => uploadFile({ image: b }).then((r) => r.data))
        );
        form.img = urls.join(",");
      }
      addFeedback(form).then(() => {
        this.$toast(this.$t("cao-zuo-cheng-gong"));
        this.form = {
          desc: "",
          imgs: [],
          contact: "",
          email: "",
        };
        this.$refs["uUpload"].clear();
      });
    },
    toHistory() {
      this.$u.route("/pagesB/pages/contact/history");
    },
  },
};
</script>

<style lang="scss" scoped></style>
