<script>
/* eslint-disable no-undef */
import { computed, ref, onMounted } from "vue";
import { useGeolocation } from "../useGeolocation";
import { Loader } from "@googlemaps/js-api-loader";
// import sensorData from "../data/sensors.json";
import sensorData from "/home/Scripts/jsonfiles/current.json";
import GreenIcon from "../components/icons/green_circle.svg";
import YellowIcon from "../components/icons/yellow_circle.svg";
import OrangeIcon from "../components/icons/orange_circle.svg";
import RedIcon from "../components/icons/red_circle.svg";
import PurpleIcon from "../components/icons/purple_circle.svg";
import MagentaIcon from "../components/icons/magenta_circle.svg";
import circle from "../components/icons/circle.svg";
const GOOGLE_MAPS_API_KEY = "";
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
      for (let index = 0; index < sensorData.data.length; index++) {
        let value = sensorData.data[index].pm25;
        let icon = circle;
        let label = value.toString();
        if (value >= 0.0 && value <= 12.0) {
          icon = GreenIcon;
        } else if (value > 12.0 && value <= 35.4) {
          icon = YellowIcon;
        } else if (value > 35.4 && value <= 55.4) {
          icon = OrangeIcon;
        } else if (value > 55.4 && value <= 150.4) {
          icon = RedIcon;
        } else if (value > 150.4 && value <= 250.4) {
          icon = PurpleIcon;
        } else if (value > 250.4 && value <= 500.4) {
          icon = MagentaIcon;
        }
        const contentString =
          '<iframe src="http://10.128.14.220:3000/d-solo/oog6Goynk/utopia-fiber?var-sensorname=' +
          sensorData.data[index].name +
          '&var-tables=air_quality&from=now-60d&to=now&orgId=1&panelId=2" width="630" height="280" frameborder="0"><li><h2>Name: ' + //make styling changes here
          sensorData.data[index].name +
          "<h2></li><li><h3>PM 2.5: " +
          value +
          "<h3></li></iframe>";

        var activeInfoWindow = null;
        const infowindow = new google.maps.InfoWindow({
          content: contentString,
        });

        const marker = new google.maps.Marker({
          position: {
            lat: sensorData.data[index].latitude,
            lng: sensorData.data[index].longitude,
          },
          label: label,
          map: map,
          icon: icon,
        });

        marker.addListener("click", () => {
          if (activeInfoWindow) {
            activeInfoWindow.close();
          }
          infowindow.open({
            anchor: marker,
            map,
            shouldFocus: true,
          });
          activeInfoWindow = infowindow;
        });
        google.maps.event.addListener(map, "click", function (event) {
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