<template>
  <div class="review-container">
    <h3 class="review__amount">1 review</h3>
    <div class="review">
      <div class="review__image"></div>
      <div class="review__body">
        <div class="review__info">
          <star-rating :star-size="13" :show-rating="false"  v-model:rating="rating"/>
          <span class="review__date">Jun 3, 2017</span>
        </div>
        <h3 class="review__title">John Green</h3>
        <p class="review__text">This will go great with my Hoodie that I ordered a few weeks ago</p>
      </div>
    </div>
    <div class="review-form">
      <h3 class="review-form__title">Add a review</h3>
      <AppDynamicForm
        class="flex mb-4"
        :schema="reviewSchema"
      />
      <h3 class="review-form__title">Your review:</h3>
      <h3 class="review-form__title">Your rating: </h3>
      <div class="review-form__rating">
        <star-rating :star-size="16" :show-rating="false"  max-rating="1" :v-model:rating="1"/>
      </div>
      <div class="review-form__rating">
        <star-rating :star-size="16" :show-rating="false" :max-rating="2" :v-model:rating="2"/>
      </div>
      <div class="review-form__rating">
        <star-rating :star-size="16" :show-rating="false" :max-rating="3" :v-model:rating="3"/>
      </div>
      <div class="review-form__rating">
        <star-rating :star-size="16" :show-rating="false" :max-rating="4" :v-model:rating="4"/>
      </div>
      <div class="review-form__rating">
        <star-rating :star-size="16" border-color="#fada5e" :show-rating="false" :v-model:rating="5" :max-rating="5"/>
      </div>
      <textarea class="review-form__textarea"></textarea>
      <button class="button button--success">Submit</button>
    </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import AppDynamicForm from '@/components/ui/AppDynamicForm.vue';
import {reviewSchema} from '@/utils/schemes.js'
export default {
  components: {
    StarRating,
    AppDynamicForm
  },    
  data() {
    return {
      rating: 4
    }
  },
  computed: {
    reviewSchema: () => reviewSchema
  }
}
</script>

<style scoped>
.review-container {
  padding: 0 1.5rem;
  padding-top: 1.5rem;
  margin-bottom: 5rem;
  
  background: #E5E7EB;
}

.review__amount {
  margin-bottom: 1.5rem;
}

.review {
  display: flex;
  margin-bottom: 3.5rem;
}

.review__image {
  display: inline-block;

  width: 6rem;
  height: 5rem;

  background: #111827;
}

.review__body {
  display: inline-block;
  width: 100%;

  margin-left: 1rem;
  padding: 1.5rem;
  
  background: #fff;
  font-family: 'Poppins', sans-serif;
}

.review__author {
  margin-bottom: 0.5rem;
}

.review__text {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.review-form {
  width: 50rem;
  padding-bottom: 2.5rem;
}

.review-form__title {
  display: inline-block;

  letter-spacing: 0.025em;
  font-size: 1rem;
  line-height: 1.5rem;
  font-family: 'Poppins', sans-serif;
}

.review-form__title:last-of-type {
  margin-left: 6rem;
  margin-bottom: 1rem;
}

.review-form__test {
  display: flex;
  margin-bottom: 1rem;

  /* flex flex-row mb-4 */
}

.review-form__rating {
  display: inline-block;
  margin-right: 0.5rem;
}

.review-form__textarea {
  width: 100%;
  height: 6rem;

  margin-bottom: 1rem;
}

.review__date {
  font-style: italic;
}

.review__info {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
</style>
