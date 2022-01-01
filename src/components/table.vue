<template>
  <div class="w-all">
    <table class="w-all sha-6 table">
      <thead>
        <tr>
          <td style="width:1%">
            <svg @click="btnAdd" style="width:21px;height:21px;" class="icon" viewBox="0 0 1024 1024" version="1.1">
              <path
                d="M726.016 553.984l0-84.010667-171.989333 0 0-171.989333-84.010667 0 0 171.989333-171.989333 0 0 84.010667 171.989333 0 0 171.989333 84.010667 0 0-171.989333 171.989333 0zM809.984 128q34.005333 0 59.989333 25.984t25.984 59.989333l0 596.010667q0 34.005333-25.984 59.989333t-59.989333 25.984l-596.010667 0q-36.010667 0-61.013333-25.984t-25.002667-59.989333l0-596.010667q0-34.005333 25.002667-59.989333t61.013333-25.984l596.010667 0z">
              </path>
            </svg>
          </td>
          <td v-show="item.type!='id'" :style="{'width':item.width}" v-for="(item,index) in tablebar" :key="index">{{item.title}}</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in tablebody" :key="index">
          <td style="text-align: center;">
            <svg @click="btnClose(index)" class="icon" viewBox="0 0 1024 1024" version="1.1">
              <path
                d="M786.7392 333.42464 608.17408 512 786.7392 690.57536c26.56256 26.56256 26.56256 69.61152 0 96.17408-13.27104 13.27104-30.6688 19.9168-48.06656 19.9168-17.408 0-34.80576-6.63552-48.0768-19.9168L512 608.16384l-178.5856 178.5856c-13.27104 13.27104-30.6688 19.9168-48.0768 19.9168-17.39776 0-34.78528-6.63552-48.06656-19.9168-26.56256-26.55232-26.56256-69.60128 0-96.17408L415.82592 512 237.2608 333.42464c-26.56256-26.56256-26.56256-69.61152 0-96.17408 26.55232-26.54208 69.5808-26.54208 96.14336 0L512 415.83616l178.5856-178.5856c26.56256-26.54208 69.59104-26.54208 96.14336 0C813.30176 263.81312 813.30176 306.86208 786.7392 333.42464z">
              </path>
            </svg>
          </td>
          <td v-show="child.type!='id'" v-for="(child,index) in item" :key="index">
            <Input :placeholder="child.placeholder||''" :maxlength="child.maxlength" v-if="child.type=='text'" v-model="child.value"></Input>
            <Input  class="w-all" :placeholder="child.placeholder||''" v-if="child.type=='number'" v-model="child.value" controls-position="right" :min="1" :max="10"></Input>
            <Select class="w-all" v-if="child.type=='select'" :data="currData[child.field]" :props="child.props" v-model="child.value" :placeholder="child.placeholder|| ''">
            </Select>
            <div v-if="child.type=='checkbox'" class="flex ai-c">
              <Checkbox :data="currData[child.field]" class="mr10" v-model="child.value"></Checkbox>
            </div>
            <Switch v-if="child.type=='switch'" v-model="child.value" :active-text="child.props.split(',')[0]" :inactive-text="child.props.split(',')[1]">
            </Switch>
            <date v-model="child.value" :format="child.format" v-if="child.type=='date'" type="date" placeholder="选择日期">
            </date>
          </td>
        </tr>
      </tbody>
    </table>
    <div style="display:none">{{path.length}}</div>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Model,Emit } from 'vue-property-decorator';
