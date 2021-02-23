<template>
  <div class="review">
    <div class="review__image"></div>
    <div class="review__body">
      <div class="review__info">
        <Rating v-model="review.rating" readonly />
        <span class="review__date">{{ review.date }}</span>
      </div>
      <h3 class="review__title">{{ review.name }}</h3>
      <p class="review__text">
        {{ review.review }}
      </p>
    </div>
  </div>
</template>

<script>
import Rating from '@/components/ui/Rating.vue';
export default {
  components: {
    Rating
  },
  props: {
    review: {
      type: Object,
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/_variables';
.review {
  display: flex;
  margin-bottom: 3.5rem;

  &__image {
    display: inline-block;
    background: #111827;
    width: 4rem;
    height: 3rem;
    @media (min-width: $breakpoint-tablet) {
      width: 6rem;
      height: 5rem;
    }
  }

  &__body {
    display: inline-block;
    width: 100%;
    margin-left: 1rem;
    padding: 1.5rem;
    background: #fff;
    font-family: 'Poppins', sans-serif;
  }

  &__text {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  &__date {
    font-style: italic;
    display: inline-block;
    margin-left: 1rem;
  }

  &__info {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1rem;
  }
}
</style>
