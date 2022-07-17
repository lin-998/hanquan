<template>
  <div class="container">
    <u-parse :html="agreement" />
  </div>
</template>

<script>
import { get_config } from "api/common.js";

export default {
  data() {
    return {
      agreement: "",
      type: "1",
    };
  },
  onLoad(options) {
    this.type = options.type;
    this._getConfig();
  },
  methods: {
    async _getConfig() {
      let { data } = await get_config();
      this.agreement =
        this.type === "1"
          ? data.data.register_credit
          : data.data.privacy_agreement;
    },
  },
};
</script>
