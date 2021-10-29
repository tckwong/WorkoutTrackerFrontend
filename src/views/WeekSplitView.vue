<template>
    <div>
        <Header/>
        <WeekSplit/>
    </div> 
</template>

<script>
import WeekSplit from '@/components/WeekSplit.vue'
import Header from '@/components/Header.vue'
    export default {
        name: 'WeekSplitView',
        components: {
            Header,
            WeekSplit
        },

    }   
</script>
