<template>
  <!-- <div> -->
  <el-main>
    <el-row>
      <el-col :span="24" class="t">
        <span>位置:</span>
        <span>首页</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-image src="../static/img/sun.png"></el-image>
        <span>{{loginUser}}</span>
        <span>早上好，欢迎使用信息管理系统</span>
      </el-col>
      <el-col :span="24">
        <el-image src="../static/img/time.png"></el-image>
        <span>您的登陆时间:</span>
        <span>{{time}}</span>
      </el-col>
    </el-row>
  </el-main>
  <!-- </div> -->
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      time: new Date().toLocaleString()
    };
  },
  computed: {
    ...mapState(["loginUser"])
  },
  mounted() {}
};
</script>

<style scoped>
.t {
  background-color: #edf6fa;
}
</style>