<template>
  <div>
    <div class="container-fluid">
      <div class="page-header">
        <Breadcrumbs main="Pages" title="create page" />
      </div>
    </div>
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <div class="card tab2-card">
        <div class="card-header">
          <h5>Add Page</h5>
        </div>
        <div class="card-body">
          <b-tabs content-class="mt-3 nav nav-tabs tab-coupon">
            <b-tab title="General" active>
              <div
                class="tab-pane fade active show"
                id="general"
                role="tabpanel"
                aria-labelledby="general-tab"
              >
                <form class="needs-validation">
                  <div class="form-group row">
                    <label for="validationCustom0" class="col-xl-3 col-md-4"
                      ><span>*</span> Name</label
                    >
                    <input
                      class="form-control col-xl-8 col-md-7"
                      id="validationCustom0"
                      type="text"
                      v-model="pageData.name"
                    />
                  </div>
                  <div class="form-group row editor-label">
                    <label class="col-xl-3 col-md-4"
                      ><span>*</span> Description</label
                    >
                    <div class="col-xl-8 col-md-7 editor-space">
                      <vue-editor v-model="pageData.description"></vue-editor>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-xl-3 col-md-4">Status</label>
                
                     <label class="d-block" for="chk-ani">
                          <input
                            class="checkbox_animated"
                            id="chk-ani"
                            type="checkbox"
                            v-model="pageData.status"
                          />
                          Enable the Page
                     </label>
                  </div>
                </form>
              </div>
            </b-tab>
            <b-tab title="SEO" active>
              <form class="needs-validation">
                <h4>SEO</h4>
                <div class="form-group row">
                  <label for="validationCustom2" class="col-xl-3 col-md-4"
                    >Meta Title</label
                  >
                  <input
                    class="form-control col-xl-8 col-md-7"
                    id="validationCustom2"
                    type="text"
                    v-model="pageData.metaTitle"
                  />
                </div>
                <div class="form-group row editor-label">
                  <label class="col-xl-3 col-md-4">Meta Description</label>
                  <textarea rows="4" class="col-xl-8 col-md-7" v-model="pageData.metaDescription"></textarea>
                </div>
              </form>
            </b-tab>
          </b-tabs>
          <div class="pull-right">
            <button type="button" class="btn btn-primary" @click="onComplete">
              <span class="addHandler" v-if="isNotCreatingPage"> Add</span>
                <div class="spinner-border spinner ml-1" v-if="isCreatingPage" role="status"></div>
            </button>
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
import firebase from "firebase";
export default {
  data() {
    return {
      isCreatingPage:false,
      isNotCreatingPage:true,
      pageData:{
        metaTitle:'',
        metaDescription:'',
        name:'',
        description:'<h1>Some initial content</h1>',
        status:''
      }
    };
  },
  methods: {
    onComplete() {
      this.isCreatingPage = true
     this.isNotCreatingPage = false
      firebase
        .firestore()
        .collection('pages')
        .add(this.pageData)
        .then(() => {
          this.$toasted.show("Page created successfully", {
               theme: "bubble",
               position: "top-right",
               type: "success",
               duration: 2000
        });
          this.$router.push('/pages/page-list');
          this.isCreatingPage = false
          this.isNotCreatingPage = true
        }).catch(()=>{
          this.isCreatingPage = false
          this.isNotCreatingPage = true
          this.$toasted.show("opps something is wrong", {
               theme: "bubble",
               position: "top-right",
               type: "error",
               duration: 2000
        });
        })
    }
  }
};
</script>
<style scoped>

</style>