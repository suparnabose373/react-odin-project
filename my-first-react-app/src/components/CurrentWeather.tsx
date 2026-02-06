import React from "react";

export default function CurrentWeather(props) {
    const [loc, wData] = props;
    return(
        <section className="current-weather">
            <div>
                <div className="current-place"> ${loc.name} + ${loc.country} </div>
                <div className="current-date"> 6th Feb 2026 </div>
            </div>
            <div>
                <div className="current-temp"> 20degree</div>
            </div>
        </section>
    );    
}