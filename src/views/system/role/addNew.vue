<!-- Discription: 新增, author: ydj, Date: 2021-03-17 19:41:37 -->
<template>
  <div class="cus-form">
    <el-form size="small">
      <el-row>
        <el-col :span="12" :offset="4">
          <el-form-item label="角色名称" label-width="100px">
            <el-input placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="4">
          <el-form-item label="编码" label-width="100px">
            <el-input placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="4">
          <el-form-item label="备注" label-width="100px">
            <el-input type="textarea" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-row>
          <el-col :span="12" :offset="8">
            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存</el-button>
              <el-button @click="returnBack">返回</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            form: {}
        }
    },

    computed: {},

    methods: {
        onSubmit() {},
        returnBack() {
            this.$emit('returnBack', true)
        }
    }
}
</script>
<style lang='scss' scoped>
.cus-form {
  padding: 50px;
}
.search {
  margin-bottom: 54px;
}
.fold {
  width: calc(100% - 216px);
  display: inline-block;
}
.operator {
  margin-bottom: 18px;
}
@media screen and (max-width: 900px) {
  .fold {
    width: 100%;
  }
}
</style>
