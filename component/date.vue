<template>
  <div :class="class" @mouseleave="btnMouse('leave')" @mousemove="btnMouse('move')" class="flex rel w-all">
    <input @click="inputSelect" :placeholder="placeholder" readonly v-model="currValue" ref="dateInput" :class="{'ipt-small':size=='small','ipt-big':size=='big','h-all w-all':size=='auto'}" class="ipt w-all" type="text">
    <svg v-if="isClear" @click.stop="changeClose" class="abs ar5 hand close abst" viewBox="0 0 1024 1024" width="16" height="16">
      <path
        d="M512 102.4a409.6 409.6 0 1 0 409.6 409.6 409.6 409.6 0 0 0-409.6-409.6z m181.248 518.144a51.2 51.2 0 0 1-72.704 72.704L512 584.192l-108.544 109.056a51.2 51.2 0 0 1-72.704-72.704L439.808 512 330.752 403.456a51.2 51.2 0 0 1 72.704-72.704L512 439.808l108.544-109.056a51.2 51.2 0 0 1 72.704 72.704L584.192 512z"
        fill="#aaa"></path>
    </svg>
    <div @click.stop :style="inputHeight" v-if="visible" class="abs zi-8888 al0">
      <div class="flex-line bc-fff ra-5 sha-card pp10 fd-c">
        <div class="w-280 flex ai-c pb5 pt5 jc-b">
          <div @click="changeYear('prev')" class="pl15 pr10 hand">
            <svg viewBox="0 0 1024 1024" width="15" height="15">
              <path
                d="M239.9 512l298.9-301.7c22-22.2 22-58.2 0-80.4l-19.9-20.1c-22-22.2-57.7-22.2-79.7 0L101.5 450.7l-1 1-19.9 20.2c-22 22.1-22 58.2 0 80.4l19.9 20.1 0.4 0.4 338.3 341.5c22 22.2 57.7 22.2 79.7 0l19.9-20.1c22-22.2 22-58.3 0-80.5L239.9 512z m404.7 0l298.9-301.7c22-22.2 22-58.2 0-80.4l-19.9-20.1c-22-22.2-57.7-22.2-79.7 0L506.1 450.7l-1 1-19.9 20.2c-22 22.1-22 58.2 0 80.4l19.9 20.1 0.4 0.4 338.3 341.5c22 22.2 57.7 22.2 79.7 0l19.9-20.1c22-22.2 22-58.3 0-80.5L644.6 512z"
                fill="#999"></path>
            </svg>
          </div>
          <div @click="changeMonth('prev')" class="pl5 pr5 hand">
            <svg viewBox="0 0 1024 1024" width="15" height="15">
              <path d="M264.7 555l387.1 387.2c23.7 23.8 62.3 23.8 86.1 0l21.4-21.5c23.8-23.8 23.8-62.3 0-86L436.7 512l322.6-322.6c23.8-23.8 23.8-62.3 0-86l-21.4-21.5c-23.8-23.8-62.3-23.8-86.1 0L264.7 469c-23.8 23.7-23.8 62.3 0 86z" fill="#999"></path>
            </svg>
          </div>
          <div class="flex-1 flex fs-15 fb ai-c jc-c">
            <span @click="isYear=!isYear;isMonth=false;" class="pr10 hand">{{selectYear}} 年</span>
            <span @click="isMonth=!isMonth;isYear=false;" class="pl10 hand">{{selectMonth}} 月</span>
          </div>
          <div @click="changeMonth('next')" class="pl5 pr5 hand">
            <svg viewBox="0 0 1024 1024" width="15" height="15">
              <path d="M759.3 469L372.2 81.8c-23.7-23.8-62.3-23.8-86.1 0l-21.4 21.5c-23.8 23.8-23.8 62.3 0 86L587.3 512 264.7 834.6c-23.8 23.8-23.8 62.3 0 86l21.4 21.5c23.8 23.8 62.3 23.8 86.1 0L759.3 555c23.8-23.7 23.8-62.3 0-86z" fill="#999"></path>
            </svg>
          </div>
          <div @click="changeYear('next')" class="pr15 pl10 hand">
            <svg viewBox="0 0 1024 1024" width="15" height="15">
              <path
                d="M784.1 512L485.2 813.7c-22 22.2-22 58.2 0 80.4l19.9 20.1c22 22.2 57.7 22.2 79.7 0l337.7-340.9 1-1 19.9-20.2c22-22.1 22-58.2 0-80.4l-19.9-20.1-0.4-0.4-338.3-341.5c-22-22.2-57.7-22.2-79.7 0l-19.9 20.1c-22 22.2-22 58.3 0 80.5L784.1 512z m-404.7 0L80.5 813.7c-22 22.2-22 58.2 0 80.4l19.9 20.1c22 22.2 57.7 22.2 79.7 0l337.7-340.9 1-1 19.9-20.2c22-22.1 22-58.2 0-80.4l-19.9-20.1-0.4-0.4-338.3-341.5c-22-22.2-57.7-22.2-79.7 0l-19.9 20.1c-22 22.2-22 58.3 0 80.5L379.4 512z"
                fill="#999"></path>
            </svg>
          </div>
        </div>
        <div class="w-280 rel flex fc-111 fw">
          <div v-for="item in weekList" class="w-40 bb-d h-40 flex ai-c mb6 jc-c">{{item}}</div>
          <div @click="setDateValue(item)" :class="setClass(item)" v-for="item in row" class="w-40 fs-13 h-38 flex ai-c jc-c">
            {{(currDay==item.value&&item.type=='curr')?'今天':item.day}}
          </div>
          <section @click="isMonth=false" v-if="isMonth" class="abs at0 ab0 ar0 al0 pp20 flex ai-c jc-c ba-f9">
            <div class="flex sha-6 ra-5 hidden fw">
              <div @click.stop="selectMonth=index+1;isMonth=false;" v-for="(month,index) in monthList" :class="{'fc-primary fb fs-15':selectMonth==index+1}" class="wb-33 fs-15 flex ai-c jc-c hand h-35">{{month}}</div>
            </div>
          </section>
          <section @click="isYear=false" v-if="isYear" class="abs at0 ab0 ar0 al0 pp10 flex fd-c ai-c jc-c ba-f9">
            <div @click.stop="setYear('prev')" class="w-all pb5 hand flex ai-c jc-c">
              <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                <path fill="#999"
                  d="M872.523053 824.446082l-718.53082 0c-39.763632 0-71.922053-31.909757-71.922053-71.675436 0-18.485003 7.095605-35.205826 18.486026-47.872311L455.885981 230.77294399c23.810289-31.400151 68.641333-37.993313 100.29731-14.18302399 5.570879 4.052293 10.384511 8.873088 14.18302399 14.190187L929.764755 709.958584c23.547299 31.407314 17.217127 76.479859-14.436804 100.041484-12.922311 9.881045-27.864628 14.43885-42.804898 14.43884999l0 0L872.523053 824.446082zM872.523053 824.446082">
                </path>
              </svg>
            </div>
            <div class="flex sha-6 ra-5 hidden fw">
              <div @click.stop="selectYear=years;isYear=false;" v-for="(years,index) in yearList" :class="{'fc-primary fb fs-15':selectYear==years}" class="wb-20 fs-15 flex ai-c jc-c hand h-35">{{years}}</div>
            </div>
            <div @click.stop="setYear('next')" class="w-all pt5 hand flex ai-c jc-c">
              <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                <path fill="#999"
                  d="M871.424 200.704c14.848 0 29.696 4.608 43.008 14.336 31.744 23.552 37.888 68.608 14.336 99.84l-359.424 479.232c-3.584 5.12-8.704 10.24-14.336 14.336-31.744 24.064-76.288 17.408-100.352-14.336L99.328 320.512c-11.264-12.8-18.432-29.184-18.432-48.128 0-39.936 32.256-71.68 71.68-71.68h718.848z">
                </path>
              </svg>
            </div>
          </section>
        </div>
        <div v-if="time" class="flex w-280 bt-e ai-c pt10 jc-c">
          <input @blur="blurDate" maxlength="2" v-model="selectHour" class="ipt w-45 centers h-25 ipt-auto" type="text">
          <span class="fs-12 pl5">:</span>
          <input @blur="blurDate" maxlength="2" v-model="selectMinute" class="ipt w-45 centers ml5 h-25 ipt-auto" type="text">
          <span class="fs-12 pl5">:</span>
          <input @blur="blurDate" maxlength="2" v-model="selectSecond" class="ipt w-45 centers ml5 h-25 ipt-auto" type="text">
          <!-- <span class="fs-12 pl5">秒</span> -->
          <div class="flex ai-c flex-1 jc-e">
            <div @click="btnTime" class="w-40 h-25 btn ra-5 flex ai-c hand jc-c fc-aa b-d btn-auto">此刻</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Model } from 'vue-property-decorator';
