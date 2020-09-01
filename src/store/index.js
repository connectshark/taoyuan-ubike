import Vue from 'vue'
import Vuex from 'vuex'
import { LS } from '../lib/ls'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    center: [24.993977, 121.301644],
    ubike: {},
    favList: []
  },
  mutations: {
    setData (state, data) {
      state.ubike = data
    },
    initFavList (state, data) {
      state.favList = data
    },
    addFavList (state, id) {
      state.favList.push(id)
      LS.save('favList', state.favList)
    },
    removeFavList (state, id) {
      const index = state.favList.indexOf(id)
      state.favList.splice(index, 1)
      LS.save('favList', state.favList)
    },
    modifyCenter (state, arr) {
      state.center = arr
    }
  },
  actions: {
    init ({ commit }) {
      fetch(process.env.VUE_APP_URL)
        .then(res => res.json())
        .then(data => {
          commit('setData', data.result)
        })
      commit('initFavList', LS.load('favList'))
    }
  },
  getters: {
    formateData (state) {
      return state.ubike.records === undefined ? [] : state.ubike.records.map(item => {
        return {
          id: item._id,
          name: item.sna,
          local: [item.lat, item.lng],
          sbi: parseInt(item.sbi),
          bemp: parseInt(item.bemp)
        }
      })
    },
    filterFavList (state, getter) {
      return getter.formateData.filter(item => state.favList.includes(item.id))
    }
  }
})
