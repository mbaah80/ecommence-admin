<template>
  <div>
    <div class="container-fluid">
      <div class="page-header">
        <Breadcrumbs main="Vendors" title="Vendor Lists" />
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Vendor Detail</h5>
            </div>
            <div class="card-body">
              <b-row>
                <b-col xl="3" lg="4" md="6">
                  <b-form-group
                    label-cols="2"
                    label="show"
                    class="datatable-select"
                  >
                    <b-form-select
                      v-model="perPage"
                      :options="pageOptions"
                    ></b-form-select>
                  </b-form-group>
                </b-col>
                <b-col class="offset-xl-6 offset-lg-2 search-rs" xl="3" lg="5" md="6">
                  <b-form-group
                    label-cols="3"
                    label="search:"
                    class="datatable-select"
                  >
                    <b-form-input
                      type="text"
                      v-model="filter"
                      placeholder="Search"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <div class="table-responsive datatable-vue">
                <div>
                  <b-modal id="modal-1" title="Confirmation">
                    <p class="my-4">Are you sure!</p>
                  </b-modal>
                </div>
                <b-table
                  class="text-center"
                  show-empty
                  striped
                  hover
                  head-variant="light"
                  bordered
                  stacked="md"
                  :items="items"
                  :fields="tablefields"
                  :filter="filter"
                  :current-page="currentPage"
                  :per-page="perPage"
                  @filtered="onFiltered"
                  @row-selected="rowSelected"
                >
                  <template #cell(image)="field">
                    <div class="d-flex vendor-list">
                     <img  class="img-fluid img-40 rounded-circle"
                      :src="getImgUrl(field.item.images)"
                    />
                    <span>{{ field.item.name }}</span>
                    </div>
                  </template>
                  <template #cell(status) v-for="(item, index) in items">
                    <feather
                      v-if="item.status == true"
                      :key="index"
                      type="circle"
                      stroke="#81BA01"
                      stroke-width="1"
                      size="12px"
                      :fill="
                        item.status == true
                          ? '#81BA01'
                          : item.status == false
                          ? '#FBBC58'
                          : ''
                      "
                      stroke-linejoin="round"
                    ></feather>
                  </template>
                  <template #cell(actions)>
                    <feather
                      type="edit"
                      stroke="#95C34F"
                      stroke-width="1"
                      size="12px"
                      stroke-linejoin="round"
                    ></feather>
                    <feather
                      type="trash-2"
                      class="font-danger"
                      size="12px"
                    ></feather>
                  </template>
                  <b-table-column v-slot:cell(delete)>
                    <a href="#">edit</a>
                    <a href="#"> remove</a>
                  </b-table-column>
                </b-table>
              </div>
              <b-col md="12" class="my-1 p-0 pagination-justify">
                <b-pagination
                  v-model="currentPage"
                  :total-rows="totalRows"
                  :per-page="perPage"
                  aria-controls="my-table"
                  class="mt-4"
                  first-text="First"
                  prev-text="Prev"
                  next-text="Next"
                  last-text="Last"
                >
                </b-pagination>
              </b-col>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      modes: ["multi", "single", "range"],
      tablefields: [
        { key: "image", label: "Vendor", sortable: true },
        { key: "products", label: "Products", sortable: true },
        { key: "storeName", label: "Store Name", sortable: true },
        { key: "startdate", label: "Create Date", sortable: true },
        { key: "walletBalance", label: "Wallet Balance", sortable: true },
        { key: "revenue", label: "Revenue", sortable: true },
        { key: "actions" }
      ],

      filter: null,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15],
      selectMode: "multi"
    };
  },
  created() {
    this.$store.dispatch("vendor/getVendors");
  },

  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  computed: {
    ...mapGetters({
      items: "vendor/getVendors"
    }),
    sortOptions() {
      // Create an options list from our fields
      return this.tablefields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    },
    selectedRows() {
      return this.items.filter(item => item.delete);
    }
  },
  methods: {
    getImgUrl(path) {
      return require("@/assets/images/users/" + path);
    },
    rowSelected(item) {
      this.selected = item;
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    clearSelected() {
      console.log("button clicked");
      this.selectedRows.forEach(item => {
        console.log("item", item);
        this.selectedRows.splice(item, 1);
        this.$delete(item, "delete");
      });
    }
  }
};
</script>