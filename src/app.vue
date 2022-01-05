<template>
  <div style="mix-height:100vh" class="flex pp20 ">
    <div style="min-width:250px">
      <div @click="$router.push('/')" class="flex fs-20 fc-aa hand ai-c">动态表组件</div>
      <div @click="$router.push('/cascader')" class="flex fs-20 mt20 fc-aa hand ai-c">Cascader 级联选择器</div>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>

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