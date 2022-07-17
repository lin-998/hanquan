<template>
  <mescroll-body @init="mescrollInit" @down="downCallback" @up="upCallback">
    <view class="p30">
      <u-cell-group :border="false">
        <u-cell-item
          v-for="(item, index) in list"
          :key="index"
          :title="item.title"
          :title-style="{ color: '#ffffff' }"
          hover-class="none"
          @click="itemTap(item)"
        ></u-cell-item>
      </u-cell-group>
    </view>
  </mescroll-body>
</template>

<script>
import { getList } from "@/api/server.js";
import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
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
      getList({ page: page.num }).then((res) => {
        this.list = this.list.concat(res.data);
        let len = res.data.length;
        let totalpage = res.totalpage;
        this.mescroll.endByPage(len, totalpage);
      });
    },
    itemTap(item) {
      this.$u.route({
        url: "/pagesB/pages/help/help",
        params: {
          id: item.id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
