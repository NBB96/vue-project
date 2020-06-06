<template>
  <el-main>
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="t">
        <el-breadcrumb-item>位置:</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/proclass' }">产品管理</el-breadcrumb-item>
        <el-breadcrumb-item>产品分类列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button icon="el-icon-circle-plus-outline">
          <router-link to="/addproclass" class="add">添加</router-link>
        </el-button>
      </el-col>
      <el-col :span="24">
        <el-table border stripe :data="product">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="分类序号" prop>
            <template slot-scope="scope">
              <span>{{scope.row.categoryId}}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品类别名称" prop>
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="描述" prop>
            <template slot-scope="scope">
              <span>{{scope.row.remark}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <!-- 分页 -->
    <el-row>
      <el-col :span="24">
        <el-pagination
          layout="total, prev, pager, next, jumper"
          :total="Total"
          @current-change="currChange"
        ></el-pagination>
      </el-col>
    </el-row>

    <!-- 修改 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-form :model="rep" ref="rep" label-width="80px" :rules="rules">
        <el-form-item label="分类序号" prop="categoryId">
          <el-input v-model="rep.categoryId" readonly></el-input>
        </el-form-item>
        <el-form-item label="产品类别名称" prop="name">
          <el-input v-model="rep.name"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input v-model="rep.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </div>
    </el-dialog>
  </el-main>
</template>

<script>
import axios from "axios";
const qs = require("querystring");
export default {
  data() {
    return {
      Total: 0,
      product: [],
      dialogVisible: false,
      rep: {
        categoryId: "",
        name: "",
        remark: ""
      },
      page: 1,
      rules: {
        name: [{ message: "请输入分类名称", trigger: "blur", required: true }]
      }
    };
  },
  created() {
    axios({
      url: "/api/main/sell/category/show",
      method: "get"
    })
      .then(res => {
        this.product = res.data.list;
        // console.log(this.product);
        this.Total = res.data.total;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    currChange(cpage) {
      // console.log("当前页：", cpage);
      axios.get(`/api/main/sell/category/show?page=${cpage}`).then(resp => {
        // console.log(resp.data.list);
        this.product = resp.data.list;
      });
      this.page = cpage;
    },
    //修改数据
    handleEdit(index, row) {
      // console.log(index, row);
      this.dialogVisible = true;
      this.rep.categoryId = row.categoryId;
      this.rep.name = row.name;
      this.rep.remark = row.remark;
    },
    //删除数据
    handleDelete(index, row) {
      const c = confirm("确认删除吗?");
      if (c) {
        axios({
          url: "/api/main/sell/category/delete",
          method: "post",
          data: qs.stringify({
            //转成字符串
            categoryId: row.categoryId
          })
        })
          .then(res => {
            if(res.data.code==2){

              alert("删除成功");
              // location.reload();
              axios({
                url: "/api/main/sell/category/show",
                method: "get"
              })
                .then(res => {
                  this.product = res.data.list;
                  // console.log(this.product);
                  this.Total = res.data.total;
                })
                .catch(err => {
                  console.log(err);
                });
            }else{
              alert('删除失败')
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //提交
    sure() {
      this.$refs.rep.validate(valid => {
        if (valid) {
          axios({
            url: "/api/main/sell/category/update",
            method: "post",
            data: qs.stringify({
              //转成字符串
              categoryId: this.rep.categoryId,
              name: this.rep.name,
              remark: this.rep.remark
            })
          })
            .then(res => {
              // this.user = res.data.list;
              console.log(res);
              // location.reload();
              if(res.data.code==2){
                axios({
                  url: "/api/main/sell/category/show",
                  method: "get"
                })
                  .then(res => {
                    this.product = res.data.list;
                    // console.log(this.product);
                    this.Total = res.data.total;
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }else{
                alert('修改失败')
              }
            })
            .catch(err => {
              console.log(err);
            });
          this.$message({
            type: "success",
            message: "修改成功"
          });
        } else {
          alert("输入的数据不合法");
        }
      });
      this.dialogVisible = false;
    }
  }
};
</script>

<style scoped>
.t {
  padding: 10px 0;
}
.base {
  margin-bottom: 20px;
}
</style>