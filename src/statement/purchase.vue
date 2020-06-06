<template>
  <el-main>
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="t">
        <el-breadcrumb-item>位置:</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/purchase' }">月度报表</el-breadcrumb-item>
        <el-breadcrumb-item>月度采购报表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>

    <el-row>
      <!-- 日期 -->
      <el-col :span="6" :offset="1">
        <el-date-picker v-model="find.date" type="month" placeholder="选择月" @change="month"></el-date-picker>
      </el-col>

      <el-col :span="3">
        <el-button type="primary" @click="idItem">查询</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table border :data="report">
          <el-table-column label="采购单总数">
            <template slot-scope="scope">
              <span>{{scope.row.totalnum}}</span>
            </template>
          </el-table-column>
          <el-table-column label="已了结数">
            <template slot-scope="scope">
              <span>{{scope.row.endtotalnum}}</span>
            </template>
          </el-table-column>
          <el-table-column label="采购单总金额">
            <template slot-scope="scope">
              <span>{{scope.row.pototal}}</span>
            </template>
          </el-table-column>
          <el-table-column label="已付款金额">
            <template slot-scope="scope">
              <span>{{scope.row.totalpay}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <h1>明细信息</h1>
        <el-table border :data="order">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="采购单编号">
            <template slot-scope="scope">
              <span>{{scope.row.poId}}</span>
            </template>
          </el-table-column>
          <el-table-column label="供应商名称">
            <template slot-scope="scope">
              <span>{{scope.row.venderName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建日期">
            <template slot-scope="scope">
              <span>{{scope.row.createTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建用户">
            <template slot-scope="scope">
              <span>{{scope.row.account}}</span>
            </template>
          </el-table-column>
          <el-table-column label="附加费用">
            <template slot-scope="scope">
              <span>{{scope.row.tipFee}}</span>
            </template>
          </el-table-column>
          <el-table-column label="采购单总金额">
            <template slot-scope="scope">
              <span>{{scope.row.poTotal}}</span>
            </template>
          </el-table-column>
          <el-table-column label="未付款金额">
            <template slot-scope="scope">
              <span>{{scope.row.poTotal-scope.row.prePayFee}}</span>
            </template>
          </el-table-column>
          <el-table-column label="付款方式">
            <template slot-scope="scope">
              <span>{{scope.row.payType|text}}</span>
            </template>
          </el-table-column>
          <el-table-column label="最低预付金额">
            <template slot-scope="scope">
              <span>{{scope.row.prePayFee}}</span>
            </template>
          </el-table-column>
          <el-table-column label="采购单状态">
            <template slot-scope="scope">
              <span>{{scope.row.status | status}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24">
        <el-pagination
          @current-change="currChange"
          layout="total, prev, pager, next, jumper"
          :total="Total"
        ></el-pagination>
      </el-col>
    </el-row>

    <!-- <el-row></el-row> -->
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
      obj: {
        endtotalnum: "",
        pototal: "",
        totalnum: "",
        totalpay: ""
      },
      report: [],
      find: {
        date: ""
      },
      Total: 0
    };
  },
  created() {},
  methods: {
    //分页
    currChange(cpage) {
      axios({
        url: `api/main/report/pomain/main?page=${cpage}`,
        method: "get",
        params: {
          time: this.find.date
        }
      })
        .then(res => {
          this.order = res.data.details.list;
          this.Total = res.data.details.total;
        })
        .catch(err => {
          console.log(err);
        });
      this.page = cpage;
    },

    //过滤
    idItem() {
      axios({
        url: "/api/main/report/pomain/main",
        method: "get",
        params: {
          time: this.find.date
        }
      })
        .then(res => {
          this.order = res.data.details.list;
          this.obj.endtotalnum = res.data.endtotalnum;
          this.obj.pototal = res.data.pototal;
          this.obj.totalnum = res.data.totalnum;
          this.obj.totalpay = res.data.totalpay;
          this.report.push(this.obj);
          this.Total = res.data.details.total;
        })
        .catch(err => {
          console.log(err);
        });
      // console.log(this.find.date);
      this.report = [];
    },

    month(v) {
      const d = new Date(v);
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      return (this.find.date = `${year}-${month < 10 ? "0" + month : month}`);
    }
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
    },
    status(value) {
      if (value == 1) {
        return (value = "新增");
      }
      if (value == 2) {
        return (value = "已收货");
      }
      if (value == 3) {
        return (value = "已付款");
      }
      if (value == 4) {
        return (value = "已了结");
      }
      if (value == 5) {
        return (value = "已预付");
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