export default class App extends Vue {
  @Prop({ type: String, default: "" }) title;
  @Prop({ type: Object, default: {} }) data;
  @Prop({ type: Object, default: {} }) check;
  @Prop({ type: Array, default: [] }) list;
  @Model('modelValue', { default: [], type: Array }) value;
  baseList: any = []
  line: any = []
  cdata: any = {}
  isFirst = true
  get currData() {
    return Object.assign({}, this.data, this.cdata)
  }
  get tablebar() {
    return this.list.map(v => { return { title: v.title, width: v.width || 'auto', type: v.type } });
  }
  get tablebody() {
    if (this.isFirst && (this.value.filter(v => v.id).length == this.value.length)) {
      let oldValue = this.value;
      if (oldValue.length) {
        this.line = [];
        oldValue.forEach(item => {
          let curr = JSON.parse(JSON.stringify(this.baseList))
          Object.keys(item).forEach(v => {
            let currItem = curr.find(f => f.field == v);
            currItem && (currItem.value = item[v])
          })
          this.line.push(curr)
        })
        this.isFirst = false;
      }
    }
    if (this.line.length === 0) {
      this.line.push(JSON.parse(JSON.stringify(this.baseList)))
    }
    return this.line;
  }
  get path() {
    let sql: any = [];
    let status = true;
    let message = "";
    let line: any = []
    this.line.forEach((item, index) => {
      let curr: any = {};
      item.forEach(v => {
        curr[v.field] = v.value
        if (!String(v.value) && !message) {
          status = false;
          message = v.title;
          line = index + 1;
        }
      })
      sql.push(curr)
    })
    this.$emit('update:modelValue', sql);
    this.onCheck({ status, line, message })
    return sql
  }

  @Emit('change')
  onCheck(v){
    return v;
  }

  btnAdd() {
    this.line.push(JSON.parse(JSON.stringify(this.baseList)))
  }
  btnClose(index) {
    this.line.splice(index, 1)
  }

  created() {
    let data = {}
    this.list.forEach(v => {
      if (v.type == 'checkbox') {
        v.value = []
      } else if (['switch'].includes(v.type)) {
        v.value = false
      }
      else {
        v.value = "";
      }
      if (['select'].includes(v.type)) {
        v.props = v.props || 'label,value';
        let ps = v.props;
        let list = [];
        if (v.list && v.list.length) {
          list = v.list.map(v => { return { label: v[ps.split(',')[0] || v], value: v[ps.split(',')[1] || v] } })
        } else if (this.data[v.field] && this.data[v.field].length) {
          list = this.data[v.field].map(v => { return { label: v[ps.split(',')[0] || v], value: v[ps.split(',')[1] || v] } })
        }
        if (list && list.length) {
          data[v.field] = list;
        }
      }
      if (v.type == 'checkbox') {
        v.props = v.props || 'label,value';
        let curr = [];
        let ps = v.props;
        if (v.list && v.list.length) {
          curr = v.list.map(s => {
            return {
              label: s[ps.split(',')[0]] || s,
              value: s[ps.split(',')[1]] || s
            }
          })
        } else if (this.data[v.field] && this.data[v.field].length) {
          curr = this.data[v.field].map(v => { return { label: (v[ps.split(',')[0]] || v), value: (v[ps.split(',')[1]] || v) } });
        }

        if (curr && curr.length) {
          data[v.field] = curr;
        }
      }
      if (v.type == 'switch') {
        v.props = v.props || '是,否';
      }
    })
    this.baseList = JSON.parse(JSON.stringify(this.list));
    this.cdata = data;
  }
}
</script>

<style lang="less">
.el-switch__label {
  white-space: nowrap !important;
}
.el-checkbox {
  margin-right: 10px !important;
}
.w-all {
  width: 100%;
}
.icon {
  cursor: pointer;
  fill: #ccc;
  &:hover {
    fill: #1296db;
  }
}
.table {
  thead tr td {
    padding: 12px 10px;
    background-color: #f5f6f6;
    font-weight: bold;
    font-size: 14px;
    color: #888;
  }
  tbody tr td {
    padding: 5px 10px;
    font-size: 14px;
    border-bottom: 1px solid #f2f2f2;
  }
  tbody tr {
    color: #555;
    &:hover {
      background-color: #fcfcfc;
      color: #000;
      cursor: pointer;
    }
  }
}
</style>