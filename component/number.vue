<template>
  <div ref="main" :class="skins" class="flex ai-c fs-22 ra-4 jc-c">
    <i @click="onSub" v-if="direction=='default'" :class="{...btnclass,'ra-5':skin==2}" class="h-all hand noselect flex ai-c jc-c">-</i>
    <input v-model="value" :placeholder="placeholder" :class="{' ra-5':skin==2,[inputClass]:true}" class="flex-1 fs-14 h-all centers w-all" checked type="text">
    <i @click="onAdd" v-if="direction=='default'" :class="{...btnclass,'ra-5':skin==2}" class=" h-all hand noselect flex ai-c jc-c">+</i>
    <div v-if="direction=='right'" class="flex h-all ai-c jc-c pr5 fd-c">
      <img @click="onAdd" class="w-12 hand"
        src="data:image/png;base64,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"
        alt="">
      <img @click="onSub" class="w-12 mt5 hand"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABACAYAAADs39J0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAV6SURBVHja7JxdbFRFFMf/595+bBXRKG2iglETjR8NJtAiXdvdOxNqAmJNEInwAjyJMYIvhARjIAaC4cmPB9EHxRcxBXwgsiSW3Jldmy3SEqMGfTDBRAwPNCIC2gX37vHl0khpabe7ez/aOa935s7O/5e5c89/51zCmFBK3cXMmwFIIloCoAkmqhbMfIGI8gCOCiH2jb1OY2C8BmAPgDuMdIHEWSJa7ziOugmIUmoHgJ1Go8BXzFUiWimEOD4KRCm1DECfkSc0KH/X19cv6Orq+vM6kEEAbUaaUKF8IKXcTEqpxwD8bCQJPUYcx7mdtNYbmfkTo0ckVkkrKaV2AXjTyBF+EFEPKaW2AXjHyBGJEOS67ioiOmy0CD8sy3qAlFIJAOdNMhh6fCeEWEQA4LruXiLaajQJdUPfIqV8/3oekvBffR800oQS/Y7jpIiIR60TrXU7M5802gS+Mn5raGjo6OzsPAeMMRe11t3MnAFQZ6QKBMYftm13pNPpX0Zffcc28t+6Do13zURVYfxTV1fXkUqlfrghFxmvsVLqFQD7jGw1iyIzL5NSZm9KDifq4brubiLabrSrxeLg1VLKL8fN1m/VUyn1KYANRsOqxiYhxEcTXaRJUJLW+giAlUbHqiyNt6WUO27VZtKNe2hoqP7SpUuaiJJG0opivxBi42SNpvQmpZSaw8z9RPSU0XVacdhxnJeIiKsCBADy+fzdhUJhkIgeNvqWFXp4eHjZmjVrvKk0LivXUErNZ+ZTRNRidJ7SnvF9IpHoSCaTI1PtU3byl8vlnvA87wSMOzwZjDOJRKI9mUxeKKfftLJxrXUHM7sAEkb6cWGcI6KnhRC/l9t32vaI1rq7VCodIyLbILghLlqWteT//lQgQPw95WUABwyD0SgA6BJCDE33BhUbiFrrrcy81zym2LMsa7njOBUdOKyKo6uUehfAltnMA8A6IcQXld6oaha767qfE9HaWQrklv5UKECY2VJKHSOiZ2fZo2qPlLJqrnhV/4TKZDKNiUTCnUW+15T8qdCA+PvJHGY+QURPznAYXzmO0zMVfypUIH423+x53ikAC2boYyo/d+5cp62t7d9q37tm/5tns9mHPM8bJKJ7ZhiM00S0VAhxpRb3r+lBhlwut9DzvH7MEN+Lmc/U1dUtTaVSw7Uao+YnS7TWHaVSSRNRQ8xhnCeixdPxpyIFxM9RngNwhIismPK4bNv20lQq9VOtBwrs7JVSaj2A/TFcGdcsy3IcxxkIYrxAD8O5rrudiHbHCIYH4AUp5dGgxgz8dKJS6kMAm2LCZG01/KlIA/GhHALwYsRXxzYpZeAudihAent77Xnz5mUi7Hu9J4R4I4yBQztQnclkGpuamr4B0B6xlXFASrkurPFDPeHe19d3p23bJ4no0YjA+FoIsZyISrMSiJ/N31ssFoeI6L6Qf8rgyMhI14oVK66G+SMiUQOSzWYf8TxvICzfi5lPe573THd3919haxGZopxcLrewWCwOENFtAQ991rbtxbX0p2IJxE8c00R0HAGV1PklZe3pdPrXqGgQubI113VXATgYgO912bbtzrElZQbI+IljTX2voP2p2APxoewEsKMGMEoAeoL0p2YEEB9KLUrqNgghPovqnCMNxC+pO4jq+V5vCSF2RXnOka9F7+3ttZubm48DcCq81T4hxKtRn28sPg6Qz+ebCoXCQAUldYeFEKvjMNfYfK2hgpK6skrKDJDyNvn5zPxtGb7XYGNjY7qckjIDpMzIZrOPe57XR0T3T9J0CEC3EOJinOYXyw/M+I+vg0QkJ3g7+7ilpeX11tbWa3GbW6y/+KO1fp6ZFzHzIgBXiOhHAP1CiP64zomYGSYMEBMTxH8DAP+mIybsEoDOAAAAAElFTkSuQmCC"
        alt="">
    </div>
  </div>
