<template>
   <span v-if="show">{{message}}</span>
</template>

<script>
export default {
  props:{
    show:false,
    message:""
  },
  data() {
    return {

    }
  },
  methods: {
  },
  created() {
  },
};
</script>

<style scoped lang="less">
</style>
