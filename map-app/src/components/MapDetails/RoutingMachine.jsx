import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import '../../App.css'

const createRoutingMachineLayer = ({first, second}) => {
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(first.lat, first.lng),
      L.latLng(second.lat, second.lng)
    ],
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }]
    }
  })

  return instance
};

const RoutingMachine = createControlComponent(createRoutingMachineLayer);

export default RoutingMachine;
