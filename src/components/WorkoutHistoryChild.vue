<template>
    <section>
        <div>
            <h3>{{workoutTitle}}</h3>
        </div>
        <div class="exerciseGridContainer">
            <p>{{ completedAtMonth }} {{ completedAtDay }} - {{ completedAtYear }} @ {{ completedAtTime }}</p>
            <b-button @click="getexerciseDetails" v-b-toggle="'collapse-'+index" class="m-1">Show More</b-button>
        </div>
        <b-collapse :id="'collapse-'+index">
            <WorkoutHistoryExList v-for="(data,index) in exerciseList" 
            :key="index"
            :index="index"
            :exerciseName="data.exerciseNameArr"
            :reps="data.repsArr"
            :sets="data.setsArr"
            :weight="data.weightArr"
            ></WorkoutHistoryExList>

        </b-collapse>

    </section>
</template>

<script>
import WorkoutHistoryExList from '@/components/WorkoutHistoryExList.vue'

    export default {
        name: 'WorkoutHistoryChild',
        components: {
            WorkoutHistoryExList
        },
        props: {
        index: Number,
        completedAt : String,
        completedWorkoutId : Number,
        exerciseName : Array,
        reps : Array,
        sets : Array,
        weight : Array,
        workoutTitle : String,
        userId : Number,
        },
        data: () => {
            return {
                completedAtMonth : null,
                completedAtDay : null,
                completedAtYear : null,
                completedAtTime : null,
                exerciseList : [],
                exerciseObject : {}
            }
        
        },
        methods: {
            convertPropsFormat() {
                for (let i=0; i<this.exerciseName.length; i++){
                    this.exerciseObject = {
                        exerciseNameArr : this.exerciseName[i],
                        repsArr : this.reps[i],
                        setsArr : this.sets[i],
                        weightArr : this.weight[i]
                    }
                    this.exerciseList.push(this.exerciseObject)
                }
                    
                return this.exerciseList
            },
            // getKeyByValue(arr, value) {
            //     for (var j=0; j<arr.length; j++){
            //         console.log(j)
            //         return Object.keys(j).find(key => j[key] === value);
            //     }
            // },
            getMonths() {
                const myMonths = [
                {1 : "January"},
                {2 : "February"},
                {3 : "March"},
                {4 : "April"},
                {5 : "May"},
                {6 : "June"},
                {7 : "July"},
                {8 : "August"},
                {9 : "September"},
                {10 : "October"},
                {11 : "November"},
                {12 : "December"},
                ]
                // Use regex to split string with multiple conditions
                const splitArr = this.completedAt.split(/[\s-]+/);
                const fndMonth = splitArr[1]
                this.completedAtYear = splitArr[0]
                this.completedAtDay = splitArr[2]
                this.completedAtTime = splitArr[3]

                for (let i=0; i<myMonths.length; i++){
                    for (let key in myMonths[i])
                        if (key == fndMonth) {
                            this.completedAtMonth = myMonths[i][key];
                        }else {
                            continue;
                        }
                    }
            },
            getexerciseDetails() {
                
            }
        },
        mounted() {
            this.getMonths();
            this.convertPropsFormat();
        }
    }

</script>

<style lang="scss" scoped>
    section > div {
        color: white;
    }

    .exerciseGridContainer {
        display:grid;
        grid-template-columns: 1fr, 0.1fr;
        margin-top: 20px;
    }
</style>