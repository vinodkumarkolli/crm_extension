<script>
import Sidebar from './pages/Sidebar.vue';
import { sidebarWidth } from './data/sidebarstate';
export default {
  components:{Sidebar},
  setup(){
    return {sidebarWidth}
  }
}
</script>
<template>
  <Sidebar />
  <div :style="{'margin-left':sidebarWidth}">
    <router-view />
  </div>
</template>
