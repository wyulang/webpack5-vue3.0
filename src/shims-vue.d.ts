// declare module "*.vue" {
//   import { defineComponent } from "vue";
//   const Component: ReturnType<typeof defineComponent>;
//   export default Component;
// }


declare module '*.vue' {
  import { Component } from 'vue'
  const _default: Component
  export default _default
}