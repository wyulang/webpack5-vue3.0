<template>
  <div class="flex-line">
    <div :style="{'color':(item.value==value?color[0]:color[1])}" @click="handSelect(item)" v-for="(item, index) in data" :key="index" class="flex-line hand ai-c mr10">
      <span :class="item.value==value?icon[0]:icon[1]" class="icon iconfont fs-20"></span>
      <span class="ml5 fs-14">{{item.label}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data:{
      type:[String,Array],
      default:[]
    },
    color: {
      type:[String,Array],
      default: ['#3699ff', '#888']
    },
    icon: {
      type:[String,Array],
      default: ['iconradio-button-line', 'iconradio-button-off']
    },
    value: {
      default: '',
    },
  },
  methods: {
    handSelect(item) {
      this.$emit('input', item.value);
      this.$emit('change', item.value);
    }
  },
  created(){
    
  }
}
</script>