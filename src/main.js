import { createApp } from "vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import App from "./App";
import "ant-design-vue/dist/antd.css";

const app = createApp(App);
app.config.productionTip = false;

app.use(Antd);
app.use(store);
app.use(router);
app.mount("#app");
