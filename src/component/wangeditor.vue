<template>
  <div class="wangeditor mt15" ref="editorElem"></div>
</template>
<script>
//这里很重要，要不能会报错；
import E from "wangeditor/release/wangEditor.min.js";
export default {
  data() {
    return {
      editor: null
    }
  },
  watch: {
    remark(val) {
      if (this.editor != "") {
        this.editor.txt.html(val);
      }
    },
    isClear(val) {
      if (this.isClear) {
        this.editor.txt.clear();
        this.isClear=false;
      }
    }
  },
  props: ['setEditorValue', 'remark', 'path', 'isClear'],
  mounted() {
    this.editor = new E(this.$refs.editorElem);
    this.editor.customConfig = {
      menus: [
        'head', 'bold', 'fontSize', 'fontName', 'italic', 'underline', 'strikeThrough',
        'foreColor', 'backColor', 'link', 'list', 'justify', 'quote',
        'emoticon', 'image', 'table', 'undo', 'redo'
      ],

      fontNames: [
        '宋体', '微软雅黑', 'Arial', 'Tahoma', 'Verdana'
      ],

      colors: [
        '#000000', '#eeece0', '#1c487f', '#4d80bf', '#c24f4a', '#8baa4a', '#7b5ba1', '#46acc8', '#f9963b', '#ffffff'
      ],
      // 编辑区域的 z-index
      zIndex: 10000,

      // 是否开启 debug 模式（debug 模式下错误会 throw error 形式抛出）
      debug: false,

      // 插入链接时候的格式校验
      linkCheck: function (text, link) {
        // text 是插入的文字
        // link 是插入的链接
        return true
      },

      // 插入网络图片的校验
      linkImgCheck: function (src) {
        // src 即图片的地址
        return true
      },

      // 粘贴过滤样式，默认开启
      pasteFilterStyle: true,

      // 粘贴内容时，忽略图片。默认关闭
      pasteIgnoreImg: false,

      // 对粘贴的文字进行自定义处理，返回处理后的结果。编辑器会将处理后的结果粘贴到编辑区域中。
      // IE 暂时不支持
      pasteTextHandle: function (content) {
        // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
        return content
      },

      // onchange 事件
      onchange: (html) => {
        this.$emit('setEditorValue', html);
      },

      // 是否显示添加网络图片的 tab
      showLinkImg: true,

      // 插入网络图片的回调
      linkImgCallback: function (url) {
        // console.log(url)  // url 即插入图片的地址
      },

      // 默认上传图片 max size: 5M
      uploadImgMaxSize: 5 * 1024 * 1024,

      // 配置一次最多上传几个图片
      // uploadImgMaxLength: 5,

      // 上传图片，是否显示 base64 格式
      uploadImgShowBase64: false,

      // 上传图片，server 地址（如果有值，则 base64 格式的配置则失效）
      uploadImgServer: this.path || false,

      // 自定义配置 filename
      uploadFileName: '',

      // 上传图片的自定义参数
      uploadImgParams: {
        // token: 'abcdef12345'
      },

      // 上传图片的自定义header
      uploadImgHeaders: {
        // 'Accept': 'text/x-json'
      },

      // 配置 XHR withCredentials
      withCredentials: false,

      // 自定义上传图片超时时间 ms
      uploadImgTimeout: 10000,

      // 上传图片 hook 
      uploadImgHooks: {
        // customInsert: function (insertLinkImg, result, editor) {
        //     console.log('customInsert')
        //     // 图片上传并返回结果，自定义插入图片的事件，而不是编辑器自动插入图片
        //     const data = result.data1 || []
        //     data.forEach(link => {
        //         insertLinkImg(link)
        //     })
        // },
        before: function (xhr, editor, files) {
          // 图片上传之前触发

          // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
          // return {
          //     prevent: true,
          //     msg: '放弃上传'
          // }
        },
        success: function (xhr, editor, result) {
          // 图片上传并返回结果，图片插入成功之后触发
        },
        fail: function (xhr, editor, result) {
          // 图片上传并返回结果，但图片插入错误时触发
        },
        error: function (xhr, editor) {
          // 图片上传出错时触发
        },
        timeout: function (xhr, editor) {
          // 图片上传超时时触发
        }
      }
    }
    this.editor.create()
    if (this.remark) {
      this.editor.txt.html(`${this.remark.indexOf('<p>') == 0 ? this.remark : ('<p>' + this.remark + '</p>')}`)
    }
  }
}
</script>
<style>
.wangeditor {
  width: 100%;
  height: 100%;
}
</style>
