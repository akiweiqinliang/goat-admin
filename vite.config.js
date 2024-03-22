import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
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
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'arcoblue-6': '#836f64',
        },
        javascriptEnabled: true,
      },
      postcss: {
        plugins: [
          // 在这里添加其他的 PostCSS 插件
          //   'postcss-px-to-viewport-8-plugin'
        ]
      }
    }
  },
})
