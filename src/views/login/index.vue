<template>
  <!-- <el-button type="primary">fasd</el-button> -->
  <van-button type="primary" @click="show = true">打开dialog</van-button>
  <van-dialog v-model:show="show" title="标题" show-cancel-button>
    <!-- <img src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg" /> -->
    <div>hello-world</div>
  </van-dialog>
  <hello-world/>
</template>
<script setup>
import { useStore } from '../../store';
const authStore = useStore()
authStore.countAdd()

// dialog
const show = ref(false)
</script>