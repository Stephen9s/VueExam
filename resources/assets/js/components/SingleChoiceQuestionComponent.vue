<template>
    <div>
        <div class="row">
            <p class="font-weight-bold">Question:</p>
            <p>{{ data.question }}</p>
            <div v-for="(answer, letter) in data.answer_bank" class="pretty p-default col-sm-12 mt-2">
                <input type="radio" name="b" :value="letter" v-model="selectedAnswer" :checked="selectedAnswer === letter"/>
                <div class="state p-primary">
                    <label>{{answer}}</label>
                </div>
            </div>
        </div>
        <div class="row mt-4">
            <button type="button" class="btn btn-success" @click="checkAnswer">Submit</button>
            <button type="button" class="btn btn-danger" @click="nextQuestion">Skip</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['data', 'bus'],
    data() {
        return {
            selectedAnswer: ''
        }
    },
    methods: {
        nextQuestion() {
            this.bus.$emit('nextQuestion');
        },
        checkAnswer() {
            console.log(this)
            if (this.data.answers.includes(this.selectedAnswer)) {
                this.nextQuestion();
            } else {
                this.$swal('Try again!', 'Yes, this is temporary...', 'error');
            }
        }
    },
    watch: {
        
    }
}
</script>