<template>
  <el-main>
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="t">
        <el-breadcrumb-item>位置:</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/pay' }">财务收支</el-breadcrumb-item>
        <el-breadcrumb-item>付款登记</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>

    <el-tabs type="bsale-card" @tab-click="getType" v-model="activeName">
      <el-tab-pane label="货到付款" name="1">
        <el-table bsale :data="sale">
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
              <el-button type="text" size="small" @click="end(scope.row)">付款</el-button>
              <el-button type="text" size="small" @click="look(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- <payType /> -->
      </el-tab-pane>
      <el-tab-pane label="款到发货" name="2">
        <el-table bsale :data="sale">
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
              <el-button type="text" size="small" @click="end(scope.row)">付款</el-button>
              <el-button type="text" size="small" @click="look(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="预付款到发货" name="3">
        <el-table bsale :data="sale">
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
          <el-table-column label="供应商名称">
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
              <el-button
                v-show="scope.row.status==2"
                type="text"
                size="small"
                @click="end(scope.row)"
              >付余款</el-button>
              <el-button
                v-show="scope.row.status==1"
                type="text"
                size="small"
                @click="end(scope.row)"
              >付预付款</el-button>
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

    <!-- 付款登记 -->
    <el-dialog el-dialog title="采购单详细信息" :visible.sync="dialogVisible" width="60%">
      <el-table border :data="rep">
        <el-table-column label="采购单编号">
          <template slot-scope="scope">
            <span>{{scope.row.poId}}</span>
          </template>
        </el-table-column>
        <el-table-column label="总价格">
          <template slot-scope="scope">
            <span>{{scope.row.poTotal}}</span>
          </template>
        </el-table-column>
        <el-table-column label="最低预付款金额" v-if="t==2">
          <template slot-scope="scope">
            <span>{{scope.row.prePayFee}}</span>
          </template>
        </el-table-column>
        <el-table-column label="付款金额" v-if="t==2">
          <template slot-scope="scope">
            <span>{{scope.row.poTotal-scope.row.prePayFee}}</span>
          </template>
        </el-table-column>
        <el-table-column label="预付款方式" v-if="t==2">
          <template slot-scope="scope">
            <span v-if="scope.row.status==2">付余款</span>
            <span v-if="scope.row.status==1">付预付款</span>
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
      sale: [],
      page: 1,
      payType: "1",
      activeName: "1",
      status: "2",
      dialogVisible: false,
      rep: [],
      options: [{ value: 2, label: "付款" }, { value: 4, label: "付预付款" }],
      Type: 1,
      // poId: "",
      falg: false,
      Total: 0,
      t: 1
    };
  },
  components: {
    payType
  },
  created() {
    axios({
      url: "/api/main/purchase/pomain/show",
      method: "get",
      params: {
        payType: 1,
        type: 3
      }
    })
      .then(res => {
        this.sale = res.data.list;
        console.log(res.data);
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
        return (value = "已付款");
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
      if (tab.name == 1 || tab.name == 2) {
        this.Type = 1;
      }
      axios({
        url: "/api/main/purchase/pomain/show",
        method: "get",
        params: {
          payType: this.payType,
          page: this.page,
          type: 3
        }
      })
        .then(res => {
          this.sale = res.data.list;
          console.log(this.sale);
          this.Total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },

    //分页
    currChange(cpage) {
      //   axios.get(`/api/main/purchase/pomain/show?page=${cpage}`).then(resp => {
      //     this.sale = resp.data.list;
      //   });

      axios({
        url: `/api/main/purchase/pomain/show?page=${cpage}`,
        method: "get",
        params: {
          payType: this.payType,
          type: 3
        }
      })
        .then(res => {
          this.sale = res.data.list;
          // console.log(this.sale);
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
      this.page = cpage;
    },

    //查看
    look(row) {
      this.dialogVisible = true;
      if (row.payType == 3) {
        this.t = 2;
      } else {
        this.t = 1;
      }
      axios({
        url: "/api/main/purchase/pomain/query",
        method: "get",
        params: {
          poId: row.poId
          // payType:row.payType,
          // type:3
        }
      })
        .then(res => {
          this.rep = res.data.list;
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
      // this.poId = row.poId;
    },

    // 付款
    end(row) {
      const c = confirm("是否付款");
      if (row.payType == 3 && row.status == 2) {
        this.Type = 1;
      } else if (row.payType == 3 && row.status == 1) {
        this.Type = 2;
      }
      if (c) {
        axios({
          url: "/api/main/finance/pay",
          method: "post",
          data: qs.stringify({
            poId: row.poId,
            type: this.Type
          })
        })
          .then(res => {
            console.log(res);
            // location.reload();
            if (res.data.code == 2) {
              axios({
                url: "/api/main/purchase/pomain/show",
                method: "get",
                params: {
                  payType: row.payType,
                  type: 3
                }
              })
                .then(res => {
                  this.sale = res.data.list;
                  console.log(res.data);
                  this.Total = res.data.total;
                })
                .catch(err => {
                  console.log(err);
                });
              this.$message({
                type: "success",
                message: "付款成功"
              });
            } else {
              alert("付款失败");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      this.dialogVisible = false;
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