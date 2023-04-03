<template>
  <div>
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="page-header">
        <Breadcrumbs main="Menus" title="Create Menu" />
      </div>
      <div class="row">
        <div class="col-sm-12">
          <div class="card">
            <div class="card-header">
              <h5>Add Menu</h5>
            </div>
            <div class="card-body">
              <form class="needs-validation">
                <div class="form-group row">
                  <label for="validationCustom0" class="col-xl-3 col-md-4"
                    ><span>*</span>Menu Name</label
                  >
                  <input
                    class="form-control col-md-8"
                    id="validationCustom0"
                    type="text"
                    v-model="name"
                  />
                </div>
                <div class="form-group row">
                  <label class="col-xl-3 col-md-4">Status</label>
                  <label class="d-block" for="chk-ani">
                          <input
                            class="checkbox_animated"
                            id="chk-ani"
                            type="checkbox"
                            v-model="status"
                          />
                          Enable the Menu
                  </label>
                </div>
                <button type="button" class="btn btn-primary d-block" @click="createMenu">
                  <span class="addHandler" v-if="isNotCreatingMenu"> Add</span>
                <div class="spinner-border spinner ml-1" v-if="isCreatingMenu" role="status"></div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid Ends-->
  </div>
</template>
<script>
import firebase from 'firebase';
export default {
  data() {
    return {
      isCreatingMenu: false,
      isNotCreatingMenu: true,
      name:'',
      status: null
    }
  },
  methods: {
    createMenu() {
     this.isCreatingMenu = true
     this.isNotCreatingMenu = false
     let menuData = {
        name: this.name,
        status: this.status
     }
      firebase
        .firestore()
        .collection('menu')
        .add(menuData)
        .then(() => {
          this.$toasted.show("Menu created successfully", {
               theme: "bubble",
               position: "top-right",
               type: "success",
               duration: 2000
        });
          this.$router.push('/menus/menu-list');
          this.isCreatingMenu = false
          this.isNotCreatingMenu = true
        }).catch(()=>{
          this.isCreatingMenu = false
          this.isNotCreatingMenu = true
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
.spinner{
  width: 20px;
  height: 20px;
  object-fit: contain;
 }
</style>