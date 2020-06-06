<template>
  <el-main>
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="t">
        <el-breadcrumb-item>位置:</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/neworder' }">采购管理</el-breadcrumb-item>
        <el-breadcrumb-item>新添采购单</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button icon="el-icon-circle-plus-outline">
          <router-link to="/addneworder" class="add">添加</router-link>
        </el-button>
      </el-col>
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

      <el-col :span="3">
        <el-button type="primary" @click="idItem">查询</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table border :data="newOrder">
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
              <span>{{scope.row.poTotal}}</span>
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
              <el-button type="text" size="small" @click="look( scope.row)">查看</el-button>
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
        <el-form-item label="采购单编号" prop="poId">
          <el-input v-model="rep.poId" readonly></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-input v-model="rep.createTime" readonly></el-input>
        </el-form-item>
        <el-form-item label="创建用户" prop="account">
          <el-input v-model="rep.account" readonly></el-input>
        </el-form-item>
        <el-form-item label="供应商名称" prop="venderCode">
          <el-select v-model="rep.venderCode" placeholder="请选择" @change="sup">
            <el-option
              v-for="(item,index) in supplier"
              :key="index"
              :label="item.name"
              :value="item.venderCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="附加费用" prop="tipFee">
          <el-input v-model="rep.tipFee" @change="totalPrice"></el-input>
        </el-form-item>
        <el-form-item label="采购产品总价" prop="productTotal">
          <el-input v-model="rep.productTotal" readonly></el-input>
        </el-form-item>
        <el-form-item label="采购单总价格" prop="poTotal">
          <el-input v-model="rep.poTotal" readonly></el-input>
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
        <el-table border :data="rep.poitems">
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
            <span>{{scope.row.poTotal}}</span>
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
        poId: "",
        venderCode: "",
        account: "",
        createTime: "",
        tipFee: "0",
        productTotal: "",
        poTotal: "",
        payType: "",
        prePayFee: "0",
        status: "1",
        remark: "",
        poitems: []
      },
      find: {
        date: "",
        super: "",
        type: "",
        id: ""
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
      page: 1,
      newOrder: [],
      supplier: [],
      detail: [],
      // queryItem: [],
      pro: [],
      radio: "",
      pointIndex: "",
      Total: 0,
      rules: {
        venderCode: [
          { message: "请选择供应商名称", trigger: "change", required: true }
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
  created() {
    // this.rep.createTime = this.time();
    // this.rep.poId = this.timea();
    this.rep.createTime = this.newOrder.createTime;
    this.rep.poId = this.newOrder.poId;
    //获取新增采购单
    axios({
      url: "/api/main/purchase/pomain/show",
      method: "get",
      params: {
        type: 1,
        page: this.page
      }
    })
      .then(res => {
        this.newOrder = res.data.list;
        console.log(this.newOrder, "数据");
        this.Total = res.data.total;
      })
      .catch(err => {
        console.log(err);
      });

    //获取供应商
    axios.get(`/api/main/purchase/vender/all`).then(resp => {
      this.supplier = resp.data;
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
      // console.log(this.rep.payType);

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
      this.rep.venderCode = value;
      console.log(this.rep.venderCode);
    },

    //修改数据
    handleEdit(index, row) {
      if (row.payType == 3) {
        this.flag = false;
      }
      console.log(index, row);
      //获取采购明细
      axios({
        url: "/api/main/purchase/pomain/queryItem",
        method: "get",
        params: {
          poId: row.poId
        }
      })
        .then(res => {
          this.rep.poitems = res.data;
          console.log(this.rep.poitems, "明细");
        })
        .catch(err => {
          console.log(err);
        });
      this.dialogVisible = true;
      this.rep.poId = row.poId;
      this.rep.venderCode = row.venderCode;
      this.rep.account = row.account;
      this.rep.createTime = row.createTime;
      this.rep.tipFee = row.tipFee;
      this.rep.productTotal = row.productTotal;
      this.rep.poTotal = row.poTotal;
      this.rep.payType = row.payType;
      this.rep.prePayFee = row.prePayFee;
      this.rep.status = row.status;
      // this.rep.poitems.productCode = this.queryItem.productCode;
      // this.rep.poitems.unitPrice = this.queryItem.unitPrice;
      // this.rep.poitems.num = this.queryItem.num;
      // this.rep.poitems.unitName = this.queryItem.unitName;
      // this.rep.poitems.itemPrice = this.queryItem.itemPrice;
    },
    //删除数据
    handleDelete(index, row) {
      const c = confirm("确认删除吗?");
      if (c) {
        axios({
          url: "/api/main/purchase/pomain/delete",
          method: "post",
          data: qs.stringify({
            //转成字符串
            poId: row.poId
          })
        })
          .then(res => {
            if (res.data.code == 2) {
              alert("删除成功");
              // location.reload();
              axios({
                url: "/api/main/purchase/pomain/show",
                method: "get",
                params: {
                  type: 1,
                  page: this.page
                }
              })
                .then(res => {
                  this.newOrder = res.data.list;
                  console.log(this.newOrder, "数据");
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
      this.rep.poitems.splice(index, 1);
      this.totalPrice();
    },

    //提交
    sure() {
      axios({
        url: "/api/main/purchase/pomain/update",
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
              url: "/api/main/purchase/pomain/show",
              method: "get",
              params: {
                type: 1,
                page: this.page
              }
            })
              .then(res => {
                this.newOrder = res.data.list;
                console.log(this.newOrder, "数据");
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
      this.rep.poitems[this.pointIndex].productCode = selected.productCode;
      this.rep.poitems[this.pointIndex].productName = selected.name;
      this.rep.poitems[this.pointIndex].unitName = selected.unitName;
    },

    //添加采购产品总价
    totalPrice() {
      this.rep.poitems.map(item => {
        if (item.num == 0) {
          item.num = 1;
        }
        item.itemPrice = item.num * item.unitPrice;
      });
      this.rep.productTotal = this.rep.poitems.reduce((prev, cur) => {
        prev += cur.itemPrice;
        return prev;
      }, 0);
      this.rep.poTotal =
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
      this.rep.poitems.push(newValue);
    },

    //分页
    currChange(cpage) {
      axios.get(`/api/main/purchase/pomain/show?page=${cpage}`).then(resp => {
        this.newOrder = resp.data.list;
      });
      this.page = cpage;
    },

    // 查看
    look(row) {
      this.dialogVisible2 = true;
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

      axios({
        url: "/api/main/purchase/pomain/query",
        method: "get",
        params: {
          poId: row.poId
        }
      })
        .then(res => {
          this.r = res.data.list;
          console.log(this.r);
        })
        .catch(err => {
          console.log(err);
        });
    },

    //过滤
    idItem() {
      axios({
        url: "/api/main/purchase/pomain/query",
        method: "get",
        params: {
          payType: this.find.type,
          venderCode: this.find.super,
          startDate: this.find.date[0],
          endDate: this.find.date[1],
          poId: this.find.id,
          page: this.page,
          status: 1
        }
      })
        .then(res => {
          this.newOrder = res.data.list;
          this.Total = res.data.total;
          this.find.type = "";
          this.find.super = "";
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