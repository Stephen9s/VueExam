<template>
    <div class="container-fluid">
        <div class="row mt-2">
            <div class="col-md-3">
                <div class="form-group">
                    <textarea class="form-control" rows="5" v-model="rawJSON" v-json-formatted="rawJSON"></textarea>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <div class="btn-group">
                            <button class="btn btn-primary" @click="validateRawJSON" v-if="!valid">Validate</button>
                            <button class="btn btn-success" @click="addRawExam" v-else>Submit</button>
                            <button class="btn btn-warning" @click="resetRawUpload">Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-2"><div class="col-md-2"><h3>OR</h3></div></div>
        <div class="row mt-2">
            <div class="col-md-6">
                <div class="form-group">
                    <input ref="upload" type="file" id="files" name="files[]" />                  
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <div class="btn-group">
                            <button class="btn btn-primary" @click="onFileChange">Load</button>
                            <button class="btn btn-warning" @click="resetUpload">Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                json: {},
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
            resetUpload() {
                this.json = {};
                this.$refs.upload.value = '';
            },
            load(file) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    if (this.json = this.validateJSON(e.target.result)) {
                        this.addExam();
                    }
                };
                reader.readAsText(file);
            },
            onFileChange(e) {
                var files = this.$refs.upload.files || this.$refs.upload.dataTransfer.files;
                if (!files.length)
                    return;
                this.load(files[0]);
            },
            addRawExam() {
                return this.$store.commit('pushExamToBank', JSON.parse(this.rawJSON));
            },
            addExam() {
                return this.$store.commit('pushExamToBank', this.json);
            }
        }
    }
</script>

<style lang="scss" scoped>
    button {
        width:100px;
    }
</style>