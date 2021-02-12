import Vue from 'vue'
import Vuex from 'vuex'
import * as Mutations from './mutationTypes.js'
import * as API from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    blogData:{
      state: () => ({ 
        postList:[],
       }),
      mutations: { 
        [Mutations.UPDATE_POST](state, payload){
          state.postList = payload
        }
       },
      actions: { 
        async createPost(context, payload){
          await API.createPost(payload)
        },
        async readPost({commit}){
          const data = await API.readPost()
          commit(Mutations.UPDATE_POST, data)
        },

        async updatePost(context, payload){
          await API.updatePost(payload)
        },

        async deletePost(context, payload){
          await API.deletePost(payload)

        }
       },
      getters: { 
        getPostList: state => state.postList
       }
    }
  }
})
