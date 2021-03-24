
<template>
  <div class="home">
    {{message}}
  </div>
</template>

<script lang="ts">
import { useChangeSort } from "@src/page/box";
import { Vue } from "vue-class-component";
export default class App extends Vue {
  message: string = useChangeSort();
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