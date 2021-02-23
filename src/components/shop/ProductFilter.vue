<template>
  <div class="products-filter">
    <div class="form-control">
      <input
        type="text"
        placeholder="Search..."
        v-model="search"
        ref="input"
        @blur="$store.commit('blur')"
      />
      <span class="form-control-clear" @click="search = ''">&times;</span>
    </div>
    <div class="categories">
      <h5 class="categories__title font-poppins">Categories</h5>
      <ul class="categories__list">
        <li class="categories__item font-roboto" @click="selectedCategory = ''">
          All
        </li>
        <li
          class="categories__item font-roboto"
          v-for="opt in categories"
          :key="opt.id"
          @click="setCategory(opt.type)"
        >
          {{ opt.title }}
        </li>
      </ul>
    </div>
    <div class="price-filter">
      <h5 class="price-filter__title font-poppins">Price filter</h5>
      <vue-slider
        v-model="priceRange"
        :min="10"
        :max="3000"
        tooltip="'none'"
        :enable-cross="false"
        order
      ></vue-slider>
      <div class="product-filter__range">
        <div class="product-filter__price">
          <p>${{ priceRange[0] }}</p>
        </div>
        <div class="product-filter__price product-filter__price--right">
          <p>${{ priceRange[1] }}</p>
        </div>
        <div class="product-filter__button">
          <AppLink
            :prefix="searchSchema.prefix"
            :link="searchSchema"
            @click.prevent="setPriceFilter"
            class="product-filter__icon"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';
import { searchSchema } from '@/utils/schemes.js';
import AppLink from '@/components/ui/AppLink.vue';
export default {
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    categories: {
      type: Array,
      required: true
    }
  },
  components: {
    VueSlider,
    AppLink
  },
  setup(props, { emit }) {
    const store = useStore();
    const input = ref(null);
    const hasFocus = computed(() => store.getters.hasFocus);

    const selectedCategory = ref(props.modelValue.category || '');
    const setCategory = val => (selectedCategory.value = val);

    const search = ref(props.modelValue.search || '');
    const priceRange = ref([10, 3000]);
    const price = ref(null);
    const setPriceFilter = () => (price.value = priceRange.value);

    watch(hasFocus, val => {
      val ? input.value.focus() : input.value.blur();
    });

    watch([search, selectedCategory, price], val => {
      emit('update:modelValue', {
        search: val[0],
        category: val[1],
        price: val[2]
      });
    });

    return {
      setCategory,
      search,
      selectedCategory,
      priceRange,
      searchSchema,
      setPriceFilter,
      input
    };
  }
};
</script>

<style lang="scss" scoped>
@import '@/_variables';
.products-filter {
  display: none;
  padding: 1rem;
  border-right: 0.0625rem solid #ccc;
  @media (min-width: $breakpoint-tablet) {
    display: block;
    width: 15.6rem;
    // flex-direction: column;
  }
}

.categories {
  margin-top: 2rem;
  border-top-width: 0.0625rem;

  &__title {
    margin-top: 1rem;
    text-transform: uppercase;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0.5rem;
    overflow: hidden;

    text-decoration: underline;
    text-overflow: ellipsis;
    white-space: nowrap;

    transition: 0.22s all;

    &:hover {
      background: #eee;
      cursor: pointer;
    }
  }

  &__list {
    padding-top: 1rem;
  }
}

.price-filter {
  border-top-width: 0.0625rem;
  border-bottom-width: 0.0625rem;
  margin-top: 1rem;
  padding: 2rem 0;

  &__title {
    text-transform: uppercase;
    margin-bottom: 1.5rem;
    letter-spacing: 0.025em;
  }
}

.product-filter {
  &__range {
    display: flex;
    flex-direction: row;
    margin-top: 2rem;
  }

  &__button {
    background-color: #10b981;
    height: 2rem;
    width: 2rem;
    margin-left: 1rem;
  }

  &__icon {
    display: inline-block;
    height: inherit;
    width: inherit;
    color: #fff;
    line-height: 2rem;
    text-align: center;
  }

  &__price {
    width: 4rem;
    height: 2rem;
    border-width: 0.0625rem;
    text-align: center;

    &--right {
      margin-left: 1rem;
    }
  }
}
</style>
