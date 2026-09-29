"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function PortfolioPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [filter, setFilter] = useState("*");

  return (
    <>
      {activeModal && (
        <div
          className="modal-backdrop fade show"
          style={{ zIndex: 1040 }}
          onClick={() => setActiveModal(null)}
        />
      )}

      {/* ================ End Header Area ================= */}

    {/* ================ Start Banner Area ================= */}
    <section className="banner_area">
        <div className="banner_inner d-flex align-items-center">
            <div className="container">
                <div className="banner_content text-center">
                    <h2>Portfolio</h2>
                    <div className="page_link">
                        <a href="/">Home</a>
                        <a href="/portfolio">Portfolio</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* ================ End Banner Area ================= */}

    {/* ================ Start Portfolio Area ================= */}
<section className="portfolio_area" id="portfolio">
    <div className="container">
        <div className="row">
            {/*  Project: CodeSage4D/KM-DataScience-Portfolio  */}
            <div className="col-lg-4 col-md-6 all popular" style={{ display: (filter === "*" || ['popular'].includes(filter)) ? "block" : "none" }}>
                <div className="portfolio_box">
                    <div className="single_portfolio">
                        <div className="icon_box">
                            <span className="fas fa-database" style={{"fontSize": "4rem", "color": "#4CAF50"}}></span>
                        </div>
                        <div className="overlay"></div>
                        <a href="https://github.com/CodeSage4D/KM-DataScience-Portfolio" target="_blank" className="img-gal">
                            <div className="icon">
                                <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                            </div>
                        </a>
                    </div>
                    <div className="short_info">
                        <h4><a href="https://github.com/CodeSage4D/KM-DataScience-Portfolio" target="_blank">Data Science Portfolio</a></h4>
                        <p>Comprehensive portfolio showcasing data science projects and techniques.</p>
                    </div>
                </div>
            </div>

            {/*  Project: SentiModel_Analysis  */}
            {/*  <div className="col-lg-4 col-md-6 all popular" style={{ display: (filter === "*" || ['popular'].includes(filter)) ? "block" : "none" }}>
                <div className="portfolio_box">
                    <div className="single_portfolio">
                        <div className="icon_box">
                            <span className="fas fa-analytics" style={{"fontSize": "4rem", "color": "#FF5733"}}></span>
                        </div>
                        <div className="overlay"></div>
                        <a href="https://github.com/CodeSage4D/SentiModel_Analysis" target="_blank" className="img-gal">
                            <div className="icon">
                                <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                            </div>
                        </a>
                    </div>
                    <div className="short_info">
                        <h4><a href="https://github.com/CodeSage4D/SentiModel_Analysis" target="_blank">SentiModel Analysis</a></h4>
                        <p>Sentiment analysis model development and tuning.</p>
                    </div>
                </div>
            </div>  */}

            {/*  Project: TicTacToe-Game  */}
            <div className="col-lg-4 col-md-6 all popular" style={{ display: (filter === "*" || ['popular'].includes(filter)) ? "block" : "none" }}>
                <div className="portfolio_box">
                    <div className="single_portfolio">
                        <div className="icon_box">
                            <span className="fas fa-gamepad" style={{"fontSize": "4rem", "color": "#FFC107"}}></span>
                        </div>
                        <div className="overlay"></div>
                        <a href="https://github.com/CodeSage4D/TicTacToe-Game" target="_blank" className="img-gal">
                            <div className="icon">
                                <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                            </div>
                        </a>
                    </div>
                    <div className="short_info">
                        <h4><a href="https://github.com/CodeSage4D/TicTacToe-Game" target="_blank">Tic Tac Toe Game</a></h4>
                        <p>Classic Tic Tac Toe game implementation.</p>
                    </div>
                </div>
            </div>

            {/*  Project: feedback_analyzer  */}
            <div className="col-lg-4 col-md-6 all popular" style={{ display: (filter === "*" || ['popular'].includes(filter)) ? "block" : "none" }}>
                <div className="portfolio_box">
                    <div className="single_portfolio">
                        <div className="icon_box">
                            <span className="fas fa-comments" style={{"fontSize": "4rem", "color": "#2196F3"}}></span>
                        </div>
                        <div className="overlay"></div>
                        <a href="https://github.com/CodeSage4D/feedback_analyzer" target="_blank" className="img-gal">
                            <div className="icon">
                                <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                            </div>
                        </a>
                    </div>
                    <div className="short_info">
                        <h4><a href="https://github.com/CodeSage4D/feedback_analyzer" target="_blank">Feedback Analyzer</a></h4>
                        <p>Tool for analyzing and visualizing feedback.</p>
                    </div>
                </div>
            </div>

            {/*  Project: SentiVoice_access  */}
            <div className="col-lg-4 col-md-6 all popular" style={{ display: (filter === "*" || ['popular'].includes(filter)) ? "block" : "none" }}>
                <div className="portfolio_box">
                    <div className="single_portfolio">
                        <div className="icon_box">
                            <span className="fas fa-microphone" style={{"fontSize": "4rem", "color": "#9C27B0"}}></span>
                        </div>
                        <div className="overlay"></div>
                        <a href="https://github.com/CodeSage4D/SentiVoice_access" target="_blank" className="img-gal">
                            <div className="icon">
                                <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                            </div>
                        </a>
                    </div>
                    <div className="short_info">
                        <h4><a href="https://github.com/CodeSage4D/SentiVoice_access" target="_blank">SentiVoice Access</a></h4>
                        <p>Voice command-based sentiment analysis tool.</p>
                    </div>
                </div>
            </div>

            {/*  Project: Sentiment-Negation-Analytics  */}
            <div className="col-lg-4 col-md-6 all popular" style={{ display: (filter === "*" || ['popular'].includes(filter)) ? "block" : "none" }}>
                <div className="portfolio_box">
                    <div className="single_portfolio">
                        <div className="icon_box">
                            <span className="fas fa-exclamation-circle" style={{"fontSize": "4rem", "color": "#E91E63"}}></span>
                        </div>
                        <div className="overlay"></div>
                        <a href="https://github.com/CodeSage4D/Sentiment-Negation-Analytics" target="_blank" className="img-gal">
                            <div className="icon">
                                <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                            </div>
                        </a>
                    </div>
                    <div className="short_info">
                        <h4><a href="https://github.com/CodeSage4D/Sentiment-Negation-Analytics" target="_blank">Sentiment Negation Analytics</a></h4>
                        <p>Analyzing sentiment negation in text.</p>
                    </div>
                </div>
            </div>

            {/*  Project: DevPortfollio  */}
            <div className="col-lg-4 col-md-6 all popular" style={{ display: (filter === "*" || ['popular'].includes(filter)) ? "block" : "none" }}>
                <div className="portfolio_box">
                    <div className="single_portfolio">
                        <div className="icon_box">
                            <span className="fas fa-laptop-code" style={{"fontSize": "4rem", "color": "#3F51B5"}}></span>
                        </div>
                        <div className="overlay"></div>
                        <a href="https://github.com/CodeSage4D/DevPortfollio" target="_blank" className="img-gal">
                            <div className="icon">
                                <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                            </div>
                        </a>
                    </div>
                    <div className="short_info">
                        <h4><a href="https://github.com/CodeSage4D/DevPortfollio" target="_blank">Developer Portfolio</a></h4>
                        <p>Portfolio showcasing various development projects.</p>
                    </div>
                </div>
            </div>

            {/*  Project: BlackCoffe-DataAnalytic  */}
            <div className="col-lg-4 col-md-6 all popular" style={{ display: (filter === "*" || ['popular'].includes(filter)) ? "block" : "none" }}>
                <div className="portfolio_box">
                    <div className="single_portfolio">
                        <div className="icon_box">
                            <span className="fas fa-coffee" style={{"fontSize": "4rem", "color": "#FF9800"}}></span>
                        </div>
                        <div className="overlay"></div>
                        <a href="https://github.com/CodeSage4D/BlackCoffe-DataAnalytic" target="_blank" className="img-gal">
                            <div className="icon">
                                <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                            </div>
                        </a>
                    </div>
                    <div className="short_info">
                        <h4><a href="https://github.com/CodeSage4D/BlackCoffe-DataAnalytic" target="_blank">BlackCoffee Data Analytics</a></h4>
                        <p>Data analytics project for BlackCoffee company.</p>
                    </div>
                </div>
            </div>

            {/*  Project: cordova-Bluetooth-Plugin  */}
            <div className="col-lg-4 col-md-6 all popular" style={{ display: (filter === "*" || ['popular'].includes(filter)) ? "block" : "none" }}>
                <div className="portfolio_box">
                    <div className="single_portfolio">
                        <div className="icon_box">
                            <span className="fas fa-bluetooth" style={{"fontSize": "4rem", "color": "#00BCD4"}}></span>
                        </div>
                        <div className="overlay"></div>
                        <a href="https://github.com/CodeSage4D/cordova-Bluetooth-Plugin" target="_blank" className="img-gal">
                            <div className="icon">
                                <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                            </div>
                        </a>
                    </div>
                    <div className="short_info">
                        <h4><a href="https://github.com/CodeSage4D/cordova-Bluetooth-Plugin" target="_blank">Cordova Bluetooth Plugin</a></h4>
                        <p>Plugin for Bluetooth functionality in Cordova applications.</p>
                    </div>
                </div>
            </div>

            {/*  Project: cordova-location-services  */}
            <div className="col-lg-4 col-md-6 all popular" style={{ display: (filter === "*" || ['popular'].includes(filter)) ? "block" : "none" }}>
                <div className="portfolio_box">
                    <div className="single_portfolio">
                        <div className="icon_box">
                            <span className="fas fa-location-arrow" style={{"fontSize": "4rem", "color": "#FF5722"}}></span>
                        </div>
                        <div className="overlay"></div>
                        <a href="https://github.com/CodeSage4D/cordova-location-services" target="_blank" className="img-gal">
                            <div className="icon">
                                <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                            </div>
                        </a>
                    </div>
                    <div className="short_info">
                        <h4><a href="https://github.com/CodeSage4D/cordova-location-services" target="_blank">Cordova Location Services</a></h4>
                        <p>Plugin for location services in Cordova applications.</p>
                    </div>
                </div>
            </div>

            {/*  Project: EmailExtractorBot  */}
            <div className="col-lg-4 col-md-6 all popular" style={{ display: (filter === "*" || ['popular'].includes(filter)) ? "block" : "none" }}>
                <div className="portfolio_box">
                    <div className="single_portfolio">
                        <div className="icon_box">
                            <span className="fas fa-envelope" style={{"fontSize": "4rem", "color": "#8BC34A"}}></span>
                        </div>
                        <div className="overlay"></div>
                        <a href="https://github.com/CodeSage4D/EmailExtractorBot" target="_blank" className="img-gal">
                            <div className="icon">
                                <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                            </div>
                        </a>
                    </div>
                    <div className="short_info">
                        <h4><a href="https://github.com/CodeSage4D/EmailExtractorBot" target="_blank">Email Extractor Bot</a></h4>
                        <p>Bot for scraping and extracting emails from websites.</p>
                    </div>
                </div>
            </div>

            {/*  Project: sentiVoice-analyzer  */}
            <div className="col-lg-4 col-md-6 all popular" style={{ display: (filter === "*" || ['popular'].includes(filter)) ? "block" : "none" }}>
                <div className="portfolio_box">
                    <div className="single_portfolio">
                        <div className="icon_box">
                            <span className="fas fa-volume-up" style={{"fontSize": "4rem", "color": "#FFC107"}}></span>
                        </div>
                        <div className="overlay"></div>
                        <a href="https://github.com/CodeSage4D/sentiVoice-analyzer" target="_blank" className="img-gal">
                            <div className="icon">
                                <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                            </div>
                        </a>
                    </div>
                    <div className="short_info">
                        <h4><a href="https://github.com/CodeSage4D/sentiVoice-analyzer" target="_blank">SentiVoice Analyzer</a></h4>
                        <p>Analyzing sentiment from voice inputs.</p>
                    </div>
                </div>
            </div>

            {/*  Project: Image-Repair-Tool  */}
            <div className="col-lg-4 col-md-6 all popular" style={{ display: (filter === "*" || ['popular'].includes(filter)) ? "block" : "none" }}>
                <div className="portfolio_box">
                    <div className="single_portfolio">
                        <div className="icon_box">
                            <span className="fas fa-image" style={{"fontSize": "4rem", "color": "#FF9800"}}></span>
                        </div>
                        <div className="overlay"></div>
                        <a href="https://github.com/CodeSage4D/Image-Repair-Tool" target="_blank" className="img-gal">
                            <div className="icon">
                                <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                            </div>
                        </a>
                    </div>
                    <div className="short_info">
                        <h4><a href="https://github.com/CodeSage4D/Image-Repair-Tool" target="_blank">Image Repair Tool</a></h4>
                        <p>Tool for repairing and enhancing images.</p>
                    </div>
                </div>
            </div>

            {/*  Project: cordova-plugin-location  */}
            <div className="col-lg-4 col-md-6 all popular" style={{ display: (filter === "*" || ['popular'].includes(filter)) ? "block" : "none" }}>
                <div className="portfolio_box">
                    <div className="single_portfolio">
                        <div className="icon_box">
                            <span className="fas fa-map-marker-alt" style={{"fontSize": "4rem", "color": "#4CAF50"}}></span>
                        </div>
                        <div className="overlay"></div>
                        <a href="https://github.com/CodeSage4D/cordova-plugin-location" target="_blank" className="img-gal">
                            <div className="icon">
                                <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                            </div>
                        </a>
                    </div>
                    <div className="short_info">
                        <h4><a href="https://github.com/CodeSage4D/cordova-plugin-location" target="_blank">Cordova Plugin Location</a></h4>
                        <p>Plugin for location services in Cordova applications.</p>
                    </div>
                </div>
            </div>

            {/*  Project: ImageClassifcation-Major  */}
            <div className="col-lg-4 col-md-6 all popular" style={{ display: (filter === "*" || ['popular'].includes(filter)) ? "block" : "none" }}>
                <div className="portfolio_box">
                    <div className="single_portfolio">
                        <div className="icon_box">
                            <span className="fas fa-camera" style={{"fontSize": "4rem", "color": "#673AB7"}}></span>
                        </div>
                        <div className="overlay"></div>
                        <a href="https://github.com/mzDzyre/ImageClassifcation-Major" target="_blank" className="img-gal">
                            <div className="icon">
                                <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                            </div>
                        </a>
                    </div>
                    <div className="short_info">
                        <h4><a href="https://github.com/mzDzyre/ImageClassifcation-Major" target="_blank">Image Classification Major</a></h4>
                        <p>Image classification project with advanced techniques.</p>
                    </div>
                </div>
            </div>

            {/*  Project: TICTACTOE-cordova  */}
            <div className="col-lg-4 col-md-6 all popular" style={{ display: (filter === "*" || ['popular'].includes(filter)) ? "block" : "none" }}>
                <div className="portfolio_box">
                    <div className="single_portfolio">
                        <div className="icon_box">
                            <span className="fas fa-tachometer-alt" style={{"fontSize": "4rem", "color": "#FF5722"}}></span>
                        </div>
                        <div className="overlay"></div>
                        <a href="https://github.com/CodeSage4D/TICTACTOE-cordova" target="_blank" className="img-gal">
                            <div className="icon">
                                <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                            </div>
                        </a>
                    </div>
                    <div className="short_info">
                        <h4><a href="https://github.com/CodeSage4D/TICTACTOE-cordova" target="_blank">Tic Tac Toe Cordova</a></h4>
                        <p>Tic Tac Toe game implementation using Cordova.</p>
                    </div>
                </div>
            </div>

            {/*  Project: UserDatabsePlugin-Register  */}
            <div className="col-lg-4 col-md-6 all popular" style={{ display: (filter === "*" || ['popular'].includes(filter)) ? "block" : "none" }}>
                <div className="portfolio_box">
                    <div className="single_portfolio">
                        <div className="icon_box">
                            <span className="fas fa-database" style={{"fontSize": "4rem", "color": "#009688"}}></span>
                        </div>
                        <div className="overlay"></div>
                        <a href="https://github.com/CodeSage4D/UserDatabsePlugin-Register" target="_blank" className="img-gal">
                            <div className="icon">
                                <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                            </div>
                        </a>
                    </div>
                    <div className="short_info">
                        <h4><a href="https://github.com/CodeSage4D/UserDatabsePlugin-Register" target="_blank">User Database Plugin Register</a></h4>
                        <p>Plugin for user registration and database management.</p>
                    </div>
                </div>
            </div>

            {/*  Project: newsapp  */}
            <div className="col-lg-4 col-md-6 all popular" style={{ display: (filter === "*" || ['popular'].includes(filter)) ? "block" : "none" }}>
                <div className="portfolio_box">
                    <div className="single_portfolio">
                        <div className="icon_box">
                            <span className="fas fa-newspaper" style={{"fontSize": "4rem", "color": "#E91E63"}}></span>
                        </div>
                        <div className="overlay"></div>
                        <a href="https://github.com/CodeSage4D/newsapp" target="_blank" className="img-gal">
                            <div className="icon">
                                <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                            </div>
                        </a>
                    </div>
                    <div className="short_info">
                        <h4><a href="https://github.com/CodeSage4D/newsapp" target="_blank">News App</a></h4>
                        <p>Application for news aggregation and display.</p>
                    </div>
                </div>
            </div>

            {/*  Project: Coursify_Task  */}
            <div className="col-lg-4 col-md-6 all popular" style={{ display: (filter === "*" || ['popular'].includes(filter)) ? "block" : "none" }}>
                <div className="portfolio_box">
                    <div className="single_portfolio">
                        <div className="icon_box">
                            <span className="fas fa-tasks" style={{"fontSize": "4rem", "color": "#3F51B5"}}></span>
                        </div>
                        <div className="overlay"></div>
                        <a href="https://github.com/CodeSage4D/Coursify_Task" target="_blank" className="img-gal">
                            <div className="icon">
                                <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                            </div>
                        </a>
                    </div>
                    <div className="short_info">
                        <h4><a href="https://github.com/CodeSage4D/Coursify_Task" target="_blank">Coursify Task</a></h4>
                        <p>Task management and organization application.</p>
                    </div>
                </div>
            </div>

            {/*  Project: Quiz_App_Python  */}
            <div className="col-lg-4 col-md-6 all popular" style={{ display: (filter === "*" || ['popular'].includes(filter)) ? "block" : "none" }}>
                <div className="portfolio_box">
                    <div className="single_portfolio">
                        <div className="icon_box">
                            <span className="fas fa-question-circle" style={{"fontSize": "4rem", "color": "#FF5722"}}></span>
                        </div>
                        <div className="overlay"></div>
                        <a href="https://github.com/CodeSage4D/Quiz_App_Python" target="_blank" className="img-gal">
                            <div className="icon">
                                <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                            </div>
                        </a>
                    </div>
                    <div className="short_info">
                        <h4><a href="https://github.com/CodeSage4D/Quiz_App_Python" target="_blank">Quiz App Python</a></h4>
                        <p>Python-based quiz application for learning.</p>
                    </div>
                </div>
            </div>

            {/*  Project: Anomaly-Detection  */}
            <div className="col-lg-4 col-md-6 all popular" style={{ display: (filter === "*" || ['popular'].includes(filter)) ? "block" : "none" }}>
                <div className="portfolio_box">
                    <div className="single_portfolio">
                        <div className="icon_box">
                            <span className="fas fa-exclamation-triangle" style={{"fontSize": "4rem", "color": "#F44336"}}></span>
                        </div>
                        <div className="overlay"></div>
                        <a href="https://github.com/CodeSage4D/Anomaly-Detection" target="_blank" className="img-gal">
                            <div className="icon">
                                <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                            </div>
                        </a>
                    </div>
                    <div className="short_info">
                        <h4><a href="https://github.com/CodeSage4D/Anomaly-Detection" target="_blank">Anomaly Detection</a></h4>
                        <p>Detection of anomalies in data for improved analysis.</p>
                    </div>
                </div>
            </div>

            {/*  Project: JavapracticeTask  */}
            <div className="col-lg-4 col-md-6 all popular" style={{ display: (filter === "*" || ['popular'].includes(filter)) ? "block" : "none" }}>
                <div className="portfolio_box">
                    <div className="single_portfolio">
                        <div className="icon_box">
                            <span className="fas fa-code" style={{"fontSize": "4rem", "color": "#2196F3"}}></span>
                        </div>
                        <div className="overlay"></div>
                        <a href="https://github.com/CodeSage4D/JavapracticeTask" target="_blank" className="img-gal">
                            <div className="icon">
                                <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                            </div>
                        </a>
                    </div>
                    <div className="short_info">
                        <h4><a href="https://github.com/CodeSage4D/JavapracticeTask" target="_blank">Java Practice Task</a></h4>
                        <p>Practice tasks for Java programming.</p>
                    </div>
                </div>
            </div>

            {/*  Project: PhoneNumber_Tracker  */}
            <div className="col-lg-4 col-md-6 all popular" style={{ display: (filter === "*" || ['popular'].includes(filter)) ? "block" : "none" }}>
                <div className="portfolio_box">
                    <div className="single_portfolio">
                        <div className="icon_box">
                            <span className="fas fa-phone" style={{"fontSize": "4rem", "color": "#4CAF50"}}></span>
                        </div>
                        <div className="overlay"></div>
                        <a href="https://github.com/CodeSage4D/PhoneNumber_Tracker" target="_blank" className="img-gal">
                            <div className="icon">
                                <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                            </div>
                        </a>
                    </div>
                    <div className="short_info">
                        <h4><a href="https://github.com/CodeSage4D/PhoneNumber_Tracker" target="_blank">Phone Number Tracker</a></h4>
                        <p>Track phone numbers and their details.</p>
                    </div>
                </div>
            </div>

            {/*  Project: greeting  */}
            <div className="col-lg-4 col-md-6 all popular" style={{ display: (filter === "*" || ['popular'].includes(filter)) ? "block" : "none" }}>
                <div className="portfolio_box">
                    <div className="single_portfolio">
                        <div className="icon_box">
                            <span className="fas fa-handshake" style={{"fontSize": "4rem", "color": "#FF5722"}}></span>
                        </div>
                        <div className="overlay"></div>
                        <a href="https://github.com/CodeSage4D/greeting" target="_blank" className="img-gal">
                            <div className="icon">
                                <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                            </div>
                        </a>
                    </div>
                    <div className="short_info">
                        <h4><a href="https://github.com/CodeSage4D/greeting" target="_blank">Greeting</a></h4>
                        <p>Simple greeting application.</p>
                    </div>
                </div>
            </div>

            {/*  Project: ACHLA  */}
            <div className="col-lg-4 col-md-6 all popular" style={{ display: (filter === "*" || ['popular'].includes(filter)) ? "block" : "none" }}>
                <div className="portfolio_box">
                    <div className="single_portfolio">
                        <div className="icon_box">
                            <span className="fas fa-hand-holding-heart" style={{"fontSize": "4rem", "color": "#FF9800"}}></span>
                        </div>
                        <div className="overlay"></div>
                        <a href="https://github.com/CodeSage4D/ACHLA" target="_blank" className="img-gal">
                            <div className="icon">
                                <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                            </div>
                        </a>
                    </div>
                    <div className="short_info">
                        <h4><a href="https://github.com/CodeSage4D/ACHLA" target="_blank">ACHLA</a></h4>
                        <p>Charity application for tracking donations.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>


    {/* ================ Start Contact Area ================= */}
    <section className="contact_area" id="contact">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="main_title text-center">
                        <h2>Contact Me</h2>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="contact_info">
                        <h3>Get In Touch</h3>
                        <ul>
                            <li><i className="fa fa-phone"></i> (+91) 7804895074</li>
                            <li><i className="fa fa-envelope"></i> karanmishra.3122@gmail.com</li>
                            <li><i className="fa fa-map-marker"></i> Ujjain, MP, India</li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-6">
                    <form action="mailto:karanmishra.3122@gmail.com" method="post" encType="text/plain">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" id="name" name="name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" className="form-control" id="email" name="email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea className="form-control" id="message" name="message" rows={4} required></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
    {/* ================ End Contact Area ================= */}

   {/* ================ Footer Area ================= */}
    </>
  );
}
