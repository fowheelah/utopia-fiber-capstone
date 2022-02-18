import { Marker } from "@react-google-maps/api";
import React from "react";
import "./App.css";
import data from "./data/sensor.json";

export const Sensors = () => {
  return (
    <>
        {data.map((sensor) => {
            <Marker
                key={sensor.sensor_index}
                position={{
                    lat: sensor.latitude,
                    lng: sensor.longitude,
                }}
            />
        })}
    </>
  );
};