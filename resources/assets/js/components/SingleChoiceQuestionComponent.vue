<template>
    <v-flex xs12 align-center="true" style="height:100%;">
        <p class="title">Question:</p>
        <p class="body-1">{{ data.question }}</p>
        <v-radio-group v-model="selectedAnswer">
            <v-radio v-for="(answer, letter) in data.answer_bank" :key="letter" :label="`${answer}`" :value="letter"></v-radio>
        </v-radio-group>
    </v-flex>
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
        checkAnswer() {
            if (this.data.answers.includes(this.selectedAnswer)) {
                this.bus.$emit('nextQuestion');
            } else {
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