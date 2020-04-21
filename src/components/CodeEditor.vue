<template>
  <div>
    <el-button type="primary" @click="showCode">查看代码</el-button>
    <el-dialog title="Vue Component" :visible.sync="codeDialogVisible" width="50%">
      <MonacoEditor height="600" language="html" :code="code"></MonacoEditor>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="copyCode">复制代码</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import MonacoEditor from "vue-monaco-editor";
import {codeFormat} from '@/tools/codeFormat.js'
import {copyContent} from '@/tools/copyContent.js'
export default {
  data() {
    return {
      codeDialogVisible: false, //对话框
      code: ""
    };
  },
  components: { MonacoEditor },
  props: ["option"],
  methods: {
    showCode() {
      this.codeDialogVisible = true;
      this.code = codeFormat().format(this.option);
    },
    copyCode(){
      copyContent().copy(this.code)
      this.$message({
          showClose: true,
          message: '成功复制到剪贴板',
          type: 'success'
        })
    }
  }
};
</script>

<style lang="scss" scoped>
</style>