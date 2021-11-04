<template>
    <section>
        <h1>Your Past Workouts</h1>
        <workout-history-child>
            
        </workout-history-child>
    </section>
</template>

<script>
import WorkoutHistoryChild from '@/components/WorkoutHistoryChild.vue'

    export default {
        name: 'WorkoutHistory',
        components: {
            WorkoutHistoryChild
        }
    }
</script>

<style lang="scss" scoped>
    h1 {
        color: #e06a1c;
    }
</style>