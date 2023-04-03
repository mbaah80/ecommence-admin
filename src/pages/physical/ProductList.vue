<template>
  <div>
      <!-- Container-fluid starts-->
      <div class="container-fluid">
        <div class="page-header">
          <Breadcrumbs main="Physical" title="Product List" />
        </div>
      </div>
      <!-- Container-fluid Ends-->

      <!-- Container-fluid starts-->
      <div class="container-fluid">
        <div class="row products-admin ratio_asos">
          <div class="col-sm-12">
          <div class="card">
            <div class="card-header">
              <h5>Products Details</h5>
            </div>
            <div class="card-body">
              <div class="table-responsive datatable-vue text-center">
                <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Product Code</th>
                        <th scope="col">Product Option</th>
                        <th scope="col">Category</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="product in productsData" :key="product.id">
                        <th scope="row">
                          <img :src="product.image" height="50px"  width="50px"/>
                        </th>
                        <td>{{product.title}}</td>
                        <td>{{product.price}}</td>
                        <td>{{ product.productQuantity }}</td>
                        <td>{{ product.productCode }}</td>
                        <td>{{ product.productOption }}</td>
                        <td>Electronics</td>
                        <td>
                          <!-- <a href="javascript:void(0)" class="btn btn-primary btn-sm mr-1" @click="editProduct(product.id)">Edit</a> -->
                          <b-button v-b-modal.modal-xl variant="default" @click="openModal(product.id)" ><i class="fa fa-pencil-square-o" aria-hidden="true"></i></b-button>
                          <a href="javascript:void(0)" @click="delProduct(product.id)" class="btn btn-default  ml-1">
                                          <span :class="`addHandler${product.id}`"> <i class="fa fa-trash" aria-hidden="true"></i></span>
                                          <div :class="`spinner-border spinner${product.id}`" role="status"></div>  
                                        </a>
                        </td>
                      </tr>
                      <tr v-if="productsData.length === 0"><td colspan="7" class="text-center mt-5">No Products Found</td></tr>
                    </tbody>
                </table>
            
              </div>
              <b-col md="12" class="my-1 p-0 pagination-justify">
                <b-pagination
                  v-model="currentPage"
                  :total-rows="productsData.length"
                  :per-page="perPage"
                  aria-controls="my-table"
                  class="mt-4"
                ></b-pagination>
              </b-col>
            </div>
          </div>
        </div>
        </div>
  
              <div>
                <b-modal id="modal-xl" @ok="updateProduct" size="xl" title="Update Product">
                  <div class="row product-adding">
                    <div class="col-xl-5">
                      <div class="add-product">
                        <div class="row">
                          <div class="col-xl-9 xl-50 col-sm-6 col-9">
                              <!--src="../../assets/images/pro3/33.jpg"-->
                            <img
                              src="../../assets/images/pro3/33.jpg"
                              class="img-fluid image_zoom_1 blur-up lazyloaded"
                            />
                          </div>
                          <div class="col-xl-3 xl-50 col-sm-6 col-3">
                            <ul class="file-upload-product">
                              <li >
                                <img :src="modalDataFetch.image" class="box-input-file" />
                                <feather
                                  style="cursor: pointer;"
                                  type="x"
                                  stroke-width="1"
                                  size="20px"
                                  class="icon"
                                  @click="removeImage(index)"
                                ></feather>
                              </li>
                              <li>
                                <div class="box-input-file">
                                  <input
                                    class="upload"
                                    type="file"
                                    @change="onFileChange"
                                  />
                                  <feather type="plus"></feather>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-xl-7">
                      <div class="needs-validation add-product-form" >
                        <div class="form">
                          <div class="form-group mb-3 row">
                            <label
                              for="validationCustom01"
                              class="col-xl-3 col-sm-4 mb-0"
                              >Title :</label
                            >
                            <input
                              class="form-control col-xl-8 col-sm-7"
                              id="validationCustom01"
                              type="text"
                              required=""
                              v-model="modalDataFetch.title"
                            />
                            <div class="valid-feedback">Looks good!</div>
                          </div>
                          <div class="form-group mb-3 row">
                            <label
                              for="validationCustom02"
                              class="col-xl-3 col-sm-4 mb-0"
                              >Price :</label
                            >
                            <input
                              class="form-control col-xl-8 col-sm-7"
                              id="validationCustom02"
                              type="text"
                              required=""
                              v-model="modalDataFetch.price"
                            />
                            <div class="valid-feedback">Looks good!</div>
                          </div>
                          <div class="form-group mb-3 row">
                            <label
                              for="validationCustomUsername"
                              class="col-xl-3 col-sm-4 mb-0"
                              >Product Code :</label
                            >
                            <input
                              class="form-control col-xl-8 col-sm-7"
                              id="validationCustomUsername"
                              type="text"
                              required=""
                              v-model="modalDataFetch.productCode"
                            />
                            <div class="invalid-feedback offset-sm-4 offset-xl-3">
                              Please choose Valid Code.
                            </div>
                          </div>
                        </div>
                        <div class="form">
                          <div class="form-group row">
                            <label
                              for="exampleFormControlSelect1"
                              class="col-xl-3 col-sm-4 mb-0"
                              >Select Size :</label
                            >
                            <select
                              class="form-control digits col-xl-8 col-sm-7"
                              id="exampleFormControlSelect1"
                              v-model="modalDataFetch.productOption"
                            >
                              <option value="small">Small</option>
                              <option value="medium">Medium</option>
                              <option value="large">Large</option>
                              <option value="extralarge">Extra Large</option>
                            </select>
                          </div>
                          <div class="form-group row">
                            <label class="col-xl-3 col-sm-4 mb-0"
                              >Total Products :</label
                            >
                            <fieldset
                              class="qty-box col-xl-9 col-xl-8 col-sm-7 pl-0 qty-responsive"
                            >
                              <div class="input-group">
                                <b-input-group-prepend>
                                  <b-btn variant="primary" @click="decrement"
                                    >-</b-btn
                                  >
                                </b-input-group-prepend>
                                <b-input
                                  type="text"
                                  name="quantity"
                                  class="form-control input-number"
                                  v-model="modalDataFetch.productQuantity"
                                />
                                <b-input-group-append>
                                  <b-btn variant="primary" @click="modalDataFetch.productQuantity++"
                                    >+</b-btn
                                  >
                                </b-input-group-append>
                              </div>
                            </fieldset>
                          </div>
                          <div class="form-group row">
                            <label class="col-xl-3 col-sm-4"
                              >Add Description :</label
                            >
                            <div class=" col-xl-8 col-sm-7 editor-vue">
                              <vue-editor v-model="modalDataFetch.productDescription"></vue-editor>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </b-modal>
              </div>
      </div>
      <!-- Container-fluid Ends-->
  </div>
