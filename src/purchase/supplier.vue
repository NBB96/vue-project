<template>
  <el-main>
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="t">
        <el-breadcrumb-item>位置:</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/supplier' }">供应商管理</el-breadcrumb-item>
        <el-breadcrumb-item>供应商列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button icon="el-icon-circle-plus-outline">
          <router-link to="/addsupper" class="add">添加</router-link>
        </el-button>
      </el-col>

      <!-- 过滤 -->
      <el-col :span="5">
        <el-form label-width="80px">
          <el-form-item label="筛选">
            <el-input v-model="search" placeholder="请输入供应商编号和名称"></el-input>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="24">
        <el-table border :data="table">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="供应商编号">
            <template slot-scope="scope">
              <span>{{scope.row.venderCode}}</span>
            </template>
          </el-table-column>
          <el-table-column label="供应商名称">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="联系人" prop="contactor">
            <template slot-scope="scope">
              <span>{{scope.row.contactor}}</span>
            </template>
          </el-table-column>
          <el-table-column label="地址">
            <template slot-scope="scope">
              <span>{{scope.row.address}}</span>
            </template>
          </el-table-column>
          <el-table-column label="邮政编码">
            <template slot-scope="scope">
              <span>{{scope.row.postCode}}</span>
            </template>
          </el-table-column>
          <el-table-column label="注册日期">
            <template slot-scope="scope">
              <span>{{scope.row.createDate}}</span>
            </template>
          </el-table-column>
          <el-table-column label="电话">
            <template slot-scope="scope">
              <span>{{scope.row.tel}}</span>
            </template>
          </el-table-column>
          <el-table-column label="传真">
            <template slot-scope="scope">
              <span>{{scope.row.fax}}</span>
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
          @current-change="currChange"
          layout="total, prev, pager, next, jumper"
          :total="Total"
        ></el-pagination>
      </el-col>
    </el-row>

    <!-- 修改 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-form :model="rep" ref="rep" label-width="80px" :rules="rules">
        <el-form-item label="供应商编号" prop="venderCode">
          <el-input v-model="rep.venderCode" readonly></el-input>
        </el-form-item>
        <el-form-item label="供应商名称" prop="name">
          <el-input v-model="rep.name" readonly></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contactor">
          <el-input v-model="rep.contactor"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="rep.address"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码" prop="postCode">
          <el-input v-model="rep.postCode"></el-input>
        </el-form-item>
        <el-form-item label="注册日期" prop="createDate">
          <el-input v-model="rep.createDate" readonly></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input v-model="rep.tel"></el-input>
        </el-form-item>
        <el-form-item label="传真" prop="fax">
          <el-input v-model="rep.fax"></el-input>
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
      supperlier: [],
      page: 1,
      rep: {
        venderCode: "",
        name: "",
        contactor: "",
        address: "",
        postCode: "",
        createDate: "",
        tel: "",
        fax: "",
        passWord: ""
      },
      dialogVisible: false,
      search: "",
      Total: 0,
      rules: {
        venderCode: [
          { required: true, message: "请输入供应商编号", trigger: "blur" },
          {
            pattern: /^[\da-zA-Z]{4,20}$/,
            message: "4~20位数字字母",
            trigger: "blur"
          }
        ],
        passWord: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^[\da-zA-Z]{4,20}$/,
            message: "4~20位数字字母",
            trigger: "blur"
          }
        ],
        name: [
          { message: "请输入供应商名称", trigger: "blur", required: true },
          {
            pattern: /^.{1,100}$/,
            message: "长度不超过100",
            trigger: "blur"
          }
        ],
        contactor: [
          { required: true, message: "请输入联系人", trigger: "blur" },
          {
            pattern: /^\S+$/,
            message: "不能为空",
            trigger: "blur"
          }
        ],
        createDate: [
          { message: "请选择日期", trigger: "blur", required: true }
        ],
        tel: [
          { message: "请填写电话", trigger: "blur", required: true },
          {
            pattern: /^1(3|4|5|7|8)\d{9}$/,
            message: "11位数字",
            trigger: "blur"
          }
        ],
        address: [{ message: "请输入地址", trigger: "blur", required: true }]
      }
    };
  },
  created() {
    axios({
      url: "/api/main/purchase/vender/show",
      method: "get",
      params: {
        page: this.page
      }
    })
      .then(res => {
        this.supperlier = res.data.list;
        // console.log(this.supperlier);
        this.Total = res.data.total;
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    table: function() {
      const search = this.search;
      if (search) {
        return this.supperlier.filter(data => {
          return Object.keys(data).some(key => {
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(search) > -1
            );
          });
        });
      }
      return this.supperlier;
    }
  },
  methods: {
    //分页
    currChange(cpage) {
      // console.log("当前页：", cpage);
      axios.get(`/api/main/purchase/vender/show?page=${cpage}`).then(resp => {
        // console.log(resp.data.list);
        this.supperlier = resp.data.list;
      });
      this.page = cpage;
    },

    //修改数据
    handleEdit(index, row) {
      // console.log(index, row);
      this.dialogVisible = true;
      this.rep.venderCode = row.venderCode;
      this.rep.name = row.name;
      this.rep.contactor = row.contactor;
      this.rep.address = row.address;
      this.rep.postCode = row.postCode;
      this.rep.createDate = row.createDate;
      this.rep.tel = row.tel;
      this.rep.fax = row.fax;
      this.rep.passWord = row.passWord;
    },
    //删除数据
    handleDelete(index, row) {
      const c = confirm("确认删除?");
      if (c) {
        axios({
          url: "/api/main/purchase/vender/delete",
          method: "post",
          data: qs.stringify({
            //转成字符串
            venderCode: row.venderCode
          })
        })
          .then(res => {
            if (res.data.code == 2) {
              alert("删除成功");
              // location.reload();
              axios({
                url: "/api/main/purchase/vender/show",
                method: "get",
                params: {
                  page: this.page
                }
              })
                .then(res => {
                  this.supperlier = res.data.list;
                  // console.log(this.supperlier);
                  this.Total = res.data.total;
                })
                .catch(err => {
                  console.log(err);
                });
            } else {
              alert("删除失败");
            }
            console.log(res);
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
            url: "/api/main/purchase/vender/update",
            method: "post",
            data: qs.stringify({
              //转成字符串
              venderCode: this.rep.venderCode,
              name: this.rep.name,
              contactor: this.rep.contactor,
              address: this.rep.address,
              postCode: this.rep.postCode,
              createDate: this.rep.createDate,
              tel: this.rep.tel,
              fax: this.rep.fax,
              passWord: this.rep.passWord
            })
          })
            .then(res => {
              // this.user = res.data.list;
              if (res.data.code == 2) {
                this.dialogVisible = false;
                console.log(res);
                // location.reload();
                axios({
                  url: "/api/main/purchase/vender/show",
                  method: "get",
                  params: {
                    page: this.page
                  }
                })
                  .then(res => {
                    this.supperlier = res.data.list;
                    // console.log(this.supperlier);
                    this.Total = res.data.total;
                  })
                  .catch(err => {
                    console.log(err);
                  });
              } else {
                alert("修改失败");
              }
            })
            .catch(err => {
              console.log(err);
            });
          this.$message({
            type: "success",
            message: "修改成功"
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.t {
  padding: 10px 0;
}
.add {
  text-decoration: none;
}
</style>