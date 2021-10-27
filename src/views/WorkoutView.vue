<template>
    <div> 
        <Header/>
        <Workout/>
    </div> 
</template>

<script>
    import Header from '@/components/Header.vue'
    import Workout from '@/components/Workout.vue'

    export default {
        name: 'WorkoutView',
        components: {
            Header,
            Workout,
        },
        methods: {

        }
    }   
</script>
