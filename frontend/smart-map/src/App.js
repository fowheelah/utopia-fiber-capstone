import React from "react";
import { Route } from 'react-router-dom'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import {
  Circle,
  FeatureGroup,
  LayerGroup,
  LayersControl,
  MapContainer,
  Popup,
  Rectangle,
  TileLayer,
} from 'react-leaflet';
import { slide as Menu } from 'react-burger-menu';
import { Login } from "./Login1";
import sensorData from "./data/sensor.json"
import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";
import './Sidebar.css';

const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 40.64402,
  lng: -111.86289,
};
const rectangle = [
  [51.49, -0.08],
  [51.5, -0.06],
]

function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  const [selected, setSelected] = React.useState(null);
  const [errorMessages, setErrorMessages] = React.useState({}); //message and name of field
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div className="App" id="outer-container">
      <Menu pageWrapId={'page-wrap'} outerContainerId={'outer-container'}>
        <Login errorMessages={errorMessages} setErrorMessages={setErrorMessages} isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} />
      </Menu>
      <div id={"page-wrap"}>
        <MapSensors
          selected={selected}
          setselected={setSelected}
        />
      </div>
    </div>
  );
}
export default App;

function MapSensors({ selected, setselected }) {
  return (
    <GoogleMap
      id="map"
      mapContainerStyle={mapContainerStyle}
      zoom={10}
      center={center}
      options={options}
    >
      {sensorData.data.map(sensor => (
        <Marker
          key={sensor.sensor_index}
          position={{ lat: sensor.latitude, lng: sensor.longitude }}
          onClick={() => {
            setselected(sensor);
          }}
          icon={{
            url: `/camera.svg`,
            scaledSize: new window.google.maps.Size(25, 25)
          }}
        />
      ))}

      {selected && (
        <InfoWindow
          onCloseClick={() => {
            setselected(null);
          }}
          position={{
            lat: selected.latitude,
            lng: selected.longitude
          }}
        >
          <div>
            <h3>Sensor: {selected.name}</h3>
            <p>Air Quality: {selected.pm25}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  )
}

function LayersControlExample() {
  return (
    <MapContainer>
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Demo Map">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.Overlay name="Marker with popup">
        </LayersControl.Overlay>
        <LayersControl.Overlay checked name="Layer group with circles">
          <LayerGroup>
            <Circle
              center={center}
              pathOptions={{ fillColor: 'blue' }}
              radius={200}
            />
            <Circle
              center={center}
              pathOptions={{ fillColor: 'red' }}
              radius={100}
              stroke={false}
            />
            <LayerGroup>
              <Circle
                center={[51.51, -0.08]}
                pathOptions={{ color: 'green', fillColor: 'green' }}
                radius={100}
              />
            </LayerGroup>
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Feature group">
          <FeatureGroup pathOptions={{ color: 'purple' }}>
            <Popup>Popup in FeatureGroup</Popup>
            <Circle center={[51.51, -0.06]} radius={200} />
            <Rectangle bounds={rectangle} />
          </FeatureGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  )
}