</template>

<script>
import firebase from 'firebase'
import $ from 'jquery';
import Modal from '@/components/modals/globalCategoryModal'

export default {
  components:{
    Modal
  },
  data(){
    return{
      productsData:[],
      modalDataFetch:{},
      currentPage:0,
      perPage:5,

    }
  },
  methods: {
      getProducts(){
        let db = firebase.firestore();
        db.collection("products").where("userId", "==", localStorage.getItem('user')).get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              let products = doc.data()
              products.id = doc.id;
              this.productsData.push(products)
            });
          })
        .catch((error)=>{
          console.log(error)
        })
      },
      delProduct(id){
        $('.spinner'+id).show()
        $('.addHandler'+id).hide()
        let db = firebase.firestore();
        db.collection("products").doc(id).delete().then(() => {
          $('.spinner'+id).hide()
          $('.addHandler'+id).show()
          this.$toasted.show("Product successfully deleted!", {
               theme: "bubble",
               position: "top-right",
               type: "success",
               duration: 2000
        });
        this.productsData = this.productsData.filter((product)=>{
          return product.id != id
        })
        }).catch((error) => {
          $('.spinner'+id).hide()
          $('.addHandler'+id).show()
          this.$toasted.show("Error deleting product!", {
               theme: "bubble",
               position: "top-right",
               type: "error",
               duration: 2000
        });
        });
      },
      updateProduct(){
        let db = firebase.firestore();
        db.collection("products").doc(this.modalDataFetch.id).update({
          title: this.modalDataFetch.title,
          price: this.modalDataFetch.price,
          productQuantity: this.modalDataFetch.productQuantity,
          productCode: this.modalDataFetch.productCode,
          productOption: this.modalDataFetch.productOption,
          image: this.modalDataFetch.image,
          userId: localStorage.getItem('user')
        })
        .then((doc) => {
          console.log(doc)
          this.$toasted.show("Product successfully updated!", {
               theme: "bubble",
               position: "top-right",
               type: "success",
               duration: 2000
        });
        this.productsData = this.productsData.filter((product)=>{
          return product.id != this.modalDataFetch.id
        })
        this.getProducts()
        this.$bvModal.hide('modal-xl')
        })
        .catch((error) => {
          this.$toasted.show("Error updating product!", {
               theme: "bubble",
               position: "top-right",
               type: "error",
               duration: 2000
        });
        });
      },
      openModal(id) {
        let db = firebase.firestore();
        db.collection("products").doc(id).get()
          .then((doc) => {
            this.modalDataFetch = doc.data()
            this.modalDataFetch.id = doc.id;
            this.$bvModal.show('modal-xl');
          })
    },
    closeModal() {
      this.$bvModal.hide('modal-xl');
    },
    decrement() {
      if (this.modalDataFetch.productQuantity > 1) this.modalDataFetch.productQuantity--;
    },
    onFileChange(e) {
      var files = e.target.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },

    createImage(file) {
      $('.spinner').show()
      $('.addHandler').hide()
      var reader = new FileReader();
      reader.onload = e => {
        var storageRef = firebase.storage().ref();
        var filename = new Date().getTime() + '-' + file.name;
        var imageRef = storageRef.child('images/' + filename);
        this.image.push(e.target.result);
        imageRef.putString(e.target.result, 'data_url')
          .then(snapshot => {
            $('.spinner').hide()
            $('.addHandler').show()
            return snapshot.ref.getDownloadURL();
          })
          .then(downloadURL => {
            this.getImgUrl = downloadURL
            this.$toasted.show("Product image uploaded successfully", {
               theme: "bubble",
               position: "top-right",
               type: "success",
               duration: 2000
        });
          })
          .catch(error => {
            this.$toasted.show("Error uploading image", {
               theme: "bubble",
               position: "top-right",
               type: "success",
               duration: 2000
        });
          });
      };
      reader.readAsDataURL(file);
    },

    removeImage: function(index) {
      console.log("index", index);
      this.image.splice(index, 1);
      //  this.image = "";
    },
  },
  mounted(){
    this.getProducts()
  }
};
</script>

<style scoped>
table.text-center * {
  text-align: left;
}
.spinner-border{
  width: 20px;
  height: 20px;
  object-fit: contain;
 }
 .spinner-border{
  display:none;
 }
</style>