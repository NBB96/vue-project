<template>
  <el-main>
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="t">
        <el-breadcrumb-item>位置:</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/inEx' }">月度报表</el-breadcrumb-item>
        <el-breadcrumb-item>月度收支报表</el-breadcrumb-item>
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
          <el-table-column label="收款总金额">
            <template slot-scope="scope">
              <span>{{scope.row.recePrice}}</span>
            </template>
          </el-table-column>
          <el-table-column label="付款总金额">
            <template slot-scope="scope">
              <span>{{scope.row.payPrice}}</span>
            </template>
          </el-table-column>
          <el-table-column label="收款交易次数">
            <template slot-scope="scope">
              <span>{{scope.row.receCount}}</span>
            </template>
          </el-table-column>
          <el-table-column label="付款交易次数">
            <template slot-scope="scope">
              <span>{{scope.row.payCount}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>


    <el-tabs type="border-card" v-model="activeName" @tab-click="getTab">
      <el-tab-pane label="收款明细" name="1">
        <el-table border :data="order">
          <el-table-column label="销售单号">
            <template slot-scope="scope">
              <span>{{scope.row.soid}}</span>
            </template>
          </el-table-column>
          <el-table-column label="销售单日期">
            <template slot-scope="scope">
              <span>{{scope.row.createTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="收款日期">
            <template slot-scope="scope">
              <span>{{scope.row.pay_time}}</span>
            </template>
          </el-table-column>
          <el-table-column label="收款金额">
            <template slot-scope="scope">
              <span>{{scope.row.pay_price}}</span>
            </template>
          </el-table-column>
          <el-table-column label="经手人">
            <template slot-scope="scope">
              <span>{{scope.row.account}}</span>
            </template>
          </el-table-column>
          <el-table-column label="处理状态">
            <template slot-scope="scope">
              <span>{{scope.row.status | status}}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="currChange"
          layout="total, prev, pager, next, jumper"
          :total="Total"
        ></el-pagination>
      </el-tab-pane>

      <el-tab-pane label="付款明细" name="2">
        <el-table border :data="order">
          <el-table-column label="采购单号">
            <template slot-scope="scope">
              <span>{{scope.row.poid}}</span>
            </template>
          </el-table-column>
          <el-table-column label="销售单日期">
            <template slot-scope="scope">
              <span>{{scope.row.createTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="付款日期">
            <template slot-scope="scope">
              <span>{{scope.row.pay_time}}</span>
            </template>
          </el-table-column>
          <el-table-column label="付款金额">
            <template slot-scope="scope">
              <span>{{scope.row.pay_price}}</span>
            </template>
          </el-table-column>
          <el-table-column label="经手人">
            <template slot-scope="scope">
              <span>{{scope.row.account}}</span>
            </template>
          </el-table-column>
          <el-table-column label="处理状态">
            <template slot-scope="scope">
              <span>{{scope.row.status | status}}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="currChange"
          layout="total, prev, pager, next, jumper"
          :total="Total"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>


  </el-main>
</template>

<script>
import axios from "axios";
const qs = require("querystring");
export default {
  data() {
    return {
      order: [],
      urlflag: "/main/report/payment/detail/receipt",
      page: 1,
      obj: {
        recePrice: "",
        payCount: "",
        payPrice: "",
        receCount: ""
      },
      report: [],
      find: {
        date: ""
      },
      activeName: "1",
      Total: 0,
      tab: ""
    };
  },
  created() {},
  methods: {
    //分页
    currChange(cpage) {
      axios({
        url: `/api${this.urlflag}?page=${cpage}`,
        method: "get",
        params: {
          time: this.find.date
        }
      })
        .then(res => {
          this.order = res.data.list;
          this.Total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
      this.page = cpage;
    },

    //过滤
    idItem() {
      if (this.activeName == 1) {
        this.urlflag = "/main/report/payment/detail/receipt";
      } else {
        this.urlflag = "/main/report/payment/detail/pay";
      }
      //明细
      axios({
        url: `/api${this.urlflag}`,
        method: "get",
        params: {
          time: this.find.date
        }
      })
        .then(res => {
          console.log(res);
          this.order = res.data.list;
          this.Total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });

      //主信息
      axios({
        url: "/api/main/report/payment/main",
        method: "get",
        params: {
          time: this.find.date
        }
      })
        .then(res => {
          console.log(res.data);
          this.obj.recePrice = res.data.recePrice;
          this.obj.payCount = res.data.payCount;
          this.obj.payPrice = res.data.payPrice;
          this.obj.receCount = res.data.receCount;
          this.report.push(this.obj);
        })
        .catch(err => {
          console.log(err);
        });
        this.report=[]
    },

    month(v) {

      const d = new Date(v);
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      return (this.find.date = `${year}-${month < 10 ? "0" + month : month}`);
    },

    //收付款明细切换
    getTab(tab) {
      this.tab = tab.name;
      if (this.tab == 1) {
        this.urlflag = "/main/report/payment/detail/receipt";
      }
      if (this.tab == 2) {
        this.urlflag = "/main/report/payment/detail/pay";
      }
      //明细
      axios({
        url: `/api${this.urlflag}`,
        method: "get",
        params: {
          time: this.find.date
        }
      })
        .then(res => {
          console.log(res);
          this.order = res.data.list;
          this.Total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
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