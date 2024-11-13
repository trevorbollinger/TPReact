import React, { useState, useEffect } from 'react';
import api from '../api';
import '../styles/Search.css';
import LoadingIndicator from '../components/LoadingIndicator';

function Search() {
    const [form, setForm] = useState({ destination_string: '' });
    const [flightInfoResults, setFlightInfoResults] = useState(null);
    const [locationInfoResults, setLocationInfoResults] = useState(null);
    const [error, setError] = useState(null);
    const [attractionsData, setAttractionsData] = useState(null);
    const [locationData, setLocationData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            const [attractionsResponse, hotelsResponse] = await Promise.all([
                api.get('/api/attractions/', {
                    params: { location: form.destination_string, radius: form.radius }
                }),
                api.get('/api/hotels/', {
                    params: { location: form.destination_string, radius: form.radius }
                })
            ]);
            setAttractionsData(attractionsResponse.data);
            setLocationInfoResults(hotelsResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to fetch information');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {isLoading && <LoadingIndicator />}
            <h1>Search for Hotels and Activities</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="origin_string">Origin:</label>
                <input
                    id="origin_string"
                    type="text"
                    name="origin_string"
                    value={form.origin_string || 'Omaha, NE'}
                    onChange={handleChange}
                />
                
                <label htmlFor="destination_string">Destination:</label>
                <input
                    id="destination_string"
                    type="text"
                    name="destination_string"
                    value={form.destination_string}
                    onChange={handleChange}
                />
                
                <label htmlFor="radius">Radius (miles):</label>
                <input
                    id="radius"
                    type="number"
                    name="radius"
                    value={form.radius || '10'}
                    onChange={handleChange}
                    max="50"
                />
                <button type="submit">Search</button>
            </form>

            {locationData && (
                <div className="location-info">
                    <p>Latitude: {locationData.latitude}</p>
                    <p>Longitude: {locationData.longitude}</p>
                    <p>Address: {locationData.address}</p>
                </div>
            )}

            <div className="container">
                <div className="column">
                    <h3>Flights</h3>
                    {flightInfoResults ? (
                        flightInfoResults.data.flights ? (
                            <ul>
                                {flightInfoResults.data.flights.map((flight, index) =>
                                    flight.segments.map((segment, segIndex) =>
                                        segment.legs.map((leg, legIndex) => (
                                            <li key={`${index}-${segIndex}-${legIndex}`}>
                                                <strong>{leg.marketingCarrier.displayName}</strong> {leg.flightNumber}<br />
                                                <strong>Departure Time:</strong> {leg.departureDateTime}<br />
                                                <strong>Arrival Time:</strong> {leg.arrivalDateTime}<br />
                                                <strong>Class of Service:</strong> {leg.classOfService}<br />
                                                <strong>Number of Stops:</strong> {leg.numStops}<br />
                                                <strong>Distance:</strong> {leg.distanceInKM} KM<br />
                                                <strong>Equipment:</strong> {leg.equipmentId}
                                                <hr />
                                            </li>
                                        ))
                                    )
                                )}
                            </ul>
                        ) : (
                            <p>No flights available.</p>
                        )
                    ) : (
                        <p></p>
                    )}
                </div>

                <div className="column">
                    <h3>Hotels</h3>
                    {locationInfoResults ? (
                        locationInfoResults.data ? (
                            <ul>
                                {locationInfoResults.data.map((hotel, index) => (
                                    <li key={hotel.hotelId || index}>
                                        <div className="info">
                                            <h4>{hotel.name}</h4>
                                            <a 
                                                href={`https://www.google.com/maps?q=${hotel.geoCode.latitude},${hotel.geoCode.longitude}`} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="maps-link"
                                            >
                                                Open in Google Maps
                                            </a>
                                            <p className="last-update">Last updated: {new Date(hotel.lastUpdate).toLocaleDateString()}</p>
                                        </div>
                                        <hr />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No hotels found in this area.</p>
                        )
                    ) : (
                        <p></p>
                    )}
                </div>

                <div className="column">
                    <h3>Activities</h3>
                    {attractionsData ? (
                        <ul>
                            {attractionsData.data.map((activity) => (
                                <li key={activity.id}>
                                    <div className="info">
                                        <h4>{activity.name}</h4>
                                        <p>{activity.shortDescription}</p>
                                        <a 
                                            href={`https://www.google.com/maps?q=${activity.geoCode.latitude},${activity.geoCode.longitude}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="maps-link"
                                        >
                                            Open in Google Maps
                                        </a>
                                        <a href={activity.bookingLink} target="_blank" rel="noopener noreferrer">
                                            Book Now
                                        </a>
                                    </div>
                                    {activity.pictures && activity.pictures.length > 0 && (
                                        <img 
                                            src={activity.pictures[0]} 
                                            alt={activity.name}
                                        />
                                    )}
                                    <hr />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p></p>
                    )}
                </div>
            </div>

            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default Search;