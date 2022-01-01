<template>
  <div v-if="count>1" class="flex fb ai-c">
    <!-- 上一页 -->
    <div @click="onPage('prev')" class="w-30 hand h-30 flex ai-c jc-c bc-f4 ra-4"><svg viewBox="0 0 1024 1024" style="fill:#666" xmlns="http://www.w3.org/2000/svg" class="w-13 h-13">
        <path
          d="M220.415784 579.84116a95.339145 95.339145 0 0 1 0-135.778299L657.632143 18.747899c25.274471-24.954541 66.097541-24.954541 91.372012 0s25.274471 65.521667 0 90.412222L334.6308 512.015997l414.373355 402.727903a63.538101 63.538101 0 0 1 0 90.540194c-25.274471 24.954541-66.097541 24.954541-91.372012-0.127972L220.415784 579.905146z">
        </path>
      </svg></div>
    <!-- 首页 -->
    <div @click="onPage('page',1)" :style="1==page?styles:''" class="hand wi-30 pl4 pr4 h-30 flex ai-c jc-c fs-13 bc-f4 ra-4 ml5">1</div>
    <!-- 跳到前几页 -->
    <div v-if="isPrev" @click="onPage('moreprev')" class="w-30 h-30 flex ai-c ml10 hand jc-c bc-f4 ra-4">
      <svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2066">
        <path
          d="M175.79019 623.975281c-61.737086 0-111.975281-50.242288-111.975281-111.974257 0-61.737086 50.238195-111.975281 111.975281-111.975281 61.730946 0 111.974257 50.238195 111.974257 111.975281C287.764448 573.732993 237.521137 623.975281 175.79019 623.975281L175.79019 623.975281zM511.708869 623.975281c-61.730946 0-111.975281-50.242288-111.975281-111.974257 0-61.737086 50.244334-111.975281 111.975281-111.975281 61.737086 0 111.975281 50.238195 111.975281 111.975281C623.683127 573.732993 573.445956 623.975281 511.708869 623.975281L511.708869 623.975281zM847.632665 623.975281c-61.737086 0-111.975281-50.242288-111.975281-111.974257 0-61.737086 50.238195-111.975281 111.975281-111.975281 61.730946 0 111.969141 50.238195 111.969141 111.975281C959.601806 573.732993 909.363611 623.975281 847.632665 623.975281L847.632665 623.975281zM847.632665 623.975281"
          p-id="2067"></path>
      </svg>
    </div>

    <!-- 页列表item -->
    <div :style="item==page?styles:''" @click="onPage('page',item)" v-for="item in path" class="hand wi-30 pl4 pr4 h-30 flex ai-c jc-c fs-13 bc-f4 ra-4 ml5">{{item}}</div>

    <!-- 跳到后几页 -->
    <div v-if="isNext" @click="onPage('morenext')" class="w-30 h-30 flex ai-c ml10 hand jc-c bc-f4 ra-4">
      <svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2066">
        <path
          d="M175.79019 623.975281c-61.737086 0-111.975281-50.242288-111.975281-111.974257 0-61.737086 50.238195-111.975281 111.975281-111.975281 61.730946 0 111.974257 50.238195 111.974257 111.975281C287.764448 573.732993 237.521137 623.975281 175.79019 623.975281L175.79019 623.975281zM511.708869 623.975281c-61.730946 0-111.975281-50.242288-111.975281-111.974257 0-61.737086 50.244334-111.975281 111.975281-111.975281 61.737086 0 111.975281 50.238195 111.975281 111.975281C623.683127 573.732993 573.445956 623.975281 511.708869 623.975281L511.708869 623.975281zM847.632665 623.975281c-61.737086 0-111.975281-50.242288-111.975281-111.974257 0-61.737086 50.238195-111.975281 111.975281-111.975281 61.730946 0 111.969141 50.238195 111.969141 111.975281C959.601806 573.732993 909.363611 623.975281 847.632665 623.975281L847.632665 623.975281zM847.632665 623.975281"
          p-id="2067"></path>
      </svg>
    </div>
    <!-- 跳到尾页 -->
    <div @click="onPage('page',count)" :style="count==page?styles:''" class="hand wi-30 pl4 pr4 h-30 flex ai-c jc-c fs-13 bc-f4 ra-4 ml5">{{count}}</div>
    <!-- 下一页 -->
    <div @click="onPage('next')" class="w-30 h-30 hand flex ai-c jc-c bc-f4 ra-4 ml5"><svg viewBox="0 0 1024 1024" style="fill:#666" xmlns="http://www.w3.org/2000/svg" class="w-13 h-13">
        <path
          d="M803.606993 579.886453c18.237435-18.173444 28.348014-42.234061 28.348013-67.830461 0-25.788374-10.110578-49.912981-28.348013-67.958443L366.356481 18.749363c-25.276445-24.95649-66.102704-24.95649-91.37915 0s-25.276445 65.526785 0 90.419285l414.405725 402.823353-414.405725 402.759362a63.543064 63.543064 0 0 0 0 90.547267c25.276445 24.95649 66.102704 24.95649 91.37915-0.127982l437.250512-425.284195z">
        </path>
      </svg></div>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Emit } from 'vue-property-decorator';
