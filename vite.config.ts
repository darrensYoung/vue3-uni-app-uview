import { defineConfig, loadEnv } from "vite"
import uni from "@dcloudio/vite-plugin-uni"
import { resolve } from "path"
import uniHot from 'uni-pages-hot-modules'
uniHot.setupHotJs()
export default defineConfig(({ mode }) => {
   loadEnv(mode, __dirname)
    return {
        plugins: [
            uni(),
            uniHot.createHotVitePlugin()],
        resolve: {
            alias: [
                {
                    find: '@',
                    replacement: resolve(__dirname, './src'),
                }
            ]
        }
    }
})
