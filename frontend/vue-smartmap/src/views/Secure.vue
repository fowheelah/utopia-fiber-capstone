<script>
/* eslint-disable no-undef */
import { computed, ref, onMounted } from "vue";
import { useGeolocation } from "../useGeolocation";
import { Loader } from "@googlemaps/js-api-loader";
import camera from "../data/cameras.json";
import CameraIcon from "../components/icons/camera.svg";
import GOOGLE_MAPS_API_KEY from "/var/local/google_api";

export default {
  name: "App",
  setup() {
    const { coords } = useGeolocation();
    const currPos = computed(() => ({
      lat: coords.value.latitude,
      lng: coords.value.longitude,
    }));
    const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY });
    const mapDiv = ref(null);
    const authenticated = false;
    onMounted(async () => {
      //sensorInfo = await fetch(url);
      await loader.load();
      const map = new google.maps.Map(mapDiv.value, {
        center: currPos.value,
        zoom: 12,
      });
      for (let index = 0; index < camera.data.length; index++) {
        const infowindow = new google.maps.InfoWindow({
          content: camera.data[index].name,
        });
        const marker = new google.maps.Marker({
          position: {
            lat: camera.data[index].latitude,
            lng: camera.data[index].longitude,
          },
          // label: camera.data[index].name,
          map: map,
          icon: CameraIcon,
        });
        marker.addListener("click", () => {
          infowindow.open({
            anchor: marker,
            map,
            shouldFocus: true,
          });
        });
        google.maps.event.addListener(map, "click", function(event){
          infowindow.close();
        });
      }
    });

    return { currPos, mapDiv };
  },
};
</script>

<template>
  <div ref="mapDiv" style="width: 100vw; height: 100vh" />
</template>

<style>
@media (min-width: 1024px) {
  .login {
    min-height: 100vh;
    /* display: flex; */
    align-items: center;
  }
}

.secure {
  width: 500px;
  height: 250px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  margin-top: 200px;
  padding: 20px;
  text-align: center;
  align-content: center;
}
</style>

