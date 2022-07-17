<template>
  <mescroll-body @init="mescrollInit" @down="downCallback" @up="upCallback">
    <view class="p30">
      <view
        v-for="(item, index) in list"
        :key="index"
        class="box-wrap mb40"
        @click="toDetail(item)"
      >
        <view class="row--center__spaceB">
          <text
            class="fontsize-22 tag"
            :style="{ background: fixStatus(item.status).color }"
          >
            {{ fixStatus(item.status).label }}
          </text>
          <view class="color-999 fontsize-20">
            <u-icon name="clock"></u-icon>
            <text class="ml6">{{
              $t("fan-kui-shi-jian-itemcreatetime", [item.createtime])
            }}</text>
          </view>
        </view>
        <view
          class="input-wrap mt20 pt20 pb20"
          style="background-color: #2c0d33"
        >
          <u-input
            v-model="item.question"
            :placeholder="$t('ju-ti-wen-ti-miao-shu')"
            height="110"
            type="textarea"
            :custom-style="{ color: '#999999' }"
            disabled
          ></u-input>
        </view>
      </view>
    </view>
  </mescroll-body>
</template>

<script>
import { feedbackList } from "@/api/server.js";
import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
export default {
  mixins: [MescrollMixin],
  data() {
    return {
      list: [],
      STATUS: {
        0: { label: this.$t("dai-chu-li"), color: "#CB1C1C" },
        1: { label: this.$t("ke-fu-yi-hui-fu"), color: "#F29209" },
        2: { label: this.$t("yi-guan-bi"), color: "#CB1C1C" },
      },
    };
  },
  onShow() {
    if (this.mescroll) {
      this.mescroll.triggerDownScroll();
    }
  },
  methods: {
    fixStatus(status) {
      return this.STATUS[status] || {};
    },
    toDetail(item) {
      this.$u.route({
        url: "/pagesB/pages/contact/history-detail",
        params: { id: item.id },
      });
    },
    upCallback(page) {
      if (page.num == 1) this.list = [];
      feedbackList({ page: page.num }).then((res) => {
        this.list = this.list.concat(res.data);
        let len = res.data.length;
        let totalpage = res.totalpage;
        this.mescroll.endByPage(len, totalpage);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.tag {
  background-color: #cb1c1c;
  padding: 6rpx 20rpx;
  border-radius: 8rpx;
}
</style>
