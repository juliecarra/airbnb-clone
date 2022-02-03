import React from "react";
import "../styles/Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__container">
        <p>Support</p>
        <p>Help Center</p>
        <p>Safety information</p>
        <p>Cancellation options</p>
        <p>Our COVID-19 Response</p>
        <p>Supporting people with disabipties</p>
        <p>Report a neighborhood concern</p>
      </div>
      <div className="footer__container">
        <p>Community</p>
        <p>Airbnb.org: disaster repef housing</p>
        <p>Support Afghan refugees</p>
        <p>Celebrating diversity & belonging</p>
        <p>Combating discrimination</p>
      </div>
      <div className="footer__container">
        <p>Hosting</p>
        <p>Try hosting</p>
        <p>AirCover: protection for Hosts</p>
        <p>Explore hosting resources</p>
        <p>Visit our community forum</p>
        <p>How to host responsibly</p>
      </div>
      <div className="footer__container">
        <p>About</p>
        <p>Newsroom</p>
        <p>Learn about new features</p>
        <p> Letter from our founders</p>
        <p>Careers</p>
        <p> Investors</p>
        <p>Airbnb Luxe</p>
      </div>
      <div className="footer__container__border"></div>
    </div>
  );
}

export default Footer;
