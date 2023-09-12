import { createSSRApp } from "vue";
import App from "./App.vue";
import Store from "@/store/index"
import uviewPlus from 'uview-plus'
import request from './config/request'
export function createApp() {
  const app = createSSRApp(App)
  app.use(Store)
  app.use(uviewPlus)
  app.use(request,app)
  uni.$u.config.unit = 'rpx'
  return {
    app
  }
}