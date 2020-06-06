<template>
  <el-main>
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="t">
        <el-breadcrumb-item>位置:</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/stockCheck' }">仓库管理</el-breadcrumb-item>
        <el-breadcrumb-item>盘点管理</el-breadcrumb-item>
      </el-breadcrumb>
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
          <el-table-column label="当前库存">
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
              <el-button type="text" size="small" @click="check(scope.row)">盘点</el-button>
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

    <!--盘点 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-form label-width="80px" :model="stockUpdate" ref="stockUpdate" :rules="rules">
        <el-form-item label="变化数量" prop="num">
          <el-input v-model="stockUpdate.num"></el-input>
        </el-form-item>
        <el-form-item label="变化类型" prop="type">
          <el-select v-model="stockUpdate.type" placeholder="请选择" @change="getTpye">
            <el-option
              v-for="item in changeTpye"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
            <!-- <el-option label="损耗" value="1"></el-option>
            <el-option label="盘余" value="2"></el-option>-->
          </el-select>
        </el-form-item>
        <el-form-item label="损益原因" prop="description">
          <el-input v-model="stockUpdate.description"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
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
      Total: 0,
      stock: [],
      page: 1,
      dialogVisible: false,
      stockUpdate: {
        num: "",
        type: "",
        description: "",
        productCode: "",
        originNum: ""
      },
      changeTpye: [{ value: "损耗", label: "损耗" }, { value: "盘余", label: "盘余" }],
      rules: {
        num: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur"
          },

          {
            pattern: /^[\da-zA-Z]{1,30}$/,
            message: "请输入数量,不超过30个字符",
            trigger: "blur"
          }
        ],
        type: [{ message: "请选择类型", trigger: "change", required: true }],
        description: [
          { message: "请输入损益原因", trigger: "blur", required: true }
        ]
      }
    };
  },
  created() {
    axios({
      url: "/api/main/stock/query",
      method: "get",
      params: {
        page: 1
      }
    })
      .then(res => {
        this.stock = res.data.list;
        this.Total = res.data.total;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    //分页
    currChange(cpage) {
      axios.get(`/api/main/stock/query?page=${cpage}`).then(resp => {
        this.stock = resp.data.list;
      });
      this.page = cpage;
    },

    //盘点
    check(row) {
      this.dialogVisible = true;
      this.stockUpdate.productCode = row.productCode;
      this.stockUpdate.originNum = row.num;
      console.log(this.stockUpdate.productCode);
      console.log(this.stockUpdate.originNum);
    },

    //提交
    sure() {
      this.$refs.stockUpdate.validate(valid => {
        if (valid) {
          axios({
            url: "/api/main/stock/checkstock",
            method: "post",
            data: qs.stringify({
              productCode: this.stockUpdate.productCode,
              originNum: this.stockUpdate.originNum,
              num: this.stockUpdate.num,
              type: this.stockUpdate.type,
              description: this.stockUpdate.description
            })
          })
            .then(res => {
              console.log(res);
              alert("数据合法");
              if (res.data.code == 2) {
                alert("盘点成功");
                this.dialogVisible = false;
                axios({
                  url: "/api/main/stock/query",
                  method: "get",
                  params: {
                    page: this.page
                  }
                })
                  .then(res => {
                    this.stock = res.data.list;
                    this.Total = res.data.total;
                  })
                  .catch(err => {
                    console.log(err);
                  });
              } else {
                alert("盘点失败");
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          alert("数据不合法");
        }
      });
    },

    //获取类型
    getTpye(value) {
      this.stockUpdate.type = value;
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