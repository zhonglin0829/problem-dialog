import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite'

import { VantResolver,ElementPlusResolver } from 'unplugin-vue-components/resolvers';
 
export default defineConfig({
  plugins: [
    vue(),
    Pages({
      dirs: 'src/views',  // 需要生成路由的文件的目录,
      exclude: ['**/components/*.vue']  // 排除在外的目录，将所有 components 目录下的 .vue 文件排除
    }),
    AutoImport({
      dts:'src/auto-imports.d.ts',// 可以自定义文件生成的位置，默认是根目录下，使用ts的建议放src目录下
      dirs: ['src/utils','src/store','src/utils'],//js全局Api挂载
      imports: ['vue','vue-router'],
      resolvers:[],
    }),
    Components({
      resolvers: [VantResolver(),ElementPlusResolver()],
      dts: 'src/components.d.ts'
    }),
  ],
  server:{
    proxy:{
      '/blog':{
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^:5820\/blog/, ':3000')
      }
    },
    open:true,
    port:5821,
    host:true,
    hmr:true,
    resolve:{
      extensions:['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],//忽略导入文件的后缀名
    }
  }
});