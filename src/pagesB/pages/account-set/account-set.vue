<template>
  <view class="p30">
    <u-cell-group :border="false">
      <u-cell-item
        :title="$t('tou-xiang')"
        hover-class="none"
        :title-style="{ color: '#F6F6F6' }"
        :src="userInfo.avatar"
        @click="chooseAvatar"
      >
        <view slot="right-icon">
          <u-avatar size="100" :src="avatar"></u-avatar>
        </view>
      </u-cell-item>
      <u-cell-item
        :title="$t('nickname')"
        hover-class="none"
        :value="userInfo.nickname"
        :title-style="{ color: '#F6F6F6' }"
        @click="toPage('nickname-modify')"
      ></u-cell-item>
      <u-cell-item
        :title="$t('pi-di-zhi')"
        hover-class="none"
        :value="userInfo.pi_addr"
        :title-style="{ color: '#F6F6F6' }"
        @click="toSetInfo(1)"
      ></u-cell-item>
      <u-cell-item
        :title="$t('dian-hua-hao-ma')"
        hover-class="none"
        :value="userInfo.mobile"
        :title-style="{ color: '#F6F6F6' }"
        @click="toSetInfo(2)"
      ></u-cell-item>
    </u-cell-group>
  </view>
</template>

<script>
import { uploadFile } from "@/api/common.js";
import { changeavatar } from "@/api/profile.js";
import { upFileCurrency } from "@/utils/upload.js";
export default {
  data() {
    return {
      avatar: "",
      userInfo: {},
    };
  },
  onLoad() {
    uni.$on("uAvatarCropper", (path) => {
      this.avatar = path;
      this._changeavatar(path);
    });
  },
  onShow() {
    this.update();
  },
  methods: {
    chooseAvatar() {
      this.$u.route({
        url: "/uview-ui/components/u-avatar-cropper/u-avatar-cropper",
        params: {
          destWidth: 300,
          rectWidth: 200,
        },
      });
    },
    toPage(name) {
      this.$u.route(`/pagesB/pages/account-set/${name}`);
    },
    toSetInfo(type) {
      this.$u.route(`/pagesB/pages/account-set/infoSet`, { type });
    },
    async _changeavatar(image) {
      let url = "";
      // #ifdef APP-PLUS
      url = await upFileCurrency(image);
      // #endif
      // #ifdef H5
      let { data } = await uploadFile({ image });
      url = data;
      // #endif
      await changeavatar({ avatar: url });
      this.update();
    },
    update() {
      this.$store.dispatch("user/updataUserInfo").then(() => {
        this.userInfo = this.$store.getters.userInfo;
        this.avatar = this.userInfo.avatar;
      });
    },
  },
};
</script>

<style></style>
