<template>
    <div>
        <div class="flexContainer">
            <h1>{{ workoutTitle }}</h1>
            <img @click="goBack" src="@/assets/undoIcon.png" alt="back icon">
        </div>
        
        <WorkoutTemplateChild v-for="exercise in allExerciseData" 
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
        <WorkoutTemplateChildNewData v-for="exercise in allNewExerciseData" 
        :key="exercise.exerciseIndex"
        :exerciseIndex="exercise.exerciseIndex"
        :exerciseNameP="exercise.exerciseName"
        :repsP="exercise.reps"
        :setsP="exercise.sets"
        :weightP="exercise.weight"
        :workoutTitleP="exercise.workoutTitle"
        :userIdP="exercise.userId"
        :stateNew="stateNew"
        @notifyToRemoveDataOnly="removeExerciseNew"
        />
        <button v-b-modal.modal-center @click="addExercise" class="generalBtn">ADD EXERCISE</button>
        <button @click="checkforSession" class="generalBtn">START WORKOUT</button>

        <b-modal v-model="showModal" title="There is an existing workout session" button-size="lg">
            <p class="my-2">Do you want to resume current workout or start a new workout?</p>
            <button @click="resumeWorkout">Resume Workout</button>
            <button @click="startNewWorkout">New Workout</button>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
import WorkoutTemplateChild from '@/components/WorkoutTemplateChild.vue'
import WorkoutTemplateChildNewData from '@/components/WorkoutTemplateChildNewData.vue'

    export default {
        name: 'WorkoutTemplate',
        components: {
            WorkoutTemplateChild,
            WorkoutTemplateChildNewData
        },
        data: () => {
            return {
                workoutTitle: null,
                allExerciseData : [],
                allNewExerciseData :[],
                exerciseRow : {},
                workoutId : null,
                state : false,
                stateNew : false,
                userToken : null,
                userId : null,
                storeData: [],
                storeJSON : [],
                showModal : false,
                addedExerciseIndex : 0,
            }
        },
        computed: {
            getExerciseData: function() {
                return this.$store.state.items
            }
        },
        methods: {
            removeExerciseNew(index) {
            // find the index of object with the object property of index and remove

            for( var i = 0; i < this.allNewExerciseData.length; i++){ 

                if (this.allNewExerciseData[i].exerciseIndex === index) { 
                    this.allNewExerciseData.splice(i, 1); 
                }
            }
            },
            resumeWorkout() {
                this.$router.push({ name: 'CurrentWorkout' })
            },
            startNewWorkout() {
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
                    this.startWorkoutSession();
                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            retrieveWorkoutTitle() {
                axios.request({
                    url: `${process.env.VUE_APP_BASE_DOMAIN}/api/workouts`,
                    method: 'GET',
                    params : {
                        "userId" : this.userId
                    }
                }).then((response) => {
                    const idConversion = Number(this.$route.params.workout)
                    const found = response.data.find(workout => workout.workoutId === idConversion);
                    this.workoutTitle = found.title;
                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
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
                    exerciseIndex : this.addedExerciseIndex,
                    exerciseName: 'New Exercise',
                    reps : 1,
                    sets : 1,
                    weight : 1,
                }
                this.allNewExerciseData.push(this.exerciseRow);
                this.addedExerciseIndex += 1;
            },

            startWorkoutSession() {
                axios.request({
                        url: `${process.env.VUE_APP_BASE_DOMAIN}/api/workout-session`,
                        method: 'POST',
                        headers : {
                            'Content-Type': 'application/json'
                        },
                        data : {
                            "loginToken": this.userToken,
                            "userId": this.userId,
                            "workoutId": this.$route.params.workout
                        }
                }).then(() => {
                    // State change alerts child to add its existing data to vue Store
                    this.state = !this.state;
                    this.stateNew = !this.stateNew;
                    this.currentTime = new Date();
                    var curTime = Date.parse(this.currentTime);
                    localStorage.setItem("sessionStartTime", curTime);
                    setTimeout(this.loadCurrWorkout, 200);

                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            checkforSession() {
                axios.request({
                    url: `${process.env.VUE_APP_BASE_DOMAIN}/api/workout-session`,
                    method: 'GET',
                    params : {
                        "userId" : this.userId
                    }
                    
                }).then((response) => {
                    if (response.data != "") {
                        this.showModal = true;
                    }else{
                        this.startWorkoutSession();
                    }
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
            goBack() {
                this.$router.push({ name: 'WorkoutSplit' });
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
            this.retrieveWorkoutTitle();
        },
    }
</script>


<style lang="scss" scoped>

    .flexContainer {
        display: grid;
        grid-template-columns: 1fr .15fr;
        background-color: #282121;
        height: 10vh;
        h1 {
            align-self: center;
            padding-left:10px;
        }
        img {
        height: 50px;
        align-self: center;
        filter: invert(100%);
        cursor: pointer;
    }
    }
    
</style>