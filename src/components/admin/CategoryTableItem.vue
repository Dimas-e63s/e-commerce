<template>
  <tr>
    <td>{{ category.id }}</td>
    <td>{{ category.title }}</td>
    <td>{{ category.type }}</td>
    <td>
      <button @click="$emit('delete', category.id)" class="btn danger">
        x
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  emits: ['delete']
};
</script>

<style lang="scss" scoped></style>
