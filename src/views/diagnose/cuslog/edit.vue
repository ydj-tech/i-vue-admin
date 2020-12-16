<!-- Discription: 数据流编辑, author: ydj, Date: 2019-11-09 09:52:23 -->
<template>
  <div>
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{ sn ? '编辑日志' : '添加日志' }}</span>
        </div>
        <div>
          <el-form ref="postForm" :model="form" class="form-container">
            <el-row>
              <!-- 数据流名称 -->
              <el-row>
                <el-col :span="24">
                  <el-form-item label-width="10%" label="编 号" class="postInfo-container-item">
                    <el-input
                      v-model="form.name"
                      placeholder="请输入设备编号"
                      style="width:88%;max-width:100%;"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label-width="10%" label="经销商" class="postInfo-container-item">
                    <el-input
                      v-model="form.name"
                      placeholder="请输入经销商"
                      style="width:88%;max-width:100%;"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 数据流单位
              <el-row>
                <el-col :span="24">
                  <el-form-item label-width="10%" label="单 位" class="postInfo-container-item">
                    <el-radio-group v-model="form.unit" size="medium">
                      <el-radio-button
                        v-for="item in cdsUnitOptions"
                        :label="item.value"
                        :key="item.value"
                        :value="item.value"
                      >{{ item.label }}</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row> -->
              <!-- 经度 -->
              <el-row>
                <el-col :span="24">
                  <el-form-item label-width="10%" label="经 度" class="postInfo-container-item">
                    <el-input
                      v-model="form.expression"
                      placeholder="请输入经度"
                      style="width:88%;max-width:100%;"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 纬度 -->
              <el-row>
                <el-col :span="24">
                  <el-form-item label-width="10%" label="纬 度" class="postInfo-container-item">
                    <el-input
                      v-model="form.expression"
                      placeholder="请输入纬度"
                      style="width:88%;max-width:100%;"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 地址 -->
              <el-row>
                <el-col :span="24">
                  <el-form-item label-width="10%" label="地 址" class="postInfo-container-item">
                    <el-input
                      v-model="form.expression"
                      placeholder="请输入地址"
                      style="width:88%;max-width:100%;"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 上级部门
              <el-row>
                <el-col :span="24">
                  <el-form-item label-width="10%" label="上级部门" class="postInfo-container-item">
                    <el-select
                      v-model="form.superior"
                      filterable
                      placeholder="请选择上级部门"
                      style="width:88%;max-width:100%;"
                    >
                      <el-option
                        v-for="item in items"
                        :key="item.sn"
                        :label="item.name"
                        :value="item.sn"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row> -->
              <dash-split />
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
                  >保存</el-button>
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
  create,
  update,
  findList,
  findByID
} from '@/api/oa/department'
import {
  cdsUnitOptions
} from '@/api/contacts/options'
import { DashSplit } from '@/components/split/index'

export default {
  components: { DashSplit },
  data() {
    return {
      items: [],
      optinos: [],
      sn: { type: Number, default: null },
      form: {
        name: '',
        unit: 1,
        remark: '',
        expression: ''
      },
      cdsUnitOptions
    }
  },
  created() {
    this.sn = this.$route.params.sn
    // this.loadForm()
  },
  methods: {
    handleSave(sn) {
      if (sn) {
        console.log('this.form =', this.form, sn)
        update(sn, this.form)
          .then(response => {
            if (response.data.status === 80200) {
              this.$message({ message: '保存成功', type: 'success' })
              this.$router.replace({ path: '/diagnose/cuslog/list' })
            }
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        console.log('this.form =', this.form)
        create(this.form)
          .then(response => {
            if (response.data.status === 80200) {
              this.$message({ message: '创建成功', type: 'success' })
              this.$router.replace({ path: '/diagnose/cuslog/list' })
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    loadForm() {
      findList().then(res => {
        if (res.data.status === 80200) {
          this.items = res.data.data
        }
      })
      // // 根据id获取公司
      if (this.sn) {
        findByID(this.sn).then(res => {
          if (res.data.status === 80200) {
            this.form = res.data.data
          }
        })
      }
    },
    handleChange() {}
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
