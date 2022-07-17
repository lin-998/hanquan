<template>
  <view class="p30">
    <cp-form></cp-form>
  </view>
</template>

<script>
import CpForm from "./components/cp-form.vue";
import { realnameInfo } from "@/api/profile.js";
export default {
  components: { CpForm },
  onLoad() {
    realnameInfo().then((res) => {
      this.info = res.data;
      if (this.info.is_apply == 1) {
        uni.redirectTo({
          url: "/pagesB/pages/realname/audit-status",
        });
      }
    });
  },
};
</script>

<style scoped></style>
