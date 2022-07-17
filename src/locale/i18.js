import Vue from "vue";
import VueI18n from "vue-i18n";

import en from "./en.json";
import zhHans from "./zh-Hans.json";

const messages = {
  en,
  "zh-Hans": zhHans,
};

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: uni.getLocale(),
  messages,
});

export default i18n;
