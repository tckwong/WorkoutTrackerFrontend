<template>
    <div>
        <CurrentWorkoutChild ref="search" v-for="exercise in allExerciseData" 
        :key="exercise.exerciseId"
        :exerciseIdP="exercise.exerciseId"
        :exerciseNameP="exercise.exerciseName"
        :repsP="exercise.reps"
        :setsP="exercise.sets"
        :weightP="exercise.weight"
        :workoutTitleP="exercise.workoutTitle"
        :state="state"
        @notifyParentDeleteExercise="retrieveExercises"
        />
        <button @click="addExercise" class="addExerciseBtn">ADD EXERCISE</button>
        <button @click="changeState" class="addExerciseBtn">FINISH WORKOUT</button>
        {{getExerciseData}}
    </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
import CurrentWorkoutChild from '@/components/CurrentWorkoutChild.vue'
import '../css/currentWorkoutStyle.scss'

    export default {
        name: 'WorkoutTemplate',
        components: {
            CurrentWorkoutChild
        },
        data: () => {
            return {
                allExerciseData : [],
                exerciseRow : {},
                workoutId : null,
                state : false,
                userToken : null,
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
                    url: `${process.env.VUE_APP_BASE_DOMAIN}/api/current-workout`,
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
                    exerciseName: 'New Exercise',
                    reps : null,
                    sets : null,
                    weight : null,
                }
                this.allExerciseData.push(this.exerciseRow);
            },
            changeState() {
                this.state = !this.state;
                setTimeout(this.finishWorkout, 300);
            },
            finishWorkout() {
                axios.request({
                    url: `${process.env.VUE_APP_BASE_DOMAIN}/api/exercises`,
                    method: 'POST',
                    headers : {
                        'Content-Type': 'application/json'
                    },
                    data : JSON.stringify(this.$store.state.items)
                    
                }).then((response) => {
                    console.log(response)
                    // this.$router.push({ name: 'CurrentWorkout' });
                }).catch((error) => {
                    // var childData = []
                    // childData.push(this.getExerciseData)
                    // console.log(childData)
                    // childData = this.$refs.search.storeInfo
                    // console.log(childData)
                    console.error("There was an error: " +error);
                })
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