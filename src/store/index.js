import { defineStore } from "pinia";

// defineStore 方法有两个参数，第一个参数是模块化名字（也就相当于身份证一样，不能重复）
export const useStore = defineStore('store', {
  state:()=>({
    count:0
  }),
  getters:{ // 相当于vue里面的计算属性，可以缓存数据
    
  },
  actions:{ // 可以通过actions 方法，改变 state 里面的值,可以处理异步。
    countAdd(){
      this.count ++
    } 
  },
  persist: {
    key: 'store',//存储本地的名字
    storage:window.localStorage,//存储地址，可选sessionStorage
    paths:['count'],//需要持久化的变量
  },
})