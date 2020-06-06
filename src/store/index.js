import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Cookies from 'js-cookie'

const qs = require('querystring')
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loginUser: Cookies.get('loginUser'),
        token: Cookies.get('token'),
        registUser: '',
        data: ''
    },
    mutations: {
        setLogin(state, payload) {
            state.loginUser = payload
        },
        setToken(state, payload) {
            state.token = payload
        },
        dataSave(state, payload) {
            state.data = payload
        }
    },

    actions: {
        login({ commit }, payload) {
            return new Promise((resolve, reject) => {
                axios({
                    url: '/api/sys/login',
                    method: 'post',
                    data: qs.stringify(payload)
                }).then(resp => {
                    // console.log(resp)
                    let result = resp.data
                    if (result.code === 2) {
                        commit('setLogin', result.data.user.account)
                        commit('setToken', result.data.token)

                        Cookies.set('loginUser', result.data.user.account)
                        Cookies.set('token', result.data.token)

                        resolve(result.data)
                    } else {
                        reject(result.message)
                    }
                }).catch(error => {
                    console.log(error)
                    reject(error)
                })
            })
        },
        logout({ commit }, payload) {
            return new Promise((resolve, reject) => {
                axios({
                    url: '/api/sys/logout',
                    method: 'get',
                    data: qs.stringify(payload)
                }).then(resp => {
                    // console.log(resp)
                    let result = resp.data
                    if (result.code === 2) {
                        Cookies.remove('loginUser')
                        Cookies.remove('token')
                        resolve(result.data)
                    } else {
                        reject(result.message)
                    }
                }).catch(error => {
                    console.log(error)
                    reject(error)
                })
            })
        }

    }

})