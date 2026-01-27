<script>
import SidebarLink from './SidebarLink.vue'
import { collapsed,toggleSidebar,sidebarWidth } from '@/store/sidebarstate';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { createResource } from 'frappe-ui';
import { sessionUser } from '@/data/session';

export default{
    props:{},
    components: {SidebarLink},
    setup(){
        const route = useRoute()
        const router = useRouter()
        
        const isBazookaPage = computed(() => route.path === '/bazooka')
        const isLampPage = computed(() => route.path.startsWith('/lamp') && route.path !== '/lamp')
        const showBackButton = computed(() => isBazookaPage.value || isLampPage.value)
        
        function goBack() {
            router.back()
        }

        return {collapsed,toggleSidebar,sidebarWidth, showBackButton, goBack}
    }
}
</script>
<template>
    <div class="sidebar" :style="{width:sidebarWidth}">
        <!-- <h1>
            <span v-if="collapsed">
                <div>V</div>
                <div>S</div>
            </span>
            <span v-else>Vue Sidebar</span>
        </h1> -->
        <div class="sidebar-links">
            <template v-if="!showBackButton">
                <SidebarLink to="/home" icon="fas fa-bolt">Bazooka</SidebarLink>
                <SidebarLink to="/lamp" icon="fas fa-lightbulb">Lamp</SidebarLink>
            </template>
            <SidebarLink v-else to="#" icon="fas fa-arrow-left" @click.prevent="goBack">Back</SidebarLink>
        </div>
        <span class="collapse-icon" 
        :class="{'rotate-180':collapsed}"
        @click="toggleSidebar">
            <i class="fas fa-angle-double-left" />
        </span>
    </div>
</template>
<style>
:root {
    --sidebar-bg-color :#2f855a;
    --sidebar-item-hover: #38a169;
    --sidebar-item-active: #276749;
}
</style>
<style scoped>
.sidebar{
    color: white;
    background-color: var(--sidebar-bg-color);
    float: left;
    position:fixed;
    z-index:1000;
    top:0;
    left:0;
    bottom:0;
    padding:0.5em;
    display:flex;
    flex-direction: column;
    transition: 0.3s ease;
}
.sidebar-links {
    display: flex;
    flex-direction: column;
}
.collapse-icon{
    position:absolute;
    bottom:0;
    padding:0.75em;
    color:rgba(255,255,255,0.7);
    transition:0.2s linear;
}
.rotate-180 {
    transform: rotate(180deg);
    transition:0.2s linear;
}

@media (max-width: 768px) {
    .sidebar {
        top: auto;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100% !important;
        height: 60px;
        flex-direction: row;
        justify-content: space-around;
        padding: 0;
        align-items: center;
    }
    .sidebar-links {
        flex-direction: row;
        width: 100%;
        justify-content: space-around;
    }
    .collapse-icon {
        display: none;
    }
}
</style>