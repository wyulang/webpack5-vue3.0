启动 npm run dev

打包npm run build

本次改版 提升开发效率80%以上


本框架所使用的是 以下最新版本， vue3 typescript4

"vue-class-component": "^8.0.0-rc.1",

"vue-loader": "^17.0.0",

"vue-property-decorator": "^10.0.0-rc.3",


##本框架已开发了所属相关组件，如有需要可以联系我定制组件

vue3 typescript组件库 在文件component 

本框架组件更适合前端开发，例：

##下拉框组件 常用下拉组件，

<Select @change="change" type="serch"
:data="[{label:11,value:111}] 也可以是 [111,222] 会自己动解析成[{label:111,value:111},{label:111,value:111}]"  v-model="value">
</Select>

change(data){

  常用组件data返回的是选中的值，如111,
  本组件会返回，三个值，
  {value:111,item:item,type:'serch'}
  其中item 为数组原对像如 {id:1,name:'下拉',creatime:'124124242',这些是后台所后的对像}

  this.valuename=data.item.name;
}
