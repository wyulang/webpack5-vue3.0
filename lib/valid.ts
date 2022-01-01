import { Options, Vue } from "vue-property-decorator";
import { h, render } from '@vue/runtime-dom';
let currIndex = 1;
function addMessage(el, data) {
  let parent = el.parentElement;
  parent.id = "valid" + currIndex;
  if (!parent.className.includes('rel')) {
    parent.className += " rel"
  }

  let span = h('span', { id: "error" + currIndex, class: 'abs red fs-12 lh-12 al1', style: `top:${parent.offsetHeight + 2}px;display:${data.show}` }, '内容不为空')
  // const container = document.createElement('span')
  // container.className = "abs red fs-12 lh-12 hide al1";
  // container.style.top = `${parent.offsetHeight + 2}px`;
  // container.innerText = "内容不为空";
  // container.id = "error" + currIndex;
  render(span, parent)
  // parent.appendChild(span);
}
@Options({
  directives: {
    'valid': {
      mounted: (el, binding, vnode) => {
        currIndex++;
        let modal: any = binding.instance;
        modal.validList['valid' + currIndex] = { value: "", show: '' }
        // addMessage(el, modal.validList['valid' + currIndex]);
        el.setAttribute('currid', currIndex)
        modal.validId.push({ id: "valid" + currIndex, show: false, index: currIndex, value: "" })
      },
      updated: (el, binding, vnode) => {
        let modal: any = binding.instance;
        debugger
        // modal.validList['valid'+el.getAttribute('currid')]={ value: binding.value, show: 'none' };
        // modal.validList.forEach(v=>{
        //   v.show="none"
        // })
        // modal.validId.find(v => v.index == el.getAttribute('currid')).value = binding.value;
      }
    }
  }
})
export default class Valid extends Vue {
  validId = [];
  validList: any = {}
}
