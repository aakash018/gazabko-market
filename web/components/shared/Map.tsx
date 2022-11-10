import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import React, { useMemo, useRef, useState } from "react";

import L from "leaflet";

interface Props {
  setAddress: React.Dispatch<React.SetStateAction<string>>;
}

const center = {
  lat: 27.7172,
  lng: 85.324,
};

const Map: React.FC<Props> = ({ setAddress }) => {
  const markerRef = useRef<L.Marker<any>>(null);
  const [position, setPosition] = useState(center);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${
              marker.getLatLng().lat
            }&lon=${marker.getLatLng().lng}`
          )
            .then((response) => response.json())
            .then((data) => {
              setAddress(
                `${
                  data.address.amenity != undefined
                    ? data.address.amenity + ", "
                    : ""
                }` +
                  `${
                    data.address.neighbourhood != undefined
                      ? data.address.neighbourhood + ", "
                      : ""
                  }` +
                  `${
                    data.address.suburb != undefined
                      ? data.address.suburb + ", "
                      : ""
                  }` +
                  `${
                    data.address.postcode ? data.address.postcode + "-" : ""
                  }` +
                  data.address.municipality +
                  ", " +
                  data.address.region +
                  ", " +
                  data.address.country
              );
            });
        }
      },
    }),
    []
  );

  return (
    <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={position}
        ref={markerRef}
        draggable={true}
        eventHandlers={eventHandlers}
      >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
