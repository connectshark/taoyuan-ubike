<template>
  <div id="nearby" :class="{active: checkLength}">
    <nav class="nav">
      <p class="title">最愛站點</p>
      <p class="nav-detail">可停車數</p>
      <p class="nav-detail">可租借數</p>
    </nav>
    <ul class="body">
      <li class="stop"
        v-for="item in filterFavList"
        :key="item.id">
        <div class="name" @click.stop="focusStop(item)">
          <p>{{item.name}}</p>
        </div>
        <div class="empty">
          <p>{{item.bemp}}</p>
        </div>
        <div class="bike">
          <p>{{item.sbi}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'nearby',
  props: {
    map: {
      type: Object
    }
  },
  computed: {
    ...mapGetters(['filterFavList']),
    checkLength () {
      return this.filterFavList.length > 0
    }
  },
  methods: {
    focusStop (stop) {
      this.map.panTo(stop.local)
    }
  }
}
</script>

<style lang="scss" scoped>
#nearby{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 32px;
  background-color: #fff;
  z-index: 401;
  border-radius: 5px 5px 0px 0px;
  background-color: #e6d1b1;
  transition: height .3s;
  .nav{
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    background-color: #ffe4b8;
    padding: 10px 0;
    .title{
      padding: 0 15px;
      width: 60%;
      @include text(12px, bolder);
    }
    .nav-detail{
      @include text(12px, bolder);
      text-align: center;
      width: 20%;
    }
  }
  .body{
    height: calc(100% - 32px);
    overflow-y: auto;
    -ms-overflow-style: none;
    &::-webkit-scrollbar{
      display: none;
    }
    .stop{
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: center;
      padding: 10px 0;
      .name{
        text-align: left;
        width: 60%;
        padding: 0 15px;
        p{
          cursor: pointer;
          @include text(24px, bolder);
        }
      }
      .empty, .bike{
        text-align: center;
        width: 20%;
        p{
          @include text(30px, bolder);
        }
      }
    }
  }
  @include desktops-width{
    bottom: 15px;
    left: 15px;
    height: 100%;
    max-width: 300px;
    max-height: 400px;
  }
}
#nearby.active{
  height: 150px;
  @include desktops-width{
    height: 100%;
  }
}
</style>