</template>

<script lang='ts'>
// 计数器
import { Vue, Model, Prop, Emit } from 'vue-property-decorator';
export default class App extends Vue {
  @Model('modelValue', { type: [String, Number, Boolean], default: "0" }) value;
  @Prop({ type: String, default: "h-35 w-150" }) class;
  // 输入框样式
  @Prop({ type: String, default: "" }) inputClass;
  //样式 1为一体，2为分开，3为right
  @Prop({ type: String, default: "1" }) skin;
  @Prop({ type: String, default: "" }) placeholder;
  // 上限
  @Prop({ type: [String, Number], default: "" }) max;
  // 下限
  @Prop({ type: [String, Number], default: "" }) min;
  // 步数
  @Prop({ type: [String, Number], default: 1 }) step;
  //方向 为两种 default,right
  @Prop({ type: String, default: 'default' }) direction;

  heights = 0;

  get skins() {
    let c = 'number-' + this.skin;
    if (this.direction == 'right') {
      c = 'number-3';
    }
    return {
      [c]: true,
      [this.class]: true
    }
  }

  get btnclass() {
    let c = 'w-' + this.heights;
    return {
      [c]: true
    }
  }

  onAdd() {
    if (this.max && this.value > parseFloat(this.max)) {
      this.$emit('update:modelValue', this.max);
      this.changeValue(this.max)
      return;
    } else {
      let val = parseFloat(this.value || 0) * 10000 + parseFloat(this.step) * 10000;
      if (val / 10000 > parseFloat(this.max)) {
        val = parseFloat(this.max) * 10000
      }
      this.$emit('update:modelValue', val / 10000);
      this.changeValue(val / 10000)
    }
  }

  @Emit('change')
  changeValue(v) {
    return v
  }

  onBlur(){
    console.log(this.value)
  }

  onSub() {
    if (this.min && parseFloat(this.value) < parseFloat(this.min)) {
      this.$emit('update:modelValue', this.min);
      this.changeValue(this.min)
      return;
    } else {
      let val = parseFloat(this.value || 0) * 10000 - parseFloat(this.step) * 10000;
      if (val / 10000 < parseFloat(this.min)) {
        val = parseFloat(this.min) * 10000
      }
      this.$emit('update:modelValue', val / 10000);
      this.changeValue(val / 10000)
    }
  }

  cheight() {
    this.heights = this.$refs.main && this.$refs.main.offsetHeight;
  }

  mounted() {
    this.cheight()
  }

  updated() {
    this.cheight()
  }
}
</script>

<style lang='less'>
.number-1 {
  border: 1px solid #ddd;
  input {
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
  }
}
.number-2 {
  i {
    border: 1px solid #ddd;
  }
  input {
    border: 1px solid #ddd;
  }
}
.number-3 {
  border: 1px solid #ddd;
}
</style>