import formatDate from '@lib/dateFormat';
export default class datepick extends Vue {
  $refs;
  @Prop({ type: String, default: "yyyy-MM-dd" }) format;
  @Prop({ type: String, default: "small" }) size;
  @Prop({ type: Boolean, default: false }) time;
  @Prop({ type: String, default: "请选择日期" }) placeholder;
  @Prop({ type: Boolean, default: false }) curr;
  @Prop({ type: String, default: "" }) class;
  @Prop({ type: String, default: "" }) dom;
  @Model('modelValue', { type: [String, Number, Date], default: "" }) value;
  visible = false;
  weekList = ['日', '一', '二', '三', '四', '五', '六'];
  monthList = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
  currDay = formatDate(new Date(), "yyyy-M-d");
  currMonth = new Date().getMonth() + 1;
  week = 0;
  selectYear = new Date().getFullYear();
  currYear = new Date().getFullYear();
  selectMonth = new Date().getMonth() + 1;// 默认从0开始，所以需要加1
  selectDay = 0;
  selectHour: any = "00";
  selectMinute: any = "00";
  selectSecond: any = "00";
  nextYear = 0;
  prevYear = 0;
  starDay = 0;
  endDay = 0;
  isMonth = false;
  isYear = false;
  isClear = false;

  isFirst = true

