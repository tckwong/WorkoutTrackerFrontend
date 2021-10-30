<template>
    <div>
        {{sets}} x {{exerciseName}}
    </div>
</template>

<script>
    export default {
        name: 'CurrentWorkoutChild',
        props: {
            exerciseId : Number,
            exerciseName : String,
            reps : Number,
            sets : Number,
            weight : Number,

        },
    }
</script>

<style lang="scss" scoped>

</style>