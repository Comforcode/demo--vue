<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: Li Cheng
 * @Date: 2024-06-24 09:52:27
 * @LastEditors: Li Cheng
 * @LastEditTime: 2024-06-24 15:50:17
-->
<script setup>
import { ref } from 'vue';

defineProps({
  msg: String,
  message: String
});

const count = ref(0);
</script>

<template>
  <div class="welcome-container">
    <h1 class="text-4xl text-center py-10">欢迎</h1>
    <div class="flex justify-center">
      <router-link to="/list">
        <button class="bg-sky-100 hover:bg-sky-200 h-10 w-40 text-gray">跳转到同学列表</button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.welcome-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
