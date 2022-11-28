import { createPinia, storeToRefs } from 'pinia';
// 引入持久化插件
import { createPersistedState } from 'pinia-plugin-persistedstate'
// 挂载
export const install = ({ app, router }) => {
  const pinia = createPinia()
  pinia.use(createPersistedState({
    serializer: { // 指定参数序列化器
      serialize: JSON.stringify,
      deserialize: JSON.parse,
    }
  }))
  app.use(pinia);
}