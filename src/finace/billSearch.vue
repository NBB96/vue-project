<template>
  <el-main>
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="t">
        <el-breadcrumb-item>位置:</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/billSearch' }">财务收支</el-breadcrumb-item>
        <el-breadcrumb-item>收支查询</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>

    <el-row>
      <el-col :span="5">
        <el-form label-width="100px">
          <el-form-item label="相关单据号">
            <el-input placeholder="请输入相关单据号" v-model="find.id"></el-input>
          </el-form-item>
        </el-form>
      </el-col>

      <!-- 选择日期 -->
      <el-col :span="7">
        <el-form label-width="80px">
          <el-form-item label="选择日期">
            <el-date-picker
              v-model="find.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </el-col>

      <!-- 收支类型 -->
      <el-col :span="4">
        <el-form label-width="80px" ref="tt" :rules="rules">
          <el-form-item label="收支类型" prop="type">
            <el-select v-model="find.type" placeholder="请选择">
              <el-option
                v-for="(item,index) in tt"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>

      <!-- 付款方式 -->

      <el-col :span="5">
        <el-form label-width="80px">
          <el-form-item label="付款方式">
            <el-select v-model="find.payType" placeholder="请选择">
              <el-option
                v-for="(item,index) in Type"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="3">
        <el-button type="primary" @click="idItem">查询</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table border :data="order">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="付款日期" v-if="flag==false">
            <template slot-scope="scope">
              <span>{{scope.row.payTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="收款日期" v-else>
            <template slot-scope="scope">
              <span>{{scope.row.payTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="相关单据号">
            <template slot-scope="scope">
              <span>{{scope.row.ordercode}}</span>
            </template>
          </el-table-column>
          <el-table-column label="付款金额" v-if="flag==false">
            <template slot-scope="scope">
              <span>{{scope.row.payPrice}}</span>
            </template>
          </el-table-column>
          <el-table-column label="收款金额" v-else>
            <template slot-scope="scope">
              <span>{{scope.row.payPrice}}</span>
            </template>
          </el-table-column>
          <el-table-column label="经手人">
            <template slot-scope="scope">
              <span>{{scope.row.account}}</span>
            </template>
          </el-table-column>
          <el-table-column label="单据付款方式">
            <template slot-scope="scope">
              <span>{{scope.row.payType | text}}</span>
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
  </el-main>
</template>

<script>
import axios from "axios";
const qs = require("querystring");
export default {
  data() {
    return {
      order: [],
      page: 1,
      options: [
        { value: 1, label: "新增" },
        { value: 2, label: "已收货" },
        { value: 3, label: "已付款" },
        { value: 4, label: "已了结" },
        { value: 5, label: "已预付" }
      ],
      Type: [
        { value: 1, label: "货到付款" },
        { value: 2, label: "款到发货" },
        { value: 3, label: "预付款到发货" }
      ],
      tt: [{ value: "支出", label: "支出" }, { value: "收入", label: "收入" }],

      find: {
        date: "",
        type: "",
        payType: "",
        id: ""
      },
      flag: false,
      n: 0,
      rules: {
        type: [{ required: true, message: "请选择支出类型", trigger: "blur" }]
      },
      Total:0
    };
  },
  created() {},
  methods: {
    //分页
    currChange(cpage) {
      axios.get(`api/main/finance/query?page=${cpage}`).then(resp => {
        this.order = resp.data.list;
      });
      this.page = cpage;
    },

    //过滤
    idItem() {
      if (this.n == 1) {
        this.flag = true;
      }
      if (this.n == 0) {
        this.flag = false;
      }
      // this.$refs.tt.validate(valid => {
      //   if (valid) {
      axios({
        url: "/api/main/finance/query",
        method: "get",
        params: {
          payType: this.find.payType,
          type: this.find.type,
          startDate: this.find.date[0],
          endDate: this.find.date[1],
          no: this.find.id,
          page: this.page
        }
      })
        .then(res => {
          console.log(res);
          this.order = res.data.list;
          this.Total=res.data.total
          // console.log(this.order);
          // this.find.payType = "";
          // this.find.status = "";
          // this.find.type = "";
          // this.find.date = "";
          // this.find.id = "";
        })
        .catch(err => {
          console.log(err);
        });
    }
  //   else{
  //     alert('收支类型不能为空')
  //   }
  //   });
  // }
  },
  filters: {
    text(value) {
      if (value == 1) {
        return (value = "货到付款");
      }
      if (value == 2) {
        return (value = "款到发货");
      }
      if (value == 3) {
        return (value = "预付款到发货");
      }
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