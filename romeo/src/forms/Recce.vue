<template>
<div>
    Recce Form Page
</div>
</template>
<script>
export default {
    name:"Recce",
    props:{
        requestID:{
            type:String,
            required:true
        }
    },
    mounted(){
        console.log(this.requestID)
    }
}
</script>