<template>
  <view class="p30">
    <view class="mt30">
      <text class="bold">联系方式：</text>
      <view class="input-wrap mt20">
        <u-input
          v-model="form.contact_info"
          placeholder="请输入您的联系方式"
          height="80"
          type="number"
        ></u-input>
      </view>
    </view>
    <view class="mt30">
      <text class="bold">图片：（仅支持上传一张图片哦）</text>
      <view class="upload-proof">
        <view v-if="!form.contact_img" class="upload" @tap="uploadClick">
          <u-icon name="plus-circle" size="86"></u-icon>
        </view>
        <u-image
          v-else
          width="194"
          height="194"
          :src="form.contact_img"
          @click="uploadClick"
        ></u-image>
        <!-- <u-upload
		      ref="uUpload"
		      :auto-upload="false"
		      max-count="1"
		      width="190"
		      height="190"
		      @on-list-change="(list) => (form.contact_img = list)"
		    ></u-upload> -->
      </view>
    </view>
    <view class="btm-bottom">
      <AppButton width="212rpx" height="70rpx" @click="submit">{{
        form.is_set_contact == 0 ? "保存" : "确认修改"
      }}</AppButton>
    </view>
  </view>
</template>

<script>
import { getUserContact, setUserContact } from "@/api/profile.js";
import { uploadImage } from "@/utils/upload.js";
export default {
  data() {
    return {
      form: {
        contact_info: "",
        contact_img: "",
        is_set_contact: 0,
      },
    };
  },
  onLoad() {
    this.getUserContact();
  },
  methods: {
    async uploadClick() {
      let url = await uploadImage();
      this.form.contact_img = url;
    },
    submit() {
      this.setUserContact();
    },
    async getUserContact() {
      let { data } = await getUserContact();
      this.form = data;
    },
    async setUserContact() {
      delete this.form.is_set_contact;
      await setUserContact(this.form);
      uni.navigateBack({});
    },
  },
};
</script>

<style lang="scss" scoped>
.btm-bottom {
  margin-top: 200rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.upload-proof {
  background-color: #45324a;
  padding: 20rpx 40rpx;
  margin-top: 20rpx;
  border-radius: 8rpx;
  display: flex;
  flex-direction: column;
  // align-items: center;
  justify-content: center;
}
.upload {
  width: 190rpx;
  height: 190rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #2c0d33;
  border-radius: 8rpx;
  padding: 0 38rpx;
  font-size: 20rpx;
  color: #666666;
}
</style>
