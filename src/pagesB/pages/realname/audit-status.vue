<template>
  <view class="p30">
    <view class="col--center__center pt50">
      <u-image width="126" height="126" :src="fixIcon()"></u-image>
      <view
        style="width: 504rpx"
        class="fontsize-24 color-999 mt40 text-center"
      >
        <view>{{ desc }}</view>
        <view v-if="detail.status == 2">
          {{ $t("ju-jue-yuan-yin-detailreason") + content }}
        </view>
      </view>
    </view>

    <view class="mt40">
      <cp-form :mode="mode" :data="detail"></cp-form>
    </view>
  </view>
</template>

<script>
import CpForm from "./components/cp-form.vue";
import { realnameInfo } from "@/api/profile.js";
const ICONS = {
  0: "shenhe",
  1: "tijaocg",
  2: "shibai",
};
export default {
  components: { CpForm },
  data() {
    return {
      info: {},
      desc: "",
      content: "",
      detail: {},
      mode: "display",
      DESC: [
        this.$t("shi-ming-ren-zheng-ti-jiao-cheng-gong"),
        this.$t("shi-ming-ren-zheng-cheng-gong"),
        this.$t("shi-ming-ren-zheng-shen-he-ju-jue"),
      ],
    };
  },
  onLoad(op) {
    this.op = op;
    realnameInfo().then((res) => {
      this.info = res.data;
      this.detail = this.info.realname_info;
      this.content = this.info.realname_info.content;
      this.desc = this.DESC[this.detail.status];
      if ([2, 3].includes(+this.detail.status)) this.mode = "submit";
      else this.mode = "display";
    });
  },
  methods: {
    fixIcon() {
      let idx = this.detail.status || 0;
      return `/pagesB/static/${ICONS[idx]}@2x.png`;
    },
  },
};
</script>

<style lang="scss"></style>
