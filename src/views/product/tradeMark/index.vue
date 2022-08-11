<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      @click="addTrademark"
    >添加</el-button>
    <el-table :data="list" style="width: 100%" border>
      <el-table-column type="index" prop="prop" label="序号" width="100px" />
      <el-table-column prop="tmName" label="品牌名称" width="width" />
      <el-table-column prop="logoUrl" label="品牌Logo" width="width">
        <template slot-scope="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px">
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="editTrademark(row)"
          >编辑</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="dleteTrademark(row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :page-size="limit"
      :page-sizes="[5, 10, 15]"
      layout=" prev, pager, next, jumper,->,sizes,total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form ref="tmForm" :model="tmForm" style="width: 80%" :rules="rules">
        <el-form-item label="品牌名称" label-width="120px" prop="tmName">
          <el-input v-model="tmForm.tmName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="120px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addOrUpdataTrademark"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TradeMark',
  data() {
    return {
      page: 1,
      limit: 5,
      list: [],
      total: 0,
      dialogFormVisible: false,
      tmForm: {
        tmName: '',
        logoUrl: ''
      },
      title: '',
      rules: {
        tmName: [
          { required: true, message: '请输入商标名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' }
        ],
        logoUrl: [
          { required: true, message: '请输上传图片' }
        ]
      }
    }
  },
  mounted() {
    this.getTrademarkList()
  },
  methods: {
    // 获取商标列表
    async getTrademarkList() {
      const { page, limit } = this
      const result = await this.$Api.trademark.reqTrademarkList(page, limit)
      if (result.code === 200) {
        this.list = result.data.records
        this.total = result.data.total
      }
    },
    // 每页展示数据条数变化
    handleSizeChange(limit) {
      this.limit = limit
      this.getTrademarkList()
    },
    // 当前页变化
    handleCurrentChange(page) {
      this.page = page
      this.getTrademarkList()
    },
    // 图片上传成功
    handleAvatarSuccess(res) {
      this.tmForm.logoUrl = res.data
    },
    // 图片上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 添加按钮
    addTrademark() {
      this.dialogFormVisible = true
      this.title = '添加品牌'
      this.tmForm = { tmName: '', logoUrl: '' }
    },
    // 编辑按钮
    editTrademark(row) {
      this.dialogFormVisible = true
      this.title = '修改品牌'
      this.tmForm = { ...row }
    },
    // 添加或编辑的确定按钮
    addOrUpdataTrademark() {
      this.$refs.tmForm.validate(async(valid) => {
        if (valid) {
          this.dialogFormVisible = false
          const result = await this.$Api.trademark.reqAddOrUpdataTrademark(this.tmForm)
          if (result.code === 200) {
            this.$message({
              message: this.tmForm.id ? '修改成功' : '添加成功',
              type: 'success'
            })
            this.getTrademarkList()
          } else {
            this.$message({
              message: '添加失败，请联系管理员',
              type: 'warning'
            })
          }
        } else {
          this.$message({
            message: '请按规则输入',
            type: 'warning'
          })
        }
      })
    },
    // 删除商标
    dleteTrademark(row) {
      this.$confirm('是否确定删除该商标', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const result = await this.$Api.trademark.reqDeleteTrademark(row.id)
        if (result.code === 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          if (this.list.length < 2) {
            this.page -= 1
          }
          this.getTrademarkList()
        } else {
          this.$message({
            message: '删除失败',
            type: 'warning'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
