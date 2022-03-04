<script>
/* eslint-disable no-undef */
import { computed, ref, onMounted } from "vue";
import { useGeolocation } from "../useGeolocation";
import { Loader } from "@googlemaps/js-api-loader";
import sensorData from "../data/sensors.json";

const GOOGLE_MAPS_API_KEY = "AIzaSyDxcOcU0EH6pLvwESsB6T3pFo0uFkWFohM";
const iconBase = "/src/assets/circle";
const icons = {
  green: {
    icon: iconBase + "5.png",
  },
  yellow: {
    icon: iconBase + "4.png",
  },
  orange: {
    icon: iconBase + "3.png",
  },
  red: {
    icon: iconBase + "2.png",
  },
  purple: {
    icon: iconBase + "1.png",
  },
  magenta: {
    icon: iconBase + "0.png",
  },
};
let color = ["green", "yellow", "orange", "red", "purple", "magenta"];

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
    onMounted(async () => {
      //sensorInfo = await fetch(url);
      await loader.load();
      const map = new google.maps.Map(mapDiv.value, {
        center: currPos.value,
        zoom: 8,
      });
      for (let index = 0; index < sensorData.data.length; index++) {
        const pm25 = sensorData.data[index].pm25;
        let rating = color[0];
        if (pm25 >= 0 && pm25 <= 12) {
          rating = color[0];
        } else if (pm25 > 12 && pm25 <= 35) {
          rating = color[1];
        } else if (pm25 > 35 && pm25 <= 55) {
          rating = color[2];
        } else if (pm25 > 55 && pm25 <= 150) {
          rating = color[3];
        } else if (pm25 > 150 && pm25 <= 250) {
          rating = color[4];
        } else if (pm25 > 250) {
          rating = color[5];
        }
        const contentString =
          '<ul style="list-style-type:none;"><li><h2>Name: ' +
          sensorData.data[index].name +
          "<h2></li><li><h3>PM 2.5: " +
          pm25 +
          "<h3></li>";
        const infowindow = new google.maps.InfoWindow({
          content: contentString,
        });
        const marker = new google.maps.Marker({
          position: {
            lat: sensorData.data[index].latitude,
            lng: sensorData.data[index].longitude,
          },
          map: map,
          icon: icons[rating].icon,
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