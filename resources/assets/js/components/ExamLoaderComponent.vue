<template>
    <div class="container-fluid" style="height:500px;">
        <!-- <form @submit.prevent="load"> -->
            <div class="form-group">
                <label for="exampleTextarea">Example textarea</label>
                <pre class="pre-scrollable">{{ json | prettify }}</pre>
            </div>
            <div class="form-group">
                <input ref="upload" type="file" id="files" name="files[]" @change="onFileChange" />
                <button class="btn btn-primary" @click="resetUpload">Reset</button>
            </div>
        <!-- </form> -->
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        data() {
            return {
                json: {}
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
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.load(files[0]);
            },
            addExam() {
                return this.$store.commit('pushExamToBank', this.json);
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>