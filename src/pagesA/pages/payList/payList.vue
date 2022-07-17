<template>
  <view>
    <u-cell-group :border="false">
      <u-cell-item
        v-for="item in list"
        :key="item.id"
        :title="item.name"
        :title-style="titleStyle"
        @click="itemClick(item)"
      >
        <u-image
          slot="icon"
          width="46rpx"
          height="46rpx"
          :src="item.logo_img"
          class="mr30"
        ></u-image>
      </u-cell-item>
    </u-cell-group>
  </view>
</template>

<script>
import { getCoinPayList } from "@/api/payMethod.js";

export default {
  data() {
    return {
      titleStyle: { color: "#f6f6f6" },
      list: [],
    };
  },
  onLoad() {
    this.getList();
  },
  methods: {
    async getList() {
      let { data } = await getCoinPayList();
      this.list = data;
    },
    itemClick(item) {
      uni.navigateTo({
        url: `/pagesA/pages/addPayMethod/addPayMethod?id=${item.id}&name=${item.name}`,
      });
    },
  },
};
</script>

<style></style>
