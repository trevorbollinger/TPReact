import { useState, useEffect } from "react";
import api from "../api";
import "../styles/Home.css";

function Home() {
    const carouselItems = [
        {
            img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?fm=jpg&q=60&w=3000",
            title: "Plan Your Dream Vacation",
            description: "Find the best deals on hotels, flights, and attractions."
        },
        {
            img: "https://images.unsplash.com/photo-1500835556837-99ac94a94552?fm=jpg&q=60&w=3000",
            title: "Discover New Destinations",
            description: "Let us help you find your next adventure."
        },
        {
            img: "https://images.unsplash.com/photo-1615544261596-dc0a4898f2c0?q=80&w=1170",
            title: "Find the most amazing local attractions",
            description: "A beautiful scene to inspire your travels."
        },
        {
            img: "https://images.unsplash.com/photo-1573397340180-f4086e429df7?q=80&w=1170",
            title: "Transportation",
            description: "We assist you in choosing your desired transportation"
        }
    ];

    const services = [
        { text: "Find the Perfect Accommodation" },
        { text: "Book Your Flights" },
        { text: "Discover Local Attractions" }
    ];

    return (
        <div>
            <div id="myCarousel" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    {carouselItems.map((_, index) => (
                        <li key={index} data-target="#myCarousel" data-slide-to={index} className={index === 0 ? "active" : ""}></li>
                    ))}
                </ol>

                <div className="carousel-inner" role="listbox">
                    {carouselItems.map((item, index) => (
                        <div key={index} className={`item ${index === 0 ? 'active' : ''}`}>
                            <img src={item.img} alt={item.title} />
                            <div className="carousel-caption">
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
                    <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
                    <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>

            <div className="services">
                <h2>Our Services</h2>
                <div className="services-grid">
                    {services.map((service, index) => (
                        <div key={index} className="service-item">
                            <p>{service.text}</p>
                        </div>
                    ))}
                </div>
                <div className="button-container">
                    <a href="/search" className="button">Search for Hotels, flights, and attractions</a>
                    <a href="/transportation" className="button">Transportation</a>
                    <a href="/skyscannertest" className="button">Rental Cars</a>
                </div>
            </div>
        </div>
    );
}

export default Home;
