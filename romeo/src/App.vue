<script>
import Sidebar from './pages/Sidebar.vue';
export default {
  components:{Sidebar}
}
</script>
<template>
  <Sidebar />
  <div>
    <router-view />
  </div>
</template>
