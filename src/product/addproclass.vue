<template>
  <el-main>
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="t">
        <el-breadcrumb-item>位置:</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/proclass' }">产品管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加产品分类</el-breadcrumb-item>
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
        <el-form :model="prolist" ref="prolist" label-width="100px" :rules="rules">
          <el-form-item label="产品分类序号">
            <el-input readonly placeholder="自动生成"></el-input>
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="prolist.name"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="remark">
            <el-input v-model="prolist.remark"></el-input>
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
      prolist: {
        name: "",
        remark: ""
      },
      rules: {
        name: [{ message: "请输入分类名称", trigger: "blur", required: true }]
      }
    };
  },
  methods: {
    add() {
      this.$refs.prolist.validate(valid => {
        console.log(valid);
        if (valid) {
          alert("数据合法");
          console.log(this.prolist);
          // this.$confirm("是否保存", "提示", {
          //   confirmButtonText: "确定",
          //   cancelButtonText: "取消",
          //   type: "warning"
          // }).then(() => {
            axios({
              url: "api/main/sell/category/add",
              method: "post",
              data: qs.stringify({
                //转成字符串
                remark: this.prolist.remark,
                name: this.prolist.name
              })
            })
              .then(resp => {
                // console.log(resp.data);
              })
              .catch(err => {
                console.log(err);
              });
            this.$message({
              type: "success",
              message: "保存成功"
            });
            this.$router.push("/proclass");
          // });

          // return;
        } else {
          console.log("输入的数据不合法");
          alert("输入的数据不合法");
          return;
        }
      });
    },
    cancel() {}
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