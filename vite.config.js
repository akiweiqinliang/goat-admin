import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import viteCompression from 'vite-plugin-compression'
import autoprefixer from "autoprefixer";
import postcssPxtorem from 'postcss-pxtorem';
// import { visualizer } from "rollup-plugin-visualizer";
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve("src"), // 源码根目录
      "@img": path.resolve("src/assets/img"), // 图片
      "@cp": path.resolve("src/components"), // 公共组件
      "@pages": path.resolve("src/pages"), // 路由组件

    }
  },
  optimizeDeps: {
    include: ['*.js', '*.ts']
  },
  plugins: [
    vue(),
    viteCompression(),
    // visualizer({
    //   gzipSize: true,
    //   brotliSize: true,
    //   emitFile: false,
    //   filename: "test.html", //分析图生成的文件名
    //   open:true //如果存在本地服务端口，将在打包后自动展示
    // }),
  ],
  css: {
    postcss: {
      plugins: [
          autoprefixer({
            // 指定目标浏览器
            overrideBrowserslist: [
              "Android 4.1",
              "iOS 7.1",
              "Chrome > 31",
              "ff > 31",
              "ie >= 8",
            ],
            grid: true,
          }),
        postcssPxtorem({
          // rootValue: 18,
          unitPrecision: 5,
          propList: ['*', '!border*', '!max-width*'],
          selectorBlackList: ['.ignore', /^\.no-rem/],
          replace: true,
          mediaQuery: true,
          minPixelValue: 0
        })
      ]
    },
    preprocessorOptions: {
      less: {
        modifyVars: {
          'arcoblue-6': '#836f64',
        },
        javascriptEnabled: true,
      },
      // postcss: {
      //   plugins: [
      //     // 在这里添加其他的 PostCSS 插件
      //     //   'postcss-px-to-viewport-8-plugin'
      //   ]
      // }
    }
  },
  esbuild: {
    drop: ['console', 'debugger']
  },
  build: {
    // rollup 配置
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // 让每个插件都打包成独立的文件
            return id .toString() .split("node_modules/")[1] .split("/")[0] .toString();
          }
        }
      }
    }
  }
})
