<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs12 align-center="true">
                <v-btn dark class="jbtn-file">
                    Upload<input ref="upload" type="file" id="files" @change="onFileChange" name="files[]" accept=".json"/>
                </v-btn>
                <v-btn color="info" @click="validateRawJSON" v-if="!valid">Validate</v-btn>
                <v-btn color="success" @click="addRawExam" v-else>Success</v-btn>
                <v-btn color="warning" @click="resetRawUpload">Reset</v-btn>
            </v-flex>
            <v-flex xs12>
                <v-text-field label="Load via Clipboard" v-model="rawJSON" v-json-formatted="rawJSON" rows="25" auto-grow multi-line></v-text-field>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                rawJSON: '',
                valid: false
            }
        },
        filters: {
            prettify(v) {
                return JSON.stringify(v, undefined, 4);
            }
        },
        methods: {
            validateJSON(input) {
                try {
                    let tmp = JSON.parse(input);
                    return tmp;
                } catch(error) {
                    return false;
                }
            },
            validateRawJSON() {
                this.valid = (this.validateJSON(this.rawJSON) != false);
            },
            resetRawUpload() {
                this.rawJSON = '';
                this.valid = false;
            },
            load(file) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.rawJSON = e.target.result;
                };
                reader.readAsText(file);
            },
            onFileChange() {
                var files = this.$refs.upload.files || this.$refs.upload.dataTransfer.files;
                this.load(files[0]);
            },
            addRawExam() {
                this.$store.dispatch('pushExamToBank', JSON.parse(this.rawJSON)).then(response => {
                    this.$swal({
                        text: 'Exam loaded!',
                        type: 'success'
                    });
                    this.rawJSON = '';
                    this.valid = false;
                }, error => {
                    this.$swal('Oops...', error, 'error');
                    this.valid = false;
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
   
    .jbtn-file {
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .jbtn-file input[type=file] {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    font-size: 100px;
    text-align: right;
    filter: alpha(opacity=0);
    opacity: 0;
    outline: none;
    cursor: inherit;
    display: block;
  }
</style>