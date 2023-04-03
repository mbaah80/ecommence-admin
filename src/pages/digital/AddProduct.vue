<template>
  <div>
    <div class="container-fluid">
        <div class="page-header">
          <Breadcrumbs main="Digital" title="Add Products" />
        </div>
        <div class="row product-adding">
         <!-- start -->
          <div class="col-xl-6">
            <div class="card">
              <div class="card-header">
                <h5>General</h5>
              </div>
              <div class="card-body">
                  <div class="digital-add needs-validation">
                    <div class="form-group">
                      <label
                        for="validationCustom01"
                        class="col-form-label pt-0"
                        ><span>*</span> Title</label
                      >
                      <ValidationProvider
                        name="title"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <input
                          class="form-control"
                          id="validationCustom01"
                          type="text"
                          v-model="form.title"
                          required=""
                        />
                        <span
                          class="block text-danger text-xs absolute bottom-0 left-0"
                          >{{ errors[0] }}</span
                        >
                      </ValidationProvider>
                    </div>
                    <div class="form-group">
                      <label
                        for="validationCustomtitle"
                        class="col-form-label pt-0"
                        ><span>*</span> SKU</label
                      >
                      <input
                        class="form-control"
                        id="validationCustomtitle"
                        type="text"
                        required=""
                      />
                    </div>
                    <div class="form-group">
                      <label class="col-form-label"
                        ><span>*</span> Categories</label
                      >
                      <select class="custom-select" required="">
                        <option value="">--Select--</option>
                        <option value="1">eBooks</option>
                        <option value="2">Graphic Design</option>
                        <option value="3">3D Impact</option>
                        <option value="4">Application</option>
                        <option value="5">Websites</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label class="col-form-label">Sort Summary</label>
                      <textarea rows="5" cols="12"></textarea>
                    </div>
                    <div class="form-group">
                      <label for="validationCustom02" class="col-form-label"
                        ><span>*</span> Product Price</label
                      >
                      <input
                        class="form-control"
                        id="validationCustom02"
                        type="text"
                        required=""
                      />
                    </div>
                    <div class="form-group">
                      <label class="col-form-label"
                        ><span>*</span> Status</label
                      >
                      <div
                        class="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated"
                      >
                        <label class="d-block" for="edo-ani">
                          <input
                            class="radio_animated"
                            id="edo-ani"
                            type="radio"
                            name="rdo-ani"
                          />
                          Enable
                        </label>
                        <label class="d-block" for="edo-ani1">
                          <input
                            class="radio_animated"
                            id="edo-ani1"
                            type="radio"
                            name="rdo-ani"
                          />
                          Disable
                        </label>
                      </div>
                    </div>
                    <label class="col-form-label pt-0"> Product Upload</label>
                    <vue-dropzone
                      id="singledropzone"
                      :options="singledropzoneOptions"
                      class="dropzone digits"
                    >
                    </vue-dropzone>
                  </div>
                  <!-- form end working -->
              </div>
            </div>
          </div>
          <div class="col-xl-6">
            <div class="card">
              <div class="card-header">
                <h5>Add Description</h5>
              </div>
              <div class="card-body">
                <div class="digital-add needs-validation">
                  <div class="md-12">
                    <vue-editor v-model="content"></vue-editor>
                  </div>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-header">
                <h5>Meta Data</h5>
              </div>
              <div class="card-body">
                <div class="digital-add needs-validation">
                  <div class="form-group">
                    <label for="validationCustom05" class="col-form-label pt-0">
                      Meta Title</label
                    >
                    <input
                      class="form-control"
                      id="validationCustom05"
                      type="text"
                      required=""
                    />
                  </div>
                  <div class="form-group">
                    <label class="col-form-label">Meta Description</label>
                    <textarea rows="4" cols="12"></textarea>
                  </div>
                  <div class="form-group mb-0">
                    <div class="product-buttons text-center">
                      <button type="button" class="btn btn-primary">
                        Add
                      </button>
                      <button type="button" class="btn btn-light ml-1">
                        Discard
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    <!-- Container-fluid Ends-->
  </div>
</template>

<script>
// Import the editor
//import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  components: {
    //ckeditor: CKEditor.component
  },
  data() {
    return {
      form: {
        title: "  "
      },
      editor: ClassicEditor,
      editorData: "<p>Dummy data fro ck Edit</p>",
      singledropzoneOptions: {
        url: "http://localhost:8080",
        thumbnailWidth: 150,
        maxFiles: 1,
        maxFilesize: 2,
        addRemoveLinks: true,
        dictDefaultMessage:
          "<i class='icon-cloud-up'></i><h6>Drop files here or click to upload.</h6><span>(This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)</span>"
      },
      content: "<h1>Some initial content</h1>"
    };
  }
};
</script>
<style scoped>
 .ck-content { height:500px; }

</style>