  off: any = { width: 0, height: 0 }

  inputSelect(e) {
    this.visible = !this.visible;
    document.addEventListener("click", this.setSelectPop);
  }

  blurDate() {
    this.selectHour = this.selectHour.length < 2 ? ('0' + this.selectHour) : this.selectHour;
    this.selectHour = Number(this.selectHour) > 24 ? '24' : this.selectHour
    this.selectMinute = this.selectMinute.length < 2 ? ('0' + this.selectMinute) : this.selectMinute;
    this.selectMinute = Number(this.selectMinute) > 60 ? '60' : this.selectMinute
    this.selectSecond = this.selectSecond.length < 2 ? ('0' + this.selectSecond) : this.selectSecond;
    this.selectSecond = Number(this.selectSecond) > 60 ? '60' : this.selectSecond
  }

  btnTime() {
    let curr = formatDate(new Date(), "hh-mm-ss");
    curr = curr.split('-');
    this.selectHour = curr[0]
    this.selectMinute = curr[1]
    this.selectSecond = curr[2]
  }

  getElementLeft() {
    if (!this.$refs.dateInput) return { left: 0, top: 0 };
    let element: any = this.$refs.dateInput;
    var left = element.offsetLeft;
    var top = element.offsetTop;
    var current = element.offsetParent;

    while (current !== null) {
      left += current.offsetLeft;
      top += current.offsetTop;
      current = current.offsetParent;
    }

    return { left, top };
  }

  btnMouse(type) {
    if (type == 'move') {
      if (this.value) {
        this.isClear = true;
      }
    } else {
      this.isClear = false;
    }
  }

  get inputHeight() {
    let off = this.getElementLeft();
    let height = this.$el.offsetHeight + 324;
    let styles = "";
    if ((off.top + height) > this.off.height) {
      styles = `top:-324px;`;
    } else {
      styles = `top:${this.$refs.dateInput.offsetHeight + 3}px;`;
    }
    console.log((off.left + 300), this.off.width)
    if ((off.left + 300) > this.off.width) {
      let len = this.off.width - 300 - off.left - 2;
      styles += `left:${len}px;`
    }
    return styles;
  }

  setClass(item) {
    if (this.currDay == item.value && this.currDay != this.selectTime && item.type == 'curr') {
      return "fc-primary hand"
    } else if (item.value == this.selectTime && item.type == 'curr') {
      return "bc-primary hand fc-fff fb ra-100"
    } else if (item.type != 'curr') {
      return "fc-ccc"
    } else {
      return "hand"
    }
  }

  setDateValue(item) {
    if (item.type == 'curr') {
      let value: any = item.value;
      if (this.time) {
        value += ` ${this.selectHour}:${this.selectMinute}:${this.selectSecond}`;
      }
      let format = this.format;
      if (format != "timestamp" && this.time && !format.includes('hh')) {
        format = format + " hh:mm:ss"
      }
      value = formatDate(value, format);
      this.$emit('update:modelValue', value)
      this.visible = false;
      document.removeEventListener('click', this.setSelectPop)
    }
  }

  changeClose() {
    this.$emit('update:modelValue', "")
    this.visible = false;
    this.isClear = false;
    document.removeEventListener('click', this.setSelectPop)
  }

  changeYear(type) {
    if (type == "prev") {
      this.selectYear = this.selectYear - 1;
    } else {
      this.selectYear = this.selectYear + 1;
    }
  }

  setSelectPop(e) {
    if (e.target == this.$refs.dateInput) {
      return;
    }
    this.visible = false;
  }

