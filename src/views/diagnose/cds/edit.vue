<!-- Discription: 数据流编辑, author: ydj, Date: 2019-11-09 09:52:23 -->
<template>
  <div>
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{ sn ? '编辑数据流' : '添加数据流' }}</span>
        </div>
        <div>
          <el-form ref="postForm" :model="form" class="form-container">
            <el-row>
              <!-- 数据流代号 -->
              <el-row>
                <el-col :span="24">
                  <el-form-item label-width="10%" label="代 号" class="postInfo-container-item">
                    <el-input
                      v-model="form.code"
                      placeholder="请输入数据流代号"
                      style="width:88%;max-width:100%;"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 数据流中文描述 -->
              <el-row>
                <el-col :span="24">
                  <el-form-item label-width="10%" label="中文描述" class="postInfo-container-item">
                    <el-input
                      v-model="form.description_cn"
                      placeholder="请输入数据流中文描述"
                      style="width:88%;max-width:100%;"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 数据流英文描述 -->
              <el-row>
                <el-col :span="24">
                  <el-form-item label-width="10%" label="英文描述" class="postInfo-container-item">
                    <el-input
                      v-model="form.description_en"
                      placeholder="请输入数据流英文描述"
                      style="width:88%;max-width:100%;"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label-width="10%" label="命令字" class="postInfo-container-item">
                    <el-input
                      v-model="form.command"
                      placeholder="请输入数据流命令字"
                      style="width:88%;max-width:100%;"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label-width="10%" label="单 位" class="postInfo-container-item">
                    <el-input
                      v-model="form.unit"
                      placeholder="请输入数据流单位"
                      style="width:88%;max-width:100%;"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 数据流表达式 -->
              <el-row>
                <el-col :span="24">
                  <el-form-item label-width="10%" label="公 式" class="postInfo-container-item">
                    <el-input
                      v-model="form.formula"
                      placeholder="请输入数据流表达式"
                      style="width:88%;max-width:100%;"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <dash-split />
              <!--提示 -->
              <el-row>
                <el-col :span="24">
                  <el-form-item label-width="10%" label="提 示" class="postInfo-container-item">
                    <el-input
                      :rows="5"
                      v-model="form.tips"
                      type="textarea"
                      placeholder="请输入提示信息"
                      style="width:88%;max-width:100%;"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 备注 -->
              <el-row>
                <el-col :span="24">
                  <el-form-item label-width="10%" label="备 注" class="postInfo-container-item">
                    <el-input
                      :rows="5"
                      v-model="form.remark"
                      type="textarea"
                      placeholder="请留下您的足迹..."
                      style="width:88%;max-width:100%;"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <dash-split />
              <!-- 按钮栏 -->
              <div>
                <el-form-item label-width="10%" class="button-item">
                  <el-button
                    v-if="sn"
                    class="filter-item"
                    style="margin-left: 10px;"
                    type="primary"
                    icon="el-icon-edit"
                    @click="handleSave(sn)"
                  >保存
                  </el-button>
                  <el-button
                    v-if="!sn"
                    class="filter-item"
                    style="margin-left: 10px;"
                    type="primary"
                    icon="el-icon-edit"
                    @click="handleSave(sn)"
                  >添加</el-button>
                </el-form-item>
              </div>
            </el-row>
          </el-form>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import {
  createCds,
  updateCds,
  querCdsBySN
} from '@/api/diagnose/cds'
// import {
//   cdsUnitOptions
// } from '@/api/contacts/options'
import { DashSplit } from '@/components/split/index'

export default {
  components: { DashSplit },
  data() {
    return {
      sn: { type: Number, default: null },
      form: {
        code: '',
        description_cn: '',
        description_en: '',
        unit: '',
        remark: '',
        formula: '',
        command: '',
        tips: ''
      },
      cdsUnitOptions
    }
  },
  created() {
    this.sn = this.$route.params.sn
    this.init()
  },
  methods: {
    handleSave(sn) {
      if (sn) {
        console.log('this.form =', this.form, sn)
        updateCds(sn, this.form)
          .then(response => {
            if (response.data.status === 80200) {
              this.$message({ message: '保存成功', type: 'success' })
              this.$router.replace({ path: '/diagnose/cds/list' })
            }
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        console.log('this.form =', this.form)
        createCds(this.form)
          .then(response => {
            if (response.data.status === 80200) {
              this.$message({ message: '创建成功', type: 'success' })
              this.$router.replace({ path: '/diagnose/cds/list' })
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    init() {
      // 根据id获取公司
      if (this.sn) {
        querCdsBySN(this.sn).then(res => {
          if (res.data.status === 80200) {
            this.form = res.data.data
          }
        })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.el-select__tags {
  white-space : nowrap;
  overflow : hidden;
}
// 上传头像
.cus-image /deep/ .el-form-item__content {
  margin-left : 32% !important;
}
.avatar-uploader /deep/ .el-upload {
  border : 1px dashed #D9D9D9;
  border-radius : 6px;
  cursor : pointer;
  position : relative;
  left : -457px;
  top : 6px;
  overflow : hidden;
}
.avatar-uploader .el-upload:hover {
  border-color : #409EFF;
}
.avatar-uploader-icon {
  font-size : 28px;
  color : #8C939D;
  width : 178px;
  height : 178px;
  line-height : 178px;
  text-align : center;
}
.avatar {
  width : 178px;
  height : 178px;
  display : block;
}
.item /deep/ .cell {
  text-align : left;
}

</style>
