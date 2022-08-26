<template>
  <div @click="btnSelect" :class="class" class="flex ai-c jc-c h-all flex-1">
    <div class="h-all flex ai-c flex-1">{{selectValue.length?selectValue.toString():this.pathLabel.toString()}}</div>
    <span class="arrow-right w-18 h-18 mr4"></span>
  </div>
  <section v-if="visible" class="hv-all fixed at0 ab0 al0 ar0 flex fd-c">
    <div @click="btnSave(1)" class="flex-1 ba-3"></div>
    <div class="sha-card">
      <div class="flex ai-c fs-15 bt-e jc-b">
        <span @click="btnSave(1)" class="pp30">取消</span>
        <span @click="btnSave(2)" class="pp30">确定</span>
      </div>
      <div ref="picker" :class="pickClass" class="rel hidden fc-999 fs-28">
        <div :style="lineStar" class="abs w-all h-1 al0 bc-e hidden"></div>
        <div class="h-all flex hidden" ref="parent">
          <ul class="flex-1" v-for="(list,i) in path" :key="i" @touchstart.stop="e=>{onstart(e,i)}" @touchmove.stop="e=>{onmove(e,i)}" @touchend.stop="e=>{onend(e,i)}" :style="{textAlign:'center'}">
            <li class="h-90 lh-90 line-1" v-for="(item,number) in list" :data-index="number" :key="number">{{item.label}}</li>
          </ul>
        </div>
        <div :style="lineEnd" class="hidden abs w-all h-1 bc-e al0"></div>
      </div>
    </div>
  </section>
</template>

<script lang='ts'>

//   树型使用方法
//   <picker props="l,v,c" tree v-model="value" :list="data"></picker>
//   或
//   <picker props="l,v,c" v-model="value" :list="data"></picker>


import { Vue, Prop, Emit, Model, Watch } from 'vue-property-decorator';
import { isString, isArray, isObject } from '../../lib/lang';
export default class App extends Vue {
  @Prop({ type: [Array, Object], default: [] }) list!: any;
  @Prop({ type: String, default: 'h-500' }) pickClass;
  @Prop({ type: String, default: 'h-all' }) class;
  // 是否为树型
  @Prop({ type: Boolean, default: false }) tree;
  @Model('modelValue', { type: [String, Array], default: [] }) value;
  // 取值 props="name,id" 对应的是 label,value
  @Prop({ type: [String, Object, Array], default: "" }) props;
  timer = "";
  lastValue = [];
  isFirst = true;

  visible = false;

  lineHeiht = 0;
  pickerHeight = 0;
  selectIndex = [0, 0, 0];
  selectValue = [];
  pickData = [];

  get lineStar() {
    let start = (this.pickerHeight / 2) - (this.lineHeiht / 2) + 'px';
    return {
      top: start
    }
  }



  btnSelect() {
    this.visible = true;
    if (this.list.length) {
      if (this.tree) {
        this.pickData = this.getFullPath(this.list, 0, []);
      } else {
        this.pickData = this.list;
      }
    }

    setTimeout(() => {
      this.lineHeiht = parseFloat(getComputedStyle(this.$refs.parent.querySelector('li')).height || 0);
      this.pickerHeight = parseFloat(getComputedStyle(this.$refs.picker).height || 0);
      this.$nextTick(() => {
        this.pickerInit();
      })
    }, 50);
  }

  @Emit('change')
  changeValue(v) {
    return v;
  }

  btnSave(type) {
    if (type == 1) {
      this.visible = false;
    } else {
      let value = [];
      this.pickData.forEach((list, i) => {
        value[i] = list[this.selectIndex[i]][this.parm.value]
        this.selectValue[i] = list[this.selectIndex[i]][this.parm.label]
      })
      this.$emit('update:modelValue', value);
      this.changeValue(value)
      this.visible = false;
    }
  }

  // 返显数据所用完整路径值
  getFullPath(list: any = [], len = 0, rlist) {
    if (this.value.length) {
      rlist[len] = list;
      let index = list.findIndex(v => String(v[this.parm.value]) == String(this.value[len]));
      this.selectIndex[len] = index > 0 ? index : 0;
      let next = list[index][this.parm.child];
      this.selectValue[len] = list[index][this.parm.label]
      if (next) {
        return this.getFullPath(next, len + 1, rlist)
      } else {
        return rlist
      }
    } else {
      let curr = list[0][this.parm.child];
      this.selectIndex[len] = 0;
      rlist[len] = list;
      if (curr) {
        return this.getFullPath(curr, len + 1, rlist)
      } else {
        return rlist
      }
    }
  }

