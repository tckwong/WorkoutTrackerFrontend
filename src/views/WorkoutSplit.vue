<template>
    <div>
        <Header/>
        <WorkoutSplitMain/>
    </div> 
</template>

<script>
import WorkoutSplitMain from '@/components/WorkoutSplitMain.vue'
import Header from '@/components/Header.vue'
    export default {
        name: 'WorkoutSplit',
        components: {
            Header,
            WorkoutSplitMain
        },
    
    }   
</script>
