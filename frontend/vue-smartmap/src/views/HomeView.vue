<script>
/* eslint-disable no-undef */
import { computed, ref, onMounted } from "vue";
import { useGeolocation } from "../useGeolocation";
import { Loader } from "@googlemaps/js-api-loader";
import sensorData from "../data/sensors.json";
import circle from "@/components/icons/circle.svg";

const GOOGLE_MAPS_API_KEY = "AIzaSyDxcOcU0EH6pLvwESsB6T3pFo0uFkWFohM";
const iconBase = "/src/assets/circle";
const icons = {
  green: {
    icon: iconBase + "5.png",
    label: "",
  },
  yellow: {
    icon: iconBase + "4.png",
    label: "",
  },
  orange: {
    icon: iconBase + "3.png",
    label: "",
  },
  red: {
    icon: iconBase + "2.png",
    label: "",
  },
  purple: {
    icon: iconBase + "1.png",
    label: "",
  },
  magenta: {
    icon: iconBase + "0.png",
    label: "",
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
        zoom: 12,
      });
      for (let index = 0; index < sensorData.data.length; index++) {
<<<<<<< HEAD
        const contentString = "<ul style=\"list-style-type:none;\"><li><h2>Name: " + sensorData.data[index].name + "<h2></li><li><h3>PM 2.5: " + sensorData.data[index].pm25 + "<h3></li>";
=======
        const pm25 = sensorData.data[index].pm25;
        let pm25_str = toString(pm25);
        let rating = color[0];
        if (pm25 >= 0 && pm25 <= 12) {
          circle
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
>>>>>>> bce171770b57a26a7d4919708279d34f4748e5ed
        const infowindow = new google.maps.InfoWindow({
          content: contentString,
        });
        const marker = new google.maps.Marker({
          position: {
            lat: sensorData.data[index].latitude,
            lng: sensorData.data[index].longitude,
          },
          label: "sample",
          map: map,
          icon: circle,
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
  <div ref="mapDiv" style="width: 100vw; height: 100vh" />
</template>