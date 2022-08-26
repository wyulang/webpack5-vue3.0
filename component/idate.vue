<template>
  <div @click="inputSelect" :class="class" class="flex ai-c jc-c h-all flex-1">
    <div class="h-all flex ai-c flex-1">{{currValue}}</div>
    <span class="arrow-right w-18 h-18 mr4"></span>
  </div>

  <section v-if="visible" class="hv-all fixed at0 ab0 al0 ar0 flex fd-c">
    <div @click="btnClose(1)" class="flex-1 ba-3"></div>
    <div class="sha-card">
      <div ref="idate" :class="pickClass" class="rel hidden fc-999 fs-28">
        <div class="flex-line bc-fff ra-5 sha-card pp10 fd-c">
          <div class="w-all flex ai-c pb25 pt25 jc-b">
            <div @click="changeYear('prev')" class="pl30 pr20 hand">
              <svg viewBox="0 0 1024 1024" width="13" height="13">
                <path
                  d="M239.9 512l298.9-301.7c22-22.2 22-58.2 0-80.4l-19.9-20.1c-22-22.2-57.7-22.2-79.7 0L101.5 450.7l-1 1-19.9 20.2c-22 22.1-22 58.2 0 80.4l19.9 20.1 0.4 0.4 338.3 341.5c22 22.2 57.7 22.2 79.7 0l19.9-20.1c22-22.2 22-58.3 0-80.5L239.9 512z m404.7 0l298.9-301.7c22-22.2 22-58.2 0-80.4l-19.9-20.1c-22-22.2-57.7-22.2-79.7 0L506.1 450.7l-1 1-19.9 20.2c-22 22.1-22 58.2 0 80.4l19.9 20.1 0.4 0.4 338.3 341.5c22 22.2 57.7 22.2 79.7 0l19.9-20.1c22-22.2 22-58.3 0-80.5L644.6 512z"
                  fill="#999"></path>
              </svg>
            </div>
            <div @click="changeMonth('prev')" class="pl10 pr10 hand">
              <svg viewBox="0 0 1024 1024" width="13" height="13">
                <path d="M264.7 555l387.1 387.2c23.7 23.8 62.3 23.8 86.1 0l21.4-21.5c23.8-23.8 23.8-62.3 0-86L436.7 512l322.6-322.6c23.8-23.8 23.8-62.3 0-86l-21.4-21.5c-23.8-23.8-62.3-23.8-86.1 0L264.7 469c-23.8 23.7-23.8 62.3 0 86z" fill="#999"></path>
              </svg>
            </div>
            <div class="flex-1 flex fs-35 ai-c jc-c">
              <span @click="isYear=!isYear;isMonth=false;isHour = false;isMinute = false;isSec = false;" class="pr10 hand">{{selectYear}} 年</span>
              <span @click="isMonth=!isMonth;isYear=false;isHour = false;isMinute = false;isSec = false;" class="pl10 hand">{{selectMonth}} 月</span>
            </div>
            <div @click="changeMonth('next')" class="pl10 pr10 hand">
              <svg viewBox="0 0 1024 1024" width="13" height="13">
                <path d="M759.3 469L372.2 81.8c-23.7-23.8-62.3-23.8-86.1 0l-21.4 21.5c-23.8 23.8-23.8 62.3 0 86L587.3 512 264.7 834.6c-23.8 23.8-23.8 62.3 0 86l21.4 21.5c23.8 23.8 62.3 23.8 86.1 0L759.3 555c23.8-23.7 23.8-62.3 0-86z" fill="#999"></path>
              </svg>
            </div>
            <div @click="changeYear('next')" class="pr30 pl20 hand">
              <svg viewBox="0 0 1024 1024" width="13" height="13">
                <path
                  d="M784.1 512L485.2 813.7c-22 22.2-22 58.2 0 80.4l19.9 20.1c22 22.2 57.7 22.2 79.7 0l337.7-340.9 1-1 19.9-20.2c22-22.1 22-58.2 0-80.4l-19.9-20.1-0.4-0.4-338.3-341.5c-22-22.2-57.7-22.2-79.7 0l-19.9 20.1c-22 22.2-22 58.3 0 80.5L784.1 512z m-404.7 0L80.5 813.7c-22 22.2-22 58.2 0 80.4l19.9 20.1c22 22.2 57.7 22.2 79.7 0l337.7-340.9 1-1 19.9-20.2c22-22.1 22-58.2 0-80.4l-19.9-20.1-0.4-0.4-338.3-341.5c-22-22.2-57.7-22.2-79.7 0l-19.9 20.1c-22 22.2-22 58.3 0 80.5L379.4 512z"
                  fill="#999"></path>
              </svg>
            </div>
          </div>
          <div class="w-all rel flex fc-111 fw">
            <!-- 周 -->
            <div v-for="item in weekList" style="width:14.2857%" class=" bb-d h-80 flex ai-c mb6 jc-c">{{item}}</div>
            <!-- 日 -->
            <div @click="setDateValue(item)" :class="setClass(item)" v-for="item in row" style="width:14.2857%" class=" fs-13 h-80 flex ai-c jc-c">
              {{(currDay==item.value&&item.type=='curr')?'今天':item.day}}
            </div>
            <!-- 月 -->
            <section @click="isMonth=false" v-if="isMonth" class="abs at0 ab0 ar0 al0 pp20 flex ai-c jc-c ba-f9">
              <div class="flex sha-6 ra-5 hidden fw">
                <div @click.stop="selectMonth=index+1;isMonth=false;" v-for="(month,index) in monthList" :class="{'fc-primary fb fs-28':selectMonth==index+1}" class="wb-33 fs-28 flex ai-c jc-c hand h-70">{{month}}</div>
              </div>
            </section>
            <!-- 年 -->
            <section @click="isYear=false" v-if="isYear" class="abs at0 ab0 ar0 al0 pp10 flex fd-c ai-c jc-c ba-f9">
              <div @click.stop="setYear('prev')" class="w-all pb5 hand flex ai-c jc-c">
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                  <path fill="#999"
                    d="M872.523053 824.446082l-718.53082 0c-39.763632 0-71.922053-31.909757-71.922053-71.675436 0-18.485003 7.095605-35.205826 18.486026-47.872311L455.885981 230.77294399c23.810289-31.400151 68.641333-37.993313 100.29731-14.18302399 5.570879 4.052293 10.384511 8.873088 14.18302399 14.190187L929.764755 709.958584c23.547299 31.407314 17.217127 76.479859-14.436804 100.041484-12.922311 9.881045-27.864628 14.43885-42.804898 14.43884999l0 0L872.523053 824.446082zM872.523053 824.446082">
                  </path>
                </svg>
              </div>
              <div class="flex sha-6 ra-5 hidden fw">
                <div @click.stop="selectYear=years;isYear=false;" v-for="(years,index) in yearList" :class="{'fc-primary fb fs-28':selectYear==years}" class="wb-20 fs-28 flex ai-c jc-c hand h-70">{{years}}</div>
              </div>
              <div @click.stop="setYear('next')" class="w-all pt5 hand flex ai-c jc-c">
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                  <path fill="#999"
                    d="M871.424 200.704c14.848 0 29.696 4.608 43.008 14.336 31.744 23.552 37.888 68.608 14.336 99.84l-359.424 479.232c-3.584 5.12-8.704 10.24-14.336 14.336-31.744 24.064-76.288 17.408-100.352-14.336L99.328 320.512c-11.264-12.8-18.432-29.184-18.432-48.128 0-39.936 32.256-71.68 71.68-71.68h718.848z">
                  </path>
                </svg>
              </div>
            </section>
            <!-- 时分秒 -->
            <section @click="isHour=false;isMinute=false;isSec=false;" v-if="isHour||isMinute||isSec" class="abs at0 ab0 ar0 al0 pp20 flex ai-c jc-c ba-f9">
              <div v-if="isHour" class="flex sha-6 ra-5 hidden rel fw">
                <div @click.stop style="font-size:100px" class="abs at0 op-1 flex ai-c jc-c fc-666 al0 ar0 ab0 zi-100">时</div>
                <!-- 时 -->
                <div @click.stop="selectHour=hour;isHour=false;" v-for="(hour,index) in hourList" :class="{'bc-primary fc-fff fb fs-28':selectHour==index}" class="wb-25 rel zi-100 bb-e br-e fs-28 flex ai-c jc-c hand h-70">{{hour}}</div>
              </div>
              <div v-if="isMinute" class="flex hidden h-400 rel sha-6 ra-8 fw">
                <div @click.stop style="font-size:100px" class="abs at0 op-1 flex ai-c jc-c fc-333 al0 ar0 ab0 zi-100">分</div>
                <!-- 分 -->
                <div @click.stop="selectMinute=minu;isMinute=false;" v-for="(minu,index) in minuList" :class="{'bc-primary fc-fff fb':selectMinute==index}" style="width:10%" class="zi-120 rel fc-777 bb-e br-e fs-13 flex ai-c jc-c hand h-66">{{minu}}</div>
              </div>
              <div v-if="isSec" class="flex rel sha-6 ra-5 hidden h-400 fw">
                <!-- 秒 -->
                <div @click.stop="selectSecond=sec;isSec=false;" v-for="(sec,index) in secList" :class="{'bc-primary fc-fff fb':selectSecond==index}" style="width:10%" class="bb-e br-e zi-120 fc-777 fs-13 rel flex ai-c jc-c hand h-66">{{sec}}</div>
                <div @click.stop style="font-size:100px" class="abs at0 op-1 flex ai-c jc-c fc-333 al0 ar0 ab0 zi-100">秒</div>
              </div>
            </section>
          </div>
          <div v-if="time" @click="btnClearPop" class="flex w-all bt-e ai-c pt20 pb20 pl20 pr20 jc-c">
            <input @click.stop="btnHover(1)" maxlength="2" readonly v-model="selectHour" class="ipt w-100 ra-3 centers h-60 ipt-auto" type="text">
            <span class="fs-12 pl5">:</span>
            <input @click.stop="btnHover(2)" maxlength="2" readonly v-model="selectMinute" class="ipt w-100 ra-3 centers ml5 h-60 ipt-auto" type="text">
            <span class="fs-12 pl5">:</span>
            <input @click.stop="btnHover(3)" maxlength="2" readonly v-model="selectSecond" class="ipt w-100 ra-3 centers ml5 h-60 ipt-auto" type="text">
            <!-- <span class="fs-12 pl5">秒</span> -->
            <div class="flex ai-c flex-1 jc-e">
              <div @click.stop="btnTime" style="width:14.2857%" class=" h-all  ra-5 flex ai-c hand jc-c fc-aa  ">此刻</div>
              <div @click.stop="btnTimeSave" style="width:14.2857%" class=" h-all ml20 btn ra-5 flex ai-c hand jc-c fc-aa fb btn-auto">确定</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang='ts'>
