<template>
    <section>
        <b-card
            header-text-variant="white"
            header-tag="header"
            header-bg-variant="dark"
            style="max-width: 100vw;"
        >
        <b-col sm="3">
            {{ exerciseIndex }}
            <b-card-title><b-form-input type="text" v-model="storeInfo.exerciseName"></b-form-input></b-card-title>
        </b-col>
        <div class="grid-container">
            <p>Reps:</p>
            <p>Sets:</p>
            <p>Weight:</p>
            <b-button @click="deleteAddedExercise">X</b-button>
            <b-col class="inputBoxWidth" sm="2">
                <b-form-input v-model="storeInfo.reps" placeholder="0"></b-form-input>
            </b-col>
            <b-col class="inputBoxWidth" sm="2">
                <b-form-input v-model="storeInfo.sets" placeholder="0"></b-form-input>
            </b-col>
            <b-col class="inputBoxWidth" sm="2">
                <b-form-input v-model="storeInfo.weight" placeholder="0"></b-form-input>
            </b-col>
        </div>
        </b-card>
    </section>
</template>

<script>
// import axios from 'axios'
import cookies from 'vue-cookies'

    export default {
        name: 'CurrentWorkoutNewData',
        props: {
            exerciseIndex : Number,
            exerciseNameP : String,
            repsP : Number,
            setsP : Number,
            weightP : Number,
            userIdP : Number,
            stateNew : Boolean,
        },
        data: () => {
            return {
                allExerciseData : [],
                exerciseRow : {},
                workoutId : null,
                userToken : null,

                storeInfo : {
                    workoutId: null,
                    loginToken: null,
                    exerciseName: null,
                    reps: 1,
                    sets: 1,
                    weight: 1,
                }
            }
        },

        methods: {
            deleteAddedExercise() {
                this.$emit('notifyToRemoveDataOnly',this.exerciseIndex);
            },
            addDataToStore() {
                // Updates store with 'storeInfo'. All data updated via v-model
                this.$store.dispatch('loadItems',this.storeInfo)
            },
            initialData() {
                this.storeInfo = {
                    workoutId : this.$route.params.workout,
                    loginToken : this.userToken,
                    exerciseName : this.exerciseNameP,
                    reps: this.repsP,
                    sets: this.setsP,
                    weight: this.weightP
                }
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
            stateNew() {
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
    }
    .inputBoxWidth {
        width: 50px;
    }
    #checkbox-1 {
        width: 30px;
    }
    
</style>