export default class App extends Vue {
  @Prop({ type: [Number, String], default: 10 }) size;
  @Prop({ type: [Number, String], default: 10 }) pageSize;
  @Prop({ type: [Number, String], default: 7 }) pager;
  @Prop({ type: [Number, String], default: 0 }) total;
  @Prop({ type: String, default: "#409eff" }) color;
  page: number = 1;

  get count() {
    let total = Number(this.total);
    let size = Number(this.size || this.pageSize)
    if ((total / size) > parseInt(String(total / size))) {
      return parseInt(String(total / size)) + 1;
    } else {
      return parseInt(String(total / size));
    }
  }

  // 是否显示-跳到前几页
  get isPrev() {
    const half = ((this.pager % 2) ? this.pager : (this.pager + 1)) / 2
    if (this.count > this.pager) {
      if (this.page > this.pager - half) {
        return true
      }
    }
    return false;
  }

  // 是否显示-跳到下几页
  get isNext() {
    const half = ((this.pager % 2) ? this.pager : (this.pager + 1)) / 2
    if (this.count > this.pager) {
      if (this.page < this.count - half) {
        return true
      }
    }
    return false;
  }

  get path() {
    let list: any = [];
    if (this.isPrev && !this.isNext) {
      let startPage = this.count - (this.pager - 2)
      for (let i = startPage; i < this.count; i++) {
        list.push(i)
      }
    } else if (!this.isPrev && this.isNext) {
      for (let i = 2; i < this.pager; i++) {
        list.push(i)
      }
    } else if (this.isPrev && this.isNext) {
      const offset = (this.pager % 2) ? Math.floor(this.pager / 2) : (Math.floor(this.pager / 2) - 1)
      for (let i = this.page - offset; i <= this.page + offset; i++) {
        list.push(i)
      }
    } else {
      for (let i = 2; i < this.count; i++) {
        list.push(i)
      }
    }
    return list
  }

  onPage(type, page) {
    let newPage;
    const offSet = this.pager - 2;
    switch (type) {
      case "page":
        newPage = Number(page);
        break;
      case "moreprev":
        newPage = this.page - offSet;
        break;
      case "morenext":
        newPage = this.page + offSet;;
        break;
      case "prev":
        newPage = this.page - 1;
        break;
      case "next":
        newPage = this.page + 1;
        break;
      case "page":
        newPage = page;
        break;
    }

    if (!isNaN(newPage)) {
      if (newPage < 1) {
        newPage = 1
      }
      if (newPage > this.count) {
        newPage = this.count
      }
    }

    this.page = newPage;
    this.handSelect(newPage)
  }

  @Emit('change')
  handSelect(item) {
    return item
  }

  get styles() {
    return `color:#fff;background-color:${this.color}`;
  }
}
</script>