<template>
  <div class="form-container">
    <h3 class="font-poppins text-base mb-6 leading-8">Billing Details</h3>
    <div class="flex">
      <app-input
        v-model="firstName"
        :error="firstNameMessage"
        label="First Name"
        required
        v-on="firstNameListeners"
        containerClass="w-1/2"
      />
      <app-input
        v-model="lastName"
        :error="lastNameMessage"
        label="Last Name"
        required
        v-on="lastNameListeners"
        containerClass="w-1/2 ml-4"
      />
    </div>
    <app-input v-model="company" label="Company Name" v-on="companyListeners" />
    <app-input v-model="zipCode" label="Postcode/Zip" v-on="zipListeners" />
    <app-input
      v-model="address"
      :error="addressMessage"
      label="Address"
      required
      v-on="addressListeners"
      placeholder="Street address"
    />
    <app-input
      v-model="city"
      :error="cityMessage"
      label="Town/City"
      required
      v-on="cityListeners"
      placeholder="Town/City"
    />
    <div class="form-container__flex-wrapper">
      <app-input
        v-model="email"
        :error="emailMessage"
        label="Email"
        required
        v-on="emailListeners"
        containerClass="form-container__input"
      />
      <app-input
        v-model="phone"
        :error="phoneMessage"
        label="Phone Number"
        required
        v-on="phoneListeners"
        containerClass="form-container__input form-container__input--last"
      />
    </div>
  </div>
</template>

<script>
import { useCheckoutForm } from '@/use/checkoutForm.js';
import AppInput from '@/components/ui/AppInput.vue';
export default {
  components: { AppInput },
  setup() {
    return {
      ...useCheckoutForm()
    };
  }
};
</script>

<style lang="scss" scoped>
@import '@/_variables';
.form-container {
  margin-bottom: 4rem;
  @media (min-width: $breakpoint-tablet) {
    width: 60%;
    margin-bottom: 10rem;
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
