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
      if (state.ubike.records === undefined) {
        return [
          { id: 1, name: '夢時代購物中心', local: [22.595153, 120.306923] },
          { id: 2, name: '漢神百貨', local: [22.61942, 120.296386] },
          { id: 3, name: '漢神巨蛋', local: [22.669603, 120.302288] },
          { id: 4, name: '大統百貨', local: [22.630748, 120.318033] }
        ]
      } else {
        return state.ubike.records.map(item => {
          return {
            id: item._id,
            name: item.ar,
            local: [item.lat, item.lng]
          }
        })
      }
    }
  }
})
