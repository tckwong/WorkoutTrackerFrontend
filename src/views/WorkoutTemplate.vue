<template>
    <div>
        <WorkoutTemplateChild ref="search" v-for="exercise in allExerciseData" 
        :key="exercise.exerciseId"
        :exerciseIdP="exercise.exerciseId"
        :exerciseNameP="exercise.exerciseName"
        :repsP="exercise.reps"
        :setsP="exercise.sets"
        :weightP="exercise.weight"
        :workoutTitleP="exercise.workoutTitle"
        :userIdP="exercise.userId"
        :state="state"
        @notifyParentDeleteExercise="retrieveExercises"
        />
        <button @click="addExercise" class="addExerciseBtn">ADD EXERCISE</button>
        <button @click="start_workout_session" class="addExerciseBtn">START WORKOUT</button>
        {{getExerciseData}}
    </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
import WorkoutTemplateChild from '@/components/WorkoutTemplateChild.vue'

    export default {
        name: 'WorkoutTemplate',
        components: {
            WorkoutTemplateChild
        },
        data: () => {
            return {
                allExerciseData : [],
                exerciseRow : {},
                workoutId : null,
                state : false,
                userToken : null,
                userId : null,
                storeData: [],
                storeJSON : [],
            }
        },
        computed: {
            getExerciseData: function() {
                return this.$store.state.items
            }
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
                    this.allExerciseData = response.data;
                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            addExercise() {
                this.exerciseRow = {
                    exerciseName: 'New Exercise',
                    reps : null,
                    sets : null,
                    weight : null,
                }
                this.allExerciseData.push(this.exerciseRow);
            },
        
            start_workout_session() {
            axios.request({
                    url: `${process.env.VUE_APP_BASE_DOMAIN}/api/workout-session`,
                    method: 'POST',
                    headers : {
                        'Content-Type': 'application/json'
                    },
                    data : {
                        "loginToken": this.userToken,
                        "userId": this.userId,
                    }
                }).then(() => {
                    this.state = !this.state;
                    setTimeout(this.loadCurrWorkout, 200);

                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            loadCurrWorkout() {
                axios.request({
                    url: `${process.env.VUE_APP_BASE_DOMAIN}/api/exercises`,
                    method: 'POST',
                    headers : {
                        'Content-Type': 'application/json'
                    },
                    data : JSON.stringify(this.$store.state.items)
                    
                }).then(() => {
                    this.$router.push({ name: 'CurrentWorkout' });
                }).catch((error) => {

                    console.error("There was an error: " +error);
                })
            },
            getMyCookies() {
                const getCookie = cookies.get('loginData');
                this.userToken = getCookie.loginToken;
                this.userId = getCookie.userId;
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
    margin-left: 10px;
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