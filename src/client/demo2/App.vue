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
import { Vue } from "vue-class-component";

export default class App extends Vue {
  message:string="wyulang"

}
</script>

<style lang="less">
@import "~@css/pc.less";
</style>