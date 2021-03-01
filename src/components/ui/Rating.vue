<template>
  <div class="rating" :data-total-value="modelValue">
    <div
      v-for="num in 5"
      :key="num"
      :style="{ fontSize: size }"
      :class="['rating__item', { 'rating__item--readonly': readonly }]"
      @click="clickHandler($event, num)"
    >
      ★
    </div>
  </div>
</template>

<script>
export default {
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
      required: true
    },
    readonly: {
      type: Boolean,
      required: false
    },
    size: {
      type: String
    }
  },
  setup(props, { emit }) {
    const ratingMap = {
      5: 1,
      4: 2,
      3: 3,
      2: 4,
      1: 5
    };
    const clickHandler = (_, payload) => {
      if (props.readonly) {
        return null;
      }
      emit('update:modelValue', ratingMap[payload]);
    };

    return {
      clickHandler
    };
  }
};
</script>

<style lang="scss" scoped>
.rating {
  display: inline-flex;
  flex-direction: row-reverse;

  &__item {
    font-size: 0.8rem;
    color: #c0c0c0;
    cursor: pointer;

    &__item:hover,
    &__item:hover ~ &__item {
      color: #9898;
    }

    &--readonly:hover,
    &--readonly:hover ~ &--readonly {
      color: #c0c0c0;
    }
  }

  &[data-total-value='1'] &__item:nth-child(n + 5),
  &[data-total-value='2'] &__item:nth-child(n + 4),
  &[data-total-value='3'] &__item:nth-child(n + 3),
  &[data-total-value='4'] &__item:nth-child(n + 2),
  &[data-total-value='5'] &__item:nth-child(n + 1) {
    color: orange;
  }
}
</style>
