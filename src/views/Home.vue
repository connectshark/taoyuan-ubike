<template>
  <div id="home">
    <nearby/>
    <l-map
      ref="myMap"
      :zoom="zoom"
      :center="center"
      :options="options"
      style="height: 100%;">
      <!-- 載入圖資 -->
      <l-tile-layer :url="url" :attribution="attribution" />

      <!-- 自己所在位置 -->
      <l-marker ref="location" :lat-lng="center">
        <l-popup>
          你的位置
        </l-popup>
      </l-marker>
      <!-- 創建標記點 -->
      <v-marker-cluster>
        <l-marker :lat-lng="item.local" v-for="item in formateData" :key="item.id">
          <l-icon
            :icon-url="urlHandler(item.id)"
            :shadow-url="icon.shadowUrl"
            :icon-size="icon.iconSize"
            :icon-anchor="icon.iconAnchor"
            :popup-anchor="icon.popupAnchor"
            :shadow-size="icon.shadowSize"
          />
          <l-popup :options="popUpOptions">
            <popUp
              :id="item.id"
              :title="item.name"
              :seat="item.bemp"
              :bike="item.sbi"/>
          </l-popup>
        </l-marker>
      </v-marker-cluster>
    </l-map>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import popUp from '../components/popUp'
import nearby from '../components/nearby'

export default {
  name: 'home',
  components: {
    popUp,
    nearby
  },
  data () {
    return {
      zoom: 15,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: "© <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors",
      options: {
        zoomControl: false
      },
      icon: {
        type: {
          black:
            'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
          gold:
            'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png'
        },
        shadowUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      },
      popUpOptions: {
        maxWidth: 150
      }
    }
  },
  computed: {
    ...mapGetters(['formateData']),
    ...mapState(['favList', 'center'])
  },
  methods: {
    urlHandler (id) {
      return this.favList.indexOf(id) === -1 ? this.icon.type.black : this.icon.type.gold
    }
  },
  mounted () {
    // 等地圖創建後執行
    this.$nextTick(() => {
      // 獲得目前位置
      navigator.geolocation.getCurrentPosition(position => {
        const p = position.coords
        this.$store.commit('modifyCenter', [p.latitude, p.longitude])
        this.$refs.location.mapObject.openPopup()
      })
    })
  }
}
</script>

<style lang="scss" scoped>
#home{
  height: 100%;
}
</style>
