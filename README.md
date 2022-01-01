## 本框架已开发了所属相关组件，如有需要可以联系我定制组件
- 本框架组件更适合前端开发，例：

- #下拉框组件 常用下拉组件，

 <Select @change="change" type="serch"
 
 :data="[{label:11,value:111}] 也可以是 [111,222] 会自己动解析成[{label:111,value:111},{label:111,value:111}]" 
 
 v-model="value">
 
 </Select>

change(data){

  常用组件data返回的是选中的值，如111,
  
  本组件会返回，三个值，
  
  {value:111,item:item,type:'serch'}
  
  其中item 为数组原对像如 {id:1,name:'下拉',creatime:'124124242',这些是后台所返的对像}

  this.valuename=data.item.name;
  
}

## 项目介绍

- 本项目基于 webpack5 搭建 vue3 + ts 项目。

- 你可以用此项目搭建属于你的项目！！

- 本框架所使用的是 以下最新版本， vue3 typescript4

- "vue-class-component": "^8.0.0-rc.1",

- "vue-loader": "^17.0.0",

- "vue-property-decorator": "^10.0.0-rc.3",

# 安装依赖
npm install

# 进入开发
npm run dev

# 打包
npm run build


## 更新日志

本次更新修复跑不起来的问题，优化热更新

对内容有任何疑问，欢迎联系我。

