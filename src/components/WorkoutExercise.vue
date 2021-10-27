<template>
    <div>
        <h1>TEST</h1>
        {{ reps }} - {{ sets }}
    </div>
</template>

<script>
    export default {
        name: 'WorkoutExercise',
        props : {
            reps : String,
            sets : String,
        },
        computed: {
            }
        }
</script>

<style lang="scss" scoped>

</style>