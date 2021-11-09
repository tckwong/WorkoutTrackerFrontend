<template>
    <section>
        <div>
            {{ sets }} x {{ reps }}
        </div>
        <!-- <button @click="testFunc">TEST</button> -->
      
    </section>
</template>

<script>
    export default {
        name: 'WorkoutHistoryChild',
        props: {
        completedAt : String,
        completedWorkoutId : Number,
        exerciseName : String,
        reps : Number,
        sets : Number,
        weight : Number,
        workoutTitle : String,
        userId : Number,
        },
        data: () => {
            return {
                monthFound : null,
            }
        
        },
        methods: {
            getKeyByValue(arr, value) {
                for (var j=0; j<arr.length; j++){
                    return Object.keys(j).find(key => j[key] === value);
                }
            },
            defineMonths() {
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
                const splitArr = this.completedAt.split('-');
                const fndMonth = splitArr[1]
            for (let i=0; i<myMonths.length; i++){
                for (let key in myMonths[i])
                    if (key == fndMonth) {
                        this.monthFound = myMonths[i][key];
                    }else {
                        continue;
                    }
                }
            },
            // testFunc() {
            //     var mth = 11
            //     var data = {
            //         "prevExists":false,
            //         "pubKey":"b5",
            //         11:"5f1",
            //         12: "November"
            //     };
            //     // Access all keys of enumerable string-keyed properties
            //     //Object.keys(data).forEach((key) => console.log(key,data[key]));
            //     // 
            //     for (let key in data)
            //         if (key == mth) {
            //             this.monthFound = data[key];
            //             console.log(this.monthFound);
                        
            //         }else {
            //             continue;
            //         }
            // },
        },
        mounted() {
            this.defineMonths();
        }
    }

</script>

<style lang="scss" scoped>

    section > div {
        color: white;
    }
</style>