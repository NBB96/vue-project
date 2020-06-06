<template>
  <el-main>
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="t">
        <el-breadcrumb-item>位置:</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/stockin' }">仓库管理</el-breadcrumb-item>
        <el-breadcrumb-item>入库登记</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>

    <el-tabs type="border-card" @tab-click="getType" v-model="activeName">
      <el-tab-pane label="货到付款" name="1">
        <el-table border :data="order">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="采购单编号">
            <template slot-scope="scope">
              <span>{{scope.row.poId}}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <span>{{scope.row.createTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="供应商名称" prop="venderName">
            <template slot-scope="scope">
              <span>{{scope.row.venderName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="附加费用">
            <template slot-scope="scope">
              <span>{{scope.row.tipFee}}</span>
            </template>
          </el-table-column>
          <el-table-column label="采购产品总价">
            <template slot-scope="scope">
              <span>{{scope.row.productTotal}}</span>
            </template>
          </el-table-column>
          <el-table-column label="采购单总价格">
            <template slot-scope="scope">
              <span>{{scope.row.poTotal}}</span>
            </template>
          </el-table-column>
          <el-table-column label="付款方式">
            <template slot-scope="scope">
              <span>{{scope.row.payType|text}}</span>
            </template>
          </el-table-column>
          <el-table-column label="最低预付款金额">
            <template slot-scope="scope">
              <span>{{scope.row.prePayFee}}</span>
            </template>
          </el-table-column>
          <el-table-column label="处理状态">
            <template slot-scope="scope">
              <span>{{scope.row.status | status}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="end(scope.row)">入库</el-button>
              <el-button type="text" size="small" @click="look(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- <payType /> -->
      </el-tab-pane>
      <el-tab-pane label="款到发货" name="2">
        <el-table border :data="order">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="采购单编号">
            <template slot-scope="scope">
              <span>{{scope.row.poId}}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <span>{{scope.row.createTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="供应商名称" prop="venderName">
            <template slot-scope="scope">
              <span>{{scope.row.venderName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="附加费用">
            <template slot-scope="scope">
              <span>{{scope.row.tipFee}}</span>
            </template>
          </el-table-column>
          <el-table-column label="采购产品总价">
            <template slot-scope="scope">
              <span>{{scope.row.productTotal}}</span>
            </template>
          </el-table-column>
          <el-table-column label="采购单总价格">
            <template slot-scope="scope">
              <span>{{scope.row.poTotal}}</span>
            </template>
          </el-table-column>
          <el-table-column label="付款方式">
            <template slot-scope="scope">
              <span>{{scope.row.payType|text}}</span>
            </template>
          </el-table-column>
          <el-table-column label="最低预付款金额">
            <template slot-scope="scope">
              <span>{{scope.row.prePayFee}}</span>
            </template>
          </el-table-column>
          <el-table-column label="处理状态">
            <template slot-scope="scope">
              <span>{{scope.row.status | status}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="end(scope.row)">入库</el-button>
              <el-button type="text" size="small" @click="look(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="预付款到发货" name="3">
        <el-table border :data="order">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="采购单编号">
            <template slot-scope="scope">
              <span>{{scope.row.poId}}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <span>{{scope.row.createTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="供应商名称" prop="venderName">
            <template slot-scope="scope">
              <span>{{scope.row.venderName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="附加费用">
            <template slot-scope="scope">
              <span>{{scope.row.tipFee}}</span>
            </template>
          </el-table-column>
          <el-table-column label="采购产品总价">
            <template slot-scope="scope">
              <span>{{scope.row.productTotal}}</span>
            </template>
          </el-table-column>
          <el-table-column label="采购单总价格">
            <template slot-scope="scope">
              <span>{{scope.row.poTotal}}</span>
            </template>
          </el-table-column>
          <el-table-column label="付款方式">
            <template slot-scope="scope">
              <span>{{scope.row.payType|text}}</span>
            </template>
          </el-table-column>
          <el-table-column label="最低预付款金额">
            <template slot-scope="scope">
              <span>{{scope.row.prePayFee}}</span>
            </template>
          </el-table-column>
          <el-table-column label="处理状态">
            <template slot-scope="scope">
              <span>{{scope.row.status | status}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="end(scope.row)">入库</el-button>
              <el-button type="text" size="small" @click="look(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <el-row>
      <el-col :span="24">
        <el-pagination
          @current-change="currChange"
          layout="total, prev, pager, next, jumper"
          :total="Total"
        ></el-pagination>
      </el-col>
    </el-row>

    <!-- 查看 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-table border :data="detail">
        <el-table-column label="产品编号">
          <template slot-scope="scope">
            <span>{{scope.row.productCode}}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品名称">
          <template slot-scope="scope">
            <span>{{scope.row.productName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品数量">
          <template slot-scope="scope">
            <span>{{scope.row.num}}</span>
          </template>
        </el-table-column>
        <el-table-column label="数量单位">
          <template slot-scope="scope">
            <span>{{scope.row.unitName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="采购单价">
          <template slot-scope="scope">
            <span>{{scope.row.unitPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column label="采购明细总价">
          <template slot-scope="scope">
            <span>{{scope.row.itemPrice}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </el-main>
</template>

<script>
import axios from "axios";
const qs = require("querystring");
import payType from "@/components/payType";
export default {
  data() {
    return {
      order: [],
      page: 1,
      payType: "1",
      activeName: "1",
      status: "1",
      dialogVisible: false,
      detail: [],
      Total: 0
    };
  },
  components: {
    payType
  },
  created() {
    axios({
      url: "/api/main/purchase/pomain/query",
      method: "get",
      params: {
        payType: 1,
        status: 1,
        page: 1
      }
    })
      .then(res => {
        this.order = res.data.list;
        // console.log(this.order);
        this.Total = res.data.total;
      })
      .catch(err => {
        console.log(err);
      });
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
        return (value = "已入库");
      }
      if (value == 5) {
        return (value = "已预付");
      }
    }
  },
  methods: {
    //筛选
    getType(tab) {
      this.payType = tab.name;
      if (this.payType == 1) {
        this.status = 1;
      }
      if (this.payType == 2) {
        this.status = 3;
      }
      if (this.payType == 3) {
        this.status = 5;
      }
      axios({
        url: "/api/main/purchase/pomain/query",
        method: "get",
        params: {
          payType: this.payType,
          page: this.page,
          status: this.status
        }
      })
        .then(res => {
          this.order = res.data.list;
          console.log(this.order);
          this.Total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },

    //分页
    currChange(cpage) {
      // console.log("当前页：", cpage);
      // axios.get(`/api/main/purchase/pomain/query?page=${cpage}`).then(resp => {
      //   this.order = resp.data.list;
      // });

      axios({
        url: `/api/main/purchase/pomain/query?page=${cpage}`,
        method: "get",
        params: {
          payType: this.payType,
          status:this.status
        }
      })
        .then(res => {
          this.order = res.data.list;
          // console.log(this.order);
        })
        .catch(err => {
          console.log(err);
        });
      this.page = cpage;
    },

    //入库
    end(row) {
      console.log(row);
      const c = confirm("是否入库");
      if (c) {
        axios({
          url: "/api/main/stock/instock",
          method: "post",
          data: qs.stringify({
            poId: row.poId,
            payType: row.payType
          })
        })
          .then(res => {
            console.log(res);
            // location.reload();
            if(res.data.code==2){
             alert('入库成功')
              axios({
                url: "/api/main/purchase/pomain/query",
                method: "get",
                params: {
                  payType: row.payType,
                  status: 1,
                  page: this.page
                }
              })
                .then(res => {
                  this.order = res.data.list;
                  // console.log(this.order);
                  this.Total = res.data.total;
                })
                .catch(err => {
                  console.log(err);
                });
            }else{
              alert('入库失败')
            }
          })
          .catch(err => {
            console.log(err);
          });
        // this.$message({
        //   type: "success",
        //   message: "入库成功"
        // });
      }
    },

    // 查看
    look(row) {
      this.dialogVisible = true;
      axios({
        url: "/api/main/purchase/pomain/queryItem",
        method: "get",
        params: {
          poId: row.poId
        }
      })
        .then(res => {
          this.detail = res.data;
          console.log(this.detail, "明细");
        })
        .catch(err => {
          console.log(err);
        });
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