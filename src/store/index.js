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
        clickedPostId: null,
        admin: false

       }),
      mutations: { 
        [Mutations.READ_POST](state, payload){
          state.postList = payload
          console.log('list created and fetched')
        },
        [Mutations.UPDATE_CLICKED_ID](state, payload){
          state.clickedPostId = payload
        },
        [Mutations.UPDATE_ADMIN_STATUS](state, payload){
          state.admin = payload
        },

       },
      actions: { 
        async createPost(context, payload){
          await API.createPost(payload)
        },
        async readPost({commit}){
          console.log('fetch request sent')
          const data = await API.readPost()
          commit(Mutations.READ_POST, data)
          // commit(Mutations.UPDATE_LOCAL_STORAGE, data)
          localStorage.setItem('blogList', JSON.stringify(data))
          
        },

        async updatePost(context, payload){
          await API.updatePost(payload)
        },

        async deletePost(context, payload){
          await API.deletePost(payload)

        },
        updateClickedId(context, payload){
          context.commit(Mutations.UPDATE_CLICKED_ID, payload)
        },
        updateAdminStatus(context, payload){
          context.commit(Mutations.UPDATE_ADMIN_STATUS, payload)
        }

       },
      getters: { 
        getPostList: state => state.postList,
        getSinglePost: state => state.postList.find(post => post._id == state.clickedPostId),
        getAdminStatus: state => state.admin,
        //getSinglePost: state => payload => state.postList.find(post => post._id == payload)
        
        
       }
    }
  }
})
