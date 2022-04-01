class GoogleMapsAPI {
  map;
  mapEl;
  data = [];
  markers = [];
  options = {
    cluster: false,
    zoom: 10,
  };

  constructor(id, initZoom, initCenter) {
    this.mapEl = document.getElementById(id);

    this.setOptions(initCenter, initZoom);

    this.createMap();

    this.setData();
    this.createMarkers();
  }

  setData() {
    const key = this.mapEl.id.split('--')[1];
    this.data = (data[key] || []).map((item, id) => ({ ...item, id }));
  }

  setOptions(initCenter, initZoom) {
    const { cluster } = this.mapEl.dataset;
    this.options.cluster = cluster === 'true' ? true : false;
    this.options.center = initCenter;
    this.options.zoom = initZoom;
  }

  createMap() {
    const {
      zoom,
      center: [lat, lng],
    } = this.options;

    this.map = new google.maps.Map(this.mapEl, {
      zoom,
      center: { lat, lng },
      mapTypeId: 'terrain',
    });

    this.setInfoWindow();
  }

  setInfoWindow() {
    this.infoWindow = new google.maps.InfoWindow({
      content: '',
      disableAutoPan: true,
    });
  }

  showInfo(marker) {
    this.infoWindow.setContent(marker.title);
    this.infoWindow.open(this.map, marker);
  }

  createMarker(item) {
    const {
      name,
      id,
      tour,
      coords: [lat, lng],
    } = item;

    const marker = new google.maps.Marker({
      position: { lng, lat },
      title: name,
      id,
      tour,
    });
    marker.addListener('click', () => this.showInfo(marker));

    return marker;
  }

  setClusters() {
    if (this.options.cluster) {
      new markerClusterer.MarkerClusterer({ markers: this.markers });
    }
  }

  createMarkers() {
    this.markers = this.data.map(item => this.createMarker(item));

    if (this.options.cluster) {
      this.setClusters();
    }
  }

  showMarkersByIds(ids) {
    this.markers.forEach(marker => {
      const { id } = marker;
      const map = ids.includes(id) ? this.map : null;
      marker.setMap(map);
    });
  }

  showMarkersByCondition(cb) {
    const filtered = this.markers.filter(cb).map(({ id }) => id);
    this.showMarkersByIds(filtered);
  }
}

function initMaps() {
  const lodgesMapAPI = new GoogleMapsAPI(
    'map--lodges',
    10,
    [47.061410805247924, 11.50738865609017]
  );

  new FilterState(lodgesMapAPI);
}
