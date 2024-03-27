import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import postcssConfig from "./postcss.config.js";
import viteCompression from 'vite-plugin-compression'
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
  ],
  css: {
    postcss: postcssConfig,
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
        // manualChunks: {
        //   // vue vue-router合并打包
        //   vue: ['vue', 'vue-router'],
        //   // 两个文件合并成一个文件
        //   // a: ['src/components/a.vue','src/components/b.vue'],
        // }
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
