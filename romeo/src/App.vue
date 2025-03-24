<script>
import Sidebar from '@/components/Sidebar.vue';
import { sidebarWidth } from '@/store/sidebarstate';
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
