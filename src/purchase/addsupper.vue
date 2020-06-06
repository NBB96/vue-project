<template>
  <el-main>
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="t">
        <el-breadcrumb-item>位置:</el-breadcrumb-item>
        <el-breadcrumb-item>供应商管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/supplier' }">供应商列表</el-breadcrumb-item>
        <el-breadcrumb-item>添加供应商</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row class="base">
      <el-col :span="24">
        <el-menu mode="horizontal" default-active="1">
          <el-menu-item index="1">基本信息</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7">
        <el-form :model="suplist" ref="suplist" label-width="80px" :rules="rules">
          <el-form-item label="供应商编号" prop="venderCode">
            <el-input v-model="suplist.venderCode" @blur="pas"></el-input>
          </el-form-item>
          <el-form-item label="供应商名称" prop="name">
            <el-input v-model="suplist.name"></el-input>
          </el-form-item>
          <el-form-item label="供应商密码" prop="passWord">
            <el-input v-model="suplist.passWord" show-password></el-input>
          </el-form-item>
          <el-form-item label="联系人" prop="contactor">
            <el-input v-model="suplist.contactor"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="suplist.address"></el-input>
          </el-form-item>
          <el-form-item label=" 邮政编码" prop="postCode">
            <el-input v-model="suplist.postCode"></el-input>
          </el-form-item>
          <el-form-item label="注册日期" prop="createDate">
            <el-input v-model="suplist.createDate" readonly></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="tel">
            <el-input v-model="suplist.tel"></el-input>
          </el-form-item>
          <el-form-item label="传真" prop="fax">
            <el-input v-model="suplist.fax"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="add">确认保存</el-button>
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
      suplist: {
        venderCode: "",
        name: "",
        passWord: "",
        createDate: new Date(),
        contactor: "",
        address: "",
        tel: "",
        fax: ""
      },
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
  methods: {
    //提交
    add() {
      this.$refs.suplist.validate(valid => {
        // console.log(valid);
        if (valid) {
          // this.$confirm("是否保存", "提示", {
          //   confirmButtonText: "确定",
          //   cancelButtonText: "取消",
          //   type: "warning"
          // }).then(() => {
          alert("数据合法");
          console.log(this.suplist);
          axios({
            url: "api/main/purchase/vender/add",
            method: "post",
            data: qs.stringify({
              //转成字符串
              venderCode: this.suplist.venderCode,
              passWord: this.suplist.passWord,
              name: this.suplist.name,
              contactor: this.suplist.contactor,
              tel: this.suplist.tel,
              createDate: this.suplist.createDate,
              address: this.suplist.address
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
          this.$router.push("/supplier");
          // });
        } else {
          console.log("输入的数据不合法");
          alert("输入的数据不合法");
          return;
        }
      });
    },
    cancel() {
      this.$router.push("/supplier");
    },
    time() {
      let year = this.suplist.createDate.getFullYear();
      let month = this.suplist.createDate.getMonth() + 1;
      let date = this.suplist.createDate.getDate();
      let hours = this.suplist.createDate.getHours();
      let minutes = this.suplist.createDate.getMinutes();
      let seconds = this.suplist.createDate.getSeconds();

      return (this.suplist.createDate = `${year}-${
        month < 10 ? "0" + month : month
      }-${date < 10 ? "0" + date : date}`);
    },

    pas() {
      this.suplist.passWord = this.suplist.venderCode;
    }
  },
  created() {
    this.time();
  }
};
</script>

<style  scoped>
.back {
  text-decoration: none;
}
.t {
  padding: 10px 0;
}
</style>