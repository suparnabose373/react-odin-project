import axios from 'axios';
import * as Constants from '../Constants';
import  type { Location } from "../types/weather";

export async function getCurrentWeather(coords): Promise<Location[] | undefined> {
    try {
        const response = await axios.get(
            `${Constants.BASE_URL}/forecast`, {
            params: {
                latitude: coords.lat,
                longitude: coords.lng,
            },
        });
        return response.data;
    }
    catch(error) {
        console.error(error);
        return [];
    }
}

export function getCurrentLocation(): Promise<Location> {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            flag: 1
          });
        },
        (err) => {
          console.error(err);
          resolve({ lat: 51.5074, lng: -0.1278, flag: 0 });
        }
      );
    });
  }

export async function reverseGeoCode(coords) {
    try {
        const response = await axios.get(
            `${Constants.REVERSE_GEOCODING_API_URL}/reverse`, {
            params: {
                lat: coords?.lat,
                lon: coords?.lng,
                format: 'json',
            },
        });

        console.log(response);
        const { address, lat: rLat, lng: rLon, place_id } = response.data;
        return {
            id: place_id,
            name: address.city || address.town || address.village || address.suburb || 'Current Location',
            country: address.country,
        };
        } catch (error) {
        console.error('Error reverse geocoding:', error);
        return null;
    }
}