import { Vue, Prop, Model, Emit } from 'vue-property-decorator';
import formatDate from '@lib/dateFormat';
export default class datepick extends Vue {
  // 日期格式化
  @Prop({ type: String, default: "yyyy-MM-dd" }) format;
  @Prop({ type: String, default: "" }) pickClass;
  // 输入框大小
  @Prop({ type: String, default: "small" }) size;
  // 是否显示 时分秒
  @Prop({ type: Boolean, default: false }) time;
  // 是否显示 时分秒
  @Prop({ type: Boolean, default: false }) disabled;
  // 是否有清空图标
  @Prop({ type: Boolean, default: true }) clear;
  @Prop({ type: String, default: "请选择日期" }) placeholder;
  @Prop({ type: String, default: "" }) class;
  // 当出现在某个position: absolute元素内，出现滚动条时，需要当前的div  this.dom
  @Prop({ type: String, default: "" }) dom;
  @Model('modelValue', { type: [String, Number, Date], default: "" }) value;
  visible = false;
  weekList = ['日', '一', '二', '三', '四', '五', '六'];
  monthList = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
  hourList = Array.from(new Array(24).keys()).map(v => { return v < 10 ? ('0' + v) : v })
  minuList = Array.from(new Array(60).keys()).map(v => { return v < 10 ? ('0' + v) : v })
  secList = Array.from(new Array(60).keys()).map(v => { return v < 10 ? ('0' + v) : v })
  currDay = formatDate(new Date(), "yyyy-M-d");
  currMonth = new Date().getMonth() + 1;
  week = 0;
  selectYear = new Date().getFullYear();
  currYear = new Date().getFullYear();
  selectMonth = new Date().getMonth() + 1;// 默认从0开始，所以需要加1
  selectDay = new Date().getDate();
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
  isHour = false;
  isMinute = false;
  isSec = false;
  isFirst = true

