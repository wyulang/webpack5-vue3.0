<template>
  <div>
    <div >
     <span class="mr20"> <router-link class="mr20 pr20" to="/">Home</router-link></span>
      <router-link to="/about">ffffff</router-link>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
});
</script>

<style lang="less">
@import "~@css/pc.less";
</style>