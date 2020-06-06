<template>
  <el-main>
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="t">
        <el-breadcrumb-item>位置:</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/newSale' }">销售管理</el-breadcrumb-item>
        <el-breadcrumb-item>新添销售单</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button icon="el-icon-circle-plus-outline">
          <router-link to="/addnewSale" class="add">添加</router-link>
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <!--  销售单编号 -->
      <el-col :span="5">
        <el-form label-width="100px">
          <el-form-item label="销售单编号">
            <el-input placeholder="请输入销售单编号" v-model="find.id"></el-input>
          </el-form-item>
        </el-form>
      </el-col>

      <!-- 日期选择 -->
      <el-col :span="6">
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

      <!-- 客户选择 -->
      <el-col :span="5">
        <el-form label-width="100px">
          <el-form-item label="客户选择">
            <el-select v-model="find.cilent" placeholder="请选择">
              <el-option
                v-for="(item,index) in customer"
                :key="index"
                :label="item.name"
                :value="item.customerCode"
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

      <el-col :span="3">
        <el-button type="primary" @click="idItem">查询</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table border :data="newSale">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="销售单编号">
            <template slot-scope="scope">
              <span>{{scope.row.soId}}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <span>{{scope.row.createTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="客户名称">
            <template slot-scope="scope">
              <span>{{scope.row.customerName}}</span>
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
          <el-table-column label="采购产品总价">
            <template slot-scope="scope">
              <span>{{scope.row.productTotal}}</span>
            </template>
          </el-table-column>
          <el-table-column label="采购单总价">
            <template slot-scope="scope">
              <span>{{scope.row.soTotal}}</span>
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
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <el-button type="text" size="small" @click="look(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-pagination
          layout="total, prev, pager, next, jumper"
          :total="Total"
          @current-change="currChange"
        ></el-pagination>
      </el-col>
    </el-row>

    <!-- 修改 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="60%">
      <el-form :model="rep" ref="rep" label-width="80px">
        <el-form-item label="采购单编号" prop="soId">
          <el-input v-model="rep.soId" readonly></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-input v-model="rep.createTime" readonly></el-input>
        </el-form-item>
        <el-form-item label="创建用户" prop="account">
          <el-input v-model="rep.account" readonly></el-input>
        </el-form-item>
        <el-form-item label="客户选择" prop="customerCode">
          <el-select v-model="rep.customerCode" placeholder="请选择" @change="sup">
            <el-option
              v-for="(item,index) in customer"
              :key="index"
              :label="item.name"
              :value="item.customerCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="附加费用" prop="tipFee">
          <el-input v-model="rep.tipFee" @change="totalPrice"></el-input>
        </el-form-item>
        <el-form-item label="采购产品总价" prop="productTotal">
          <el-input v-model="rep.productTotal" readonly></el-input>
        </el-form-item>
        <el-form-item label="采购单总价格" prop="soTotal">
          <el-input v-model="rep.soTotal" readonly></el-input>
        </el-form-item>
        <el-form-item label="付款方式" prop="payType">
          <el-select v-model="rep.payType" placeholder="请选择" @change="select">
            <el-option
              v-for="(item,index) in Type"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="最低预付款金额" prop="prePayFee">
          <el-input v-model="rep.prePayFee" :disabled="flag"></el-input>
        </el-form-item>

        <!-- 修改明细 -->
        <el-button icon="el-icon-circle-plus-outline" @click="add">增加明细</el-button>
        <el-table border :data="rep.soitems">
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
          <el-table-column label="产品名称" prop="productName">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.productName"></el-input>
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
              <el-button type="text" size="small" @click="delRow(scope.$index, scope.row)">×</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改产品 -->
    <el-dialog title="提示" :visible.sync="dialogVisible1" width="30%">
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
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 查看 -->
    <el-dialog title="提示" :visible.sync="dialogVisible2" width="50%">
      <el-table border :data="r">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="销售单编号">
          <template slot-scope="scope">
            <span>{{scope.row.soId}}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <span>{{scope.row.createTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="客户名称">
          <template slot-scope="scope">
            <span>{{scope.row.customerName}}</span>
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
        <el-table-column label="采购产品总价">
          <template slot-scope="scope">
            <span>{{scope.row.productTotal}}</span>
          </template>
        </el-table-column>
        <el-table-column label="采购单总价">
          <template slot-scope="scope">
            <span>{{scope.row.soTotal}}</span>
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
      </el-table>
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
        <el-table-column label="销售单价">
          <template slot-scope="scope">
            <span>{{scope.row.unitPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column label="销售明细总价">
          <template slot-scope="scope">
            <span>{{scope.row.itemPrice}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </el-main>
</template>

<script>
const qs = require("querystring");
import axios from "axios";
export default {
  data() {
    return {
      r: [],
      rep: {
        soId: "",
        customerCode: "",
        account: "",
        createTime: "",
        tipFee: "0",
        productTotal: "",
        soTotal: "",
        payType: "",
        prePayFee: "0",
        status: "1",
        remark: "",
        soitems: []
      },
      Type: [
        { value: 1, label: "货到付款" },
        { value: 2, label: "款到发货" },
        { value: 3, label: "预付款到发货" }
      ],
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      flag: true,
      Total: 0,
      page: 1,
      newSale: [],
      customer: [],
      // queryItem: [],
      pro: [],
      radio: "",
      pointIndex: "",
      detail: [],
      find: {
        date: "",
        cilent: "",
        type: "",
        id: ""
      }
    };
  },
  created() {
    // this.rep.createTime = this.time();
    // this.rep.soId = this.timea();
    this.rep.createTime = this.newSale.createTime;
    this.rep.soId = this.newSale.soId;
    //获取新增销售单
    axios({
      url: "/api/main/sell/somain/show",
      method: "get",
      params: {
        type: 1,
        page: this.page
      }
    })
      .then(res => {
        this.newSale = res.data.list;
        console.log(this.newSale, "数据");
        this.Total = res.data.total;
      })
      .catch(err => {
        console.log(err);
      });

    //获取客户
    axios.get(`/api/main/sell/customer/show`).then(resp => {
      this.customer = resp.data.list;
      console.log(this.customer, 111);
    });
    //获取产品
    axios.get(`/api/main/sell/product/all`).then(resp => {
      this.pro = resp.data;
      // .map(item => item.name);
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
    }
  },
  methods: {
    //付款方式
    select(value) {
      // let t = "";
      // t = this.Type.find(item => {
      //   return (item.value = value);
      // });
      // this.rep.payType = value;
      // // console.log(this.rep.payType);
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
        return (item.customerCode = value);
      });
      // console.log(value);
      this.rep.customerCode = value;
      console.log(this.rep.customerCode);
    },

    //修改数据
    handleEdit(index, row) {
      if (row.payType == 3) {
        this.flag = false;
      }
      console.log(index, row);
      //获取采购明细
      axios({
        url: "/api/main/sell/somain/queryItem",
        method: "get",
        params: {
          soId: row.soId
        }
      })
        .then(res => {
          this.rep.soitems = res.data;
          console.log(this.rep.soitems, "明细");
        })
        .catch(err => {
          console.log(err);
        });
      this.dialogVisible = true;
      this.rep.soId = row.soId;
      this.rep.customerCode = row.customerCode;
      this.rep.account = row.account;
      this.rep.createTime = row.createTime;
      this.rep.tipFee = row.tipFee;
      this.rep.productTotal = row.productTotal;
      this.rep.soTotal = row.soTotal;
      this.rep.payType = row.payType;
      this.rep.prePayFee = row.prePayFee;
      this.rep.status = row.status;
      // this.rep.soitems.productCode = this.queryItem.productCode;
      // this.rep.soitems.unitPrice = this.queryItem.unitPrice;
      // this.rep.soitems.num = this.queryItem.num;
      // this.rep.soitems.unitName = this.queryItem.unitName;
      // this.rep.soitems.itemPrice = this.queryItem.itemPrice;
    },
    //删除数据
    handleDelete(index, row) {
      const c = confirm("确定删除?");
      if (c) {
        axios({
          url: "/api/main/sell/somain/delete",
          method: "post",
          data: qs.stringify({
            //转成字符串
            soId: row.soId
          })
        })
          .then(res => {
            if (res.data.code) {
              alert("删除成功");
              // location.reload();
              axios({
                url: "/api/main/sell/somain/show",
                method: "get",
                params: {
                  type: 1,
                  page: this.page
                }
              })
                .then(res => {
                  this.newSale = res.data.list;
                  console.log(this.newSale, "数据");
                  this.Total = res.data.total;
                })
                .catch(err => {
                  console.log(err);
                });
            } else {
              alert("删除失败");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },

    //删除行
    delRow(index) {
      this.rep.soitems.splice(index, 1);
      this.totalPrice();
    },

    //提交
    sure() {
      axios({
        url: "/api/main/sell/somain/update",
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(this.rep)
      })
        .then(res => {
          // this.user = res.data.list;
          console.log(res);
          // location.reload();
          if (res.data.code == 2) {
            axios({
              url: "/api/main/sell/somain/show",
              method: "get",
              params: {
                type: 1,
                page: this.page
              }
            })
              .then(res => {
                this.newSale = res.data.list;
                console.log(this.newSale, "数据");
                this.Total = res.data.total;
              })
              .catch(err => {
                console.log(err);
              });
            this.$message({
              type: "success",
              message: "修改成功"
            });
            this.dialogVisible = false;
          } else {
            alert("修改失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //选择明细页显示
    go(index) {
      this.dialogVisible1 = true;
      this.pointIndex = index;
      console.log(index);
    },

    //确认选择
    confirm() {
      this.dialogVisible1 = false;
      const selected = this.pro[this.radio];
      console.log(selected);
      this.rep.soitems[this.pointIndex].productCode = selected.productCode;
      this.rep.soitems[this.pointIndex].productName = selected.name;
      this.rep.soitems[this.pointIndex].unitName = selected.unitName;
    },

    //添加采购产品总价
    totalPrice() {
      this.rep.soitems.map(item => {
        if (item.num == 0) {
          item.num = 1;
        }
        item.itemPrice = item.num * item.unitPrice;
      });
      this.rep.productTotal = this.rep.soitems.reduce((prev, cur) => {
        prev += cur.itemPrice;
        return prev;
      }, 0);
      this.rep.soTotal =
        Number(this.rep.productTotal) + Number(this.rep.tipFee);
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
      this.rep.soitems.push(newValue);
    },

    //分页
    currChange(cpage) {
      axios.get(`/api/main/sell/somain/show?page=${cpage}`).then(resp => {
        this.newSale = resp.data.list;
      });
      this.page = cpage;
    },

    // 查看
    look(row) {
      this.dialogVisible2 = true;
      axios({
        url: "/api/main/sell/somain/queryItem",
        method: "get",
        params: {
          soId: row.soId
        }
      })
        .then(res => {
          this.detail = res.data;
          console.log(this.detail, "明细");
        })
        .catch(err => {
          console.log(err);
        });
      axios({
        url: "/api/main/sell/somain/query",
        method: "get",
        params: {
          soId: row.soId
        }
      })
        .then(res => {
          this.r = res.data.list;
        })
        .catch(err => {
          console.log(err);
        });
    },

    //过滤
    idItem() {
      axios({
        url: "/api/main/sell/somain/query",
        method: "get",
        params: {
          payType: this.find.type,
          status: 1,
          customerCode: this.find.cilent,
          startDate: this.find.date[0],
          endDate: this.find.date[1],
          soId: this.find.id,
          page: this.page
        }
      })
        .then(res => {
          this.newSale = res.data.list;
          this.Total = res.data.total;
          this.find.type = "";
          this.find.cilent = "";
          this.find.date = "";
          this.find.id = "";
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style  scoped>
.t {
  padding: 10px 0;
}
.add {
  text-decoration: none;
}
</style>