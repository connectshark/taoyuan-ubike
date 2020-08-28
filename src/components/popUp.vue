<template>
  <div class="pop-up">
    <p class="header">{{title}}</p>
    <div class="content">
      <div class="seat" title="可還車位數">
        <span class="material-icons">local_parking</span>
        <span class="basic-font">{{seat}}</span>
      </div>
      <div class="bike" title="可租借數量">
        <span class="material-icons">pedal_bike</span>
        <span class="basic-font">{{bike}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'popUp',
  props: {
    title: {
      type: String
    },
    seat: {
      type: Number
    },
    bike: {
      type: Number
    }
  }
}
</script>

<style lang="scss" scoped>
.pop-up{
  .content{
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-around;
    .seat ,.bike{
      width: 25%;
      text-align: center;
      border-radius: 5px;
      padding: 5px;
      border: 1px solid transparent;
      transition: border .2s;
      &:hover{
        border: 1px solid #ccc;
      }
      .basic-font{
        font-size: 20px;
        font-weight: bolder;
      }
    }
  }
}
</style>
