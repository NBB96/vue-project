import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import Head from '@/components/head'
import Login from '@/views/login'
import User from '@/components/user'
import Adduser from '@/components/adduser'
import Proclass from '@/product/proclass'
import Addprolist from '@/product/addproclass'
import Prolist from '@/product/prolist'
import Supplier from '@/purchase/supplier'
import Neworder from '@/purchase/neworder'
import Addpro from '@/product/addpro'
import Addsupper from '@/purchase/addsupper'
import Addneworder from '@/purchase/addneworder'
import Selectcode from '@/purchase/selectcode'
import Orderend from '@/purchase/orderEnd'
import Searchorder from '@/purchase/searchOrder'
import Stockin from '@/stock/stockin'
import Stockout from '@/stock/stockout'
import StockSearch from '@/stock/stockSearch'
import StockCheck from '@/stock/stockCheck'
import Customer from '@/sale/customer'
import Addnewsale from '@/sale/addnewSale'
import Newsale from '@/sale/newSale'
import Saleend from '@/sale/saleEnd'
import SaleSearch from '@/sale/saleSearch'
import Receipt from '@/finace/receipt'
import Pay from '@/finace/pay'
import BillSearch from '@/finace/billSearch'
import Purchase from '@/statement/purchase'
import StockOut from '@/statement/stockOut'
import StockIn from '@/statement/stockIn'
import Stock from '@/statement/stock'
import InEx from '@/statement/inEx'
import Sell from '@/statement/sell'


Vue.use(Router)

const router= new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta:{
        requireLogin: true
      },
      children: [
        {
          path: '/head',
          name: 'Head',
          component: Head
        },
        {
          path: '',
          redirect: '/head'
        },
        {
          path: '/user',
          name: 'User',
          component: User,
        },
        {
          path:'/adduser',
          name:'Adduser',
          component:Adduser
        },
        {
          path:'/proclass',
          name:'Proclass',
          component:Proclass
        },
        {
          path:'/addproclass',
          name:'Addpro',
          component:Addprolist
        },
        {
          path:'/prolist',
          name:'Prolist',
          component:Prolist
        },
        {
          path:'/supplier',
          name:'Supplier',
          component:Supplier
        },
        {
          path:'/neworder',
          name:'Neworder',
          component:Neworder
        },
        {
          path:'/addpro',
          name:'Addpro',
          component:Addpro
        },
        {
          path:'/addsupper',
          name:'/Addsupper',
          component:Addsupper
        },
        {
          path:'addneworder',
          name:'Addneworder',
          component:Addneworder
        },
        {
          path:'/selectcode',
          name:'Selectcode',
          component:Selectcode
        },
        {
          path:'/orderEnd',
          name:'/Orderend',
          component:Orderend
        },
        {
          path:'/searchOrder',
          name:'/searchOrder',
          component:Searchorder
        },
        {
          path:'/stockin',
          name:'/stockin',
          component:Stockin
        },
        {
          path:'/stockout',
          name:'stockout',
          component:Stockout
        },
        {
          path:'/stockSearch',
          name:'stockSearch',
          component:StockSearch
        },
        {
          path:'/stockCheck',
          name:'StockCheck',
          component:StockCheck
        },
        {
          path:'/customer',
          name:'customer',
          component:Customer
        },
        {
          path:'/addnewSale',
          name:'addnewSale',
          component:Addnewsale
        },
        {
          path:'/newSale',
          name:'newSale',
          component:Newsale
        },
        {
          path:'/saleEnd',
          name:'saleEnd',
          component:Saleend
        },
        {
          path:'/saleSearch',
          name:'saleSearch',
          component:SaleSearch
        },
        {
          path:'/receipt',
          name:'receipt',
          component:Receipt
        },
        {
          path:'/pay',
          name:'/pay',
          component:Pay
        },
        {
          path:'/billSearch',
          name:'billSearch',
          component:BillSearch
        },
        {
          path:'/purchase',
          name:'purchase',
          component:Purchase
        },
        {
          path:'/sell',
          name:'sell',
          component:Sell
        },
        {
          path:'/stockInRep',
          name:'stockIn',
          component:StockIn
        },
        {
          path:'/stockOutRep',
          name:'stockOut',
          component:StockOut
        },
        {
          path:'/stock',
          name:'stock',
          component:Stock
        },
        {
          path:'/inEx',
          name:'inEx',
          component:InEx
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log('当前正要离开的路由：', from , ', 即将进入的目标：', to);
  // 判断即将进入的目标是否需要登录才能访问（根据路由元信息判断）
  if(to.meta.requireLogin){ // 有requireLogin元信息，则说明需要先登录
    // 判断是否已登录
    let username = Cookies.get('token');
    if(username){ // 登录了
      next();
    }else{ // 未登录
      next('/login')
    }
  }else{ // 如果没有，则不需要先登录，直接进入目录路由
    next();
  }

})

export default router
