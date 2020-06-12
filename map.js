mapboxgl.accessToken = 'pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/ihill/ckbcdolxk0dz91im5toqz9pre',
  center: [-71.566, 42.112],
  zoom: 8,
  minZoom: 7,
  maxZoom: 13,
  maxBounds: [
    [-74.728, 38.167], // Southwest bound
    [-66.541, 46.032], // Northeast bound
  ]
});

map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

map.on('click', 'housing-assistance', (e) => {
  let tooltipHtml = `<p class='tooltip__title'>${toCamelCase(e.features[0].properties.muni)}</p>`;
  if (e.features[0].properties.total_Cost_assistance_regunemp) {
    tooltipHtml += `
      <ul class='tooltip__list'>
        <li class='tooltip__text'>${d3.format('$,.2f')(e.features[0].properties.total_hhds_impacted_assistance_regunemp)} in regular unemployment</li>
        <li class='tooltip__text'>${d3.format(',')(e.features[0].properties['Total Layoffs'])} total layoffs</li>
        <li class='tooltip__text'>${d3.format(',.2f')(e.features[0].properties.total_hhds_impacted_assistance_regunemp)} total households need assistance</li>
      </ul>
    `;
  } else {
    tooltipHtml += '<p>Data unavailable</p>'
  };

  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(tooltipHtml)
    .setMaxWidth('300px')
    .addTo(map);
})

function toCamelCase(muniName) {
  return muniName.split(" ")
    .map((word) => word.charAt(0).concat(word.slice(1).toLowerCase()))
    .join(' ');
}