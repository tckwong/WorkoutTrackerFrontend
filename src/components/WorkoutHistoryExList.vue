<template>
    <div>
        <h4>{{ exerciseName }}</h4>
        <p>{{ reps }} x {{ sets }} x {{ weight }}</p>
    </div>
</template>

<script>
    export default {
        name: 'WorkoutHistoryExList',
        props: {
            exerciseName : String,
            reps : Number,
            sets : Number,
            weight : Number,
        }
    }
</script>

<style lang="scss" scoped>

</style>