  get pathLabel() {
    let label = [];
    if (this.isFirst && this.value.length && this.list.length) {
      if (this.list.length) {
        if (this.tree) {
          this.pickData = this.getFullPath(this.list, 0, []);
        } else {
          this.pickData = this.list;
        }
      }
      this.isFirst = false;

      this.pickData.forEach((list, i) => {
        let index = list.findIndex(v => String(v[this.parm.value]) == String(this.value[i]));
        this.selectIndex[i] = index;
        if (index > 0) {
          label[i] = list[index][this.parm.label];
        }
      })
    }
    return label
  }


  get path() {
    let list = [];
    this.pickData.forEach((item, i) => {
      list[i] = item.map((v, index) => {
        let curr = {}
        if (typeof v !== 'object') {
          curr = { label: v, value: v }
        } else {
          curr = { ...v, label: v[this.parm.label], value: v[this.parm.value] }
        }
        return curr
      })
    })
    return list
  }



  get lineEnd() {
    let start = (this.pickerHeight / 2) + (this.lineHeiht / 2) + 'px';
    return {
      top: start
    }
  }

  pickerInit() {
    this.$nextTick(() => {
      [...this.$refs.parent.children].forEach((element, index) => {
        this.endMove(element, this.selectIndex[index], this.lineHeiht, 0, index, 200, true);
      });
    });
  }


  // 控制最后的滚动
  endMove(target, index = 0, step, moveDistance = 0, order = 0, speed = 200, first = false) {
    target.setAttribute("mov-distance", -index * step);
    this.transformStyle(target, -index * step, true, speed);
    // 上边界判断
    if (moveDistance > 0 * step) {
      index = 0;
      this.transformStyle(target, index * step);
      target.setAttribute("mov-distance", index * step);
    }
    // 下边界判断
    if (moveDistance < -(this.path[order].length - 1) * step) {
      index = this.path[order].length - 1;
      this.transformStyle(target, -index * step);
      target.setAttribute("mov-distance", -index * step);
    }
    this.addClass(order, index);

    if (!first) {
      this.selectIndex[order] = index;
      if (this.tree) {
        let curr = this.path[order][index];
        this.pickData = this.pickData.slice(0, order + 1)
        this.selectIndex = this.selectIndex.slice(0, order + 1)
        if (curr[this.parm.child]) {
          this.setPickData(curr, order + 1);
          setTimeout(() => {
            this.pickerInit()
          }, 10);
        }
      }
    }
  }

  setPickData(item, index) {
    this.selectIndex[index] = 0;
    let curr = item[this.parm.child];
    this.pickData[index] = curr;
    if (curr[0][this.parm.child]) {
      this.setPickData(curr[0], index + 1)
    }

  }

  movePurpose(order, index, e) {
    this.endMove(e, parseInt(index), this.lineHeiht, 0, order);
  }

  // 通过索引找到对应数据
  computeValue(value) {
    return value.map((item, index) => {
      return this.path[index][item];
    });
  }

  // 给选中的picker加active类名
  addClass(order, index, num = 2) {
    this.$nextTick(() => {
      this.$refs.parent.children[order].children[index].className = "h-90 lh-90 vsim-picker-item-active";
    });
  }

  // 设置picker的值
  setPickerValue(index, defaultValue) {
    this.endMove(this.$refs.parent.children[index], defaultValue, this.lineHeiht, 0, index);
  }

  // 动画
  /**
   * target:目标元素
   * moveDistance:滚动距离
   * transition:是否开启动画
   * timer:动画时间
   */
  transformStyle(target, moveDistance, transition, timer = 200) {
    let start = (this.pickerHeight / 2) - (this.lineHeiht / 2);
    target.style["-webkit-transform"] = "translate3d(0," + (moveDistance + start) + "px,0)";
    target.style["transform"] = "translate3d(0," + (moveDistance + start) + "px,0)";
    if (transition) {
      target.style.transitionDuration = timer + "ms";
    }
  }

