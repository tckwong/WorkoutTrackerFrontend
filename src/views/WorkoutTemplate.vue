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
        :exerciseIndex="addedExerciseIndex"
        @notifyParentDeleteExercise="retrieveExercises"
        @notifyToRemoveDataOnly="removeExerciseFromDataOnly"
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

    export default {
        name: 'WorkoutTemplate',
        components: {
            WorkoutTemplateChild
        },
        data: () => {
            return {
                workoutTitle: null,
                allExerciseData : [],
                exerciseRow : {},
                workoutId : null,
                state : false,
                userToken : null,
                userId : null,
                storeData: [],
                storeJSON : [],
                showModal : false,
                addedExerciseIndex : null,
            }
        },
        computed: {
            getExerciseData: function() {
                return this.$store.state.items
            }
        },
        methods: {
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
                this.addedExerciseIndex += 1
                this.exerciseRow = {
                    exerciseName: 'New Exercise',
                    reps : 1,
                    sets : 1,
                    weight : 1,
                    addedExerciseIndex : this.addedExerciseIndex //Indicates if this is an added exercise to template
                }
                this.allExerciseData.push(this.exerciseRow);
                console.log(this.allExerciseData);
            },
            removeExerciseFromDataOnly(eIndex) {
                // find the index of object with the object property of eIndex and remove
                const getIndex = this.allExerciseData.findIndex(x => x.addedExerciseIndex === eIndex);
                this.allExerciseData.splice(getIndex, 1)
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