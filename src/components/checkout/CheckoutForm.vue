<template>
  <div class="w-3/5 mb-40">
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
    <app-input
        v-model="company"
        label="Company Name"
        v-on="companyListeners"
      />
      <app-input
        v-model="zipCode"
        label="Postcode/Zip"
        v-on="zipListeners"
      />
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
      <div class="flex">
        <app-input
          v-model="email"
          :error="emailMessage"
          label="Email"
          required
          v-on="emailListeners"
          containerClass="w-1/2"
        />
        <app-input
          v-model="phone"
          :error="phoneMessage"
          label="Phone Number"
          required
          v-on="phoneListeners"
          containerClass="w-1/2 ml-4"
        />
    </div>
   </div>
</template>

<script>
import {useCheckoutForm} from '@/use/checkoutForm.js'
import AppInput from '@/components/ui/AppInput.vue'
export default {
  components: {  AppInput },
  setup() {
    return {
      ...useCheckoutForm()
    }
  }        
}
</script>
