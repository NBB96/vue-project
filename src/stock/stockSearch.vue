<template>
  <el-main>
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="t">
        <el-breadcrumb-item>位置:</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/stockSearch' }">仓库管理</el-breadcrumb-item>
        <el-breadcrumb-item>库存查询</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row>
      <!-- 过滤 -->
      <!-- <el-col :span="5">
        <el-input v-model="search" placeholder="请输入搜索内容"></el-input>
      </el-col>-->

      <!-- 产品编号 -->
      <el-col :span="4">
        <el-form label-width="100px">
          <el-form-item label="产品编号">
            <el-input placeholder="请输入产品编号" v-model="find.productCode"></el-input>
          </el-form-item>
        </el-form>
      </el-col>

      <!-- 产品名称 -->
      <el-col :span="4">
        <el-form label-width="100px">
          <el-form-item label="产品名称">
            <el-input placeholder="请输入采购单名称" v-model="find.name"></el-input>
          </el-form-item>
        </el-form>
      </el-col>

      <!-- 库存数量范围 -->
      <el-col :span="3">
        <el-form label-width="100px" :rules="rules" :model="find">
          <el-form-item label="最小" prop="min">
            <el-input v-model="find.min"></el-input>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="3">
        <el-form label-width="100px" :rules="rules" :model="find">
          <el-form-item label="最大" prop="max">
            <el-input v-model="find.max"></el-input>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="3" :offset="1">
        <el-button type="primary" @click="idItem">查询</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table border :data="stock">
          <el-table-column label="序号" type="index"></el-table-column>
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
          <el-table-column label="库存数量">
            <template slot-scope="scope">
              <span>{{scope.row.num}}</span>
            </template>
          </el-table-column>
          <el-table-column label="采购在途数">
            <template slot-scope="scope">
              <span>{{scope.row.soNum}}</span>
            </template>
          </el-table-column>
          <el-table-column label="预销售数">
            <template slot-scope="scope">
              <span>{{scope.row.poNum}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="look(scope.row)">库存变更记录</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <!-- 主页面分页 -->
    <el-row>
      <el-col :span="24">
        <el-pagination
          @current-change="currChange"
          layout="total, prev, pager, next, jumper"
          :total="Total"
        ></el-pagination>
      </el-col>
    </el-row>

    <!--查看库存变更记录 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-tabs type="border-card" @tab-click="getType" v-model="activeName">
        <el-tab-pane label="入库记录信息" name="1">
          <el-table border :data="rep">
            <el-table-column label="入库时间">
              <template slot-scope="scope">
                <span>{{scope.row.stockTime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="相关采购单号">
              <template slot-scope="scope">
                <span>{{scope.row.orderCode}}</span>
              </template>
            </el-table-column>
            <el-table-column label="入库经手人">
              <template slot-scope="scope">
                <span>{{scope.row.createUser}}</span>
              </template>
            </el-table-column>
            <el-table-column label="入库数量">
              <template slot-scope="scope">
                <span>{{scope.row.stockNum}}</span>
              </template>
            </el-table-column>
            <el-table-column label="入库类型">
              <template slot-scope="scope">
                <span>{{scope.row.stockType | text}}</span>
              </template>
            </el-table-column>
          </el-table>

          <el-row>
            <el-col :span="24">
              <el-pagination
                @current-change="detChange"
                layout="total, prev, pager, next, jumper"
                :total="Total1"
              ></el-pagination>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="出库记录信息" name="2">
          <el-table border :data="rep">
            <el-table-column label="出库时间">
              <template slot-scope="scope">
                <span>{{scope.row.stockTime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="相关销售单号">
              <template slot-scope="scope">
                <span>{{scope.row.orderCode}}</span>
              </template>
            </el-table-column>
            <el-table-column label="出库经手人">
              <template slot-scope="scope">
                <span>{{scope.row.createUser}}</span>
              </template>
            </el-table-column>
            <el-table-column label="出库数量">
              <template slot-scope="scope">
                <span>{{scope.row.stockNum}}</span>
              </template>
            </el-table-column>
            <el-table-column label="出库类型">
              <template slot-scope="scope">
                <span>{{scope.row.stockType | text}}</span>
              </template>
            </el-table-column>
          </el-table>

          <el-row>
            <el-col :span="24">
              <el-pagination
                @current-change="detChange"
                layout="total, prev, pager, next, jumper"
                :total="Total1"
              ></el-pagination>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>-->
      </div>
    </el-dialog>
  </el-main>
</template>

<script>
import axios from "axios";
const qs = require("querystring");
export default {
  data() {
    return {
      stock: [],
      page: 1,
      dialogVisible: false,
      search: "",
      rep: [],
      stockType: "1",
      activeName: "1",
      productCode: "",
      Total: 0,
      Total1: 0,
      find: {
        productCode: "",
        name: "",
        min: 0,
        max: ""
      },
      rules: {
        min: [
          {
            pattern: /^\d+(\.\d+)?$/,
            message: "不能为负数",
            trigger: "blur"
          }
        ],
        max: [
          {
            pattern: /^\d+(\.\d+)?$/,
            message: "不能为负数",
            trigger: "blur"
          }
        ]
      }
    };
  },
  filters: {
    text(value) {
      if (value == 1) {
        return (value = "采购入库");
      }
      if (value == 3) {
        return (value = "盘点入库");
      }
      if (value == 2) {
        return (value = "销售出库");
      }
      if (value == 4) {
        return (value = "盘点出库");
      }
    }
  },
  created() {
    axios({
      url: "/api/main/stock/query",
      method: "get",
      params: {
        page: this.page
      }
    })
      .then(res => {
        this.stock = res.data.list;
        // console.log(this.stock);
        this.Total = res.data.total;
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    table: function() {
      const search = this.search;
      if (search) {
        return this.stock.filter(data => {
          return Object.keys(data).some(key => {
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(search) > -1
            );
          });
        });
      }
      return this.stock;
    }
  },
  methods: {
    //主页面分页
    currChange(cpage) {
      // console.log("当前页：", cpage);
      axios.get(`/api/main/stock/query?page=${cpage}`).then(resp => {
        // console.log(resp.data.list);
        this.stock = resp.data.list;
      });
      this.page = cpage;
    },

    //出入库分页
    detChange(p) {
      axios({
        url: `/api/main/stock/alterRecord?page=${p}`,
        method: "get",
        params: {
          stockType: this.stockType,
          productCode: this.productCode
        }
      })
        .then(res => {
          this.rep = res.data.data.list;
          console.log(this.rep);
        })
        .catch(err => {
          console.log(err);
        });
    },

    //查看
    look(row) {
      this.dialogVisible = true;
      this.productCode = row.productCode;
      axios({
        url: "/api/main/stock/alterRecord",
        method: "get",
        params: {
          stockType: this.stockType,
          productCode: row.productCode
        }
      })
        .then(res => {
          this.rep = res.data.data.list;
          console.log(this.rep);
          this.Total1 = res.data.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },

    //明细
    getType(tab) {
      this.stockType = tab.name;
      console.log(this.stockType);
      axios({
        url: "/api/main/stock/alterRecord",
        method: "get",
        params: {
          stockType: this.stockType,
          productCode: this.productCode
        }
      })
        .then(res => {
          this.rep = res.data.data.list;
          console.log(this.rep);
          console.log(res);
          this.Total1 = res.data.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },

    //过滤
    idItem() {
      axios({
        url: "/api/main/stock/query",
        method: "get",
        params: {
          productCode: this.find.productCode,
          name: this.find.name,
          min: this.find.min,
          max: this.find.max
        }
      })
        .then(res => {
          this.stock = res.data.list;
          // console.log(this.order);
          this.find.productCode = "";
          this.find.name = "";
          this.find.num = "";
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
  padding: 10px 0
}
.add {
  text-decoration: none;
}
</style>