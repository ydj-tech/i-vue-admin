<!-- Discription: 数据流编辑, author: ydj, Date: 2019-11-09 09:52:23 -->
<template>
  <div>
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{ sn ? '编辑设备' : '添加设备' }}</span>
        </div>
        <div>
          <el-form ref="postForm" :model="form" class="form-container">
            <el-row>
              <!-- 硬件编号 -->
              <el-row>
                <el-col :span="24">
                  <el-form-item label-width="10%" label="硬件编号" class="postInfo-container-item">
                    <el-input
                      v-model="form.hid"
                      placeholder="请输入硬件编号"
                      style="width:88%;max-width:100%;"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 设备名称 -->
              <el-row>
                <el-col :span="24">
                  <el-form-item label-width="10%" label="设备名称" class="postInfo-container-item">
                    <el-input
                      v-model="form.name"
                      placeholder="请输入设备名称"
                      style="width:88%;max-width:100%;"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 设备型号 -->
              <el-row>
                <el-col :span="24">
                  <el-form-item label-width="10%" label="设备型号" class="postInfo-container-item">
                    <el-input
                      v-model.number="form.model"
                      placeholder="请输入设备型号"
                      style="width:88%;max-width:100%;"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 经度 -->
              <el-row>
                <el-col :span="24">
                  <el-form-item label-width="10%" label="经 度" class="postInfo-container-item">
                    <el-input
                      v-model.number="form.longitude"
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
                      v-model.number="form.latitude"
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
                      v-model="form.address"
                      placeholder="请输入地址"
                      style="width:88%;max-width:100%;"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 在线状态 -->
              <el-row>
                <el-col :span="24">
                  <el-form-item label-width="10%" label="是否在线" class="postInfo-container-item">
                    <el-switch
                      v-model="form.online"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-text="在线"
                      inactive-text="离线"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- cpu编号 -->
              <el-row>
                <el-col :span="24">
                  <el-form-item label-width="10%" label="cpu编号" class="postInfo-container-item">
                    <el-input
                      v-model="form.sid"
                      placeholder="请输入cpu编号"
                      style="width:88%;max-width:100%;"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 硬件版本 -->
              <el-row>
                <el-col :span="24">
                  <el-form-item label-width="10%" label="硬件版本" class="postInfo-container-item">
                    <el-input
                      v-model="form.hard_ver"
                      placeholder="请输入硬件版本"
                      style="width:88%;max-width:100%;"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 软件版本 -->
              <el-row>
                <el-col :span="24">
                  <el-form-item label-width="10%" label="软件版本" class="postInfo-container-item">
                    <el-input
                      v-model="form.soft_ver"
                      placeholder="请输入软件版本"
                      style="width:88%;max-width:100%;"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 状态 -->
              <el-row>
                <el-col :span="24">
                  <el-form-item label-width="10%" label="状 态" class="postInfo-container-item">
                    <el-switch
                      v-model="form.status"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-text="启用"
                      inactive-text="禁用"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
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
import { createDevice, updateDevice, querDeviceBySN } from '@/api/diagnose/device'
import { cdsUnitOptions } from '@/api/contacts/options'
import { DashSplit } from '@/components/split/index'

export default {
  components: { DashSplit },
  data() {
    return {
      items: [],
      optinos: [],
      sn: { type: Number, default: null },
      form: {
        hid: '',
        name: '',
        model: '',
        longitude: '',
        latitude: '',
        address: '',
        online: true,
        sid: '',
        hard_ver: '',
        soft_ver: '',
        remark: '',
        status: false
      },
      cdsUnitOptions
    }
  },
  created() {
    this.sn = this.$route.params.sn
    this.loadForm()
  },
  methods: {
    handleSave(sn) {
      // let map = new Map();
      // map.set("0", false);
      // map.set("1", true);
      // if (this.form.as_online === map.get("0")) {
      //   this.form.online = 0;
      // } else {
      //   this.form.online = 1;
      // }
      // if (this.form.as_status === map.get("0")) {
      //   this.form.status = 0;
      // } else {
      //   this.form.status = 1;
      // }
      if (sn) {
        console.log('this.form =', this.form, sn)
        updateDevice(sn, this.form)
          .then(response => {
            if (response.data.status === 80200) {
              this.$message({ message: '保存成功', type: 'success' })
              this.$router.replace({ path: '/diagnose/device/list' })
            }
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        console.log('this.form =', this.form)
        createDevice(this.form)
          .then(response => {
            if (response.data.status === 80200) {
              this.$message({ message: '创建成功', type: 'success' })
              this.$router.replace({ path: '/diagnose/device/list' })
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    loadForm() {
      // findList().then(res => {
      //   if (res.data.status === 80200) {
      //     this.items = res.data.data;
      //   }
      // });
      // // 根据id获取公司
      if (this.sn) {
        querDeviceBySN(this.sn).then(res => {
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
