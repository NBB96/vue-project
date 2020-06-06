<template>
  <el-main>
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="t">
        <el-breadcrumb-item>位置:</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/newSale' }">销售管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加销售单</el-breadcrumb-item>
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
      <el-col :span="24">
        <el-button icon="el-icon-circle-plus-outline" @click="add">增加明细</el-button>
        <el-button icon="el-icon-circle-plus-outline" @click="save">保存</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7">
        <el-form :model="newSale" ref="newSale" label-width="80px" :rules="rules">
          <el-form-item label="销售单编号" prop="soId">
            <el-input v-model="newSale.soId" readonly></el-input>
          </el-form-item>
          <el-form-item label="创建时间" prop="createTime">
            <el-input v-model="newSale.createTime" readonly></el-input>
          </el-form-item>
          <el-form-item label="客户选择" prop="customerCode">
            <el-select v-model="newSale.customerCode" placeholder="请选择" @change="sup">
              <el-option
                v-for="(item,index) in customer"
                :key="index"
                :label="item.name"
                :value="item.customerCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建用户" prop="account">
            <el-input v-model="newSale.account" readonly></el-input>
          </el-form-item>
          <el-form-item label="附加费用" prop="tipFee">
            <el-input v-model="newSale.tipFee" @change="totalPrice"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="7" :offset="5">
        <el-form :model="newSale" ref="newSale" label-width="120px" :rules="rules">
          <el-form-item label=" 采购产品总价" prop="productTotal">
            <el-input v-model="newSale.productTotal" readonly></el-input>
          </el-form-item>
          <el-form-item label="付款方式" prop="payType">
            <el-select v-model="newSale.payType" placeholder="请选择" @change="select">
              <el-option
                v-for="(item,index) in Type"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="最低预付款金额" prop="prePayFee">
            <el-input v-model="newSale.prePayFee" :disabled="flag"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="newSale.remark"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table border :data="newSale.soitems">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="产品编号" prop="productCode">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.productCode">
                <i
                  slot="suffix"
                  class="el-input__icon el-icon-edit-outline button"
                  @click="go(scope.$index)"
                ></i>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="产品名称" prop="name">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.name"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="数量单位" prop="unitName">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.unitName" readonly></el-input>
            </template>
          </el-table-column>
          <el-table-column label="采购数量" prop="productCode">
            <template slot-scope="scope">
              <el-input
                size="small"
                v-model="scope.row.num"
                placeholder="请输入内容"
                @change="totalPrice"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="采购单价" prop="unitPrice">
            <template slot-scope="scope">
              <el-input
                size="small"
                v-model="scope.row.unitPrice"
                placeholder="请输入内容"
                @change="totalPrice"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="明细总价" prop="itemPrice">
            <template slot-scope="scope">
              <!-- <span>{{scope.row.num*scope.row.unitPrice|two}}</span> -->
              <el-input v-model="scope.row.itemPrice" readonly></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">×</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-table border :data="pro">
        <el-table-column label="选择">
          <template slot-scope="scope">
            <el-radio v-model="radio" :label="scope.$index">&nbsp;</el-radio>
          </template>
        </el-table-column>
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
        <el-table-column label="数量单位">
          <template slot-scope="scope">
            <span>{{scope.row.unitName}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </el-main>
</template>
<script>
import axios from "axios";
const qs = require("querystring");
import { mapState } from "vuex";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      dialogVisible: false,
      flag: true,

      //明细数据
      pro: [],
      radio: "",
      pointIndex: "",

      //

      Type: [
        { value: 1, label: "货到付款" },
        { value: 2, label: "款到发货" },
        { value: 3, label: "预付款到发货" }
      ],
      newSale: {
        soId: new Date(),
        customerCode: "",
        account: "",
        createTime: new Date(),
        tipFee: "0",
        productTotal: "",
        soTotal: "",
        payType: "",
        prePayFee: "0",
        status: "1",
        remark: "",
        soitems: []
      },
      customer: [],
      rules: {
        // soId: [{ required: true }],
        customerCode: [
          { message: "请选择供应商名称", trigger: "blur", required: true }
        ],
        // account: [
        //   { message: "请输入创建用户", trigger: "blur", required: true }
        // ],

        tipFee: [
          {
            pattern: /^\d+(\.\d+)?$/,
            message: "不能为负数",
            trigger: "blur"
          }
        ],
        prePayFee: [
          {
            pattern: /^\d+(\.\d+)?$/,
            message: "不能为负数",
            trigger: "blur"
          }
        ],
        productTotal: [
          { message: "请在明细里完整填写", trigger: "change", required: true },
          {
            pattern: /^\d+(\.\d+)?$/,
            message: "不能为负数",
            trigger: "blur"
          }
        ],
        payType: [
          { required: true, message: "请选择付款方式", trigger: "change" }
        ]
      }
    };
  },
  filters: {
    two(value) {
      return parseFloat(value).toFixed(2);
    }
  },
  methods: {
    //上传数据
    save() {
      // if (this.newSale.soitems == !"") {
      this.$refs.newSale.validate(valid => {
        console.log(valid);
        if (valid) {
          if (this.newSale.prePayFee < this.newSale.productTotal) {
            alert("数据合法");
            console.log(this.newSale);
            axios({
              url: "api/main/sell/somain/add",
              method: "post",
              headers: { "Content-Type": "application/json" },
              data: JSON.stringify(this.newSale)
            })
              .then(resp => {
                console.log(resp);
                this.$message({
                  type: "success",
                  message: "保存成功"
                });
                this.$router.push("/newSale");
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            alert("最低预付款必须小于产品总价");
          }
        } else {
          console.log("输入的数据不合法");
          alert("输入的数据不合法");
          // return;
        }
      });
      // } else {
      //   alert("明细不能为空");
      // }
    },

    //删除行
    handleDelete(index) {
      this.newSale.soitems.splice(index, 1);
      this.totalPrice()
    },

    //创建时间
    time() {
      let year = this.newSale.createTime.getFullYear();
      let month = this.newSale.createTime.getMonth() + 1;
      let date = this.newSale.createTime.getDate();
      let hours = this.newSale.createTime.getHours();
      let minutes = this.newSale.createTime.getMinutes();
      let seconds = this.newSale.createTime.getSeconds();
      return (this.newSale.createTime = `${year}-${
        month < 10 ? "0" + month : month
      }-${date < 10 ? "0" + date : date}`);
    },
    timea() {
      let y = this.newSale.soId.getFullYear();
      let m = this.newSale.soId.getMonth() + 1;
      let d = this.newSale.soId.getDate();
      let h = this.newSale.soId.getHours();
      let min = this.newSale.soId.getMinutes();
      let s = this.newSale.soId.getSeconds();
      return `${y}${m < 10 ? "0" + m : m}${d < 10 ? "0" + d : d}${
        h < 10 ? "0" + h : h
      }${min < 10 ? "0" + min : min}${s < 10 ? "0" + s : s}`;
    },

    //添加行
    add() {
      var newValue = {
        productCode: "",
        unitPrice: "",
        num: "",
        unitName: "",
        itemPrice: ""
      };
      this.newSale.soitems.push(newValue);
    },

    //选择器传值
    //付款方式
    select(value) {
      // let t = "";
      // t = this.Type.find(item => {
      //   return (item.value = value);
      // });

      // this.newSale.payType = value;
      if (value == 3) {
        this.flag = false;
      } else {
        this.flag = true;
      }
    },

    //客户
    sup(value) {
      let n = "";
      n = this.customer.find(item => {
        return (item = value);
      });
      this.newSale.customerCode = value;
    },

    //选择明细页显示
    go(index) {
      this.dialogVisible = true;
      this.pointIndex = index;
      console.log(index);
    },

    //确认选择
    confirm() {
      this.dialogVisible = false;
      const selected = this.pro[this.radio];
      console.log(selected);
      this.newSale.soitems[this.pointIndex].productCode = selected.productCode;
      this.newSale.soitems[this.pointIndex].name = selected.name;
      this.newSale.soitems[this.pointIndex].unitName = selected.unitName;
    },

    //添加采购产品总价
    totalPrice() {
      this.newSale.soitems.map(item => {
        if (item.num == 0) {
          item.num = 1;
        }
        item.itemPrice = item.num * item.unitPrice;
      });
      this.newSale.productTotal = this.newSale.soitems.reduce((prev, cur) => {
        prev += cur.itemPrice;
        return prev;
      }, 0);

      this.newSale.soTotal =
        Number(this.newSale.productTotal) + Number(this.newSale.tipFee);
    }
  },

  created() {
    this.time();
    this.newSale.soId = this.timea();
    this.newSale.account = Cookies.get("loginUser");

    axios.get(`/api/main/sell/customer/show`).then(resp => {
      this.customer = resp.data.list;
    });

    axios({
      url: "/api/main/sell/product/all ",
      method: "get"
    })
      .then(res => {
        this.pro = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style  scoped>
.button {
  cursor: pointer;
}
.t {
  padding: 10px 0;
}
</style>