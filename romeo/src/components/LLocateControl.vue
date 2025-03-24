<template>
    <l-control :position="'topleft'">
        <Button>Lets Check</Button>
    </l-control>
</template>
<script>
import { LControl } from '@vue-leaflet/vue-leaflet';
import { Button } from 'frappe-ui';
export default {
    name: 'LLocateControl',
    components: {
        LControl
    }
};
</script>