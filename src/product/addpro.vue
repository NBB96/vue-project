<template>
  <el-main>
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="t">
        <el-breadcrumb-item>位置:</el-breadcrumb-item>
        <el-breadcrumb-item>产品管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/prolist' }">产品列表</el-breadcrumb-item>
        <el-breadcrumb-item>添加产品</el-breadcrumb-item>
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
        <el-form :model="prolist" ref="prolist" label-width="80px" :rules="rules">
          <el-form-item label="产品编号" prop="productCode">
            <el-input v-model="prolist.productCode"></el-input>
          </el-form-item>
          <el-form-item label="产品名称" prop="name">
            <el-input v-model="prolist.name"></el-input>
          </el-form-item>
          <el-form-item label="数量单位" prop="unitName">
            <el-input v-model="prolist.unitName"></el-input>
          </el-form-item>
          <el-form-item label="产品分类" prop="categoryId">
            <!-- <el-input v-model="prolist.categoryId"></el-input> -->
            <el-select placeholder="请选择" v-model="prolist.categoryId">
              <el-option
                v-for="(item,index) in options"
                :key="index"
                :label="item.name"
                :value="item.categoryId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="销售价" prop="price">
            <el-input v-model="prolist.price"></el-input>
          </el-form-item>
          <el-form-item label="添加日期" prop="createDate">
            <el-input v-model="prolist.createDate" readonly></el-input>
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
        productCode: "",
        name: "",
        unitName: "",
        createDate: new Date(),
        categoryId: "",
        price: "0"
      },
      options: [],
      rules: {
        productCode: [
          { required: true, message: "请输入产品编号", trigger: "blur" },
          {
            pattern: /^[\da-zA-Z]{4,10}$/,
            message: "4~10位数字字母",
            trigger: "blur"
          }
        ],
        unitName: [
          { message: "请输入数量单位", trigger: "blur", required: true },
          {
            pattern: /^\S+$/,
            message: "只能为中文数量单位",
            trigger: "blur"
          }
        ],
        name: [
          { message: "请输入姓名", trigger: "blur", required: true },
          {
            pattern: /^.{1,100}$/,
            message: "长度不超过100",
            trigger: "blur"
          }
        ],
        categoryId: [
          { required: true, message: "请选择分类编号", trigger: "change" },
        ],
        price: [
          { required: true, message: "请输入销售价", trigger: "blur" },
          {
            pattern: /^\d+(\.\d+)?$/,
            message: "不能负数",
            trigger: "blur"
          }
        ],
        createDate: [
          { required: true, message: "请选择日期", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    add() {
      this.$refs.prolist.validate(valid => {
        if (valid) {
          alert("数据合法");
          console.log(this.prolist);

          // this.$confirm("是否保存", "提示", {
          //   confirmButtonText: "确定",
          //   cancelButtonText: "取消",
          //   type: "warning"
          // }).then(() => {
            axios({
              url: "api/main/sell/product/add",
              method: "post",
              data: qs.stringify({
                //转成字符串
                productCode: this.prolist.productCode,
                unitName: this.prolist.unitName,
                name: this.prolist.name,
                categoryId: this.prolist.categoryId,
                price: this.prolist.price,
                createDate: this.prolist.createDate,
                remark:this.prolist.remark
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
            this.$router.push("/prolist");
          // });
        } else {
          console.log("输入的数据不合法");
          alert("输入的数据不合法");
        }
      });
    },
    cancel() {
      this.$router.push("/prolist");
    },
    time() {
      let year = this.prolist.createDate.getFullYear();
      let month = this.prolist.createDate.getMonth() + 1;
      let date = this.prolist.createDate.getDate();
      let hours = this.prolist.createDate.getHours();
      let minutes = this.prolist.createDate.getMinutes();
      let seconds = this.prolist.createDate.getSeconds();

      return (this.prolist.createDate = `${year}-${month}-${date}`);
    }
  },
  created() {
    this.time();
    axios({
      url: "/api/main/sell/category/show ",
      method: "get"
    })
      .then(res => {
        this.options = res.data.list;
        console.log(this.options);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style  scoped>
.t {
  padding: 10px 0;
}
</style>