  beforeUnmount() {
    document.removeEventListener('click', this.setSelectPop);
  }

  changeMonth(type) {
    if (type == 'prev') {
      if (this.selectMonth == 1) {
        this.selectMonth = 12;
        this.selectYear = this.selectYear - 1;
      } else {
        this.selectMonth = this.selectMonth - 1;
      }
    } else {
      if (this.selectMonth == 12) {
        this.selectYear = this.selectYear + 1;
        this.selectMonth = 1;
      } else {
        this.selectMonth = this.selectMonth + 1;
      }
    }
  }

  get selectTime() {
    if (this.value) {
      return formatDate(this.value, 'yyyy-M-d')
    } else {
      return ""
    }
  }

  get currValue() {
    if (this.value) {
      let years = formatDate(this.value, "yyyy-MM-dd-hh-mm-ss").split('-');
      this.selectYear = Number(years[0]);
      this.selectMonth = Number(years[1]);
      this.selectDay = Number(years[2]);
      this.selectHour = Number(years[3]);
      this.selectMinute = Number(years[4]);
      this.selectSecond = Number(years[5]);
      this.isFirst=false
    }
    if (this.value) {
      if (this.time) {
        return formatDate(this.value, 'yyyy-MM-dd hh:mm:ss')
      } else {
        return formatDate(this.value, 'yyyy-MM-dd')
      }
    }
    else {
      return ""
    }
  }

  setYear(type) {
    if (type == 'prev') {
      this.currYear = this.currYear - 20;
    } else {
      this.currYear = this.currYear + 20;
    }
  }

  get yearList() {
    let star = this.currYear - 10;
    let end = this.currYear + 10;
    let years: any = [];
    for (let i = star; i < end; i++) {
      years.push(i)
    }
    return years;
  }

  getDay(year, month) {
    let isRn = false
    let days = 0;
    if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
      // 判断是否为闰年：能被400整除或者能被4整除，但不能被100整除
      isRn = true
    }
    if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
      days = 31;
    } else if (month == 2) {
      days = 28;
      if (isRn) {
        days = 29;
      }
    } else if ([4, 6, 9, 11].includes(month)) {
      days = 30;
    }
    let list: any = [];
    for (let i = 1; i <= days; i++) {
      list.push(i)
    }
    return list;
  }

  mounted() {
    if (this.dom) {
      this.off = {
        width: document.getElementById(this.dom)?.scrollWidth,
        height: document.getElementById(this.dom)?.scrollHeight
      }
    } else {
      this.off = {
        width: document.body.scrollWidth,
        height: document.body.scrollHeight
      }
    }
    // if (this.value) {
    //   let years = formatDate(this.value, "yyyy-MM-dd-hh-mm-ss").split('-');
    //   this.selectYear = Number(years[0]);
    //   this.selectMonth = Number(years[1]);
    //   this.selectDay = Number(years[2]);
    //   this.selectHour = Number(years[3]);
    //   this.selectMinute = Number(years[4]);
    //   this.selectSecond = Number(years[5]);
    // }
  }

  get row() {
    let prevMonthDay;
    let nextMonthDay;
    let prevMonth = 0;
    let nextMonth = 0;
    this.prevYear = this.selectYear;
    this.nextYear = this.selectYear;
    if (this.selectMonth == 1) {
      prevMonth = 12;
      nextMonth = 2;
      this.prevYear = this.selectYear - 1;
    } else if (this.selectMonth == 12) {
      prevMonth = 11;
      nextMonth = 1;
      this.nextYear = this.selectYear + 1;
    } else {
      prevMonth = this.selectMonth - 1;
      nextMonth = this.selectMonth + 1;
    }
    prevMonthDay = this.getDay(this.prevYear, prevMonth).map(v => { return { day: v, value: `${this.prevYear}-${prevMonth}-${v}`, type: 'prev' } });
    nextMonthDay = this.getDay(this.nextYear, nextMonth).map(v => { return { day: v, value: `${this.nextYear}-${nextMonth}-${v}`, type: 'next' } });
    let currMonthDay = this.getDay(this.selectYear, this.selectMonth).map(v => { return { day: v, value: `${this.selectYear}-${this.selectMonth}-${v}`, type: 'curr' } });
    this.week = new Date(`${this.selectYear}/${this.selectMonth}/1`).getDay();
    this.starDay = prevMonthDay.length - this.week;
    this.endDay = this.starDay + 42;
    let dates = [].concat(prevMonthDay).concat(currMonthDay).concat(nextMonthDay);
    return dates.slice(this.starDay, this.endDay)
  }
}
</script>

<style lang='less'>
</style>