<template>
    <section>
        <div id="workout-container">
            {{ title }} - {{ created_on }} - {{ completed }}
            <WorkoutExerciseView v-for="line in exerciseList" 
            :key="line"
            :reps="line.reps"
            :sets="line.sets"/>
        </div>
    </section>
</template>

<script>
import WorkoutExerciseView from '../views/WorkoutExerciseView.vue'
    export default {
        name: 'Workout',
        components: {
            WorkoutExerciseView
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

<style lang="scss" scoped>
    #workout-container {
        display: grid;
        grid-template-columns: 1.2fr .8fr .8fr;
    }
</style>