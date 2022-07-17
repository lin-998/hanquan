<template>
  <mescroll-body @init="mescrollInit" @up="upCallback" @down="downCallback">
    <view class="p30">
      <view v-for="(item, index) in list" :key="index" class="box-wrap mb30">
        <view class="row--center__spaceB">
          <view class="fontsize-24">
            <text class="color-999">{{ $t("jie-shou-zhe-zhang-hao") }}</text>
            <text class="color-ccc ml20">{{ item.email }}</text>
          </view>
          <text class="color-999 fontsize-20">{{ item.create_time }}</text>
        </view>
        <view class="mt20 row--center__spaceB">
          <view class="fontsize-24">
            <text class="color-999">{{ $t("hu-zhuan-jin-e") }}</text>
            <text class="color-ccc ml20">
              {{ item.amount }} {{ item.coin }}
            </text>
          </view>
          <view>
            <text class="color-999">{{ $t("hu-zhuan-lei-xing") }}</text>
            <text class="color-ccc ml20">{{ item.coin }}</text>
          </view>
        </view>
      </view>
    </view>
  </mescroll-body>
</template>

<script>
import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
import { receipt_log } from "@/api/profile.js";
export default {
  mixins: [MescrollMixin],
  data() {
    return {
      list: [],
    };
  },
  methods: {
    upCallback(page) {
      if (page.num == 1) this.list = [];
      receipt_log({ page: page.num }).then((res) => {
        this.list = this.list.concat(res.data);
        let len = res.data.length;
        let totalpage = res.totalpage;
        this.mescroll.endByPage(len, totalpage);
      });
    },
  },
};
</script>

<style lang="scss"></style>
