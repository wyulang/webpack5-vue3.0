<template>
  <div>
    <cascader :data="city" clear v-model="value"></cascader>
  </div>
</template>

<script lang='ts'>
import { Vue } from 'vue-property-decorator';
import city from '@lib/city';
export default class App extends Vue {
  city: any = city;
  value=[];
  created(){
    console.log(city)
  }
}
</script>

<style lang='less'>
</style>