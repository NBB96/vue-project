<template>
  <el-main>
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="t">
        <el-breadcrumb-item>位置:</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/neworder' }">采购管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加采购单</el-breadcrumb-item>
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
        <el-form :model="newOrder" ref="newOrder" label-width="100px" :rules="rules">
          <el-form-item label="采购单编号" prop="poId">
            <el-input v-model="newOrder.poId" readonly></el-input>
          </el-form-item>
          <el-form-item label="创建时间" prop="createTime">
            <el-input v-model="newOrder.createTime" readonly></el-input>
          </el-form-item>
          <el-form-item label="供应商" prop="venderCode">
            <el-select v-model="newOrder.venderCode" placeholder="请选择" @change="sup">
              <el-option
                v-for="(item,index) in supplier"
                :key="index"
                :label="item.name"
                :value="item.venderCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建用户" prop="account">
            <el-input v-model="newOrder.account" readonly></el-input>
          </el-form-item>
          <el-form-item label="附加费用" prop="tipFee">
            <el-input v-model="newOrder.tipFee" @change="totalPrice"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="7" :offset="5">
        <el-form :model="newOrder" ref="newOrder" label-width="120px" :rules="rules">
          <el-form-item label=" 采购产品总价" prop="productTotal">
            <el-input v-model="newOrder.productTotal" readonly></el-input>
          </el-form-item>
          <el-form-item label="付款方式" prop="payType">
            <el-select v-model="newOrder.payType" placeholder="请选择" @change="select">
              <el-option
                v-for="(item,index) in Type"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="最低预付款金额" prop="prePayFee">
            <el-input v-model="newOrder.prePayFee" :disabled="flag"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="newOrder.remark"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table border :data="newOrder.poitems">
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

      //明细数据
      pro: [],
      radio: "",
      pointIndex: "",
      flag: true,
      // s: [],
      //

      Type: [
        { value: 1, label: "货到付款" },
        { value: 2, label: "款到发货" },
        { value: 3, label: "预付款到发货" }
      ],
      newOrder: {
        poId: new Date(),
        venderCode: "",
        account: "",
        createTime: new Date(),
        tipFee: "0",
        productTotal: "",
        poTotal: "",
        payType: "",
        prePayFee: "0",
        status: "1",
        // name: "",
        remark: "",
        poitems: []
      },
      supplier: [],
      rules: {
        venderCode: [
          { message: "请选择供应商名称", trigger: "change", required: true}
        ],
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
          { required: true, trigger: "change", message: "请选择付款方式" }
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
      // if (this.newOrder.poitems == !"") {
      this.$refs.newOrder.validate(valid => {
        console.log(valid);
        if (valid) {
          if (this.newOrder.prePayFee < this.newOrder.productTotal) {
            alert("数据合法");
            axios({
              url: "api/main/purchase/pomain/add",
              method: "post",
              headers: { "Content-Type": "application/json" },
              data: JSON.stringify(this.newOrder)
            })
              .then(resp => {
                sessionStorage.clear();
                console.log(resp);
              })
              .catch(err => {
                console.log(err);
              });
            this.$message({
              type: "success",
              message: "保存成功"
            });
            this.$router.push("/neworder");
          } else {
            alert("最低预付款必须小于产品总价且不能为0");
          }
        } else {
          console.log("输入的数据不合法");
          alert("输入的数据不合法");
        }
      });
      // } else {
      //   alert("明细不能为空");
      // }
    },

    //删除行
    handleDelete(index) {
      this.newOrder.poitems.splice(index, 1);
      this.totalPrice();
    },

    //创建时间
    time() {
      let year = this.newOrder.createTime.getFullYear();
      let month = this.newOrder.createTime.getMonth() + 1;
      let date = this.newOrder.createTime.getDate();
      let hours = this.newOrder.createTime.getHours();
      let minutes = this.newOrder.createTime.getMinutes();
      let seconds = this.newOrder.createTime.getSeconds();
      return (this.newOrder.createTime = `${year}-${
        month < 10 ? "0" + month : month
      }-${date < 10 ? "0" + date : date}`);
    },
    timea() {
      let y = this.newOrder.poId.getFullYear();
      let m = this.newOrder.poId.getMonth() + 1;
      let d = this.newOrder.poId.getDate();
      let h = this.newOrder.poId.getHours();
      let min = this.newOrder.poId.getMinutes();
      let s = this.newOrder.poId.getSeconds();
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
      this.newOrder.poitems.push(newValue);
    },

    //选择器传值
    //付款方式
    select(value) {
      // let t = "";
      // t = this.Type.find(item => {
      //   return (item.value = value);
      // });
      // console.log(value);
      // this.newOrder.payType = value;
      // console.log(this.newOrder.payType);

      if (value == 3) {
        this.flag = false;
      } else {
        this.flag = true;
      }
    },

    //供应商
    sup(value) {
      let n = "";
      n = this.supplier.find(item => {
        return (item = value);
      });
      // console.log(value);
      this.newOrder.venderCode = value;
      console.log(this.newOrder.venderCode);
    },

    //选择明细页显示
    go(index) {
      this.dialogVisible = true;
      this.pointIndex = index;
      console.log(index);
      // const sel = this.pro[this.radio];
      // this.s.push(sessionStorage.getItem(`${sel.productCode}`));
      // console.log(this.s);
    },

    //确认选择
    confirm() {
      this.dialogVisible = false;
      const selected = this.pro[this.radio];
      console.log(selected);
      // const arr = selected.productCode;
      // const arr = [];
      // arr.push(selected.productCode);
      // console.log(arr);

      // if (selected.productCode !== this.s.map(item=>{
      //   return item
      // })) {
      this.newOrder.poitems[this.pointIndex].productCode = selected.productCode;
      this.newOrder.poitems[this.pointIndex].name = selected.name;
      this.newOrder.poitems[this.pointIndex].unitName = selected.unitName;
      // sessionStorage.setItem(`${selected.productCode}`, arr);
      // } else {
      //   alert("不能重复添加相同产品");
      // }
    },

    //添加采购产品总价
    totalPrice() {
      this.newOrder.poitems.map(item => {
        if (item.num == 0) {
          item.num = 1;
        }
        item.itemPrice = item.num * item.unitPrice;
      });
      this.newOrder.productTotal = this.newOrder.poitems.reduce((prev, cur) => {
        prev += cur.itemPrice;
        return prev;
      }, 0);

      this.newOrder.poTotal =
        Number(this.newOrder.productTotal) + Number(this.newOrder.tipFee);
    }
  },

  beforeCreate(){
    axios.get(`/api/main/purchase/vender/all`).then(resp => {
      this.supplier = resp.data;
      // .map(item => item.name);
    });
    
  },

  created() {
    this.time();
    this.newOrder.poId = this.timea();
    this.newOrder.account = Cookies.get("loginUser");


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