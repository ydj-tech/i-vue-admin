<!-- Discription: 自定义插件, author: ydj, Date: 2020-11-23 13:43:35 -->
<template>
  <button class="btn btn-primary">
    <span>
      <slot></slot>
    </span>
  </button>
</template>
 
<script>
</script>
<style lang='scss' scoped>
.btn {
  display: inline-block;
  line-height: 1;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}
.btn-primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
</style>
