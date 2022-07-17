<template>
  <view>
    <view class="bg-wrap">
      <image src="/static/beijing_denglu@2x.png" />
    </view>
    <u-navbar
      :background="{ background: 'transparent' }"
      is-fixed
      immersive
      :is-back="false"
    >
      <text slot="left" @click="toRegister">切换语言</text>
      <!--  <text slot="right" class="mr30" @click="toRegister">{{
        $t("zhu-ce")
      }}</text> -->
    </u-navbar>
    <view class="content">
      <view class="fontsize-40 bold mb60">{{ $t("deng-lu") }}</view>

      <u-form
        ref="uForm"
        :model="form"
        :label-style="{ color: '#F6F6F6' }"
        label-position="top"
      >
        <u-form-item
          prop="email"
          :label="$t('you-xiang')"
          :border-bottom="false"
        >
          <view class="input-wrap flex--1">
            <u-input
              v-model="form.email"
              :placeholder="$t('qing-shu-ru-you-xiang')"
              height="80"
            ></u-input>
          </view>
        </u-form-item>
        <u-form-item
          prop="password"
          :label="$t('mi-ma')"
          :border-bottom="false"
        >
          <view class="input-wrap flex--1">
            <u-input
              v-model="form.password"
              :placeholder="$t('qing-shu-ru-mi-ma')"
              height="80"
              type="password"
            ></u-input>
          </view>
        </u-form-item>
        <u-form-item :border-bottom="false" label-position="left">
          <view class="contact-pwd">
            <text class="color-yellow fontsize-20" @click="toResetPsd">{{
              $t("wang-ji-mi-ma")
            }}</text>

            <text class="color-blue fontsize-20" @click="toContact"
              >联系我们</text
            >
          </view>
        </u-form-item>
      </u-form>
      <view class="mt40">
        <AppButton width="590rpx" height="80rpx" @click="submit">
          {{ $t("deng-lu-0") }}
        </AppButton>
      </view>
      <view class="row--center__right mt50">
        <view style="width: 250rpx">
          <u-input
            :value="getLang"
            type="select"
            border
            disabled
            height="60"
            :custom-style="{ color: '#ccc' }"
            :select-open="selectShow"
            @click="selectClick"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { userLogin } from "@/api/login.js";
import { setLanguage } from "@/api/profile.js";
export default {
  data() {
    return {
      form: {},
      rules: {
        email: [
          {
            required: true,
            message: this.$t("qing-shu-ru-you-xiang-0"),
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: this.$t("qing-shu-ru-mi-ma-0"),
            trigger: "blur",
          },
        ],
      },
      selectShow: false,
      lanList: [
        {
          name: "中文简体",
          value: "zh-cn",
          key: "zh-Hans",
        },
        {
          name: "English",
          value: "en",
          key: "en",
        },
      ],
      lang: "",
    };
  },
  onReady() {
    this.$refs["uForm"].setRules(this.rules);
    this.lang = uni.getLocale();
  },
  computed: {
    getLang() {
      let item = this.lanList.find((item) => item.key === this.lang);
      return item && item.name;
    },
  },
  methods: {
    toContact() {
      uni.navigateTo({
        url: "/pagesB/pages/contact/contact",
      });
    },

    async selectClick() {
      this.selectShow = true;
      try {
        let { tapIndex } = await uni.showActionSheet({
          itemList: this.lanList.map((i) => i.name),
        });
        let item = this.lanList[tapIndex];
        await setLanguage({ lg: item.value });
        this.lang = item.key;
        uni.setLocale(this.lang);
        this.$i18n.locale = this.lang;
      } finally {
        this.selectShow = false;
      }
    },
    toRegister() {
      uni.navigateTo({
        url: "/pages/register/register",
      });
    },
    toResetPsd() {
      uni.navigateTo({
        url: "/pages/forgetPassword/forgetPassword",
      });
    },
    submit() {
      this.$refs["uForm"].validate((valid) => {
        if (!valid) return;
        let form = {};
        form.account = this.form.email;
        form.password = this.form.password;
        userLogin(form).then((res) => {
          this.$store.commit("user/SET_TOKEN", res.data.token);
          uni.switchTab({
            url: "/pages/tabbar/home/home",
          });
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.bg-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  image {
    width: 100%;
    height: 100%;
  }
}
.content {
  position: absolute;
  top: 80rpx;
  width: 100%;
  padding: 34rpx 80rpx 0;
}
.contact-pwd {
  display: flex;
  justify-content: space-between;
}
/deep/ .u-form-item--right__content__slot {
  display: block;
}
</style>
