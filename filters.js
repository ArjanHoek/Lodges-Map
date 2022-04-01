class FilterState {
  api;

  constructor(mapAPI) {
    this.api = mapAPI;
    this.setFilters();
  }

  setFilters() {
    console.log(this.api.data);
  }
}
