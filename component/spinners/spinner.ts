import { createVNode, render } from '@vue/runtime-dom';
import spinnerel from './spinne.vue';

let container: null | HTMLElement;
let body: any | HTMLElement;
let target = true;
let zindex = 8888;

const destroy = () => {
  if (container) {
    // 如果没有开启mask 多次点击弹出提示，销毁时容易出错
    render(null, container);
    if (body) {
      if (!target) {
        body.className = body.className.replace(" rel", "");
      }
    }
    body.removeChild(container);
    body = null;
    container = null;
    target = true;
  }
};

const _render = (props: any = {}) => {
  if (container) {
    destroy();
  }
  zindex++;
  let className = "__loading-content w-all h-all flex ai-c jc-c"
  target = true;
  body = document.body as HTMLElement;
  if (props.target && typeof props.target === 'string' && document.getElementById(props.target)) {
    body = document.getElementById(props.target) as HTMLElement;
    className += " abs"
    target = false;
    if (!body.className.includes('rel')) {
      body.className += ' rel';
    }
  } else {
    className += " fixed"
  }
  if (props.background) {
    className += ` ${props.background}`
  } else {
    className += " ba-f3"
  }
  container = document.createElement('section')
  container.className = className;
  container.style.zIndex=String(zindex);
  const vm = createVNode(spinnerel, props);
  render(vm, container);
  body.appendChild(container);
};

let Spinners = {
  show(opts: any = {}) {
    _render(opts)
  },
  close() {
    destroy()
  }
}

export const spinner = Spinners;

export default (app) => {
  app.config.globalProperties.spinner = Spinners
}