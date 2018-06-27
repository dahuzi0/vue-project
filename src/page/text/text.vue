/**
* Author: earl
* Create Time: 2018-06-26 14:27
* Description: 文字
*/

<template>
  <div class="_main_">
    <el-button type="primary" @click="createCode">生成代码</el-button>
    <quill-editor
      v-model="content"
      ref="quillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      class="quill_editor">
    </quill-editor>
    <div class="content ql-editor" v-html="content"></div>
  </div>
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import {quillEditor} from 'vue-quill-editor'

  export default {
    data() {
      return {
        content: '<h2>Welcome to the editor!</h2>',
        editorOption: {
          theme: 'snow',
        }
      }
    },
    mounted() {
      this.editor;
    },
    methods: {
      onEditorBlur(quill) {
        console.log('editor blur!', quill)
      },
      onEditorFocus(quill) {
        console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        console.log('editor ready!', quill)
      },
      createCode(){
        alert(this.content);
      }
    },
    computed: {
      editor() {
        return this.$refs.quillEditor.quill
      }
    },
    components: {quillEditor},
  }
</script>

<style lang="scss" scoped>
  .ql-editor {
    height: 30rem;
    padding-bottom: 1rem;
  }
  .quill_editor{
    height: 300px;
    margin-top: 30px;
    margin-bottom: 50px;
  }
</style>
