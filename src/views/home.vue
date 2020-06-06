<template>
  <div>
    <el-container>
      <el-header height="100px" class="head">
        <el-row>
          <el-col :span="2" class="img">
            <!-- <el-image src="../static/img/scm.jpg" style="width: 80px; height: 80px"></el-image> -->
          </el-col>
          <el-col :span="17" class="h">
            <h2>信息管理系统界面</h2>
          </el-col>
          <el-col :span="5" class="t">
            <i class="el-icon-user-solid">{{loginUser}}</i>
            <i class="el-icon-time">系统时间:</i>
            <span>{{time}}</span>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="220px">
          <el-row>
            <el-col :span="24">
              <el-menu
                active-text-color="#ffd04b"
                background-color="#D4E7F0"
                text-color="blue"
                :default-active="$route.path"
                :unique-opened="true"
                router
              >
                <!-- <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>菜单管理</span>
                </template>-->
                <el-menu-item-group>
                  <el-submenu index="1-1">
                    <template slot="title">
                      <i class="el-icon-s-custom"></i> 管理信息
                    </template>
                    <el-menu-item index="/head">首页</el-menu-item>
                    <el-menu-item index="/user">用户管理</el-menu-item>
                    <el-menu-item index="1-1-3" @click="logout">登出</el-menu-item>
                  </el-submenu>
                  <el-submenu index="1-2">
                    <template slot="title">
                      <i class="el-icon-s-goods"></i> 产品管理
                    </template>
                    <el-menu-item index="/proclass">产品分类列表</el-menu-item>
                    <el-menu-item index="/prolist">产品列表</el-menu-item>
                  </el-submenu>
                  <el-submenu index="1-3">
                    <template slot="title">
                      <i class="el-icon-shopping-cart-2"></i> 采购管理
                    </template>
                    <el-menu-item index="/supplier">供应商管理</el-menu-item>
                    <el-menu-item index="/neworder">新添采购单</el-menu-item>
                    <el-menu-item index="/orderEnd">采购单了结</el-menu-item>
                    <el-menu-item index="/searchOrder">采购单查询</el-menu-item>
                  </el-submenu>
                  <el-submenu index="1-4">
                    <template slot="title">
                      <i class="el-icon-house"></i> 仓管管理
                    </template>
                    <el-menu-item index="/stockin">入库登记</el-menu-item>
                    <el-menu-item index="/stockout">出库登记</el-menu-item>
                    <el-menu-item index="/stockSearch">库存查询</el-menu-item>
                    <el-menu-item index="/stockCheck">库存盘点</el-menu-item>
                  </el-submenu>
                  <el-submenu index="1-15">
                    <template slot="title">
                      <i class="el-icon-sell"></i> 销售管理
                    </template>
                    <el-menu-item index="/customer">客户管理</el-menu-item>
                    <el-menu-item index="/newSale">新添销售单</el-menu-item>
                    <el-menu-item index="/saleEnd">销售单了结</el-menu-item>
                    <el-menu-item index="/saleSearch">销售单查询</el-menu-item>
                  </el-submenu>
                  <el-submenu index="1-6">
                    <template slot="title">
                      <i class="el-icon-s-check"></i> 财务收支
                    </template>
                    <el-menu-item index="/receipt">收款登记</el-menu-item>
                    <el-menu-item index="/pay">付款登记</el-menu-item>
                    <el-menu-item index="/billSearch">收支查询</el-menu-item>
                  </el-submenu>
                  <el-submenu index="1-7">
                    <template slot="title">
                      <i class="el-icon-document"></i> 月度报表
                    </template>
                    <el-menu-item index="/purchase">月度采购报表</el-menu-item>
                    <el-menu-item index="/sell">月度销售报表</el-menu-item>
                    <el-menu-item index="/stockOutRep">月度出库报表</el-menu-item>
                    <el-menu-item index="/stockInRep">月度入库报表</el-menu-item>
                    <el-menu-item index="/stock">月度库存报表</el-menu-item>
                    <el-menu-item index="/inEx">月度收支报表</el-menu-item>
                  </el-submenu>
                </el-menu-item-group>
                <!-- </el-submenu> -->
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
// import func from "../../vue-temp/vue-editor-bridge";
export default {
  data() {
    return {
      time: "",
      loginInf: {
        username: "",
        password: ""
      }
      // curActive: "/head"
    };
  },
  computed: {
    ...mapState(["loginUser"])
  },
  created() {
    this.getTime();
  },
  methods: {
    getTime() {
      let now = new Date();
      this.time = now.toLocaleString();
      setTimeout(this.getTime, 1000);
    },
    logout() {
      let pro = this.$store.dispatch("logout", this.loginInf);
      pro
        .then(result => {
          console.log(result);
          this.$router.push("/login");
        })
        .catch(error => {
          console.log(error);
        });
    }
  },

  mounted() {
    this.curActive = window.location.pathname;
  }
};
</script>

<style scoped>
* {
  padding: 0px;
  margin: 0px;
}
.head {
  background-image: url("../../static/img/nav3.jpg");
}
.img {
  padding-top: 10px;
  padding-left: 20px;
}
.h {
  position: relative;
  top: 30px;
}
.t {
  position: relative;
  top: 50px;
}
.t i {
  color: aqua;
}
.t span {
  color: aqua;
}
</style>