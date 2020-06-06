<template>
  <el-main>
    <el-row>
      <el-col :span="24" class="t">
        <span>位置:</span>
        <span>采购管理&gt;</span>
        <span>添加采购单</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <el-button type="primary" @click="confirm">确定</el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table border :data="pro">
          <el-table-column label="选择">
            <template slot-scope="scope">
              <el-radio v-model="radio" :label="scope.$index" @change="sel(scope.row)">&nbsp;</el-radio>
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
      pro: [],
      radio: "",
      codeData:''
    };
  },
  methods: {
    confirm() {
        this.$router.push('/addneworder')
    },
    cancel() {},
    sel(row){
    //  console.log(row)
     this.codeData=row
     console.log(this.codeData)
    this.$store.commit('dataSave',this.codeData)
    }
  },
  created() {
    axios({
      url: "/api/main/sell/product/show ",
      method: "get"
    })
      .then(res => {
        this.pro = res.data.list;
        // console.log(this.pro);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style  scoped>
</style>