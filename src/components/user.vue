<template>
  <el-main>
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="t">
        <el-breadcrumb-item>位置:</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/user' }">用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button icon="el-icon-circle-plus-outline">
          <router-link to="/adduser" class="add">添加</router-link>
        </el-button>
      </el-col>
      <el-col :span="24">
        <el-table border :data="user">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="用户账号">
            <template slot-scope="scope">
              <span>{{scope.row.account}}</span>
            </template>
          </el-table-column>
          <el-table-column label="用户姓名">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="锁定状态" prop="status">
            <template slot-scope="scope">
              <span>{{scope.row.status==0?'未锁定':'锁定'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="添加日期">
            <template slot-scope="scope">
              <span>{{scope.row.createDate}}</span>
            </template>
          </el-table-column>
          <el-table-column label="用户权限列表">
            <template slot-scope="scope">
              <span>{{scope.row.models.map(item=>item.modelName).toString()}}</span>
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

    <!--分页 -->
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
        <el-form-item label="用户账号" prop="account">
          <el-input v-model="rep.account" readonly></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" prop="name">
          <el-input v-model="rep.name"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="passWord">
          <el-input v-model="rep.passWord" show-password></el-input>
        </el-form-item>
        <el-form-item label="添加日期" prop="createDate">
          <el-input v-model="rep.createDate" :value="rep.createDate" readonly></el-input>
        </el-form-item>
        <el-form-item label="锁定状态" prop="status">
          <el-radio v-model="rep.status" :label="1">是</el-radio>
          <el-radio v-model="rep.status" :label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="权限" prop="modelcodes">
          <el-checkbox-group v-model="rep.modelcodes">
            <el-checkbox :label="3" name="type">管理员</el-checkbox>
            <el-checkbox :label="1" name="type">采购</el-checkbox>
            <el-checkbox :label="2" name="type">销售</el-checkbox>
            <el-checkbox :label="5" name="type">仓管</el-checkbox>
            <el-checkbox :label="4" name="type">财务</el-checkbox>
          </el-checkbox-group>
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
      user: [],
      page: 1,
      flag: false,
      dialogVisible: false,
      rep: {
        account: "",
        name: "",
        passWord: "",
        status: "",
        modelcodes: [],
        createDate: new Date()
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        passWord: [{ message: "请输入密码", trigger: "blur", required: true }],
        name: [{ message: "请输入姓名", trigger: "blur", required: true }],
        createDate: [
          { required: true, message: "请选择日期", trigger: "blur" }
        ],
        status: [
          { required: true, message: "请选择锁定状态", trigger: "blur" }
        ],
        modelcodes: [
          { required: true, message: "请选择用户权限", trigger: "change" }
        ]
      }
    };
  },
  created() {
    axios({
      url: "/api/main/system/user/show",
      method: "get",
      params: {
        pages: this.page
      }
    })
      .then(res => {
        this.user = res.data.list;
        this.Total = res.data.total;
      })
      .catch(err => {
        console.log(err);
      });
    this.time();
  },
  methods: {
    //修改数据
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogVisible = true;
      this.rep.account = row.account;
      this.rep.name = row.name;
      this.rep.passWord = row.passWord;
      this.rep.status = row.status;
      this.rep.modelcodes = row.models.reduce(
        (prev, cur) => prev.concat(cur.modelCode),
        []
      );
    },
    //删除数据
    handleDelete(index, row) {
      const c = confirm("确认删除吗?");
      if (c) {
        axios({
          url: "/api/main/system/user/delete",
          method: "post",
          data: qs.stringify({
            //转成字符串
            account: row.account
          })
        })
          .then(res => {
            if (res.data.code == 2) {
              alert("删除成功");
              axios({
                url: "/api/main/system/user/show",
                method: "get",
                params: {
                  pages: this.page
                }
              })
                .then(res => {
                  this.user = res.data.list;
                  this.Total = res.data.total;
                })
                .catch(err => {
                  console.log(err);
                });
            }else{
              alert('删除失败')
            }

            // location.reload();
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
            url: "/api/main/system/user/update",
            method: "post",
            data: qs.stringify({
              //转成字符串
              account: this.rep.account,
              passWord: this.rep.passWord,
              name: this.rep.name,
              status: this.rep.status,
              modelcodes: this.rep.modelcodes,
              createDate: this.rep.createDate
            })
          })
            .then(res => {
              axios({
                url: "/api/main/system/user/show",
                method: "get",
                params: {
                  pages: this.page
                }
              })
                .then(res => {
                  this.user = res.data.list;
                  this.Total = res.data.total;
                })
                .catch(err => {
                  console.log(err);
                });
              // location.reload();
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
    },

    //分页
    currChange(cpage) {
      // console.log("当前页：", cpage);
      axios.get(`/api/main/system/user/show?page=${cpage}`).then(resp => {
        // console.log(resp.data.list);
        this.user = resp.data.list;
      });
      this.page = cpage;
    },
    time() {
      let year = this.rep.createDate.getFullYear();
      let month = this.rep.createDate.getMonth() + 1;
      let date = this.rep.createDate.getDate();
      let hours = this.rep.createDate.getHours();
      let minutes = this.rep.createDate.getMinutes();
      let seconds = this.rep.createDate.getSeconds();

      return (this.rep.createDate = `${year}-${
        month < 10 ? "0" + month : month
      }-${date < 10 ? "0" + date : date} ${hours < 10 ? "0" + hours : hours}:${
        minutes < 10 ? "0" + minutes : minutes
      }:${seconds < 10 ? "0" + seconds : seconds}`);
    }
  }
};
</script>

<style scoped>
.t {
  padding: 10px 0;
}
</style>