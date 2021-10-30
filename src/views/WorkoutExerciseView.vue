<template>
    <div>
        <ExerciseDetails v-for="exercise in allExerciseData" 
        :key="exercise.exerciseId"
        :exerciseId="exercise.exerciseId"
        :exerciseName="exercise.exerciseName"
        :reps="exercise.reps"
        :sets="exercise.sets"
        :weight="exercise.weight"
        :workoutTitle="exercise.workoutTitle"
        />
        <button @click="addExercise" class="addExerciseBtn">Add Exercise</button>
    </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
import ExerciseDetails from '@/components/ExerciseDetails.vue'

    export default {
        name: 'WorkoutExerciseView',
        components: {
            ExerciseDetails
        },
        data: () => {
            return {
                allExerciseData : [],
                exerciseRow : {},
                workoutId : null,
            }
        },
        computed: {
        
        },
        methods: {
            retrieveExercises() {
                axios.request({
                    url: `${process.env.VUE_APP_BASE_DOMAIN}/api/exercises`,
                    method: 'GET',
                    params : {
                        "workoutId" : this.$route.params.workout
                    }
                }).then((response) => {
                    console.log(response)
                    this.allExerciseData = response.data;
                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },

            addExercise() {
                this.exerciseRow = {
                    exerciseName: null,
                    reps : null,
                    sets : null,
                    weight : null,
                }
                this.allExerciseData.unshift(this.exerciseRow);
            },
            getMyCookies() {
                const getCookie = cookies.get('loginData');
                this.userToken = getCookie.loginToken;
            },
        },
        async mounted() {
            await this.retrieveExercises();
            this.getMyCookies();
        },
    }
</script>


<style lang="scss" scoped>
    .addExerciseBtn {
	box-shadow:inset 0px 1px 0px 0px #f7c5c0;
	background:linear-gradient(to bottom, #fc8d83 5%, #e4685d 100%);
	background-color:#fc8d83;
	border-radius:6px;
	border:1px solid #d83526;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:15px;
	font-weight:bold;
	padding:6px 24px;
	text-decoration:none;
	text-shadow:0px 1px 0px #b23e35;
    }
    .addExerciseBtn:hover {
        background:linear-gradient(to bottom, #e4685d 5%, #fc8d83 100%);
        background-color:#e4685d;
    }
    .addExerciseBtn:active {
        position:relative;
        top:1px;
    }
</style>