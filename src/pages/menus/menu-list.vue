<template>
  <div>
    <div class="container-fluid">
      <div class="page-header">
        <Breadcrumbs main="Menus" title="Menu Lists" />
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Menu List</h5>
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
                    <tr v-for="menu in paginatedMenus" :key="menu.id" >
                      <td>{{ menu.name }}</td>
                      <td v-if="menu.status === true">
                        <div class="badge badge-success">Active</div>
                      </td>
                      <td v-else>
                        <div class="badge badge-danger">Inactive</div>
                      </td>
                      <td>
                        <a href="javascript:void(0)" @click="delMenu(menu.id)" class="btn btn-danger  ml-1">
                          <span :class="`addHandler${menu.id}`"> <i class="fa fa-trash" aria-hidden="true"></i></span>
                          <div :class="`spinner-border spinner${menu.id} ml-1`" role="status"></div>
                        </a>
                      </td>
                    </tr>
                    <tr v-if="menus.length === 0">
                      <td colspan="7" class="text-center mt-5">No Menu Found</td>
                    </tr>
                  </tbody>
                </table>
                <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage"
                  aria-controls="my-table" @input="updateTable"></b-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import $ from 'jquery';

export default {

  data() {
    return {
      menus: [],
      perPage: 10, 
      rows: 0, 
      startIndex: 0, 
      endIndex: 10, 
      currentPage: 1
    };
  },
  mounted() {
    this.totalRows = this.menus.length;
    this.getMenu()
  },
  computed: {
  paginatedMenus: function() {
    const start = (this.currentPage - 1) * this.perPage;
    const end = start + this.perPage;
    return this.menus.slice(start, end);
  }
},
  methods: {
    getMenu() {
      firebase.firestore().collection('menu').get().then((snapshot) => {
        snapshot.forEach((doc) => {
          let menu = doc.data()
          menu.id = doc.id
          this.menus.push(menu)
          this.rows = this.menus.length;
        })
      })
    },
    delMenu(id) {
      $('.spinner' + id).show()
      $('.addHandler' + id).hide()
      firebase
        .firestore()
        .collection("menu").doc(id).delete().then(() => {
          this.$toasted.show("Menu successfully deleted!", {
            theme: "bubble",
            position: "top-right",
            type: "success",
            duration: 2000
          });
          this.menus = this.menus.filter((menu) => {
            return menu.id != id
          })
          this.rows = this.menus.length;
          $('.spinner' + id).hide()
          $('.addHandler' + id).show()
        }).catch((error) => {
          $('.spinner' + id).hide()
          $('.addHandler' + id).show()
          this.$toasted.show("Error deleting menu!", {
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