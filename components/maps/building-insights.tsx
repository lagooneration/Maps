/**
 * Fetches the building insights information from the Solar API.
 *   https://developers.google.com/maps/documentation/solar/building-insights
 *
 * @param  {LatLng} location      Point of interest as latitude longitude.
 * @param  {string} apiKey        Google Cloud API key.
 * @return {Promise<DataLayersResponse>}  Building Insights response.
 */

export async function findClosestBuilding(
    location: google.maps.LatLng,
    apiKey: string,
  ): Promise<BuildingInsightsResponse> {
    const args = {
      'location.latitude': location.lat().toFixed(5),
      'location.longitude': location.lng().toFixed(5),
    };
    console.log('GET buildingInsights\n', args);
    const params = new URLSearchParams({ ...args, key: apiKey });
    return fetch(`https://solar.googleapis.com/v1/buildingInsights:findClosest?${params}`).then(
      async (response) => {
        const content = await response.json();
        if (response.status != 200) {
          console.error('findClosestBuilding\n', content);
          throw content;
        }
        console.log('buildingInsightsResponse', content);
        return content;
      },
    );
  }