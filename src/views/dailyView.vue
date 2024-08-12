<!-- src\views\dailyView.vue-->

<script>
    import infoContainer from '@/components/daily/info/infoContainer.vue'
    import mapContainer from '@/components/daily/map/mapContainer.vue';

    export default {
        name : 'Daily-View',
        components : {
            infoContainer,
            mapContainer
        }
    }
</script>

<template>
    <div class="daily-view">
        <infoContainer/>
        <mapContainer/>
    </div>
</template>

<style scoped>
    .daily-view {
    display: flex;
    flex-direction: column;
    height:100%;
    width: 100%;
    background-color: #ffffff;
    color: #333333;
    }
</style>