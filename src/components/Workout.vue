<template>
    <div>
        {{ title }} - {{ created_on }}
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
        props: {
            title : String,
            created_on : String,
            completed : Number,
            completed_on : String,
            userId : Number
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