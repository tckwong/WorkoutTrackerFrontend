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
        :userIdP="exercise.userId"
        :stateCurrent="stateCurrent"
        @notifyParentDeleteExercise="retrieveExercises"
        />
        <button v-scroll-reveal.reset="{ delay: 250 }" @click="addExercise" class="addExerciseBtn">ADD EXERCISE</button>
        <button v-scroll-reveal.reset="{ delay: 250 }" @click="changeState" class="addExerciseBtn finishBtn">FINISH WORKOUT</button>
        <button v-scroll-reveal.reset="{ delay: 250 }" @click="endWorkout" class="addExerciseBtn endWorkoutBtn">END WORKOUT</button>
        <!-- {{getExerciseData}} -->
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
                stateCurrent : false,
                userToken : null,
                storeData: [],
                storeJSON : [],
                userId : null,
            }
        },
        computed: {
            getExerciseData: function() {
                return this.$store.state.currWorkoutData
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
                    for (let i=0; i<response.data.length; i++){
                        response.data[i].userId = this.userId;
                    }
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
                    userId : this.userId,

                }
                this.allExerciseData.push(this.exerciseRow);
            },
            changeState() {
                this.stateCurrent = !this.stateCurrent;
                setTimeout(this.finishWorkout, 100);
            },
            endWorkout() {
                axios.request({
                    url: `${process.env.VUE_APP_BASE_DOMAIN}/api/workout-session`,
                    method: 'DELETE',
                    headers : {
                        'Content-Type': 'application/json'
                    },
                    data : {
                        "loginToken" : this.userToken,
                        "userId" : this.userId
                    }
                }).then((response) => {
                    console.log(response)
                    this.$router.push({ name: 'WorkoutSplit' });
                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            finishWorkout() {
                axios.request({
                    url: `${process.env.VUE_APP_BASE_DOMAIN}/api/current-workout`,
                    method: 'POST',
                    headers : {
                        'Content-Type': 'application/json'
                    },
                    data : JSON.stringify(this.$store.state.currWorkoutData)
                    
                }).then(() => {
                    this.endWorkoutSession();
                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            endWorkoutSession() {
                axios.request({
                    url: `${process.env.VUE_APP_BASE_DOMAIN}/api/workout-session`,
                    method: 'DELETE',
                    headers : {
                        'Content-Type': 'application/json'
                    },
                    data : {
                        "loginToken" : this.userToken,
                        'userId' : this.userId
                    }
                    
                }).then(() => {
                    this.$router.push({ name: 'WorkoutHistory' });
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
    position: fixed;
    top: 5px;
    right: 0;
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

    .finishBtn {
        top: 45px;
        right: 0;
    }
    .endWorkoutBtn {
        top: 85px;
        right: 0;
    }
</style>