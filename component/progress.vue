<template>
  <div class="wypress" :class="['wypress--' + type,status ? 'is-' + status : '',{'wypress--without-text': !showText,'wypress--text-inside': textInside,}]" role="progressbar" :aria-valuenow="percentage" aria-valuemin="0" aria-valuemax="100">
    <div class="wypress-bar" v-if="type === 'line'">
      <div class="wypress-bar__outer" :style="{height: height + 'px',backgroundColor:bc}">
        <div class="wypress-bar__inner" :style="barStyle">
          <div class="wypress-bar__innerText" v-if="showText && textInside">{{content}}</div>
        </div>
      </div>
    </div>
    <div class="wypress-circle" :style="{height: width + 'px', width: width + 'px'}" v-else>
      <svg viewBox="0 0 100 100">
        <path class="wypress-circle__track" :d="trackPath" :stroke="bc" :stroke-width="relativeStrokeWidth" fill="none" :style="trailPathStyle"></path>
        <path class="wypress-circle__path" :d="trackPath" :stroke="stroke" fill="none" :stroke-linecap="strokeLinecap" :stroke-width="percentage ? relativeStrokeWidth : 0" :style="circlePathStyle"></path>
      </svg>
    </div>
    <div class="wypress__text" v-if="showText && !textInside" :style="{fontSize: progressTextSize + 'px'}">
      <template v-if="!status">{{content}}</template>
      <i v-else :class="iconClass"></i>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Model } from 'vue-property-decorator';
export default class App extends Vue {
  @Prop({ type: String, default: 'line' }) type;
  // 'success', 'exception', 'warning'
  @Prop({ type: String, default: 'success' }) status;
  // butt/round/square
  @Prop({ type: String, default: 'round' }) strokeLinecap;
  // 是否显示进度条文字内容
  @Prop({ type: Boolean, default: false }) showText;
  // 百分比（必填）
  @Prop({ type: [Number, String], default: 0 }) percentage;
  // 进度条的高度/厚度，单位 px
  @Prop({ type: [Number, String], default: 6 }) height;
  // 环形进度条画布宽度（只在 type 为 circle 或 dashboard 时可用）
  @Prop({ type: [Number, String], default: 126 }) width;
  // circle/dashboard 类型路径两端的形状
  @Prop({ type: Boolean, default: false }) textInside;
  @Prop({ type: Function }) format;
  @Prop({ type: [String, Array, Function], default: '' }) color;
  @Prop({ type: String, default: '#ebeef5' }) bc;

  get barStyle() {
    const style = {};
    style.width = this.percentage + '%';
    style.backgroundColor = this.getCurrentColor(this.percentage);
    return style;
  }
  get relativeStrokeWidth() {
    return (this.height / this.width * 100).toFixed(1);
  }
  get radius() {
    if (this.type === 'circle' || this.type === 'dashboard') {
      return parseInt(50 - parseFloat(this.relativeStrokeWidth) / 2, 10);
    } else {
      return 0;
    }
  }
  get trackPath() {
    const radius = this.radius;
    const isDashboard = this.type === 'dashboard';
    return `
          M 50 50
          m 0 ${isDashboard ? '' : '-'}${radius}
          a ${radius} ${radius} 0 1 1 0 ${isDashboard ? '-' : ''}${radius * 2}
          a ${radius} ${radius} 0 1 1 0 ${isDashboard ? '' : '-'}${radius * 2}
          `;
  }
  get perimeter() {
    return 2 * Math.PI * this.radius;
  }
  get rate() {
    return this.type === 'dashboard' ? 0.75 : 1;
  }
  get strokeDashoffset() {
    const offset = -1 * this.perimeter * (1 - this.rate) / 2;
    return `${offset}px`;
  }
  get trailPathStyle() {
    return {
      strokeDasharray: `${(this.perimeter * this.rate)}px, ${this.perimeter}px`,
      strokeDashoffset: this.strokeDashoffset
    };
  }
  get circlePathStyle() {
    return {
      strokeDasharray: `${this.perimeter * this.rate * (this.percentage / 100)}px, ${this.perimeter}px`,
      strokeDashoffset: this.strokeDashoffset,
      transition: 'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease'
    };
  }
  get stroke() {
    let ret;
    if (this.color) {
      ret = this.getCurrentColor(this.percentage);
    } else {
      switch (this.status) {
        case 'success':
          ret = '#13ce66';
          break;
        case 'exception':
          ret = '#ff4949';
          break;
        case 'warning':
          ret = '#e6a23c';
          break;
        default:
          ret = '#20a0ff';
      }
    }
    return ret;
  }
  get iconClass() {
    if (this.status === 'warning') {
      return 'el-icon-warning';
    }
    if (this.type === 'line') {
      return this.status === 'success' ? 'el-icon-circle-check' : 'el-icon-circle-close';
    } else {
      return this.status === 'success' ? 'el-icon-check' : 'el-icon-close';
    }
  }
  get progressTextSize() {
    return this.type === 'line'
      ? 12 + this.height * 0.4
      : this.width * 0.111111 + 2;
  }
  get content() {
    if (typeof this.format === 'function') {
      return this.format(this.percentage) || '';
    } else {
      return `${this.percentage}%`;
    }
  }

