<template>
  <el-main>
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="t">
        <el-breadcrumb-item>位置:</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/user' }">用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加新用户</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row class="base">
      <el-col :span="24">
        <el-menu mode="horizontal" :default-active="activeIndex">
          <el-menu-item index="1">基本信息</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7">
        <el-form :model="ueserInf" ref="ueserInf" label-width="80px" :rules="rules">
          <el-form-item label="用户账号" prop="account">
            <el-input v-model="ueserInf.account" @blur="pas"></el-input>
          </el-form-item>
          <el-form-item label="用户姓名" prop="name">
            <el-input v-model="ueserInf.name"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="passWord">
            <el-input v-model="ueserInf.passWord" show-password></el-input>
          </el-form-item>
          <el-form-item label="添加日期" prop="createDate">
            <el-input v-model="ueserInf.createDate" :value="ueserInf.createDate" readonly></el-input>
          </el-form-item>
          <el-form-item label="锁定状态" prop="status">
            <el-radio v-model="ueserInf.status" label="1">是</el-radio>
            <el-radio v-model="ueserInf.status" label="0">否</el-radio>
          </el-form-item>
          <el-form-item label="权限" prop="modelcodes">
            <el-checkbox-group v-model="ueserInf.modelcodes">
              <el-checkbox label="3">管理员</el-checkbox>
              <el-checkbox label="1">采购</el-checkbox>
              <el-checkbox label="2">销售</el-checkbox>
              <el-checkbox label="5">仓管</el-checkbox>
              <el-checkbox label="4">财务</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="register">保存</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import axios from "axios";
const qs = require("querystring");
export default {
  data() {
    return {
      activeIndex: "1",
      ueserInf: {
        account: "",
        name: "",
        passWord: "",
        createDate: new Date(),
        status: "0",
        modelcodes: []
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
  methods: {
    register() {
      this.$refs.ueserInf.validate(valid => {
        console.log(valid);
        if (valid) {
          alert("数据合法");
          console.log(this.ueserInf);
          // this.$confirm("是否保存", "提示", {
          //   confirmButtonText: "确定",
          //   cancelButtonText: "取消",
          //   type: "warning"
          // }).then(() => {
            axios({
              url: "api/main/system/user/add",
              method: "post",
              data: qs.stringify({
                //转成字符串
                account: this.ueserInf.account,
                passWord: this.ueserInf.passWord,
                name: this.ueserInf.name,
                status: this.ueserInf.status,
                modelcodes: this.ueserInf.modelcodes,
                createDate: this.ueserInf.createDate
              })
            })
              .then(resp => {
                console.log(resp.data);
              })
              .catch(err => {
                console.log(err);
              });
            this.$message({
              type: "success",
              message: "保存成功"
            });
            this.$router.push("/user");
          // });

          // this.$router.push("/");
          // return;
        } else {
          console.log("输入的数据不合法");
          alert("输入的数据不合法");
          return;
        }
      });
    },
    cancel() {
      this.$router.push("/user");
    },
    time() {
      let year = this.ueserInf.createDate.getFullYear();
      let month = this.ueserInf.createDate.getMonth() + 1;
      let date = this.ueserInf.createDate.getDate();
      let hours = this.ueserInf.createDate.getHours();
      let minutes = this.ueserInf.createDate.getMinutes();
      let seconds = this.ueserInf.createDate.getSeconds();

      return (this.ueserInf.createDate = `${year}-${
        month < 10 ? "0" + month : month
      }-${date < 10 ? "0" + date : date} ${hours < 10 ? "0" + hours : hours}:${
        minutes < 10 ? "0" + minutes : minutes
      }:${seconds < 10 ? "0" + seconds : seconds}`);
    },
    pas() {
      this.ueserInf.passWord = this.ueserInf.account;
    }
  },
  created() {
    this.time();
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
.back {
  text-decoration: none;
}
</style>