  off: any = { width: 0, height: 0 }

  inputSelect(e) {
    this.visible = true;
  }

  btnClose(e) {
    this.visible = false;
  }

  btnHover(type) {
    this.isHour = false;
    this.isMinute = false;
    this.isSec = false;
    if (type == 1) {
      this.isHour = true;
    }
    if (type == 2) {
      this.isMinute = true;
    }
    if (type == 3) {
      this.isSec = true;
    }
  }

  btnClearPop() {
    this.isHour = false;
    this.isMinute = false;
    this.isSec = false;
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
    this.handSelect(formatDate(new Date(), "yyyy-MM-dd hh:mm:ss"))
    this.visible = false;
    document.removeEventListener('click', this.setSelectPop)
  }

  btnTimeSave() {
    let tims = `${this.selectYear}-${this.selectMonth}-${this.selectDay} ${this.selectHour.toString()}:${this.selectMinute.toString()}:${this.selectSecond.toString()}`;
    console.log(tims)
    this.handSelect(tims)
    this.visible = false;
    document.removeEventListener('click', this.setSelectPop)
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

  @Emit('change')
  handSelect(item) {
    let mat = this.format;
    if (this.time && this.format == 'yyyy-MM-dd') {
      mat = "yyyy-MM-dd hh:mm:ss"
    }
    let value = formatDate(item, mat)
    if (['number', 'timestamp'].includes(this.format)) {
      value = new Date(item).getTime()
    }
    if (item) {
      this.$emit('update:modelValue', value);
    } else {
      this.selectHour = "00";
      this.selectMinute = "00";
      this.selectSecond = "00";
      this.$emit('update:modelValue', "");
    }
    this.isFirst = false;
    return item.value
  }

  setClass(item) {
    if (this.currDay == item.value && this.currDay != this.selectTime && item.type == 'curr') {
      return "fc-primary hand"
    } else if (item.value == this.selectTime && item.type == 'curr') {
      return "bc-primary hand fc-fff fb"
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
      this.handSelect(value)
      if (!this.time) {
        this.visible = false;
      }
    }
  }

  changeClose() {
    // this.$emit('update:modelValue', "")
    this.handSelect("")
    this.visible = false;
    this.isClear = false;
  }

  changeYear(type) {
    if (type == "prev") {
      this.selectYear = this.selectYear - 1;
    } else {
      this.selectYear = this.selectYear + 1;
    }
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
      this.selectHour = years[3];
      this.selectMinute = years[4];
      this.selectSecond = years[5];
    }
    if (this.value) {
      let format = this.format;
      if (format != "timestamp" && this.time && !format.includes('hh')) {
        format = format + " hh:mm:ss"
      }
      let currtime = formatDate(this.value, format);
      // if (this.isFirst) {
      //   this.handSelect(currtime)
      // }
      return currtime
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
.arrow-right {
  border-width: 1.5px 1.5px 0 0;
  border-color: #ddd;
  border-style: solid;
  transform: rotate(45deg);
}
</style>