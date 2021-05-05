<template lang="pug">
    svg(:class="'icon icon-'+id")
        use(:xlink:href="file+'#'+id", :href="file+'#'+id")
</template>
<script>
    export default {
        name: "Icon",
        props: {
            id: {required: true},
            file: {default: process.env.BASE_URL+BASE_PATH+ "css/sprites.svg"}
        },
        mounted() {
        }
    }
</script>
