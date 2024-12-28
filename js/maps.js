// Business location
const businessLocation = [37.374990, -5.975537];

// Initialize the map
const map = L.map('map').setView(businessLocation, 13);

// Add the OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add a marker for the business location
const businessMarker = L.marker(businessLocation)
    .addTo(map)
    .bindPopup('Estamos aquí.<br> ¡Visítanos!')
    .openPopup();

// Function to get user's location and show route
function showRouteToUser() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const userLocation = [position.coords.latitude, position.coords.longitude];
            
            // Add a marker for the user's location
            L.marker(userLocation)
                .addTo(map)
                .bindPopup('Tu ubicación')
                .openPopup();

            // Create a routing control
            L.Routing.control({
                waypoints: [
                    L.latLng(businessLocation[0], businessLocation[1]),
                    L.latLng(userLocation[0], userLocation[1])
                ],
                routeWhileDragging: true,
                showAlternatives: true,
                altLineOptions: {
                    styles: [
                        {color: 'black', opacity: 0.15, weight: 9},
                        {color: 'white', opacity: 0.8, weight: 6},
                        {color: 'blue', opacity: 0.5, weight: 2}
                    ]
                }
            }).addTo(map);

            // Fit the map to show both locations
            const bounds = L.latLngBounds(businessLocation, userLocation);
            map.fitBounds(bounds, { padding: [50, 50] });
        }, function(error) {
            console.error("Error getting user's location:", error);
            alert("No se pudo obtener tu ubicación. Por favor, verifica los permisos de ubicación en tu navegador.");
        });
    } else {
        alert("Tu navegador no soporta geolocalización.");
    }
}

// Call the function when the page loads
window.addEventListener('load', showRouteToUser);

