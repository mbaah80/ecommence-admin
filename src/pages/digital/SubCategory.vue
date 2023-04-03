<template>
  <div>
    <div class="container-fluid">
      <div class="page-header">
        <Breadcrumbs main="Digital" title="Sub Category" />
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Digital Sub Category</h5>
            </div>
            <div class="card-body">
              <GlobalCategoryModal
                @formData="formData"
                categoryType="digital"
              />
              <div class="table-responsive datatable-vue product-physical">
                <b-modal id="modal-2" title="Confirmation" @ok="deleteRow(selectedSku)">
                  <p class="my-4">Are you sure!</p>
                </b-modal>
                <b-table
                  striped
                  hover
                  class="text-center"
                  bordered
                  show-empty
                  stacked="md"
                  head-variant="light"
                  :items="items"
                  :fields="tablefields"
                  :filter="filter"
                  :current-page="currentPage"
                  :per-page="perPage"
                  :select-mode="selectMode"
                  :selectable="true"
                  @row-selected="rowSelected"
                  @filtered="onFiltered"
                >
                  <template #cell(status)="field">
                    <statusIcon :field="field"></statusIcon>
                  </template>
                  <template #cell(image)="field">
                    <img
                      height="50px"
                      :src="getImgUrl(field.item.images)"
                      width="50px"
                    />
                  </template>
                  <template v-slot:head(actions)>
                    <feather
                      type="plus"
                      stroke="#3758FD"
                      stroke-width="6"
                      size="22px"
                      fill="#3758FD"
                    ></feather>
                  </template>
                  <template v-slot:cell()="{ value, item, field: { key } }">
                    <template v-if="edit != item.id">{{ value }}</template>
                    <b-form-input type="text" v-else v-model="item[key]" />
                  </template>
                  <template v-slot:cell(actions)="{ item: { id } }">
                    <span
                      style="font-size: 20px; color: blue;"
                      v-if="edit != id && id !== null"
                      @click="onEdit(id)"
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
                      v-if="edit != id"
                      v-b-modal.modal-2
                      @click="getIndex(id)"
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
                      v-if="edit === id && id !== ''"
                      size="18px"
                      stroke="#39CCC6"
                      stroke-width="5"
                      type="check"
                      @click="onSave(id)"
                    ></feather>
                    <feather
                      stroke="#F7299D"
                      size="18px"
                      stroke-width="5"
                      v-if="edit === id && id !== ''"
                      type="x"
                      @click="doCancel(id)"
                    ></feather>
                    <feather
                      stroke="#F7299D"
                      size="18px"
                      stroke-width="5"
                      v-if="save && id == ''"
                      type="save"
                      @click="onSave(id)"
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
    <!-- Container-fluid Ends-->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import statusIcon from "../../components/featherIcons/status-icon.vue";

export default {
  components: { statusIcon },
  data() {
    return {
      tablefields: [
        { key: "image", label: "image", sortable: false },
        { key: "name", label: "Name", sortable: false },
        { key: "price", label: "Price", sortable: false },
        { key: "status", label: "Status", sortable: false },
        { key: "category", label: "Sub Category", sortable: false },
        { key: "actions" }
      ],

      filter: null,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15],
      add: false,
      save: false,
      edit: null,
      item: "",
      selectedSku : "",
      index: null,
      selectMode: "single"
    };
  },
  created() {
    this.$store.dispatch("digitalProducts/getProducts");
  },
  computed: {
    ...mapGetters({
      items: "digitalProducts/getProducts"
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
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  methods: {
    formData(e) {
      console.log("modal data", e);
    },
    getIndex(id) {
      this.selectedSku = id
    },
    getImgUrl(path) {
      return require("@/assets/images/digital-product/" + path);
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    deleteRow(id) {
      this.items.splice(this.items.findIndex(e => e.id === id),1);
    },
    rowSelected(item) {
      if (item[0]) {
        this.edit = this.edit !== item[0].id ? item[0].id : null;
      }
    },
    onEdit(id) {
      if (id !== "undefined") {
        this.edit = this.edit !== id ? id : null;
      }
    },
    onSave(id) {
      this.save = false;
      this.add = false;
      this.edit = 1000;
      //  this.edit = ''
    },
    doCancel(id) {
      this.edit = null;
      this.item = null;
    },
    addRecord() {
      this.add = true;
      this.items.unshift({
        id: "",
        images: "main.jpg",
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
</style>