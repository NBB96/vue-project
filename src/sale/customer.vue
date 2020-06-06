<template>
  <el-main>
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="t">
        <el-breadcrumb-item>位置:</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/customer' }">销售管理</el-breadcrumb-item>
        <el-breadcrumb-item>客户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button icon="el-icon-circle-plus-outline" @click="add">添加</el-button>
      </el-col>

      <!-- 过滤 -->
      <el-col :span="5">
        <el-input v-model="search" placeholder="请输入客户编号或者名称"></el-input>
      </el-col>

      <el-col :span="24">
        <el-table border :data="table">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="客户编号">
            <template slot-scope="scope">
              <span>{{scope.row.customerCode}}</span>
            </template>
          </el-table-column>
          <el-table-column label="客户名称">
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
        <el-form-item label="供应商编号" prop="customerCode">
          <el-input v-model="rep.customerCode" readonly></el-input>
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

    <!-- 添加 -->
    <el-dialog title="提示" :visible.sync="dialogVisible1" width="30%">
      <el-form :model="addClient" ref="addClient" label-width="80px" :rules="rules">
        <el-form-item label="客户编号" prop="customerCode">
          <el-input v-model="addClient.customerCode"></el-input>
        </el-form-item>
        <el-form-item label="客户名称" prop="name">
          <el-input v-model="addClient.name"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contactor">
          <el-input v-model="addClient.contactor"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="addClient.address"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码" prop="postCode">
          <el-input v-model="addClient.postCode"></el-input>
        </el-form-item>
        <el-form-item label="注册日期" prop="createDate">
          <el-input v-model="addClient.createDate" readonly></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input v-model="addClient.tel"></el-input>
        </el-form-item>
        <el-form-item label="传真" prop="fax">
          <el-input v-model="addClient.fax"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
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
      customer: [],
      page: 1,
      rep: {
        customerCode: "",
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
      dialogVisible1: false,
      search: "",
      addClient: {
        customerCode: "",
        name: "",
        contactor: "",
        address: "",
        postCode: "",
        createDate: new Date(),
        tel: "",
        fax: "",
        passWord: ""
      },
      rules: {
        customerCode: [
          { required: true, message: "请输入客户编号", trigger: "blur" },
          {
            pattern: /^[\da-zA-Z]{4,20}$/,
            message: "4~20位数字字母",
            trigger: "blur"
          }
        ],
        passWord: [
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
        ]
        // address: [{ message: "请输入地址", trigger: "blur", required: true }]
      },
      Total: 0
    };
  },
  created() {
    this.time();

    axios({
      url: "/api/main/sell/customer/show",
      method: "get",
      params: {
        page: 1
      }
    })
      .then(res => {
        this.customer = res.data.list;
        // console.log(this.customer);
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
        return this.customer.filter(data => {
          return Object.keys(data).some(key => {
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(search) > -1
            );
          });
        });
      }
      return this.customer;
    }
  },
  methods: {
    //分页
    currChange(cpage) {
      // console.log("当前页：", cpage);
      axios.get(`/api/main/sell/customer/show?page=${cpage}`).then(resp => {
        // console.log(resp.data.list);
        this.customer = resp.data.list;
      });
      this.page = cpage;
    },

    //修改数据
    handleEdit(index, row) {
      // console.log(index, row);
      this.dialogVisible = true;
      this.rep.customerCode = row.customerCode;
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
      const c = confirm("是否删除");
      if (c) {
        axios({
          url: "/api/main/sell/customer/delete",
          method: "post",
          data: qs.stringify({
            //转成字符串
            customerCode: row.customerCode
          })
        })
          .then(res => {
            console.log(res);
            if (res.data.code == 2) {
              alert("删除成功");
              // location.reload();
              axios({
                url: "/api/main/sell/customer/show",
                method: "get",
                params: {
                  page: 1
                }
              })
                .then(res => {
                  this.customer = res.data.list;
                  // console.log(this.customer);
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

    //提交修改
    sure() {
      this.$refs.rep.validate(valid => {
        if (valid) {
          axios({
            url: "/api/main/sell/customer/update",
            method: "post",

            data: qs.stringify({
              //转成字符串
              customerCode: this.rep.customerCode,
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
              console.log(res);
              // location.reload();
              if (res.data.code == 2) {
                this.dialogVisible = false;
                alert("修改成功");
                axios({
                  url: "/api/main/sell/customer/show",
                  method: "get",
                  params: {
                    page: 1
                  }
                })
                  .then(res => {
                    this.customer = res.data.list;
                    // console.log(this.customer);
                    this.Total = res.data.total;
                  })
                  .catch(err => {
                    console.log(err);
                  });
              } else {
                // alert("修改失败");
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
      // this.$message({
      //   type: "success",
      //   message: "修改成功"
      // });
    },

    //添加
    add() {
      this.dialogVisible1 = true;
    },

    //提交新用户
    confirm() {
      this.$refs.addClient.validate(valid => {
        if (valid) {
          if (this.addClient.passWord == "") {
            this.addClient.passWord = this.addClient.customerCode;
          }
          axios({
            url: "/api/main/sell/customer/add",
            method: "post",
            data: qs.stringify({
              //转成字符串
              customerCode: this.addClient.customerCode,
              name: this.addClient.name,
              contactor: this.addClient.contactor,
              address: this.addClient.address,
              postCode: this.addClient.postCode,
              createDate: this.addClient.createDate,
              tel: this.addClient.tel,
              fax: this.addClient.fax,
              passWord: this.addClient.passWord
            })
          })
            .then(res => {
              // this.user = res.data.list;
              alert("数据合法");
              if (res.data.code == 4) {
                alert("客户已存在,请重新填写");
              }

              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
          this.$message({
            type: "success",
            message: "添加成功"
          });
          location.reload();
          this.dialogVisible1 = false;
        } else {
          alert("数据不合法");
        }
      });
    },
    time() {
      let year = this.addClient.createDate.getFullYear();
      let month = this.addClient.createDate.getMonth() + 1;
      let date = this.addClient.createDate.getDate();
      let hours = this.addClient.createDate.getHours();
      let minutes = this.addClient.createDate.getMinutes();
      let seconds = this.addClient.createDate.getSeconds();

      return (this.addClient.createDate = `${year}-${
        month < 10 ? "0" + month : month
      }-${date < 10 ? "0" + date : date}`);
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