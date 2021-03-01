<template>
  <div class="container">
    <div class="tab-container">
      <button
        v-for="(tab, key) in tabs"
        :class="['tab', { active: currentTab === key }]"
        :key="key"
        @click="currentTab = key"
      >
        {{ tab }}
      </button>
    </div>
    <component :is="currentTab" />
  </div>
</template>

<script>
import { ref } from 'vue';
import Login from '@/components/auth/Login.vue';
import Register from '@/components/auth/Register.vue';
export default {
  components: {
    Login,
    Register
  },
  setup() {
    const currentTab = ref('Login');
    const tabs = {
      Login: 'Already registerd?',
      Register: 'New to Renoshop?'
    };

    return {
      currentTab,
      tabs
    };
  }
};
</script>

<style scoped>
.tab-container {
  display: flex;
  justify-content: center;

  width: 100%;

  margin-top: 2rem;
}

.tab {
  text-align: center;
  vertical-align: middle;
  line-height: 4rem;
  width: 14rem;
  height: 4rem;
  border-bottom: 1px solid black;
  text-transform: uppercase;
  font-family: 'Roboto';
  font-weight: 500;
  outline: none;
}

.tab.active {
  border: 1px solid black;
  border-bottom: none;
}

.container {
  width: 50%;
  height: 100vh;
  margin: auto;
  background-color: #fff;
}
</style>
