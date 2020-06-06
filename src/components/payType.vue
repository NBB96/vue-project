<template>
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
        <el-button type="text" size="small" @click="end(scope.row)">了结</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
    
}
</script>