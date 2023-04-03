<template>
  <div>
    <div class="container-fluid">
      <div class="page-header">
        <Breadcrumbs main="Physical" title="Sub Category" />
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Products Sub Category</h5>
            </div>
            <div class="card-body">
              <GlobalCategoryModal @formData="formData"></GlobalCategoryModal>
              <!-- serach bar -->
              <div class="row">
                <div class="col-md-12">
                  <div class="card"></div>
                </div>
              </div>
              <div class="table-responsive datatable-vue  product-physical">
                <b-modal id="modal-2" title="Confirmation" @ok="deleteRow(selectedSku)">
                  <p class="my-4">Are you sure!</p>
                </b-modal>
                <b-table
                  :select-mode="selectMode"
                  class="text-center"
                  striped
                  hover
                  head-variant="light"
                  bordered
                  show-empty
                  stacked="md"
                  :items="items"
                  :fields="tablefields"
                  :filter="filter"
                  :current-page="currentPage"
                  :per-page="perPage"
                  @filtered="onFiltered"
                  :selectable="true"
                  @row-selected="rowSelected"
                >
                  <template
                    v-for="(field, index) in tablefields"
                    :slot="field.key"
                    slot-scope="data"
                  >
                    <b-form-input
                      :key="index"
                      class="border-0 no-shadow p-1"
                      type="text"
                      v-model="data.item[key]"
                    ></b-form-input>
                  </template>
                  <template #cell(status)="field">
                    <statusIcon :field="field"></statusIcon>
                  </template>
                  <template #cell(image)="field">
                    <img
                      height="50px"
                      :src="getImgUrl(field.item.image)"
                      width="50px"
                    />
                  </template>

                  <template v-slot:cell()="{ value, item, field: { key } }">
                    <template v-if="edit != item.sku">{{ value }}</template>
                    <b-form-input type="text" v-else v-model="item[key]" />
                  </template>
                  <template v-slot:cell(actions)="{ item: { sku } }">
                  <span
                      style="font-size: 20px; color: blue;"
                      v-if="edit != sku && sku !== null"
                      @click="onEdit(sku)"
                    >
                      <feather
                                type="edit-2"
                                stroke="#3758FD"
                                stroke-width="1"
                                size="18px"
                                fill="#3758FD"
                                stroke-linejoin="round"
                              ></feather>
                    </span>
                    <span
                      v-if="edit != sku"
                      v-b-modal.modal-2
                      @click="getIndex(sku)"
                      style="font-size: 20px; color: #FA399F;"
                    >
                      <feather
                        type="trash"
                        stroke="#F72E9F"
                        size="18px"
                        fill="#F72E9F"
                      ></feather>
                    </span>
                    <feather
                      v-if="edit === sku && sku !== ''"
                      size="18px"
                      stroke="#39CCC6"
                      stroke-width="5"
                      type="check"
                      @click="onSave(sku)"
                    ></feather>
                    <feather
                      stroke="#F7299D"
                      size="18px"
                      stroke-width="5"
                      v-if="edit === sku && sku !== ''"
                      type="x"
                      @click="doCancel(sku)"
                    ></feather>
                    <feather
                      stroke="#F7299D"
                      size="18px"
                      stroke-width="5"
                      v-if="save && sku == ''"
                      type="save"
                      @click="onSave(sku)"
                    ></feather>
                  </template>
                  <template v-slot:head(actions)>
                    <feather
                      v-if="!add"
                      type="plus"
                      stroke="#4050F6"
                      stroke-width="6"
                      size="22px"
                      fill="#4050F6"
                      @click="addRecord()"
                    ></feather>
                    <feather
                      v-if="add"
                      type="search"
                      stroke-width="6"
                      size="22px"
                      @click="searchData()"
                    ></feather>
                  </template>
                </b-table>
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import statusIcon from "../../components/featherIcons/status-icon.vue";

export default {
  name: "sub-category",
  components: { statusIcon },
  data() {
    return {
      tablefields: [
        { key: "image", label: "image", sortable: true },
        { key: "name", label: "Name", sortable: true },
        { key: "price", label: "Price", sortable: true },
        { key: "status", label: "Status", sortable: true },
        { key: "category", label: "Sub Category", sortable: true },
        { key: "actions", class: "text-center" }
      ],
      selectMode: "single",
      filter: null,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      add: false,
      save: false,
      edit: null,
      item: "",
      selectedSku : "",
      index: null
    };
  },
  created() {
    this.$store.dispatch("product/getSubCategoryProduct");
  },
  computed: {
    ...mapGetters({
      items: "product/getSubCategoryProduct"
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
    //getItems() {}
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  methods: {
    getImgUrl(path) {
      return require("@/assets/images/dashboard/product/" + path);
    },
    getIndex(sku) {
      this.selectedSku = sku
    },
    formData(e) {
      console.log("form data", e);
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    onEdit(sku) {
      if (sku !== "undefined") {
        this.edit = this.edit !== sku ? sku : null;
      }
    },
    onSave(sku) {
      this.save = false;
      this.add = false;
      this.edit = 1000;
      //  this.edit = ''
    },
    doCancel(sku) {
      this.edit = null;
      this.item = null;
    },
    deleteRow(sku) {
      this.items.splice(this.items.findIndex(e => e.sku === sku),1);
    },
    rowSelected(item) {
      if (item[0]) {
        this.edit = this.edit !== item[0].sku ? item[0].sku : null;
      }
    },
    addRecord() {
      this.add = true;
      this.items.unshift({
        sku: '',
        image: "main.jpg",
        name: "",
        price: "",
        category: "",
        actions: ""
      });
      this.edit = "";
      this.save = true;
    },
    searchData() {
      this.add = false;
      this.items.splice(0, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
table.text-center * {
  text-align: center;
}
</style>>