<template>
  <div>
    <div class="container-fluid">
      <div class="page-header">
        <Breadcrumbs main="Physical" title="Category" />
      </div>
      <div class="row">
        <div class="col-sm-12">
          <div class="card">
            <div class="card-header">
              <h5>Category List</h5>
            </div>
            
            <div class="card-body">
              <b-button v-b-modal.modal-1 variant="primary" class="ml-auto modalButton">Add Category</b-button>
              <div class="table-responsive datatable-vue cat-physical mt-10">
                <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Image</th>
                        <th scope="col" >Name</th>
                        <th scope="col" >Category</th>
                        <th scope="col" >Status</th>
                        <th scope="col" >Quantity(Product Total)</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="cat in category" :key="cat.id">
                        <th scope="row">
                          <img :src="cat.image" height="50px"  width="50px"/>
                        </th>
                        <td >{{cat.title}}</td>
                        <td >{{cat.title}}</td>
                        <td >{{cat.title}}</td>
                        <td >{{cat.title}}</td>
                        <td>
                          <b-button v-b-modal.modal-xl variant="default" @click="openModal(cat.id)" ><i class="fa fa-pencil-square-o" aria-hidden="true"></i></b-button>
                          <a href="javascript:void(0)" @click="delCat(cat.id)" class="btn btn-default  ml-1">
                                          <span :class="`addHandler${cat.id}`"> <i class="fa fa-trash" aria-hidden="true"></i></span>
                                          <div :class="`spinner-border spinner${cat.id}`" role="status"></div>  
                                        </a>
                        </td>
                      </tr>
                      <tr v-if="category.length === 0"><td colspan="7" class="text-center mt-5">No Data Found</td></tr>
                    </tbody>
                  </table>
              </div>
              <b-col md="12" class="my-1 pagination-justify p-0">
                <b-pagination
                  v-model="currentPage"
                  :total-rows="totalRows"
                  :per-page="perPage"
                  aria-controls="my-table"
                  class="mt-4"
                ></b-pagination>
              </b-col>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-popup pull-right">
    <b-modal
      id="modal-1"
      title="Category Modal"
      @ok="onSave"
      ok-title="Save"
      ok-variant="primary"
    >
      <form class="needs-validation">
        <div class="form">
          <div class="form-group">
            <label for="validationCustom01" class="mb-1">Category Name :</label>
            <input
              class="form-control"
              id="validationCustom01"
              type="text"
              v-model="name"
            />
          </div>
          <div class="form-group mb-0">
            <label for="validationCustom02" class="mb-1"
              >Category Image :</label
            >
            <input class="form-control" id="validationCustom02" type="file" />
          </div>
        </div>
      </form>
    </b-modal>
  </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "category",
  data() {
    return {
     category:[],
      name: "",
      image: ""
    };
  },
 
  mounted() {
    this.getCategories();
  },
  methods: {
    async getCategories() {
      const db = firebase.firestore();
      const category = await db.collection("category").get();
      this.category = category.docs.map((doc) => doc.data());
    },
    onSave(){
       let db = firebase.firestore();
        db.collection("category").add({
          title: this.name,
          image: this.image
        }).then((docRef)=>{
          this.name = "";
          this.$toasted.show("Category uploaded successfully", {
               theme: "bubble",
               position: "top-right",
               type: "success",
               duration: 2000
        });
        }).catch(function(error) {
        this.$toasted.show("oops unsuccessful upload", {
               theme: "bubble",
               position: "top-right",
               type: "error",
               duration: 2000
             });
      });
    },
  }
};
</script>

<style lang="scss" scoped>
table.text-center * {
  text-align: center;
}
.spinner-border{
  width: 20px;
  height: 20px;
  object-fit: contain;
 }
 .spinner-border{
  display:none;
 }
 .modalButton{
  margin-bottom:40px;
  float: right;
 }
</style>

