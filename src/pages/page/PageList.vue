<template>
  <div>
    <div class="container-fluid">
      <div class="page-header">
        <Breadcrumbs main="Pages" title="Pages List" />
      </div>
    </div>
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Page Detail</h5>
            </div>
            <div class="card-body">
              <div class="table-responsive datatable-vue">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="pages in paginatedPages" :key="pages.id" >
                      <td>{{ pages.name }}</td>
                      <td >
                        <div v-if="pages.status === true" class="badge badge-success">Active</div>
                        <div v-else class="badge badge-danger">Inactive</div>
                      </td>
                      <td>
                        <a href="javascript:void(0)" @click="delPage(pages.id)" class="btn btn-danger  ml-1">
                          <span :class="`addHandler${pages.id}`"> <i class="fa fa-trash" aria-hidden="true"></i></span>
                          <div :class="`spinner-border spinner${pages.id} ml-1`" role="status"></div>
                        </a>
                      </td>
                    </tr>
                    <tr v-if="pages.length === 0">
                      <td colspan="7" class="text-center mt-5">No Pages Found</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <b-col md="12" class="my-1 p-0 pagination-justify">
                <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage"
                  aria-controls="my-table" @input="updateTable"></b-pagination>
              </b-col>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid Ends-->
  </div>
</template>
<script>
import firebase from 'firebase'
import $ from 'jquery';

export default {

  data() {
    return {
      pages: [],
      perPage: 10, 
      rows: 0, 
      startIndex: 0, 
      endIndex: 10, 
      currentPage: 1
    };
  },
  mounted() {
    this.totalRows = this.pages.length;
    this.getPage()
  },
  computed: {
  paginatedPages: function() {
    const start = (this.currentPage - 1) * this.perPage;
    const end = start + this.perPage;
    return this.pages.slice(start, end);
  }
},
  methods: {
    getPage() {
      firebase.firestore().collection('pages').get().then((snapshot) => {
        snapshot.forEach((doc) => {
          let page = doc.data()
          page.id = doc.id
          this.pages.push(page)
          this.rows = this.pages.length;
        })
      })
    },
    delPage(id) {
      $('.spinner' + id).show()
      $('.addHandler' + id).hide()
      firebase
        .firestore()
        .collection("pages").doc(id).delete().then(() => {
          this.$toasted.show("Page successfully deleted!", {
            theme: "bubble",
            position: "top-right",
            type: "success",
            duration: 2000
          });
          this.pages = this.pages.filter((page) => {
            return page.id != id
          })
          this.rows = this.pages.length;
          $('.spinner' + id).hide()
          $('.addHandler' + id).show()
        }).catch((error) => {
          $('.spinner' + id).hide()
          $('.addHandler' + id).show()
          this.$toasted.show("Error deleting Coupon!", {
            theme: "bubble",
            position: "top-right",
            type: "error",
            duration: 2000
          });
        });
    },
    updateTable() {
    this.startIndex = (this.currentPage - 1) * this.perPage;
    this.endIndex = this.startIndex + this.perPage;
  },
  }
};
</script>

<style lang="scss" scoped>
table.text-center * {
  text-align: center;
}
.spinner-border {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.spinner-border {
  display: none;
}

.pagination {
  display: flex;
  justify-content: center;
  float: right;
}

.page-item {
  margin: 0 5px;
}
</style>