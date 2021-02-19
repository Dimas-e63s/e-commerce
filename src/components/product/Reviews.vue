<template>
  <div class="bg-gray-200 pt-6 px-6 mb-20">
    <h3 class="mb-6">1 review</h3>
    <div class="flex mb-14">
      <div class="bg-gray-900 w-24 h-20 inline-block"></div>
      <div class="inline-block ml-4 bg-white p-6 w-full">
        <div class="flex align-center mb-4">
          <div class="inline-block  align-middle">
            <star-rating :star-size="13" :show-rating="false"  v-model:rating="rating"/>
          </div>
          <span class="italic">Jun 3, 2017</span>
        </div>
        <h3 class="mb-2 font-poppins">John Green</h3>
        <p class="font-poppins text-sm">This will go great with my Hoodie that I ordered a few weeks ago</p>
      </div>
    </div>
    <div style="width: 50rem;" class="pb-10">
      <h3 class=" tracking-wide font-poppins text-base">Add a review</h3>
      <app-dynamic-form
        :schema="reviewSchema"
        class="flex flex-row mb-4"
      />
      <h3 class="inline-block tracking-wide font-poppins text-base">Your review:</h3>
      <h3 class="inline-block tracking-wide font-poppins text-base ml-36 mb-4">Your rating: </h3>
      <div class="inline-block mr-2">
        <star-rating :star-size="16" :show-rating="false"  max-rating="1" :v-model:rating="1"/>
      </div>
      <div class="inline-block mr-2">
        <star-rating :star-size="16" :show-rating="false" :max-rating="2" :v-model:rating="2"/>
      </div>
      <div class="inline-block mr-2">
        <star-rating :star-size="16" :show-rating="false" :max-rating="3" :v-model:rating="3"/>
      </div>
      <div class="inline-block mr-2">
        <star-rating :star-size="16" :show-rating="false" :max-rating="4" :v-model:rating="4"/>
      </div>
      <div class="inline-block mr-2">
        <star-rating :star-size="16" border-color="#fada5e" :show-rating="false" :v-model:rating="5" :max-rating="5"/>
      </div>
      <textarea name="" id="" class="w-full h-36 mb-4"></textarea>
      <button class="h-8 w-28 text-base text-center bg-green-500 text-white uppercase">Submit</button>
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