  getCurrentColor(percentage) {
    if (typeof this.color === 'function') {
      return this.color(percentage);
    } else if (typeof this.color === 'string') {
      return this.color;
    } else {
      return this.getLevelColor(percentage);
    }
  }
  getLevelColor(percentage) {
    const colorArray = this.getColorArray().sort((a, b) => a.percentage - b.percentage);

    for (let i = 0; i < colorArray.length; i++) {
      if (colorArray[i].percentage > percentage) {
        return colorArray[i].color;
      }
    }
    return colorArray[colorArray.length - 1].color;
  }
  getColorArray() {
    const color = this.color;
    const span = 100 / color.length;
    return color.map((seriesColor, index) => {
      if (typeof seriesColor === 'string') {
        return {
          color: seriesColor,
          progress: (index + 1) * span
        };
      }
      return seriesColor;
    });
  }

}
</script>

<style lang='less'>
.wypress {
  position: relative;
  line-height: 1;
}

.wypress__text {
  font-size: 14px;
  color: #606266;
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
  line-height: 1;
}

.wypress__text i {
  vertical-align: middle;
  display: block;
}

.wypress--circle,
.wypress--dashboard {
  display: inline-block;
}

.wypress--circle .wypress__text,
.wypress--dashboard .wypress__text {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  text-align: center;
  margin: 0;
  transform: translateY(-50%);
}

.wypress--circle .wypress__text i,
.wypress--dashboard .wypress__text i {
  vertical-align: middle;
  display: inline-block;
}

.wypress--without-text .wypress__text {
  display: none;
}

.wypress--without-text .wypress-bar {
  padding-right: 0;
  margin-right: 0;
  display: block;
}

.wypress--text-inside .wypress-bar {
  padding-right: 0;
  margin-right: 0;
}

.wypress.is-success .wypress-bar__inner {
  background-color: #67c23a;
}

.wypress.is-success .wypress__text {
  color: #67c23a;
}

.wypress.is-warning .wypress-bar__inner {
  background-color: #e6a23c;
}

.wypress.is-warning .wypress__text {
  color: #e6a23c;
}

.wypress.is-exception .wypress-bar__inner {
  background-color: #f56c6c;
}

.wypress.is-exception .wypress__text {
  color: #f56c6c;
}

.wypress-bar {
  padding-right: 50px;
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  margin-right: -55px;
  box-sizing: border-box;
}

.wypress-bar__outer {
  height: 6px;
  border-radius: 100px;
  overflow: hidden;
  position: relative;
  vertical-align: middle;
}

.wypress-bar__inner {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: #409eff;
  text-align: right;
  border-radius: 100px;
  line-height: 1;
  white-space: nowrap;
  transition: width 0.6s ease;
}

.wypress-bar__inner:after {
  display: inline-block;
  content: "";
  height: 100%;
  vertical-align: middle;
}

.wypress-bar__innerText {
  display: inline-block;
  vertical-align: middle;
  color: #fff;
  font-size: 12px;
  margin: 0 5px;
}

@keyframes progress {
  0% {
    background-position: 0 0;
  }

  to {
    background-position: 32px 0;
  }
}
</style>