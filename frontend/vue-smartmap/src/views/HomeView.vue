<script>
/* eslint-disable no-undef */
import { computed, ref, onMounted } from "vue";
import { useGeolocation } from "../useGeolocation";
import { Loader } from "@googlemaps/js-api-loader";
import sensorData from "../data/sensors.json";

const GOOGLE_MAPS_API_KEY = "AIzaSyDadMlYb0afBDeIzmUHunxH93BHubVu0wU";

export default {
  name: "App",
  setup() {
    const contentString = "Sample";
    const { coords } = useGeolocation();
    const currPos = computed(() => ({
      lat: coords.value.latitude,
      lng: coords.value.longitude,
    }));
    const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY });
    const mapDiv = ref(null);
    onMounted(async () => {
      //sensorInfo = await fetch(url);
      await loader.load();
      const map = new google.maps.Map(mapDiv.value, {
        center: currPos.value,
        zoom: 8,
      });
      const infowindow = new google.maps.InfoWindow({
        content: contentString,
      });
      for (let index = 0; index < sensorData.data.length; index++) {
        const marker = new google.maps.Marker({
          position: {
            lat: sensorData.data[index].latitude,
            lng: sensorData.data[index].longitude,
          },
          map: map,
        });
        marker.addListener("click", () => {
          infowindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
          });
        });
      }
    });

    return { currPos, mapDiv };
  },
};
</script>

<template>
  <!-- <div class="d-flex text-center" style="height: 8vh">
    <div class="m-auto">
      <h4>Your Position</h4>
      Latitude: {{ currPos.lat.toFixed(2) }}, Longitude:
      {{ currPos.lng.toFixed(2) }}
    </div>
  </div> -->
  <div ref="mapDiv" style="width: 100vw; height: 100vh" />
</template>