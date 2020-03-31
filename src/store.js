import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
export const store = new Vuex.Store({

    state:{
        token:localStorage.getItem('access_token') || null,

    },
    getters:{
        loggedIn(state){
        
            if(state.token!==null)
            return 1
            else
            return 0
            
            //return state.token!==null
            
            
          }

    },
    mutations:{
        retrieveToken(state, token) {
            state.token = token
          },
          destroyToken(state) {
            state.token = null
          },

    },
    actions:{
        destroyToken(context) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      
            if (context.getters.loggedIn) {
              return new Promise((resolve, reject) => {
                axios.post('/logout')
                  .then(response => {
                    localStorage.removeItem('access_token')
                    context.commit('destroyToken')
                    resolve(response)
                    // console.log(response);
                    // context.commit('addTodo', response.data)
                  })
                  .catch(error => {
                    localStorage.removeItem('access_token')
                    context.commit('destroyToken')
                    reject(error)
                  })
              })
            }
          },
          retrieveToken(context, credentials) {
      
            return new Promise((resolve, reject) => {
              axios.post('/login', {
                username: credentials.username,
                password: credentials.password,
              })
                .then(response => {
                  const token = response.data.access_token
      
                  localStorage.setItem('access_token', token)
                  context.commit('retrieveToken', token)
                  resolve(response)
                  // console.log(response);
                  // context.commit('addTodo', response.data)
                })
                .catch(error => {
                  console.log(error)
                  reject(error)
                })
              })
          },

    }
}) 