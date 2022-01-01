import dig from '@component/dig.vue';
import radio from '@component/radio.vue';
import checkbox from '@component/checkbox.vue';
import page from '@component/page.vue';
import cascader from '@component/cascader/cader.vue';
import date from '@component/date.vue';
import drawer from '@component/drawer.vue';
import scroll from '@component/scroll.vue';
import Input from '@component/Input.vue';
import tree from '@component/tree.vue';
import upfile from '@component/upfile.vue';
import Switch from '@component/switch.vue';
import Select from '@component/Select.vue';
import spinner from '@component/spinners/spinner';
import message from '@component/message/message';
import directive from '@lib/vue.directive';

export default function (app) {
  app.component('dig', dig)
  app.component('Checkbox', checkbox)
  app.component('Switch', Switch)
  app.component('radio', radio)
  app.component('scroll', scroll)
  app.component('page', page)
  app.component('cascader', cascader)
  app.component('date', date)
  app.component('upfile', upfile)
  app.component('Select', Select)
  app.component('tree', tree)
  app.component('Input', Input)
  app.component('drawer', drawer)
  spinner(app);
  message(app);
  directive(app);
}