<template>
  <div class="product-gallery">
    <div class="product-image">
      <img :src="currentImg" alt="Main image" />
    </div>
    <div class="product-gallery__thumbnail">
      <div class="img-controll" @click="prevImg">
        <font-awesome-icon :icon="['fas', 'angle-double-left']" size="sm" />
      </div>
      <img
        v-for="(img, idx) in images"
        :key="idx"
        :src="img"
        alt="image gallery"
        :class="[
          'product-gallery__img',
          { 'product-gallery__img--active': currentIdx === idx }
        ]"
        @click="currentIdx = idx"
      />
      <div class="img-controll" @click="nextImg">
        <font-awesome-icon :icon="['fas', 'angle-double-right']" size="sm" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
export default {
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const currentIdx = ref(0);
    const currentImg = computed(() => props.images[currentIdx.value]);

    const nextImg = () => {
      const theLast = props.images.length - 1;

      if (currentIdx.value === theLast) {
        currentIdx.value = 0;
      } else {
        currentIdx.value++;
      }
    };

    const prevImg = () => {
      const theFirst = 0;
      const theLast = props.images.length - 1;

      if (currentIdx.value === theFirst) {
        currentIdx.value = theLast;
      } else {
        currentIdx.value--;
      }
    };

    return {
      currentImg,
      currentIdx,
      nextImg,
      prevImg
    };
  }
};
</script>

<style lang="scss" scoped>
@import '@/_variables';
.img-controll {
  display: inline-block;
  height: inherit;
  padding: 0.5rem;
  color: #fff;
  background: #3cb878;
  line-height: 130px;
  font-size: 1rem;
  cursor: pointer;
}

.product-gallery {
  @media (min-width: $breakpoint-tablet) {
    width: 28rem;
    max-width: 60%;
  }
}

.product-image {
  max-height: 100%;
  @media (min-width: $breakpoint-tablet) {
    height: 37.5rem;
  }
}

.product-gallery__thumbnail {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccc;
  height: 9.2rem;
  margin-top: 1rem;
  @media (min-width: $breakpoint-tablet) {
    margin-top: 0;
  }
}

.product-gallery__img {
  width: 6.4rem;
  height: 8rem;
}

.product-gallery__img:hover,
.product-gallery__img--active {
  cursor: pointer;
  border: 1px solid #106de1;
}
</style>
