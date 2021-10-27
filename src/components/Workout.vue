<template>
    <div>
        <h1>Workout Page</h1>
        <b-button @click="addExercise" pill variant="outline-danger">ADD EXERCISE</b-button>
        <WorkoutExercise v-for="line in exerciseList" 
        :key="line"
        :reps="line.reps"
        :sets="line.sets"/>
    </div>
</template>

<script>
import WorkoutExercise from './WorkoutExercise.vue'
    export default {
        name: 'Workout',
        components: {
            WorkoutExercise
        },
        data: () => {
            return {
                exerciseList : [],
                exerciseLine : {}
            }
        },
        methods: {
            incrementCounter() {
                this.$store.commit('incrementCounter');
            },
            addExercise() {
                this.exerciseLine = {
                    reps : "",
                    sets : "",

                }
                this.exerciseList.unshift(this.exerciseLine);
            }
        }
    }
</script>

<style scoped>

</style>