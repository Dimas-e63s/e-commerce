import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import { computed } from 'vue';
import ProductService from '@/services/ProductService.js';
import { formatedDate } from '@/utils/formatDate.js';
import { useStore } from 'vuex';

export function useReviewForm(id, rating) {
  const store = useStore();
  const { handleSubmit, isSubmitting, resetForm } = useForm();

  const {
    value: email,
    errorMessage: emailMessage,
    handleChange: emailChange,
    handleInput: emailInput
  } = useField(
    'email',
    yup
      .string()
      .trim()
      .email('Please enter a valid email')
      .required('Email is required field'),
    { validateOnValueUpdate: false }
  );

  const {
    value: name,
    errorMessage: nameMessage,
    handleChange: nameChange,
    handleInput: nameInput
  } = useField(
    'name',
    yup
      .string()
      .trim()
      .required('Name is required field'),
    { validateOnValueUpdate: false }
  );
  const {
    value: review,
    errorMessage: reviewMessage,
    handleChange: reviewChange,
    handleInput: reviewInput
  } = useField(
    'review',
    yup
      .string()
      .trim()
      .required('Review is required field'),
    { validateOnValueUpdate: false }
  );

  const nameListeners = computed(() => {
    const base = {
      blur: nameChange,
      change: nameChange
    };
    if (!nameMessage.value) {
      return {
        ...base,
        input: nameInput
      };
    }

    // Aggressive
    return {
      ...base,
      input: nameChange // only switched this
    };
  });

  const emailListeners = computed(() => {
    const base = {
      blur: emailChange,
      change: emailChange
    };
    if (!emailMessage.value) {
      return {
        ...base,
        input: emailInput
      };
    }

    // Aggressive
    return {
      ...base,
      input: emailChange // only switched this
    };
  });

  const reviewListeners = computed(() => {
    const base = {
      blur: reviewChange,
      change: reviewChange
    };
    if (!reviewMessage.value) {
      return {
        ...base,
        input: reviewInput
      };
    }

    // Aggressive
    return {
      ...base,
      input: reviewChange // only switched this
    };
  });

  const onSubmit = handleSubmit(async val => {
    try {
      const payload = {
        productId: id,
        date: formatedDate(Date.now()),
        rating: rating.value,
        ...val
      };
      const { data } = await ProductService.createReview(payload);
      const idx = store.getters['products/getProductIdxById'](id);
      await store.commit('products/UPDATE_PRODUCT', {
        ...payload,
        idx,
        reviewId: data.name
      });
      resetForm();
    } catch (e) {
      console.log(e.message);
    }
  });

  return {
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
    handleSubmit
  };
}
