<template>
  <div class="mb20 fs-30 fb red">动态表生成器</div>
  <tables @change="change" :list="list" :data="{glade:glade}" v-model="value1"></tables>

  <div style="font-size:18px; margin-top:30px">返回的数组值：{{value1}}</div>
  <div style="margin-top:30px;font-size:18px;">提交状态:{{check}} <span style="color:red">status为false 代表有空值，line:说明第几行，messsage：哪个字段为空</span></div>
</template>

<script lang='ts'>
import { Vue, Options } from 'vue-property-decorator';
import tables from '../components/table.vue';
@Options({ components: { tables } })
export default class App extends Vue {
  value = "";
  value1: any = [
    //   {
    //   "name": "dddddd",
    //   "age": 7,
    //   "glade": "2",
    //   "city": ["1"],
    //   "money": false,
    //   "birthday": "2021-12-31",
    //   id:"1"
    // }
  ]
  check = {}
  glade: any = [];
  list: any = [
    { width: "130px", title: '名称', field: 'name', type: 'text', placeholder: '说明', maxlength: 9 },
    { width: "130px", title: '周岁', field: 'age', type: 'number', placeholder: '说明', },
    { title: '年级', field: 'glade', type: 'select', props: "label,value", list: [], placeholder: '说明', },
    { title: '国家', field: 'city', type: 'checkbox', props: "label,value", list: [{ label: '中国', value: '1' }, { label: '美国', value: '2' }] },
    { title: '年费', field: 'money', type: 'switch', props: "按月付费,按年付费", },
    { title: '生日', field: 'birthday', type: 'date', format: 'yyyy-MM-dd' },
    { type: 'id', field: 'id' },
  ]

  change(v) {
    this.check = v;
  }

  mounted() {
    setTimeout(() => {
      this.glade = [{ label: '一年级', value: '1' }, { label: '二年级', value: '2' }, { label: '三年级', value: '3' }];
      this.value1 = [
        {
          "name": "dddddd",
          "age": 7,
          "glade": "2",
          "city": ["1"],
          "money": false,
          "birthday": "2021-12-31",
          id: '7'
        }, {
          "name": "fffffff",
          "age": 7,
          "glade": "2",
          "city": ["1"],
          "money": false,
          "birthday": "2021-12-31",
          id: '6'
        }
      ]
    }, 1000);
  }
}
</script>

<style lang='less'>
</style>