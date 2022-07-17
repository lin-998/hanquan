<template>
  <view class="p30">
    <view class="relative">
      <u-search
        v-model="keyword"
        bg-color="#45324A"
        :show-action="false"
        :placeholder="$t('qing-shu-ru-fa-bi')"
        @focus="searchFocus"
        @blur="isSearch = false"
      ></u-search>
      <view v-if="isSearch" class="search-box">
        <view
          v-for="item in searchList"
          :key="item.id"
          class="color-999 fontsize-26 mb40"
          @tap="itemClick(item)"
        >
          {{ item.name }}
        </view>
      </view>
    </view>
    <view v-if="!isSearch">
      <view v-for="(list, key) in firstMap" :key="key" class="mt40">
        <view class="mb14 ml26 color-999"> {{ key }} </view>
        <view
          v-for="item in list"
          :key="item.id"
          class="cur-box"
          @tap="itemClick(item)"
        >
          <view class="cur-item">
            <view class="color-666 fontsize-22 cur-l">
              {{ `${item.symbol + item.name}` }}
            </view>
            <view class="color-bf fontsize-26">{{ item.name }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getCoinType, searchCoin } from "@/api/currency.js";

import { throttle } from "@/utils/tool.js";

export default {
  data() {
    return {
      keyword: "",
      isSearch: false,
      firstMap: {},
      searchList: [],
    };
  },
  onLoad() {
    this.getAllList();
  },

  watch: {
    keyword() {
      this.searchCoin();
    },
  },
  methods: {
    async getAllList() {
      let { data } = await getCoinType();
      // 先获取字母列表去重 然后排序
      let firstList = [...new Set(data.map((item) => item.first))].sort(
        (a, b) => a.localeCompare(b)
      );
      let firstMap = firstList.reduce((pre, key) => {
        pre[key] = [];
        return pre;
      }, {});
      for (let item of data) {
        if (item.first in firstMap) {
          firstMap[item.first].push(item);
        }
      }
      this.firstMap = firstMap;
    },
    async itemClick(item) {
      await this.$store.dispatch("user/submitCoin", item);
      uni.navigateBack();
    },
    searchFocus() {
      if (!this.keyword) {
        this.searchList = [];
      }
      this.isSearch = true;
    },
    searchCoin: throttle(async function () {
      if (!this.keyword) return;
      let { data } = await searchCoin({ name: this.keyword });
      this.searchList = data;
    }, 300),
  },
};
</script>

<style lang="scss" scoped>
.cur-box {
  // height: 328rpx;
  background: #341e3a;
  border-radius: 10rpx;
  box-sizing: border-box;
  padding: 0 30rpx;
  .cur-item {
    display: flex;
    align-items: center;
    padding: 25rpx 0;
  }
  .cur-l {
    min-width: 86rpx;
  }
}
.search-box {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  min-height: 272rpx;
  z-index: 9;
  box-sizing: border-box;
  padding: 40rpx 30rpx 0;
  background: #341e3a;
  border-radius: 10rpx;
}
</style>
