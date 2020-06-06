<template>
  <el-main>
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="t">
        <el-breadcrumb-item>位置:</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/prolist' }">产品管理</el-breadcrumb-item>
        <el-breadcrumb-item>产品列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button icon="el-icon-circle-plus-outline">
          <router-link to="/addpro" class="add">添加</router-link>
        </el-button>
      </el-col>
    </el-row>

    <!-- 筛选 -->
    <el-row>
      <el-col :span="4">
        <el-form label-width="80px">
          <el-form-item label="产品编号">
            <el-input placeholder="请输入产品编号" v-model="find.id"></el-input>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="4">
        <el-form label-width="80px">
          <el-form-item label="产品名称">
            <el-input placeholder="请输入产品名称" v-model="find.name"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4">
        <el-form label-width="80px">
          <el-form-item label="所属分类">
            <el-select placeholder="请选择" v-model="find.class">
              <el-option
                v-for="(item,index) in options"
                :key="index"
                :label="item.name"
                :value="item.categoryId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="4">
        <el-button type="primary" @click="search">查询</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table border :data="pro">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="产品编号">
            <template slot-scope="scope">
              <span>{{scope.row.productCode}}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品名称">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="分类名称">
            <template slot-scope="scope">
              <span>{{scope.row.categoryName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="数量单位">
            <template slot-scope="scope">
              <span>{{scope.row.unitName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="添加日期">
            <template slot-scope="scope">
              <span>{{scope.row.createDate}}</span>
            </template>
          </el-table-column>
          <el-table-column label="销售价">
            <template slot-scope="scope">
              <span>{{scope.row.price}}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品描述">
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

    <el-row>
      <el-col :span="24">
        <el-pagination
          layout="total, prev, pager, next, jumper"
          :total="Total"
          @current-change="currChange"
        ></el-pagination>
      </el-col>
    </el-row>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-form :model="rep" ref="rep" label-width="80px" :rules="rules">
        <el-form-item label="产品编号" prop="productCode">
          <el-input v-model="rep.productCode" readonly></el-input>
        </el-form-item>
        <el-form-item label="产品名称" prop="name">
          <el-input v-model="rep.name"></el-input>
        </el-form-item>
        <el-form-item label="数量单位" prop="unitName">
          <el-input v-model="rep.unitName"></el-input>
        </el-form-item>
        <el-form-item label="添加日期" prop="createDate">
          <el-input v-model="rep.createDate" readonly></el-input>
        </el-form-item>
        <el-form-item label="销售价" prop="price">
          <el-input v-model="rep.price"></el-input>
        </el-form-item>
        <el-form-item label="产品描述" prop="remark">
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
      pro: [],
      rep: {
        productCode: "",
        name: "",
        unitName: "",
        createDate: "",
        price: "",
        remark: "",
        categoryId: ""
      },
      page: 1,
      dialogVisible: false,
      find: {
        class: "",
        id: "",
        name: ""
      },
      options: [],
      Total: 0,
      rules: {
        productCode: [
          { required: true, message: "请输入产品编号", trigger: "change" },
          {
            pattern: /^[\da-zA-Z]{4,10}$/,
            message: "4~10位数字字母",
            trigger: "blur"
          }
        ],
        unitName: [
          { message: "请输入数量单位", trigger: "change", required: true },
          {
            pattern: /^\S+$/,
            message: "只能为中文数量单位",
            trigger: "blur"
          }
        ],
        name: [
          { message: "请输入产品名称", trigger: "change", required: true },
          {
            pattern: /^.{1,100}$/,
            message: "长度不超过100",
            trigger: "blur"
          }
        ],
        categoryId: [
          { required: true, message: "请选择分类编号", trigger: "change" }
        ],
        price: [
          { required: true, message: "请输入销售价", trigger: "change" },
          {
            pattern: /^\d+(\.\d+)?$/,
            message: "不能负数",
            trigger: "blur"
          }
        ],
        createDate: [{ required: true, message: "请选择日期", trigger: "blur" }]
      }
    };
  },
  created() {
    axios({
      url: "/api/main/sell/category/show ",
      method: "get"
    })
      .then(res => {
        this.options = res.data.list;
        console.log(this.options);
        // this.Total = res.data.total;
      })
      .catch(err => {
        console.log(err);
      });
    axios({
      url: "/api/main/sell/product/show ",
      method: "get"
    })
      .then(res => {
        this.pro = res.data.list;
        this.Total = res.data.total;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    currChange(cpage) {
      // console.log("当前页：", cpage);
      axios.get(`/api/main/sell/product/show?page=${cpage}`).then(resp => {
        // console.log(resp.data.list);
        this.pro = resp.data.list;
      });
      this.page = cpage;
    },
    //修改数据
    handleEdit(index, row) {
      // console.log(index, row);
      this.dialogVisible = true;
      this.rep.productCode = row.productCode;
      this.rep.name = row.name;
      this.rep.unitName = row.unitName;
      this.rep.createDate = row.createDate;
      this.rep.price = row.price;
      this.rep.categoryId = row.categoryId;
      this.rep.remark = row.remark;
    },
    //删除数据
    handleDelete(index, row) {
      const c = confirm("确认删除吗?");
      if (c) {
        axios({
          url: "/api/main/sell/product/delete",
          method: "post",
          data: qs.stringify({
            //转成字符串
            productCode: row.productCode
          })
        })
          .then(res => {
            console.log(res)
            if (res.data.code == 2) {
              alert("删除成功");
              // location.reload();
              axios({
                url: "/api/main/sell/product/show",
                method: "get"
              })
                .then(res => {
                  this.pro = res.data.list;
                  this.Total = res.data.total;
                })
                .catch(err => {
                  console.log(err);
                });
            } else {
              alert("删除失败");
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
            url: "/api/main/sell/product/update",
            method: "post",
            data: qs.stringify({
              //转成字符串
              productCode: this.rep.productCode,
              name: this.rep.name,
              remark: this.rep.remark,
              unitName: this.rep.unitName,
              createDate: this.rep.createDate,
              price: this.rep.price,
              categoryId: this.rep.categoryId
            })
          })
            .then(res => {
              // this.user = res.data.list;
              console.log(res);
              if (res.data.code == 2) {
                axios({
                  url: "/api/main/sell/product/show",
                  method: "get"
                })
                  .then(res => {
                    this.pro = res.data.list;
                    this.Total = res.data.total;
                  })
                  .catch(err => {
                    console.log(err);
                  });
              } else {
                alert("修改失败");
              }
              // location.reload();
            })
            .catch(err => {
              console.log(err);
            });
          this.$message({
            type: "success",
            message: "修改成功"
          });
          this.dialogVisible = false;
        } else {
          alert("输入的数据不合法");
        }
      });
    },

    //查询
    search() {
      axios({
        url: "/api/main/sell/product/show",
        method: "get",
        params: {
          page: this.page,
          productCode: this.find.id,
          name: this.find.name,
          categoryId: this.find.class
        }
      })
        .then(res => {
          this.pro = res.data.list;
          console.log(this.pro);
          this.Total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style  scoped>
.t {
  padding: 10px 0;
}
.base {
  margin-bottom: 20px;
}
</style>