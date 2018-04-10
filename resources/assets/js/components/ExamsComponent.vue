<template>
    <v-container fluid>
        <v-data-table :headers="headers" :items="exams" hide-actions class="elevation-1">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.metadata.question_count }}</td>
                <td class="text-xs-right"><v-icon @click="deleteExam(props.item)" class="pointer">delete_forever</v-icon></td>
                <td class="text-xs-right"><a :href="generateExamHref(props.item)">Load</a></td>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
export default {
    data:() => ({
       headers: [
            { text: 'Exam Name', value: 'name' },
            { text: '# of Questions', value: 'metadata.question_count', align: 'right' },,
            { text: 'Remove', value: '', align: 'right' },
            { text: 'Load', value: '', align: 'right' }
       ]
    }),
    methods: {
        generateExamHref(item) {
            return "#/exam/" + item.metadata.hash;
        },
        deleteExam(item) {
            this.$store.dispatch('unloadExam', item.metadata.hash).then(response => {
                this.$swal({
                    text: response,
                    type: 'success',
                    timer: 1000
                });
            }, error => {
                this.$swal('Oops...', error, 'error');
            });
        }
    },
    computed: {
        exams() {
          return this.$store.getters.getAvailableExams;
        },
        numberOfExams() {
          return this.$store.getters.examCount;
        }
    }
}
</script>