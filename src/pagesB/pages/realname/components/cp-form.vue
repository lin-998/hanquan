<template>
  <view>
    <u-form ref="uForm" :model="form" label-position="top">
      <u-form-item
        v-for="(item, index) in FORM_ENTRY"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        :border-bottom="false"
        :label-style="{ color: '#f6f6f6' }"
      >
        <template v-if="item.type == 'images'">
          <view class="row--center__spaceB flex--1">
            <view v-for="(sub, i) in IMG_ENTRY" :key="i" class="u-rela">
              <u-image
                width="210"
                height="190"
                :src="form.images[i].path"
                :error-icon="fixIcon(sub.icon)"
                border-radius="12"
                @click="chooseImage(i)"
              ></u-image>
              <text v-if="!form.images[i].path" class="img__tips">
                {{ sub.label }}
              </text>
            </view>
          </view>
        </template>
        <template v-else>
          <view class="input-wrap flex--1">
            <u-input
              v-model="form[item.prop]"
              :custom-style="{ color: '#999999' }"
              :disabled="mode !== 'submit'"
              :placeholder="item.plac"
            ></u-input>
          </view>
        </template>
      </u-form-item>
    </u-form>

    <view v-if="mode == 'submit'" class="fixed-bottom">
      <AppButton width="590rpx" height="80rpx" @click="submit">{{
        $t("ti-jiao")
      }}</AppButton>
    </view>
  </view>
</template>

<script>
import { applyRealname, modifyRealname } from "@/api/profile.js";
import { uploadFile } from "@/api/common.js";
import { toBase64 } from "@/utils/tool.js";

import { VUE_APP_API } from "@/config/index.js";

/**
 * @property {String} mode = [submit|display] 显示模式
 */
export default {
  name: "CpForm",
  props: {
    mode: {
      type: String,
      default: "submit",
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      form: {
        images: Array(3).fill({}),
      },
      FORM_ENTRY: [
        {
          label: this.$t("xing-ming"),
          value: "",
          prop: "realname",
          type: "text",
          plac: this.$t("qing-shu-ru-xing-ming"),
          r: true,
        },
        {
          label: this.$t("shen-fen-zheng-hao"),
          value: "",
          prop: "idcard",
          type: "text",
          plac: this.$t("qing-shu-ru-shen-fen-zheng-hao-ma"),
          r: true,
        },
        {
          label: this.$t("shang-chuan-ge-ren-xin-xi"),
          value: [],
          prop: "images",
          type: "images",
          plac: this.$t("qing-shang-chuan-ge-ren-xin-xi-0"),
          r: false,
        },
      ],
      IMG_ENTRY: [
        {
          label: this.$t("shang-chuan-shen-fen-zheng-zheng-mian"),
          icon: "sfzzm",
        },
        {
          label: this.$t("shang-chuan-shen-fen-zheng-bei-mian"),
          icon: "sfzbm",
        },
        {
          label: this.$t("shang-chuan-shou-chi-shen-fen-zheng-zhao-pian"),
          icon: "sfzzm",
        },
      ],
    };
  },
  watch: {
    data: {
      immediate: true,
      handler(d) {
        if (!d) return;
        this.form.realname = d.realname;
        this.form.idcard = d.idcard;
        this.form.images = [
          { path: d.font_image, net: true, prop: "font_image" },
          { path: d.back_image, net: true, prop: "back_image" },
          { path: d.hand_image, net: true, prop: "hand_image" },
        ];
      },
    },
  },
  created() {
    this.$nextTick(this.initRules);
  },
  methods: {
    initRules() {
      let rules = {};
      this.FORM_ENTRY.forEach((f) => {
        if (!f.r) return;
        let r = {};
        r.required = f.r;
        r.message = f.plac;
        r.trigger = "blur";
        rules[f.prop] = [r];
      });
      let imgRule = {
        required: true,
        validator: (rule, value, cb) => value.every((l) => l.path),
        message: this.$t("qing-shang-chuan-ge-ren-xin-xi-0"),
        trigger: "blur",
      };
      rules.images = [imgRule];
      this.$refs["uForm"].setRules(rules);
    },
    chooseImage(index) {
      if (this.mode !== "submit") return;
      uni.chooseImage({
        count: 1,
        success: (e) => {
          this.form.images[index] = e.tempFiles[0];
          this.$forceUpdate();
        },
      });
    },
    fixIcon(icon) {
      return `/pagesB/static/${icon}@2x.png`;
    },
    submit() {
      this.$refs["uForm"].validate(async (valid) => {
        if (!valid) return;

        uni.showLoading({
          title: this.$t("tu-pian-shang-chuan-zhong"),
        });

        let form = { ...this.form };
        let needsUploadFiles = this.form.images.filter((f) => !f.net);
        let base64s = await Promise.all(
          needsUploadFiles.map((f) => toBase64(f))
        );
        let resultTotal = await Promise.all(
          base64s.map((image) => uploadFile({ image }))
        );
        let fileTotal = resultTotal.map((item) => VUE_APP_API + item.data);
        let urls = this.form.images.map((f) => {
          let url = "";
          if (!f.net) url = fileTotal.shift();
          else url = f.path;
          return url;
        });
        uni.hideLoading();

        let [font_image, back_image, hand_image] = urls;
        form.font_image = font_image;
        form.back_image = back_image;
        form.hand_image = hand_image;

        let api = this.data.id ? modifyRealname : applyRealname;
        if (this.data.id) form.id = this.data.id;
        delete form.images;
        await api(form);
        this.$toast(this.$t("cao-zuo-cheng-gong"));
        this.$u.route({
          url: "/pagesB/pages/realname/audit-status",
          params: { status: 1 },
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.img__tips {
  position: absolute;
  bottom: 0;
  color: #c0c1c2;
  font-size: 20rpx;
  text-align: center;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
