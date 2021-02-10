<template>
  <div class="card">
    <table class="table">
      <thead>
        <tr>
          <th>Наименование</th>
          <th>Количество</th>
          <th>Цена (шт)</th>
        </tr>
      </thead>
      <tbody>
        <TableItem 
            v-for="product in products"
            :key="product.id"
            :product="product"
      />
      </tbody>
    </table>
    <hr />
    <p class="text-right"><strong>Всего: {{totalPrice}} руб.</strong></p>
    <p class="text-right">
      <button class="btn">Оплатить</button>
    </p>
  </div>
</template>

<script>
import { computed } from "vue";
import TableItem from "@/components/Cart/TableItem.vue";
export default {
  components: {
    TableItem,
  },
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const totalPrice = computed(() => props.products.reduce((acc, next) => acc+= next.quantaty * next.price, 0))

    return {
      totalPrice,
    }
  }
};
</script>
