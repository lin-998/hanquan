import Vue from "vue";
import App from "./App";
import store from "./store";
import "@/utils/promisify";

import i18n from "@/locale/i18.js";

import uView from "uview-ui";
Vue.use(uView);

import AppButton from "@/components/AppButton.vue";
import AppCheckbox from "@/components/AppCheckbox.vue";
import InputFiled from "@/components/InputFiled.vue";
import AppNavBar from "@/components/AppNavBar.vue";
Vue.component("AppButton", AppButton);
Vue.component("AppCheckbox", AppCheckbox);
Vue.component("InputFiled", InputFiled);
Vue.component("AppNavBar", AppNavBar);

import ExpendApi from "./utils/expand-api.js";
Vue.use(ExpendApi);

Vue.config.productionTip = false;
App.mpType = "app";

new Vue({
  store,
  i18n,
  ...App,
}).$mount();
