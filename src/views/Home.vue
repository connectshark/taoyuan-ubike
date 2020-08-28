<template>
  <div id="home">
    <l-map
      ref="myMap"
      :zoom="zoom"
      :center="center"
      :options="options"
      style="height: 100vh;">
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
            :icon-url="item.name === '夢時代購物中心' ? icon.type.gold : icon.type.black"
            :shadow-url="icon.shadowUrl"
            :icon-size="icon.iconSize"
            :icon-anchor="icon.iconAnchor"
            :popup-anchor="icon.popupAnchor"
            :shadow-size="icon.shadowSize"
          />
          <l-popup>
            <popUp
              :title="item.name"
              :seat="item.bemp"
              :bike="item.sbi"/>
          </l-popup>
        </l-marker>
      </v-marker-cluster>
      <l-control-zoom position="bottomright"></l-control-zoom>
      <l-control-scale
        position="bottomleft"
        :imperial="true"
        :metric="false"></l-control-scale>
    </l-map>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { LControlZoom, LControlScale } from 'vue2-leaflet'
import popUp from '../components/popUp'
export default {
  name: 'home',
  components: {
    LControlZoom,
    LControlScale,
    popUp
  },
  data () {
    return {
      zoom: 15,
      center: [24.993977, 121.301644],
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
      }
    }
  },
  computed: {
    ...mapGetters(['formateData'])
  },
  mounted () {
    // 等地圖創建後執行
    this.$nextTick(() => {
      // 獲得目前位置
      navigator.geolocation.getCurrentPosition(position => {
        const p = position.coords
        // 將中心點設為目前的位置
        this.center = [p.latitude, p.longitude]
        // 將目前的位置的標記點彈跳視窗打開
        this.$refs.location.mapObject.openPopup()
      })
    })
  }
}
</script>
