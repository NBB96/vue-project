<template>
  <el-main>
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="t">
        <el-breadcrumb-item>位置:</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/stockInRep' }">月度报表</el-breadcrumb-item>
        <el-breadcrumb-item>月度入库报表</el-breadcrumb-item>
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
          <el-table-column label="入库单据数">
            <template slot-scope="scope">
              <span>{{scope.row.total}}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品总数量">
            <template slot-scope="scope">
              <span>{{scope.row.totalNum}}</span>
            </template>
          </el-table-column>
          <el-table-column label="入库产品总金额">
            <template slot-scope="scope">
              <span>{{scope.row.productTotal}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>

      <el-col :span="24">
        <h1>明细信息</h1>
        <el-table border :data="order">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="采购单号">
            <template slot-scope="scope">
              <span>{{scope.row.poId}}</span>
            </template>
          </el-table-column>
          <el-table-column label="入库日期">
            <template slot-scope="scope">
              <span>{{scope.row.stockTime}}</span>
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
          <el-table-column label="产品数">
            <template slot-scope="scope">
              <span>{{scope.row.stockNum}}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品总金额">
            <template slot-scope="scope">
              <span>{{scope.row.productTotal}}</span>
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
      obj: {
        productTotal: "",
        total: "",
        totalNum: ""
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
        url: `api/main/report/instock/main?page=${cpage}`,
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
        url: "/api/main/report/instock/main",
        method: "get",
        params: {
          time: this.find.date
        }
      })
        .then(res => {
          console.log(res.data);
          this.order = res.data.details.list;
          this.obj.productTotal = res.data.productTotal;
          this.obj.total = res.data.total;
          this.obj.totalNum = res.data.totalNum;
          this.report.push(this.obj);
          this.Total = res.data.details.total;
        })
        .catch(err => {
          console.log(err);
        });
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