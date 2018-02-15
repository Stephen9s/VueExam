<template>
    <div>
        Multiple choice question not yet coded.
    </div>
</template>

<script>
export default {
    props: ['data', 'bus'],
    methods: {
        nextQuestion() {
            this.bus.$emit('nextQuestion');
        }
    },
    mounted() {
        // insta-skip!
        // TODO: finish multiple choice component
        this.nextQuestion();
    }
}
</script>