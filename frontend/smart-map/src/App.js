import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  MarkerClusterer,
} from "@react-google-maps/api";
import sensorData from "./data/sensor.json"
import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";

const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const clusterOptions = {
  imagePath: '/../public/circle1.png',
}
const center = {
  lat: 40.64402,
  lng: -111.86289,
};

function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  const [selected, setSelected] = React.useState(null);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

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
              setSelected(sensor);
            }}
            icon={{
              url: `/circle1.png`,
              scaledSize: new window.google.maps.Size(25,25)
            }}
          />
        ))}

        {selected && (
          <InfoWindow
            onCloseClick={() => {
              setSelected(null);
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
  );
}
export default App;