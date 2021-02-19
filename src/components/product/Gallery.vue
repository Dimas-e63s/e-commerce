<template>
  <div>
    <div class="product-image">
      <img :src="currentImg">
    </div>
    <div class="product-gallery">
    <div class="img-controll" @click="prevImg">
      <font-awesome-icon :icon="['fas', 'angle-double-left']" size="sm"/>
      </div>
      <img 
        v-for="(img, idx) in images"
        :key="idx"
        :src="img"
        @click="currentIdx = idx"
      >
      <div class="img-controll" @click="nextImg">
        <font-awesome-icon :icon="['fas', 'angle-double-right']" size="sm"/>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
export default {
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const currentIdx = ref(0)
    const currentImg = computed(() => props.images[currentIdx.value])

    const nextImg = () => {
      const theLast = props.images.length - 1

      if (currentIdx.value === theLast) {
        currentIdx.value = 0
      } else {
        currentIdx.value++
      }
    }

    const prevImg = () => {
      const theFirst = 0
      const theLast = props.images.length - 1
      
      if (currentIdx.value === theFirst) {
        currentIdx.value =  theLast
      } else {
        currentIdx.value--
      }
    }

    return {
      currentImg,
      currentIdx,
      nextImg,
      prevImg
    }
  }        
}
</script>

<style scoped>
.img-controll {
  padding: .5rem;
  color: #fff;
  display: inline-block;
  height: inherit;
  background:  #3cb878;
  line-height: 130px;
  font-size: 1rem;
}
</style>