<template>
    <v-flex xs12 align-center="true">
        <p class="title">Question:</p>
        <p class="body-1">{{ data.question }}</p>
        <v-checkbox v-for="(answer, letter) in data.answer_bank" :key="letter" :label="`${letter}: ${answer}`" v-model="selectedAnswers" :value="`${letter}`"></v-checkbox>
    </v-flex>
</template>

<script>
export default {
    props: ['data', 'bus'],
    data() {
        return {
            selectedAnswers: []
        }
    },
    methods: {
        checkAnswer() {
            if (_.intersection(this.selectedAnswers, this.data.answers).length == this.data.answers.length) {
                this.bus.$emit('nextQuestion');
            } else {
                this.$emit('addIncorrectQuestionHash', this.data.hash);
                this.$swal('Try again!', 'You have selected the incorrect answer.', 'error');
            }
        }
    },
    created() {
        this.bus.$off('checkAnswer');
        this.bus.$on('checkAnswer', this.checkAnswer);
    }
}
</script>