 tree使用方法
 <tree v - slot:default="data" : data = "datas" >
   <div @click="setTree(data.node.item,data)" > {{ data.node.item.label }}</div>
 < /tree>

 selects 下拉框
 disList禁止已选过的项
 <selects :disList="selectId" class="mt10 flex-1" placeholder="请选择机构" :index="index" @change="changeDep" v-model="item.value" props="name,id" :data="noList"></selects>

switchs切换框
//show 显示文字
open="是,true,#ddd",close="否,true,#ddd" 第一个是显示文字，第二个是值，第三个显示颜色
 <switchs open="允许" show :data="item.id" @change="setLogin" close="禁止" v-model="item.loginManage"></switchs>