<template>
  <div class="review-container">
    <h3 class="review__amount" v-if="reviews">{{ reviewsTotal }} review</h3>
    <Review v-for="review in reviews" :review="review" />
    <div class="review-form">
      <h3 class="review-form__title">Add a review</h3>
      <form @submit.prevent="onSubmit">
        <div class="review-form__flex-wrapper">
          <app-input
            aria-label="name field"
            v-model="name"
            :error="nameMessage"
            placeholder="Your name..."
            v-on="nameListeners"
            containerClass="review-form__input"
          />
          <app-input
            aria-label="email field"
            v-model="email"
            :error="emailMessage"
            placeholder="Your email..."
            v-on="emailListeners"
            containerClass="review-form__input review-form__input--last"
          />
        </div>
        <div class="review-form__title-wrapper">
          <h3 class="review-form__title">Your review:</h3>
          <h3 class="review-form__title review-form__title--right">
            Your rating:
          </h3>
          <div class="review-form__rating">
            <Rating v-model="rating" size="1rem" />
          </div>
        </div>
        <textarea
          aria-label="review text"
          class="review-form__textarea"
          v-model="review"
        ></textarea>
        <button class="button button--success" :disabled="isSubmitting">
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Review from '@/components/product/Review.vue';
import { ref, computed } from 'vue';
import { useReviewForm } from '@/use/reviewForm.js';
import AppInput from '@/components/ui/AppInput.vue';
import { useRoute } from 'vue-router';
import Rating from '@/components/ui/Rating.vue';
export default {
  components: {
    Review,
    AppInput,
    Rating
  },
  props: {
    reviews: {
      type: Object,
      required: false
    }
  },
  setup(props) {
    const rating = ref(4);
    const route = useRoute();
    const { id } = route.params;
    const {
      isSubmitting,
      email,
      emailMessage,
      emailListeners,
      name,
      nameMessage,
      nameListeners,
      review,
      reviewMessage,
      reviewListeners,
      onSubmit
    } = useReviewForm(id, rating);
    const reviewsTotal = computed(() => Object.keys(props.reviews).length);
    return {
      rating,
      isSubmitting,
      email,
      emailMessage,
      emailListeners,
      name,
      nameMessage,
      nameListeners,
      review,
      reviewMessage,
      reviewListeners,
      onSubmit,
      reviewsTotal
    };
  }
};
</script>

<style lang="scss" scoped>
@import '@/_variables';
.review-container {
  padding: 0 1.5rem;
  padding-top: 1.5rem;
  margin-bottom: 5rem;
  background: #e5e7eb;
}

.review {
  display: flex;
  margin-bottom: 3.5rem;

  &__amount {
    margin-bottom: 1.5rem;
  }

  &__image {
    display: inline-block;
    width: 6rem;
    height: 5rem;
    background: #111827;
  }

  &__body {
    display: inline-block;
    width: 100%;
    margin-left: 1rem;
    padding: 1.5rem;
    background: #fff;
    font-family: 'Poppins', sans-serif;
  }

  &__author {
    margin-bottom: 0.5rem;
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

.review-form {
  padding-bottom: 2.5rem;
  @media (min-width: $breakpoint-tablet) {
    // width: 50rem;
  }
  &__title {
    display: inline-block;
    letter-spacing: 0.025em;
    font-size: 1rem;
    line-height: 1.5rem;
    font-family: 'Poppins', sans-serif;

    &--right {
      display: inline-block;
      margin-right: 1rem;
      margin-left: 2rem;
    }

    @media (min-width: $breakpoint-tablet) {
      display: inline-block;

      &--right {
        margin-left: 6rem;
        margin-bottom: 1rem;
        margin-right: 1rem;
      }
    }
  }

  &__title-wrapper {
    display: flex;
    justify-content: space-between;
    @media (min-width: $breakpoint-tablet) {
      display: block;
    }
  }

  &__rating {
    display: inline-block;
    margin-right: 0.5rem;
  }

  &__textarea {
    width: 100%;
    height: 6rem;
    margin: 1rem 0;
  }

  &__flex-wrapper {
    display: flex;
    flex-direction: column;

    @media (min-width: $breakpoint-tablet) {
      flex-direction: row;
    }
  }

  &__input {
    @media (min-width: $breakpoint-tablet) {
      width: 50%;

      &--last {
        margin-left: 1rem;
      }
    }
  }
}
</style>
