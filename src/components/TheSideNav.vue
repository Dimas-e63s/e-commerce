<template>
  <div
    v-if="$attrs.class === 'active'"
    class="modal__backdrop"
    @click="$emit('close')"
  ></div>
  <div id="mySidenav" v-bind="$attrs" class="sidenav">
    <button href="#" class="closebtn" @click="$emit('close')">&times;</button>
    <ul class="navbar__menu">
      <li v-for="item in sidebarTemplate">
        <router-link custom v-slot="{ navigate }" :to="{ name: item.link }">
          <a @click="move(navigate)" class="cursor-pointer">{{ item.text }}</a>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { sidebarTemplate } from '@/utils/template.js';
export default {
  emits: ['close'],
  setup(_, { emit }) {
    const move = fn => {
      emit('close');
      fn();
    };
    return {
      sidebarTemplate,
      move
    };
  }
};
</script>

<style lang="scss" scoped>
.sidenav.active {
  transform: translateX(0px);
}
.sidenav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 22;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 250px;
  padding-top: 60px;
  background-color: #fff;
  overflow-x: hidden;
  transition: 0.5s;
  transform: translateX(-250px);

  & li {
    margin: 1rem 0;
    margin-left: 2rem;
    & a {
      position: relative;
      display: inline;
      width: 5rem;
      padding: 5px 15px;
      color: #2c3e50;
      text-decoration: none;
      font-size: 1.5rem;

      &:after {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 0%;
        height: 5px;
        content: '.';
        color: transparent;
        background: #10b981;
        height: 1px;
      }

      &:hover:after {
        width: 100%;
        height: 0.1rem;
      }

      &,
      &:after,
      &:before {
        transition: all 0.5s;
      }

      &:hover {
        color: #555;
      }
    }
  }
}

.modal__backdrop {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 21;
}

/* Position and style the close button (top right corner) */
.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  color: black;
}

/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}
</style>
