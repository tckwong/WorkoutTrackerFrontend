<template>
    <section>
        <b-card
            header-text-variant="white"
            header-tag="header"
            header-bg-variant="dark"
            style="max-width: 100vw;"
        >
        <b-col sm="3">
            <b-card-title>{{ storeInfo.exerciseName }}</b-card-title>
        </b-col>
        <div class="grid-container">
            <p>Reps:</p>
            <p>Sets:</p>
            <p>Weight:</p>
            <label class="container">
            <input type="checkbox" checked="checked">
            <span class="checkmark"></span>
            </label>
            <!-- <b-button @click="deleteExercise">X</b-button> -->
            
            <b-col class="inputBoxWidth" sm="2">
                <b-row>
                    <b-form-input id="inline-form" v-model="storeInfo.reps" placeholder="0"></b-form-input>
                    <button @click="incrementRepsBy1" class="incrementbtn1">+1</button>
                </b-row>
            </b-col>

            <b-col class="inputBoxWidth" sm="2">
                <b-row>
                    <b-form-input v-model="storeInfo.sets" placeholder="0"></b-form-input>
                    <button @click="incrementSetsBy1" class="incrementbtn1">+1</button>
                </b-row>
            </b-col>
            <b-col class="inputBoxWidth" sm="2">
                <b-row>
                    <b-form-input v-model="storeInfo.weight" placeholder="0"></b-form-input>
                    <button @click="incrementWeightBy5" class="incrementbtn1">+5</button>
                </b-row>
            </b-col>
        </div>
        </b-card>
    </section>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'

    export default {
        name: 'CurrentWorkoutChild',
        props: {
            workoutTitleP : String,
            exerciseIdP : Number,
            exerciseNameP : String,
            repsP : Number,
            setsP : Number,
            weightP : Number,
            userIdP : Number,
            stateCurrent : Boolean,

        },
        data: () => {
            return {
                allExerciseData : [],
                exerciseRow : {},
                workoutId : null,
                userToken : null,

                storeInfo : {
                    workoutId: "",
                    exerciseId: "",
                    userId: "",
                    loginToken: "",
                    exerciseName: "",
                    reps: "",
                    sets: "",
                    weight: "",
                }
            }
        },
        methods: {
            deleteExercise() {
                axios.request({
                    url: `${process.env.VUE_APP_BASE_DOMAIN}/api/exercises`,
                    method: 'DELETE',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    data: {
                        "loginToken" : this.userToken,
                        "exerciseId" : this.exerciseId,
                    }
                }).then(() => {
                    this.$emit('notifyParentDeleteExercise');

                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            addDataToStore() {
                this.$store.dispatch('loadCurrItems',this.storeInfo);
            },
            initialData() {
                this.storeInfo = {
                    workoutId : this.$route.params.workout,
                    title : this.workoutTitleP,
                    exerciseId : this.exerciseIdP,
                    loginToken : this.userToken,
                    exerciseName : this.exerciseNameP,
                    reps : this.repsP,
                    sets : this.setsP,
                    userId : this.userIdP,
                    weight : this.weightP
                }
            },
            incrementRepsBy1() {
                this.storeInfo.reps ++
            },
            incrementSetsBy1() {
                this.storeInfo.sets ++
            },
            incrementWeightBy5() {
                this.storeInfo.weight +=5
            },
            getMyCookies() {
                var getCookie = cookies.get('loginData');
                this.userToken = getCookie.loginToken;
                
            },
        },
        mounted() {
            this.getMyCookies();
            this.initialData();
        },
        watch: {
            stateCurrent:function() {
                this.addDataToStore();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .grid-container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(2, 1fr);
        p {
            display: inline-block;
        }
        
    }
    #inputBox {
        display: inline-block;
        button{
            display: inline-block;
            padding-left: 5px;
            margin-left: 5px;
        }
    }
    .inputBoxWidth {
        width: 50px;
    }
    
</style>