  // 触摸开始
  onstart(e, index) {
    e.preventDefault();
    // 当触摸li时,确定target对象
    let target = e.target;
    if (e.target.tagName === "LI") {
      target = e.target.parentElement;
    } else {
      return;
    }
    // 清空选中的active样式
    [...this.$refs.parent.children[index].children].forEach(item => {
      item.className = "h-90 lh-90";
    });

    const touch = e.touches[0];
    const touchY = touch.screenY;
    // 记录开始触摸时距屏幕顶端距离
    target.setAttribute("address-start", touchY);
    target.setAttribute("ismove", false); // 是否触发
    // 记录开始触摸时间
    const timestamp = new Date().getTime();
    target.setAttribute("start-time", timestamp);
    // 判断是否是第一次触摸
    if (!target.getAttribute("mov-distance")) {
      // 存储当前位置
      target.setAttribute("pos-start", touchY);
    } else {
      target.setAttribute("pos-start", touchY - parseFloat(target.getAttribute("mov-distance")));
    }
    target.style.transitionDuration = "0ms";
  }

  // 手指移动中
  onmove(e, index) {
    e.preventDefault();
    let target = e.target;
    if (e.target.tagName === "LI") {
      target = e.target.parentElement;
    } else {
      return;
    }
    const touch = e.touches[0];
    const touchY = touch.screenY;
    // 获取移动距离
    const moveDistance = touchY - target.getAttribute("pos-start");
    target.setAttribute("pos-end", touchY);
    target.setAttribute("address-end", touchY);
    target.setAttribute("ismove", true); // 是否触发
    // 移动
    this.transformStyle(target, moveDistance);
  }

  // 手指离开
  onend(e, order) {
    e.preventDefault();
    const step = this.lineHeiht;
    let target = e.target;
    if (e.target.tagName === "LI") {
      target = e.target.parentElement;
    } else {
      return;
    }
    const touchY = target.getAttribute("pos-end");
    const moveDistance = touchY - target.getAttribute("pos-start");
    // console.log(touchY,'===',target.getAttribute("pos-start"))
    // 判断应该移动多少个li
    let index = Math.abs(Math.round(moveDistance / step));
    // 记录移动的距离
    const absDistance = parseFloat(target.getAttribute("address-start")) - parseFloat(target.getAttribute("address-end") || target.getAttribute("address-start"));
    const timestamp = new Date().getTime();
    // 记录间隔时间
    const timespace = timestamp - parseFloat(target.getAttribute("start-time"));
    if ((Math.abs(absDistance) <= 15 || target.getAttribute("ismove") == "false") && timespace <= 90) {
      this.movePurpose(order, e.target.getAttribute("data-index"), target);
      return;
    }
    // 计算速度 = 距离/时间
    const rate = absDistance / timespace;
    // console.log(rate,'rate')
    this.timer = rate * 6;
    if (Math.abs(this.timer) <= 2) {
      this.timer = 0;
    }
    // 惯性滚动距离及速度
    index = Math.round(index + this.timer);
    let speed = 200;
    if (Math.abs(Math.floor(this.timer)) >= 2) {
      speed = 600;
    }
    if (Math.abs(Math.floor(this.timer)) >= 4) {
      speed = 600;
    }
    if (Math.abs(Math.floor(this.timer)) > 6) {
      speed = 800;
    }
    if (index < 0) {
      index = 0;
    }
    // 边界情况
    if (index > this.path[order].length - 1) {
      index = this.path[order].length - 1;
    }
    this.endMove(target, index, step, moveDistance, order, speed);
  }



  get parm() {
    let label = "label";
    let value = "value";
    let child = "children";
    if (this.props) {
      if (isString(this.props)) {
        let obj = this.props.split(',');
        if (obj[0]) {
          label = obj[0];
        }
        if (obj[1]) {
          value = obj[1]
        }
        if (obj[2]) {
          child = obj[2]
        }
      } else if (isArray(this.props)) {
        if (this.props[0]) {
          label = this.props[0];
        }
        if (this.props[1]) {
          value = this.props[1]
        }
        if (this.props[2]) {
          child = this.props[2]
        }
      } else if (isObject(this.props)) {
        label = this.props.label;
        value = this.props.value;
        child = this.props.children;
      }
    }
    return { label, value, child }
  }
}
</script>

<style lang='less'>
.arrow-right {
  border-width: 1.5px 1.5px 0 0;
  border-color: #ddd;
  border-style: solid;
  transform: rotate(45deg);
}
.vsim-picker-item-next {
  // transform: scaleY(0.9) translateZ(0);
  color: #999;
}
.vsim-picker-item-far {
  // transform: scaleY(0.8) translateZ(0);
  color: #eee;
}
.vsim-picker-item-active {
  transform: scaleY(1) translateZ(0);
  color: #000;
}
</style>