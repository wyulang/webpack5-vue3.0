
<template>
  <div class="home">
    {{msg}}
  </div>
</template>

<script>
export default {
  setup () {
    return {
      msg: '测试手搭webpack5.d'
    }
  }
}
</script>
<style >
.home {
  color: red;
}
div {
  font-size: 18px;
}
</style>