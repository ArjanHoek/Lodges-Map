class UIController {
  api;
  filterEl;

  constructor(mapAPI) {
    console.log(mapAPI);
    this.api = mapAPI;
  }

  createFilters(filterData) {
    this.filterEl = this.api.mapEl.nextElementSibling;

    filterData.forEach(item => this.createFilterInput(item));
  }

  createFilterInput(item) {
    const listItem = document.createElement('li');
    listItem.innerText = item.name;
    this.filterEl.appendChild(listItem);

    listItem.addEventListener('click', () => {
      console.log(item.lodges);
      this.api.showMarkersByIds(item.lodges);
    });
  }
}
