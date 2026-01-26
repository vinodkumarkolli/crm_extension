<script>
import Sidebar from '@/components/Sidebar.vue';
import { sidebarWidth } from '@/store/sidebarstate';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  components:{Sidebar},
  setup(){
    const route = useRoute();
    const showSidebar = computed(() => !['POI', 'POI Closure'].includes(route.name));
    return {sidebarWidth, showSidebar}
  }
}
</script>
<template>
  <Sidebar v-if="showSidebar" />
  <div class="main-content" :class="{ 'no-sidebar': !showSidebar }" :style="{ '--sidebar-width': sidebarWidth }">
    <router-view />
  </div>
</template>
<style>
.main-content {
  margin-left: var(--sidebar-width);
  transition: margin-left 0.3s ease;
}
.main-content.no-sidebar {
  margin-left: 0 !important;
}
@media (max-width: 768px) {
  .main-content {
    margin-left: 0 !important;
    margin-bottom: 60px;
  }
  .main-content.no-sidebar {
    margin-bottom: 0 !important;
  }
}
</style>
