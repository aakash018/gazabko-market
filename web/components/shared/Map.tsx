import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import React, { useEffect, useMemo, useRef, useState } from "react";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";

import L from "leaflet";
import { useAlert } from "../../pages/_app";

interface Props {
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  setLatLng?: React.Dispatch<React.SetStateAction<string>>;
  lat?: number;
  lng?: number;
}

const center = {
  lat: 27.7172,
  lng: 85.342,
};

const GetCods: React.FC<Props> = ({ setAddress, setLatLng, lat, lng }) => {
  const codsRef = useRef({
    lat: lat || 27.7172,
    lng: lng || 85.342,
  });

  const markerRef = useRef<L.Marker<any>>(null);
  const [position, setPosition] = useState(codsRef.current);
  const { setAlert } = useAlert();
  // const eventHandlers = useMemo(
  //   () => ({
  //     dragend() {
  //       const marker = markerRef.current;
  //       if (marker != null) {
  //         setPosition(marker.getLatLng());

  //         fetch(
  //           `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${
  //             marker.getLatLng().lat
  //           }&lon=${marker.getLatLng().lng}`
  //         )
  //           .then((response) => response.json())
  //           .then((data) => {
  //             setAddress(
  //               `${
  //                 data.address.amenity != undefined
  //                   ? data.address.amenity + ", "
  //                   : ""
  //               }` +
  //                 `${
  //                   data.address.neighbourhood != undefined
  //                     ? data.address.neighbourhood + ", "
  //                     : ""
  //                 }` +
  //                 `${
  //                   data.address.suburb != undefined
  //                     ? data.address.suburb + ", "
  //                     : ""
  //                 }` +
  //                 `${
  //                   data.address.postcode ? data.address.postcode + "-" : ""
  //                 }` +
  //                 data.address.municipality +
  //                 ", " +
  //                 data.address.region +
  //                 ", " +
  //                 data.address.country
  //             );
  //           });
  //       }
  //     },
  //   }),
  //   []
  // );

  useMapEvents({
    click(e) {
      setPosition({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });

      if (setLatLng) {
        setLatLng(JSON.stringify(e.latlng));
      }
      try {
        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${e.latlng.lat}&lon=${e.latlng.lng}`
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
                `${data.address.postcode ? data.address.postcode + "-" : ""}` +
                data.address.municipality +
                ", " +
                data.address.region +
                ", " +
                data.address.country
            );
          });
      } catch {
        setAlert({
          type: "error",
          message: "failed to load delivery address",
        });
      }
    },
  });

  return (
    <Marker position={position} ref={markerRef} draggable={false}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  );
};

const Map: React.FC<Props> = ({ setAddress, setLatLng, lat, lng }) => {
  const codsRef = useRef({
    lat: lat || 27.7172,
    lng: lng || 85.342,
  });
  return (
    <MapContainer center={codsRef.current} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GetCods
        setAddress={setAddress}
        setLatLng={setLatLng}
        lat={lat}
        lng={lng}
      />
    </MapContainer>
  );
};

export default Map;
