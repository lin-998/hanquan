<template>
  <view class="p30">
    <u-cell-group :border="false">
      <u-cell-item
        :label="$t('xiu-gai-deng-lu-mi-ma')"
        @click="toEditPassword(1)"
      ></u-cell-item>
      <u-cell-item
        :label="$t('xiu-gai-zi-jin-mi-ma')"
        @click="toEditPassword(2)"
      ></u-cell-item>
    </u-cell-group>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toEditPassword(type) {
      this.$u.route({
        url: "/pagesB/pages/security/password-modify",
        params: { type },
      });
    },
  },
};
</script>

<style lang="scss"></style>
