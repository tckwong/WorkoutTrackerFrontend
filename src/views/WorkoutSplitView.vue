<template>
    <div>
        <Header/>
        <WorkoutSplit/>
    </div> 
</template>

<script>
import WorkoutSplit from '@/components/WorkoutSplit.vue'
import Header from '@/components/Header.vue'
    export default {
        name: 'WorkoutSplitView',
        components: {
            Header,
            WorkoutSplit
        },

    }   
</script>
