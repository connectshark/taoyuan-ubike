import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ubike: {}
  },
  mutations: {
    setData (state, data) {
      state.ubike = data
    }
  },
  actions: {
    init ({ commit }) {
      fetch(process.env.VUE_APP_URL)
        .then(res => res.json())
        .then(data => {
          commit('setData', data.result)
        })
    }
  },
  getters: {
    formateData (state) {
      return state.ubike.records === undefined ? [] : state.ubike.records.map(item => {
        return {
          id: item._id,
          name: item.ar,
          local: [item.lat, item.lng],
          sbi: parseInt(item.sbi),
          bemp: parseInt(item.bemp)
        }
      })
    }
  }
})
