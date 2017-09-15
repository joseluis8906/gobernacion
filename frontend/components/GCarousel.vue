<template lang="pug">
v-container(fluid pt-1 pb-0 pl-0 pr-0 id="inicio")
  v-layout(row wrap pt-0 mt-0)
    v-flex(xs12)
      div(v-swiper:mySwiper="swiperOption")
         div(class="swiper-wrapper")
           div( class="swiper-slide" v-for="(item, i) in items" v-bind:key="i" )
             div(class="g-slide" :style="item.style")
                v-btn(class="especial-btn orange white--text") Visitanos
                  v-icon(right dark) record_voice_over

</template>

<script>
export default {
data () {
  return {
    items: [
      {
        style: {'background-image': "url('/banner.png')"}
      },
    ],
    swiperOption: {
      autoplay: 5000,
      autoplayDisableOnInteraction: false,
      speed: 1000,
      loop: true,
      effect: 'fade'
    }
  }
}
}
</script>

<style lang="stylus" scoped>
.especial-btn
  margin-top 17%
  margin-left 35%

.my-swiper
  height 512px;
  width 100%;

.swiper-slide
  text-align center
  display flex
  justify-content center
  align-items center
  height 100%

.g-slide
  width 100%
  min-height 800px
  background-color black
  background-size 100%
  background-position top
</style>
