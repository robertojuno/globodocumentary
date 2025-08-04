// Caricamento iniziale del globo
const world = Globe()(document.getElementById('globeViz'))
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
  .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
  .backgroundColor('#000')
  .showAtmosphere(true)
  .atmosphereColor('#3a228a')
  .atmosphereAltitude(0.25)
  .pointOfView({ lat: 20, lng: 0, altitude: 2.5 }, 1000);

// Tooltip per il video
const tooltip = document.getElementById('tooltip');

// Video Marker Data
const videoMarkers = [
  {
    lat: 43.8563,
    lng: 18.4131,
    title: "Sarajevo",
    videoUrl: "https://www.youtube.com/embed/GqQKJHXoUD8?si=9lqWqW-Ao9SBcPNy"
  },
  {
    lat: 28.0026,
    lng: 86.8528,
    title: "Everest Base Camp",
    videoUrl: "https://www.youtube.com/embed/q7_jPoJM-Jc?si=U3z3Y6LSA-eu7e2e"
  }
];

// Aggiunta dei marker
world.htmlElementsData(videoMarkers)
  .htmlElement(d => {
    const el = document.createElement('div');
    el.innerHTML = '📍';
    el.style.cursor = 'pointer';
    el.style.fontSize = '24px';
    el.addEventListener('mouseenter', () => {
      tooltip.style.display = 'block';
      tooltip.innerHTML = `
        <strong>${d.title}</strong><br/>
        <iframe src="${d.videoUrl}" allowfullscreen></iframe>
      `;
    });
    el.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
    });
    return el;
  });

// Segui il cursore
document.addEventListener('mousemove', (e) => {
  tooltip.style.left = e.clientX + 10 + 'px';
  tooltip.style.top = e.clientY + 10 + 'px';
});

// Confini dei paesi
fetch('https://unpkg.com/world-atlas@2/countries-110m.json')
  .then(res => res.json())
  .then(countries => {
    const globeData = window.topojson.feature(countries, countries.objects.countries).features;
    world
      .polygonsData(globeData)
      .polygonCapColor(() => 'rgba(0, 100, 200, 0.6)')
      .polygonSideColor(() => 'rgba(0, 100, 200, 0.15)')
      .polygonStrokeColor(() => '#111')
      .polygonAltitude(0.01);
  });
