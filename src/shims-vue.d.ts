declare module "*.vue" {
  import { defineComponent } from "vue";
  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}


// declare module "vue/types/vue" {
//   interface Vue {
//       $http: any;
//       $Message: any;
//       $Modal: any;
//   }
// }