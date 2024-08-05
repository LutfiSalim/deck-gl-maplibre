import React from "react";
import { Map, NavigationControl, useControl } from "react-map-gl/maplibre";
import { GeoJsonLayer, ArcLayer, ScatterplotLayer } from "deck.gl";
import { MapboxOverlay as DeckOverlay } from "@deck.gl/mapbox";
import type { Color, MapViewState } from "@deck.gl/core";
import "maplibre-gl/dist/maplibre-gl.css";

// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const AIR_PORTS =
  "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson";
// const DATA_URL =
//   "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/scatterplot/manhattan.json"; // eslint-disable-line

const DATA_URL = "AIS123_20230108_10000.json";
// const INITIAL_VIEW_STATE = {
//   latitude: 51.47,
//   longitude: 0.45,
//   zoom: 4,
//   bearing: 0,
//   pitch: 30,
// };
const INITIAL_VIEW_STATE: MapViewState = {
  longitude: -101.29602666666666,
  latitude: 2.9375933333333335,
  zoom: 5,
  maxZoom: 16,
  pitch: 0,
  bearing: 0,
};
const MALE_COLOR: Color = [0, 128, 255];
const FEMALE_COLOR: Color = [255, 0, 128];

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

const onClick = (info) => {
  if (info.object) {
    // eslint-disable-next-line
    alert(`${info.object.properties.name} (${info.object.properties.abbrev})`);
  }
};

type DataPoint = [longitude: number, latitude: number];
// type DataPoint = [longitude: number, latitude: number, gender: number];

function DeckGLOverlay(props) {
  const overlay = useControl(() => new DeckOverlay(props));
  overlay.setProps(props);
  return null;
}

export default function App({
  data = DATA_URL,
  radius = 30,
  maleColor = MALE_COLOR,
  femaleColor = FEMALE_COLOR,
}: {
  data?: string | DataPoint[];
  radius?: number;
  maleColor?: Color;
  femaleColor?: Color;
  mapStyle?: string;
  requestBody?: string;
  accessToken?: string;
}) {
  const layers = [
    // new GeoJsonLayer({
    //   id: "airports",
    //   data: AIR_PORTS,
    //   // Styles
    //   filled: true,
    //   pointRadiusMinPixels: 2,
    //   pointRadiusScale: 2000,
    //   getPointRadius: (f) => 11 - f.properties.scalerank,
    //   getFillColor: [200, 0, 80, 180],
    //   // Interactive props
    //   pickable: true,
    //   autoHighlight: true,
    //   onClick,
    //   // beforeId: 'watername_ocean' // In interleaved mode, render the layer under map labels
    // }),
    // new ScatterplotLayer<DataPoint>({
    //   id: "scatter-plot",
    //   data,
    //   radiusScale: radius,
    //   radiusMinPixels: 1,
    //   getPosition: (d) => [d[0], d[1], 0],
    //   getFillColor: (d) => (d[2] === 1 ? maleColor : femaleColor),
    //   getRadius: 1,
    //   updateTriggers: {
    //     getFillColor: [maleColor, femaleColor],
    //   },
    // }),
    // new ArchLayer({
    //   id: "arcs",
    //   data: AIR_PORTS,
    //   dataTransform: (d) =>
    //     d.features.filter((f) => f.properties.scalerank < 4),
    //   // Styles
    //   getSourcePosition: (f) => [-0.4531566, 51.4709959], // London
    //   getTargetPosition: (f) => f.geometry.coordinates,
    //   getSourceColor: [0, 128, 200],
    //   getTargetColor: [200, 0, 80],
    //   getWidth: 1,
    // }),
    new ScatterplotLayer<DataPoint>({
      id: "scatter-plot",
      data,
      radiusScale: radius,
      radiusMinPixels: 1,
      getPosition: (d) => [d[0], d[1], 0],
      getFillColor: [200, 0, 80, 180],
      getRadius: 5,
    }),
  ];

  return (
    <Map initialViewState={INITIAL_VIEW_STATE} mapStyle={MAP_STYLE}>
      <DeckGLOverlay layers={layers} interleaved />
      <NavigationControl position="top-left" />
    </Map>
  );
}

// import React from "react";
// import { Map } from "react-map-gl/maplibre";
// import DeckGL from "@deck.gl/react";
// import { ScatterplotLayer, GeoJsonLayer, ArcLayer } from "@deck.gl/layers";

// import type { Color, MapViewState } from "@deck.gl/core";

// const MALE_COLOR: Color = [0, 128, 255];
// const FEMALE_COLOR: Color = [255, 0, 128];

// // Source data CSV
// const DATA_URL =
//   "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/scatterplot/manhattan.json"; // eslint-disable-line

// const INITIAL_VIEW_STATE: MapViewState = {
//   longitude: -74,
//   latitude: 40.7,
//   zoom: 11,
//   maxZoom: 16,
//   pitch: 0,
//   bearing: 0,
// };

// const AIR_PORTS =
//   "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson";

// const onClick = (info) => {
//   if (info.object) {
//     // eslint-disable-next-line
//     alert(`${info.object.properties.name} (${info.object.properties.abbrev})`);
//   }
// };

// type DataPoint = [longitude: number, latitude: number, gender: number];

// export default function App({
//   data = DATA_URL,
//   radius = 30,
//   maleColor = MALE_COLOR,
//   femaleColor = FEMALE_COLOR,
//   mapStyle = "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json",
// }: {
//   data?: string | DataPoint[];
//   radius?: number;
//   maleColor?: Color;
//   femaleColor?: Color;
//   mapStyle?: string;
// }) {
//   const layers = [
//     new ScatterplotLayer<DataPoint>({
//       id: "scatter-plot",
//       data,
//       radiusScale: radius,
//       radiusMinPixels: 1,
//       getPosition: (d) => [d[0], d[1], 0],
//       getFillColor: (d) => (d[2] === 1 ? maleColor : femaleColor),
//       getRadius: 1,
//       updateTriggers: {
//         getFillColor: [maleColor, femaleColor],
//       },
//     }),
//     // new GeoJsonLayer({
//     //   id: "airports",
//     //   data: AIR_PORTS,
//     //   // Styles
//     //   filled: true,
//     //   pointRadiusMinPixels: 2,
//     //   pointRadiusScale: 2000,
//     //   getPointRadius: (f) => 11 - f.properties.scalerank,
//     //   getFillColor: [200, 0, 80, 180],
//     //   // Interactive props
//     //   pickable: true,
//     //   autoHighlight: true,
//     //   onClick,
//     //   // beforeId: 'watername_ocean' // In interleaved mode, render the layer under map labels
//     // }),
//     // new ArcLayer({
//     //   id: "arcs",
//     //   data: AIR_PORTS,
//     //   dataTransform: (d) =>
//     //     d.features.filter((f) => f.properties.scalerank < 4),
//     //   // Styles
//     //   getSourcePosition: (f) => [-0.4531566, 51.4709959], // London
//     //   getTargetPosition: (f) => f.geometry.coordinates,
//     //   getSourceColor: [0, 128, 200],
//     //   getTargetColor: [200, 0, 80],
//     //   getWidth: 1,
//     // }),
//   ];

//   return (
//     <DeckGL
//       layers={layers}
//       initialViewState={INITIAL_VIEW_STATE}
//       controller={true}
//     >
//       <Map reuseMaps mapStyle={mapStyle} />
//     </DeckGL>
//   );
// }

// // export function renderToDOM(container: HTMLDivElement) {
// //   createRoot(container).render(<App />);
// // }
