

<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
export default class App extends Vue {
  message: string = "wyulang"
  created() {

  }
}
</script>

<style lang="less">
@import "~@css/pc.less";
</style>