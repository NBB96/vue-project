<template>
  <el-main>
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="t">
        <el-breadcrumb-item>位置:</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/searchOrder' }">采购管理</el-breadcrumb-item>
        <el-breadcrumb-item>采购单查询</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    
    <el-row>
      <!-- 采购单编号 -->
      <el-col :span="5">
        <el-form label-width="100px">
          <el-form-item label="采购单编号">
            <el-input placeholder="请输入采购单编号" v-model="find.id"></el-input>
          </el-form-item>
        </el-form>
      </el-col>

      <!-- 日期选择-->
      <el-col :span="6" :offset="1">
        <el-form label-width="80px">
          <el-form-item label="日期选择">
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

      <!-- 供应商选择 -->
      <el-col :span="5">
        <el-form label-width="100px">
          <el-form-item label="供应商选择">
            <el-select v-model="find.super" placeholder="请选择">
              <el-option
                v-for="(item,index) in supplier"
                :key="index"
                :label="item.name"
                :value="item.venderCode"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>

      <!-- 付款方式 -->

      <el-col :span="5">
        <el-form label-width="80px">
          <el-form-item label="付款方式">
            <el-select v-model="find.type" placeholder="请选择">
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

      <!-- 处理状态 -->
      <el-col :span="5">
        <el-form  label-width="80px">
          <el-form-item label='处理状态'>
            <el-select v-model="find.status" placeholder="请选择">
              <el-option
                v-for="(item,index) in options"
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
              <el-button type="text" size="small" @click="look(scope.row)">查看</el-button>
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

    <!-- 查看 -->
    <el-dialog title="采购单详细信息" :visible.sync="dialogVisible" width="60%">
      <h1>采购单主信息</h1>
      <el-table border :data="rep">
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
      </el-table>

      <h1>采购单入库信息</h1>
      <el-table :data="rep" border>
        <el-table-column label="入库时间">
          <template slot-scope="scope">
            <span>{{scope.row.stockTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="入库操作用户">
          <template slot-scope="scope">
            <span>{{scope.row.stockUser}}</span>
          </template>
        </el-table-column>
      </el-table>

      <div v-if="flag">
        <h1>采购单预付信息</h1>
        <el-table :data="rep" border>
          <el-table-column label="预付时间">
            <template slot-scope="scope">
              <span>{{scope.row.prePayTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="预付操作用户">
            <template slot-scope="scope">
              <span>{{scope.row.prePayUser}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <h1>采购单付款信息</h1>
      <el-table :data="rep" border>
        <el-table-column label="付款时间">
          <template slot-scope="scope">
            <span>{{scope.row.payTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="付款操作用户">
          <template slot-scope="scope">
            <span>{{scope.row.payUser}}</span>
          </template>
        </el-table-column>
      </el-table>

      <h1>所属采购单明细信息</h1>
      <el-table :data="detail" border>
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
        <el-table-column label="产品数量单位">
          <template slot-scope="scope">
            <span>{{scope.row.unitName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品数量">
          <template slot-scope="scope">
            <span>{{scope.row.num}}</span>
          </template>
        </el-table-column>
        <el-table-column label="采购单价">
          <template slot-scope="scope">
            <span>{{scope.row.unitPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品明细总价">
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
      supplier: [],

      find: {
        status: "",
        date: "",
        super: "",
        type: "",
        id: ""
      },

      flag: false,
      rep: [],
      dialogVisible: false,
      detail: [],
      Total:0
    };
  },
  created() {
    // axios({
    //   url: "/api/main/purchase/pomain/query",
    //   method: "get"
    //   //   params: {
    //   //     type: 1
    //   //   }
    // })
    //   .then(res => {
    //     this.order = res.data.list;
    //     console.log(this.order);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    axios.get("/api/main/purchase/vender/show").then(res => {
      this.supplier = res.data.list;
      // console.log(this.supplier)
    });
  },
  methods: {
    //分页
    currChange(cpage) {
      axios.get(`api/main/purchase/pomain/query?page=${cpage}`).then(resp => {
        this.order = resp.data.list;
      });
      this.page = cpage;
    },

    //过滤
    idItem() {
      axios({
        url: "/api/main/purchase/pomain/query",
        method: "get",
        params: {
          payType: this.find.type,
          status: this.find.status,
          venderCode: this.find.super,
          startDate: this.find.date[0],
          endDate: this.find.date[1],
          poId: this.find.id,
          page: this.page
        }
      })
        .then(res => {
          this.order = res.data.list;
          this.Total=res.data.total
          // console.log(this.order);
          this.find.type = "";
          this.find.status = "";
          this.find.super = "";
          this.find.date = "";
          this.find.id = "";
        })
        .catch(err => {
          console.log(err);
        });
    },

    //查看
    look(row) {
      console.log(row);
      this.dialogVisible = true;
      if (row.payType == 3) {
        this.flag = true;
      } else {
        this.flag = false;
      }

      axios({
        url: "/api/main/purchase/pomain/query",
        method: "get",
        params: {
          poId: row.poId
        }
      })
        .then(res => {
          this.rep = res.data.list;
          // console.log(this.rep);
        })
        .catch(err => {
          console.log(err);
        });

      axios({
        url: "/api/main/purchase/pomain/queryItem",
        method: "get",
        params: {
          poId: row.poId
        }
      })
        .then(res => {
          this.detail = res.data;
          console.log(this.detail);
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