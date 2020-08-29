<template>
  <div class="pop-up">
    <p class="header">
      <span
        class="material-icons star"
        :class="{on : isFavSeat}"
        @click.stop="addFavSeat">star_rate</span>{{title}}
    </p>
    <div class="content">
      <div class="seat" title="可還車位數">
        <p class="row"><span class="material-icons">local_parking</span></p>
        <p class="row"><span class="basic-font">{{seat}}</span></p>
      </div>
      <div class="bike" title="可租借數量">
        <p class="row"><span class="material-icons">pedal_bike</span></p>
        <p class="row"><span class="basic-font">{{bike}}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'popUp',
  props: {
    id: {
      type: Number
    },
    title: {
      type: String
    },
    seat: {
      type: Number
    },
    bike: {
      type: Number
    }
  },
  methods: {
    ...mapMutations(['addFavList', 'removeFavList']),
    addFavSeat () {
      this.isFavSeat ? this.removeFavList(this.id) : this.addFavList(this.id)
    }
  },
  computed: {
    ...mapState(['favList']),
    isFavSeat () {
      return this.favList.indexOf(this.id) > -1
    }
  }
}
</script>

<style lang="scss" scoped>
.pop-up{
  p{
    margin: 0;
  }
  .star{
    &:hover{
      cursor: pointer;
    }
  }
  .on{
    color: goldenrod;
  }
  .header{
    @include text(24px, bolder);
    text-align: center;
  }
  .content{
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-around;
    .seat ,.bike{
      width: 50px;
      text-align: center;
      border-radius: 5px;
      padding: 5px;
      border: 1px solid transparent;
      transition: border .2s;
      &:hover{
        border: 1px solid #ccc;
      }
      .basic-font{
        @include text(20px, bolder);
      }
    }
  }
}
</style>
