<template>
  <div class="b">
    <el-container>
      <!-- <el-header height="30px" class="head">
        <el-row>
          <el-col :span="24">
            <p>欢迎来到登陆页面</p>
          </el-col>
        </el-row>
      </el-header> -->
      <el-main class="m">
        <el-row>
          <el-col :span="6" :offset="12" class="l">
            <h1>用户登陆</h1>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="9">
            <el-form :model="loginInf" ref="loginInf" label-width="80px" :rules="rules">
              <el-form-item label prop="username">
                <el-input v-model="loginInf.username" placeholder="登陆用户名">
                  <template slot="prepend">
                    <i class="el-icon-s-custom"></i>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item label prop="password">
                <el-input v-model="loginInf.password" placeholder="密码" show-password>
                  <template slot="prepend">
                    <i class="el-icon-lock"></i>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item label>
                <el-radio v-model="role" label="member">
                  <span class="t">工作人员</span>
                </el-radio>
                <el-radio v-model="role" label="customer">
                  <span class="t">客户</span>
                </el-radio>
              </el-form-item>
              <!-- <el-form-item>
                <el-button type="primary" @click="onSubmit">登陆</el-button>
              </el-form-item>-->
            </el-form>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" :offset="12">
            <el-button type="primary" @click="onSubmit">登陆</el-button>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// import Background from "@/assets/loginbg3.png";
export default {
  data() {
    return {
      //   Background: Background,
      loginInf: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      role: "",
      imgUrl: "../static/img/star.jpg"
    };
  },
  methods: {
    onSubmit() {
      if (this.loginInf.username == "" || this.loginInf.password == "") {
        alert("账号或密码不能为空");
        return;
      }
      if (this.role == "member" && this.role !== "") {
        let pro = this.$store.dispatch("login", this.loginInf);
        pro
          .then(result => {
            console.log(result);
            this.$router.push("/");
          })
          .catch(error => {
            console.log(error);
            alert("账号或密码错误");
          });
      } else if (this.role == "") {
        alert("请选择登陆角色");
      } else if (this.role == "customer") {
        alert("客户无法登陆");
      }

      // 分发action

      // this.$refs.loginInf.validate(valid => {
      //   if (valid) {
      //     alert("登陆成功");
      //     return
      //   } else {
      //     alert('账号或密码错误')
      //     return;
      //   }
      // });
    }
  }
};
</script>

<style scoped>
/* .img {
  background: url("~@/assets/loginbg3.png");
} */
.head {
  background-color: aqua;
}
.l {
  margin-bottom: 20px;
}
.b {
  background-image: url("../../static/img/star.jpg");
  height: 937px;
}
.m {
  position: relative;
  top: 250px;
}
.t{
  color: goldenrod;
  font-size: 16px;
  font-weight: bold

}
</style>