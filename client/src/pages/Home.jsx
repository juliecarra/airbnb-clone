import React, { Component } from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import "../styles/Home.css";
import Card from "../components/Card";
import Wizard from "../components/Wizard";
import Footer from "../components/Footer";

class Home extends Component {
  render() {
    return (
      <main className="home">
        <Header />
        <Banner />
        <section className="home__section">
          <div className="home__section--left">
            <div className="home__section--left__text">
              <p>Introducing</p>
              <h1>Airbnb gift cards</h1>
              <button>Shop now</button>
            </div>
          </div>
          <div className="home__section--right"></div>
        </section>
        <h1 className="h1">Inspiration for your next trip</h1>
        <section className="home__section--2">
          <div className="home__section--2__container">
            <div className="home__section--2__card--1">
              <Card
                img="https://a0.muscache.com/im/pictures/73250991-433e-4950-b7d1-59bba711bb57.jpg"
                city="Chamonix-Mont-Blanc"
                km="473 kilometers away"
              />
            </div>
            <div className="home__section--2__card--2">
              <Card
                img="https://a0.muscache.com/im/pictures/aef20929-0d6a-40e7-8ac9-321ff0edf8c9.jpg"
                city="Tignes"
                km="512 kilometers away"
              />
            </div>
            <div className="home__section--2__card--3">
              <Card
                img="https://a0.muscache.com/im/pictures/1cdb5298-1e10-4d5a-ac27-20c80b53b4af.jpg"
                city="La Bresse"
                km="349 kilometers away"
              />
            </div>
            <div className="home__section--2__card--4">
              <Card
                img="https://a0.muscache.com/im/pictures/68ef0c20-321d-42c0-beb4-13bce3e258a2.jpg"
                city="Les Rousses"
                km="385 kilometers away"
              />
            </div>
          </div>
        </section>
        <h1 className="h1--2">Discover Airbnb Experiences</h1>
        <section className="home__section--3">
          <div className="home__section--3__container--left">
            <h1>
              Things to do <br /> on your trip
            </h1>
            <button>Experiences</button>
          </div>
          <div className="home__section--3__container--right">
            <h1>
              Things to do <br /> from home
            </h1>
            <button>Online Experiences</button>
          </div>
        </section>
        <section className="home__section--4">
          <h1>
            Questions <br /> about <br /> hosting?
          </h1>
          <button>Ask a Superhost</button>
        </section>
        <section className="home__section--5">
          <h1 className="h1--3">Inspiration for future getaways</h1>
          <Wizard />
        </section>
        <footer className="home__footer">
          <Footer />
        </footer>
      </main>
    );
  }
}

export default Home;
