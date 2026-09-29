"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [filter, setFilter] = useState("*");
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <>
      {/* Backdrop when modal is active */}
      {activeModal && (
        <div
          className="modal-backdrop fade show"
          style={{ zIndex: 1040 }}
          onClick={() => setActiveModal(null)}
        />
      )}

      <section className="home_banner_area">
		<div className="banner_inner">
			<div className="container">
				<div className="row">
					<div className="col-lg-7">
						<div className="banner_content">
							<h3 className="text-uppercase">Hell0</h3>
							<h1 className="text-uppercase">I am Karan Mishra</h1>
							<h5 className="text-uppercase">Machine Learning & Python developer</h5>
							<div className="d-flex align-items-center">
								<a className="primary_btn" href="#"><span>Hire Me</span></a>
								<a className="primary_btn tr-bg" href="/pdf/Karan_Mishra_ResumeDetailed.pdf"><span>Get CV</span></a>
							</div>
						</div>
					</div>
					<div className="col-lg-5">
						<div className="home_right_img">
							<img className="" src="/img/banner/home-right.png" alt="" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	{/* ================ End Home Banner Area ================= */}

	{/* ================ Start About Us Area ================= */}
	<section className="about_area section_gap">
		<div className="container">
			<div className="row justify-content-start align-items-center">
				<div className="col-lg-5">
					<div className="about_img">
						<img className="" src="/img/about-us.png" alt="" />
					</div>
				</div>

				<div className="offset-lg-1 col-lg-5">
					<div className="main_title text-left">
						<h2>let’s <br />
							Introduce about <br />
							myself</h2>
						<p>
							Hey there! I'm Karan Mishra, a tech enthusiast with a passion for turning complex ideas into practical, innovative solutions. My journey in the world of technology began with a fascination for coding, and it’s led me to dive deep into machine learning, AI, and web technologies.
						</p>
						<p>
							I’m now the proud founder of I Aim Labs, where I get to bring my vision to life, creating cutting-edge tech solutions that make a difference. Whether it's developing advanced machine learning models or crafting sleek web applications, I'm all about pushing boundaries and exploring new possibilities.
						</p>
						<p>
							When I'm not immersed in the world of tech, you’ll likely find me planning my next travel adventure or unwinding with some cartoons and movies—because hey, even founders need a bit of fun, right?
						</p>
						<p>
							I’m always excited about the future and ready to tackle new challenges. If you’re looking to collaborate or just chat about the latest in tech, feel free to reach out!
						</p>
						<a className="primary_btn" href="/pdf/Karan_Mishra_ResumeDetailed.pdf" download="Karan_Mishra_CV.pdf">
							<span>Download CV</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>
	{/* ================ End About Us Area ================= */}

	{/* ================ Srart Brand Area ================= */}
	<section className="brand_area section_gap_bottom">
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-lg-6">
					<div className="row">
						<div className="col-lg-4 col-md-4 col-sm-6">
							<div className="single-brand-item d-table">
								<div className="d-table-cell text-center">
									<img src="/img/brands/logo1.png" alt="" />
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-6">
							<div className="single-brand-item d-table">
								<div className="d-table-cell text-center">
									<img src="/img/brands/logo2.png" alt="" />
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-6">
							<div className="single-brand-item d-table">
								<div className="d-table-cell text-center">
									<img src="/img/brands/logo3.png" alt="" />
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-6">
							<div className="single-brand-item d-table">
								<div className="d-table-cell text-center">
									<img src="/img/brands/logo4.png" alt="" />
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-6">
							<div className="single-brand-item d-table">
								<div className="d-table-cell text-center">
									<img src="/img/brands/logo5.png" alt="" />
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-6">
							<div className="single-brand-item d-table">
								<div className="d-table-cell text-center">
									<img src="/img/brands/logo6.png" alt="" />
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-6">
							<div className="single-brand-item d-table">
								<div className="d-table-cell text-center">
									<img src="/img/brands/logo7.png" alt="" />
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-6">
							<div className="single-brand-item d-table">
								<div className="d-table-cell text-center">
									<img src="/img/brands/logo8.png" alt="" />
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-6">
							<div className="single-brand-item d-table">
								<div className="d-table-cell text-center">
									<img src="/img/brands/logo9.png" alt="" />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="offset-lg-2 col-lg-4 col-md-6">
					<div className="client-info">
						<div className="d-flex mb-50">
							<span className="lage">1</span>
							<span className="smll">Year Experience work</span>
						</div>
						<div className="call-now d-flex">
							<div>
								<span className="fa fa-phone"></span>
							</div>
							<div className="ml-15">
								<p>call us now</p>
								<h3>(+91) 780 489 5074</h3>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	{/* ================ End Brand Area ================= */}

	{/* ================ Start Features Area ================= */}
	{/*  Add Font Awesome CSS to the head of your HTML file  */}
	<section className="features_area">
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-lg-8 text-center">
					<div className="main_title">
						<h2>My Services</h2>
						<p>
							I specialize in a range of cutting-edge technologies and services to help businesses
							innovate and grow. Here’s what I offer:
						</p>
					</div>
				</div>
			</div>
			<div className="row feature_inner">
				<div className="col-lg-3 col-md-6">
					<div className="feature_item">
						<div className="icon" style={{"fontSize": "3rem", "color": "#007FFF"}}>
							<i className="fas fa-brain"></i> {/*  Machine Learning Icon  */}
						</div>
						<h4>Machine Learning Development</h4>
						<p>
							Building intelligent systems with advanced machine learning algorithms, tailored to solve
							complex problems and enhance decision-making processes.
						</p>
					</div>
				</div>
				<div className="col-lg-3 col-md-6">
					<div className="feature_item">
						<div className="icon" style={{"fontSize": "3rem", "color": "#FF5733"}}>
							<i className="fas fa-laptop-code"></i> {/*  Web Development Icon  */}
						</div>
						<h4>Web Application Development</h4>
						<p>
							Crafting responsive, user-friendly web applications that are both aesthetically pleasing
							and functionally robust, using the latest web technologies.
						</p>
					</div>
				</div>
				<div className="col-lg-3 col-md-6">
					<div className="feature_item">
						<div className="icon" style={{"fontSize": "3rem", "color": "#28A745"}}>
							<i className="fas fa-chart-line"></i> {/*  Data Analytics Icon  */}
						</div>
						<h4>Data Analytics & Visualization</h4>
						<p>
							Transforming data into actionable insights with advanced analytics and visually compelling
							dashboards to drive business growth and efficiency.
						</p>
					</div>
				</div>
				<div className="col-lg-3 col-md-6">
					<div className="feature_item">
						<div className="icon" style={{"fontSize": "3rem", "color": "#FFC107"}}>
							<i className="fas fa-robot"></i> {/*  AI & Automation Icon  */}
						</div>
						<h4>AI & Automation Solutions</h4>
						<p>
							Implementing AI-driven automation to streamline processes, reduce manual effort, and
							boost productivity across various industries.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>
	{/* ================ End Features Area ================= */}

	{/* ================Start Portfolio Area ================= */}
	{/*  Add Font Awesome CSS to the head of your HTML file  */}
{/*  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">  */}

<section className="portfolio_area" id="portfolio">
    <div className="container">
        <div className="row">
            <div className="col-lg-12">
                <div className="main_title text-left">
                    <h2>Quality Work <br /> Recently Done Projects</h2>
                </div>
            </div>
        </div>
        <div className="filters portfolio-filter">
            <ul>
                <li style={{ cursor: "pointer" }} onClick={() => setFilter("*")} className={filter === "*" ? "active" : ""}>All</li>
                <li style={{ cursor: "pointer" }} onClick={() => setFilter("popular")} className={filter === "popular" ? "active" : ""}>Popular</li>
                <li style={{ cursor: "pointer" }} onClick={() => setFilter("latest")} className={filter === "latest" ? "active" : ""}>Latest</li>
                <li style={{ cursor: "pointer" }} onClick={() => setFilter("following")} className={filter === "following" ? "active" : ""}>Following</li>
                <li style={{ cursor: "pointer" }} onClick={() => setFilter("upcoming")} className={filter === "upcoming" ? "active" : ""}>Upcoming</li>
            </ul>
        </div>

        <div className="filters-content">
            <div className="row portfolio-grid justify-content-center">
                {/*  KM-DataScience-Portfolio  */}
                <div className="col-lg-4 col-md-6 all latest" style={{ display: (filter === "*" || ['latest'].includes(filter)) ? "block" : "none" }}>
                    <div className="portfolio_box">
                        <div className="single_portfolio">
                            <div className="icon_box">
                                <span className="fas fa-database" style={{"fontSize": "4rem", "color": "#007FFF"}}></span>
                            </div>
                            <div className="overlay"></div>
                            <a href="#kmDataScienceDetails" className="img-gal" onClick={(e) => { e.preventDefault(); setActiveModal("kmDataScienceDetails"); }}>
                                <div className="icon">
                                    <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                                </div>
                            </a>
                        </div>
                        <div className="short_info">
                            <h4><a href="#kmDataScienceDetails" onClick={(e) => { e.preventDefault(); setActiveModal("kmDataScienceDetails"); }}>KM Data Science Portfolio</a></h4>
                            <p>Showcase of data science projects and skills.</p>
                        </div>
                    </div>
                </div>

                {/*  SentiModel_Analysis  */}
                <div className="col-lg-4 col-md-6 all popular" style={{ display: (filter === "*" || ['popular'].includes(filter)) ? "block" : "none" }}>
                    <div className="portfolio_box">
                        <div className="single_portfolio">
                            <div className="icon_box">
                                <span className="fas fa-chart-line" style={{"fontSize": "4rem", "color": "#FF5733"}}></span>
                            </div>
                            <div className="overlay"></div>
                            <a href="#sentiModelDetails" className="img-gal" onClick={(e) => { e.preventDefault(); setActiveModal("sentiModelDetails"); }}>
                                <div className="icon">
                                    <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                                </div>
                            </a>
                        </div>
                        <div className="short_info">
                            <h4><a href="#sentiModelDetails" onClick={(e) => { e.preventDefault(); setActiveModal("sentiModelDetails"); }}>SentiModel Analysis</a></h4>
                            <p>Sentiment analysis model development and tuning.</p>
                        </div>
                    </div>
                </div>

                {/*  TicTacToe-Game  */}
                <div className="col-lg-4 col-md-6 all latest" style={{ display: (filter === "*" || ['latest'].includes(filter)) ? "block" : "none" }}>
                    <div className="portfolio_box">
                        <div className="single_portfolio">
                            <div className="icon_box">
                                <span className="fas fa-gamepad" style={{"fontSize": "4rem", "color": "#28A745"}}></span>
                            </div>
                            <div className="overlay"></div>
                            <a href="#ticTacToeDetails" className="img-gal" onClick={(e) => { e.preventDefault(); setActiveModal("ticTacToeDetails"); }}>
                                <div className="icon">
                                    <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                                </div>
                            </a>
                        </div>
                        <div className="short_info">
                            <h4><a href="#ticTacToeDetails" onClick={(e) => { e.preventDefault(); setActiveModal("ticTacToeDetails"); }}>Tic Tac Toe Game</a></h4>
                            <p>A classic game implemented with modern technologies.</p>
                        </div>
                    </div>
                </div>

                {/*  Feedback Analyzer  */}
                <div className="col-lg-4 col-md-6 all popular" style={{ display: (filter === "*" || ['popular'].includes(filter)) ? "block" : "none" }}>
                    <div className="portfolio_box">
                        <div className="single_portfolio">
                            <div className="icon_box">
                                <span className="fas fa-comment-dots" style={{"fontSize": "4rem", "color": "#FFC107"}}></span>
                            </div>
                            <div className="overlay"></div>
                            <a href="#feedbackAnalyzerDetails" className="img-gal" onClick={(e) => { e.preventDefault(); setActiveModal("feedbackAnalyzerDetails"); }}>
                                <div className="icon">
                                    <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                                </div>
                            </a>
                        </div>
                        <div className="short_info">
                            <h4><a href="#feedbackAnalyzerDetails" onClick={(e) => { e.preventDefault(); setActiveModal("feedbackAnalyzerDetails"); }}>Feedback Analyzer</a></h4>
                            <p>Analyze and visualize feedback data effectively.</p>
                        </div>
                    </div>
                </div>

                {/*  SentiVoice_access  */}
                <div className="col-lg-4 col-md-6 all following" style={{ display: (filter === "*" || ['following'].includes(filter)) ? "block" : "none" }}>
                    <div className="portfolio_box">
                        <div className="single_portfolio">
                            <div className="icon_box">
                                <span className="fas fa-microphone" style={{"fontSize": "4rem", "color": "#17A2B8"}}></span>
                            </div>
                            <div className="overlay"></div>
                            <a href="#sentiVoiceDetails" className="img-gal" onClick={(e) => { e.preventDefault(); setActiveModal("sentiVoiceDetails"); }}>
                                <div className="icon">
                                    <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                                </div>
                            </a>
                        </div>
                        <div className="short_info">
                            <h4><a href="#sentiVoiceDetails" onClick={(e) => { e.preventDefault(); setActiveModal("sentiVoiceDetails"); }}>SentiVoice Access</a></h4>
                            <p>Voice-enabled sentiment analysis application.</p>
                        </div>
                    </div>
                </div>

                {/*  Sentiment-Negation-Analytics  */}
                <div className="col-lg-4 col-md-6 all upcoming" style={{ display: (filter === "*" || ['upcoming'].includes(filter)) ? "block" : "none" }}>
                    <div className="portfolio_box">
                        <div className="single_portfolio">
                            <div className="icon_box">
                                <span className="fas fa-exclamation-triangle" style={{"fontSize": "4rem", "color": "#DC3545"}}></span>
                            </div>
                            <div className="overlay"></div>
                            <a href="#sentimentNegationDetails" className="img-gal" onClick={(e) => { e.preventDefault(); setActiveModal("sentimentNegationDetails"); }}>
                                <div className="icon">
                                    <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                                </div>
                            </a>
                        </div>
                        <div className="short_info">
                            <h4><a href="#sentimentNegationDetails" onClick={(e) => { e.preventDefault(); setActiveModal("sentimentNegationDetails"); }}>Sentiment Negation Analytics</a></h4>
                            <p>Analyzing sentiment with focus on negation aspects.</p>
                        </div>
                    </div>
                </div>

                {/*  BlackCoffe-DataAnalytic  */}
                <div className="col-lg-4 col-md-6 all upcoming following" style={{ display: (filter === "*" || ['upcoming', 'following'].includes(filter)) ? "block" : "none" }}>
                    <div className="portfolio_box">
                        <div className="single_portfolio">
                            <div className="icon_box">
                                <span className="fas fa-coffee" style={{"fontSize": "4rem", "color": "#6F42C1"}}></span>
                            </div>
                            <div className="overlay"></div>
                            <a href="#blackCoffeeDetails" className="img-gal" onClick={(e) => { e.preventDefault(); setActiveModal("blackCoffeeDetails"); }}>
                                <div className="icon">
                                    <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                                </div>
                            </a>
                        </div>
                        <div className="short_info">
                            <h4><a href="#blackCoffeeDetails" onClick={(e) => { e.preventDefault(); setActiveModal("blackCoffeeDetails"); }}>Black Coffee Data Analytic</a></h4>
                            <p>Advanced analytics for coffee industry data.</p>
                        </div>
                    </div>
                </div>

                {/*  Cordova Bluetooth Plugin  */}
                <div className="col-lg-4 col-md-6 all following" style={{ display: (filter === "*" || ['following'].includes(filter)) ? "block" : "none" }}>
                    <div className="portfolio_box">
                        <div className="single_portfolio">
                            <div className="icon_box">
                                <span className="fas fa-bluetooth" style={{"fontSize": "4rem", "color": "#007BFF"}}></span>
                            </div>
                            <div className="overlay"></div>
                            <a href="#cordovaBluetoothDetails" className="img-gal" onClick={(e) => { e.preventDefault(); setActiveModal("cordovaBluetoothDetails"); }}>
                                <div className="icon">
                                    <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                                </div>
                            </a>
                        </div>
                        <div className="short_info">
                            <h4><a href="#cordovaBluetoothDetails" onClick={(e) => { e.preventDefault(); setActiveModal("cordovaBluetoothDetails"); }}>Cordova Bluetooth Plugin</a></h4>
                            <p>Plugin for integrating Bluetooth functionality in Cordova apps.</p>
                        </div>
                    </div>
                </div>

                {/*  Cordova Location Services  */}
                <div className="col-lg-4 col-md-6 all upcoming" style={{ display: (filter === "*" || ['upcoming'].includes(filter)) ? "block" : "none" }}>
                    <div className="portfolio_box">
                        <div className="single_portfolio">
                            <div className="icon_box">
                                <span className="fas fa-map-marker-alt" style={{"fontSize": "4rem", "color": "#28A745"}}></span>
                            </div>
                            <div className="overlay"></div>
                            <a href="#cordovaLocationDetails" className="img-gal" onClick={(e) => { e.preventDefault(); setActiveModal("cordovaLocationDetails"); }}>
                                <div className="icon">
                                    <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                                </div>
                            </a>
                        </div>
                        <div className="short_info">
                            <h4><a href="#cordovaLocationDetails" onClick={(e) => { e.preventDefault(); setActiveModal("cordovaLocationDetails"); }}>Cordova Location Services</a></h4>
                            <p>Plugin for accessing location services in Cordova apps.</p>
                        </div>
                    </div>
                </div>

                {/*  Advanced Sentiment Analysis  */}
                <div className="col-lg-4 col-md-6 all following" style={{ display: (filter === "*" || ['following'].includes(filter)) ? "block" : "none" }}>
                    <div className="portfolio_box">
                        <div className="single_portfolio">
                            <div className="icon_box">
                                <span className="fas fa-chart-pie" style={{"fontSize": "4rem", "color": "#FF5733"}}></span>
                            </div>
                            <div className="overlay"></div>
                            <a href="#advancedSentimentDetails" className="img-gal" onClick={(e) => { e.preventDefault(); setActiveModal("advancedSentimentDetails"); }}>
                                <div className="icon">
                                    <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                                </div>
                            </a>
                        </div>
                        <div className="short_info">
                            <h4><a href="#advancedSentimentDetails" onClick={(e) => { e.preventDefault(); setActiveModal("advancedSentimentDetails"); }}>Advanced Sentiment Analysis</a></h4>
                            <p>In-depth sentiment analysis with advanced techniques.</p>
                        </div>
                    </div>
                </div>

                {/*  Data Science Model Development  */}
                <div className="col-lg-4 col-md-6 all popular upcoming" style={{ display: (filter === "*" || ['popular', 'upcoming'].includes(filter)) ? "block" : "none" }}>
                    <div className="portfolio_box">
                        <div className="single_portfolio">
                            <div className="icon_box">
                                <span className="fas fa-cogs" style={{"fontSize": "4rem", "color": "#007BFF"}}></span>
                            </div>
                            <div className="overlay"></div>
                            <a href="#dataScienceDetails" className="img-gal" onClick={(e) => { e.preventDefault(); setActiveModal("dataScienceDetails"); }}>
                                <div className="icon">
                                    <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                                </div>
                            </a>
                        </div>
                        <div className="short_info">
                            <h4><a href="#dataScienceDetails" onClick={(e) => { e.preventDefault(); setActiveModal("dataScienceDetails"); }}>Data Science Model Development</a></h4>
                            <p>Model development for data science applications.</p>
                        </div>
                    </div>
                </div>

                {/*  Interactive Visualization Tool  */}
                <div className="col-lg-4 col-md-6 all popular" style={{ display: (filter === "*" || ['popular'].includes(filter)) ? "block" : "none" }}>
                    <div className="portfolio_box">
                        <div className="single_portfolio">
                            <div className="icon_box">
                                <span className="fas fa-chart-bar" style={{"fontSize": "4rem", "color": "#FFC107"}}></span>
                            </div>
                            <div className="overlay"></div>
                            <a href="#interactiveVisualizationDetails" className="img-gal" onClick={(e) => { e.preventDefault(); setActiveModal("interactiveVisualizationDetails"); }}>
                                <div className="icon">
                                    <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                                </div>
                            </a>
                        </div>
                        <div className="short_info">
                            <h4><a href="#interactiveVisualizationDetails" onClick={(e) => { e.preventDefault(); setActiveModal("interactiveVisualizationDetails"); }}>Interactive Visualization Tool</a></h4>
                            <p>Tool for creating interactive data visualizations.</p>
                        </div>
                    </div>
                </div>

                {/*  Machine Learning Enhancements  */}
                <div className="col-lg-4 col-md-6 all upcoming following" style={{ display: (filter === "*" || ['upcoming', 'following'].includes(filter)) ? "block" : "none" }}>
                    <div className="portfolio_box">
                        <div className="single_portfolio">
                            <div className="icon_box">
                                <span className="fas fa-brain" style={{"fontSize": "4rem", "color": "#17A2B8"}}></span>
                            </div>
                            <div className="overlay"></div>
                            <a href="#machineLearningDetails" className="img-gal" onClick={(e) => { e.preventDefault(); setActiveModal("machineLearningDetails"); }}>
                                <div className="icon">
                                    <span className="fas fa-link" style={{"fontSize": "2rem", "color": "#333"}}></span>
                                </div>
                            </a>
                        </div>
                        <div className="short_info">
                            <h4><a href="#machineLearningDetails" onClick={(e) => { e.preventDefault(); setActiveModal("machineLearningDetails"); }}>Machine Learning Enhancements</a></h4>
                            <p>Improvements and optimizations in machine learning models.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

{/*  Modal Structure  */}
{/*  KM Data Science Portfolio Modal  */}
<div className={`modal fade ${activeModal === "kmDataScienceDetails" ? "show d-block" : ""}`} id="kmDataScienceDetails" tabIndex={-1} role="dialog" aria-labelledby="kmDataScienceDetailsLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="kmDataScienceDetailsLabel">KM Data Science Portfolio</h5>
                <button type="button" className="close" onClick={() => setActiveModal(null)} aria-label="Close">
                    <span aria-hidden="true" onClick={() => setActiveModal(null)} style={{ cursor: "pointer" }}>&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <p>Detailed showcase of data science projects including data analysis, model building, and visualization techniques used.</p>
                <p>Explore projects that involve complex data manipulations, feature engineering, and predictive modeling.</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setActiveModal(null)}>Close</button>
            </div>
        </div>
    </div>
</div>

{/*  SentiModel Analysis Modal  */}
<div className={`modal fade ${activeModal === "sentiModelDetails" ? "show d-block" : ""}`} id="sentiModelDetails" tabIndex={-1} role="dialog" aria-labelledby="sentiModelDetailsLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="sentiModelDetailsLabel">SentiModel Analysis</h5>
                <button type="button" className="close" onClick={() => setActiveModal(null)} aria-label="Close">
                    <span aria-hidden="true" onClick={() => setActiveModal(null)} style={{ cursor: "pointer" }}>&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <p>This project involves developing and fine-tuning a sentiment analysis model using advanced techniques like deep learning and natural language processing.</p>
                <p>Key features include sentiment classification, feature extraction, and model evaluation metrics.</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setActiveModal(null)}>Close</button>
            </div>
        </div>
    </div>
</div>

{/*  Tic Tac Toe Game Modal  */}
<div className={`modal fade ${activeModal === "ticTacToeDetails" ? "show d-block" : ""}`} id="ticTacToeDetails" tabIndex={-1} role="dialog" aria-labelledby="ticTacToeDetailsLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="ticTacToeDetailsLabel">Tic Tac Toe Game</h5>
                <button type="button" className="close" onClick={() => setActiveModal(null)} aria-label="Close">
                    <span aria-hidden="true" onClick={() => setActiveModal(null)} style={{ cursor: "pointer" }}>&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <p>A modern implementation of the classic Tic Tac Toe game. Features include a user-friendly interface, real-time game updates, and an AI opponent.</p>
                <p>Technology stack includes HTML, CSS, JavaScript, and some game theory algorithms for the AI opponent.</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setActiveModal(null)}>Close</button>
            </div>
        </div>
    </div>
</div>

{/*  Feedback Analyzer Modal  */}
<div className={`modal fade ${activeModal === "feedbackAnalyzerDetails" ? "show d-block" : ""}`} id="feedbackAnalyzerDetails" tabIndex={-1} role="dialog" aria-labelledby="feedbackAnalyzerDetailsLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="feedbackAnalyzerDetailsLabel">Feedback Analyzer</h5>
                <button type="button" className="close" onClick={() => setActiveModal(null)} aria-label="Close">
                    <span aria-hidden="true" onClick={() => setActiveModal(null)} style={{ cursor: "pointer" }}>&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <p>A tool for analyzing feedback data to extract insights and trends. Includes sentiment analysis, keyword extraction, and feedback categorization.</p>
                <p>Built with Python and uses libraries such as Pandas, NLTK, and Matplotlib for data processing and visualization.</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setActiveModal(null)}>Close</button>
            </div>
        </div>
    </div>
</div>

{/*  SentiVoice Access Modal  */}
<div className={`modal fade ${activeModal === "sentiVoiceDetails" ? "show d-block" : ""}`} id="sentiVoiceDetails" tabIndex={-1} role="dialog" aria-labelledby="sentiVoiceDetailsLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="sentiVoiceDetailsLabel">SentiVoice Access</h5>
                <button type="button" className="close" onClick={() => setActiveModal(null)} aria-label="Close">
                    <span aria-hidden="true" onClick={() => setActiveModal(null)} style={{ cursor: "pointer" }}>&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <p>An interactive tool for accessing and managing feedback through voice commands. Supports features such as searching, filtering, and retrieving feedback entries.</p>
                <p>Implemented with speech recognition and natural language processing technologies.</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setActiveModal(null)}>Close</button>
            </div>
        </div>
    </div>
</div>

{/*  Cordova Location Services Modal  */}
<div className={`modal fade ${activeModal === "cordovaLocationDetails" ? "show d-block" : ""}`} id="cordovaLocationDetails" tabIndex={-1} role="dialog" aria-labelledby="cordovaLocationDetailsLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="cordovaLocationDetailsLabel">Cordova Location Services</h5>
                <button type="button" className="close" onClick={() => setActiveModal(null)} aria-label="Close">
                    <span aria-hidden="true" onClick={() => setActiveModal(null)} style={{ cursor: "pointer" }}>&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <p>A plugin designed for accessing location services in Cordova applications. Provides functionality for retrieving geolocation data and handling location-related events.</p>
                <p>Developed using JavaScript and Cordova APIs for seamless integration into mobile apps.</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setActiveModal(null)}>Close</button>
            </div>
        </div>
    </div>
</div>

{/*  Advanced Sentiment Analysis Modal  */}
<div className={`modal fade ${activeModal === "advancedSentimentDetails" ? "show d-block" : ""}`} id="advancedSentimentDetails" tabIndex={-1} role="dialog" aria-labelledby="advancedSentimentDetailsLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="advancedSentimentDetailsLabel">Advanced Sentiment Analysis</h5>
                <button type="button" className="close" onClick={() => setActiveModal(null)} aria-label="Close">
                    <span aria-hidden="true" onClick={() => setActiveModal(null)} style={{ cursor: "pointer" }}>&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <p>This project focuses on applying advanced sentiment analysis techniques to analyze and interpret emotions in textual data. Utilizes machine learning algorithms and NLP methods for precise sentiment classification.</p>
                <p>Features include deep learning models, feature extraction, and real-time sentiment tracking.</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setActiveModal(null)}>Close</button>
            </div>
        </div>
    </div>
</div>

{/*  Data Science Model Development Modal  */}
<div className={`modal fade ${activeModal === "dataScienceDetails" ? "show d-block" : ""}`} id="dataScienceDetails" tabIndex={-1} role="dialog" aria-labelledby="dataScienceDetailsLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="dataScienceDetailsLabel">Data Science Model Development</h5>
                <button type="button" className="close" onClick={() => setActiveModal(null)} aria-label="Close">
                    <span aria-hidden="true" onClick={() => setActiveModal(null)} style={{ cursor: "pointer" }}>&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <p>Developing data science models for various applications, including predictive analytics and machine learning. Emphasizes model training, evaluation, and deployment strategies.</p>
                <p>Involves using tools like Python, R, and various ML libraries to build robust and accurate models.</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setActiveModal(null)}>Close</button>
            </div>
        </div>
    </div>
</div>

{/*  Interactive Visualization Tool Modal  */}
<div className={`modal fade ${activeModal === "interactiveVisualizationDetails" ? "show d-block" : ""}`} id="interactiveVisualizationDetails" tabIndex={-1} role="dialog" aria-labelledby="interactiveVisualizationDetailsLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="interactiveVisualizationDetailsLabel">Interactive Visualization Tool</h5>
                <button type="button" className="close" onClick={() => setActiveModal(null)} aria-label="Close">
                    <span aria-hidden="true" onClick={() => setActiveModal(null)} style={{ cursor: "pointer" }}>&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <p>A tool designed for creating interactive and engaging visualizations. Allows users to explore data through dynamic charts and graphs.</p>
                <p>Utilizes libraries like D3.js and Plotly to provide an immersive data exploration experience.</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setActiveModal(null)}>Close</button>
            </div>
        </div>
    </div>
</div>

{/*  Machine Learning Enhancements Modal  */}
<div className={`modal fade ${activeModal === "machineLearningDetails" ? "show d-block" : ""}`} id="machineLearningDetails" tabIndex={-1} role="dialog" aria-labelledby="machineLearningDetailsLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="machineLearningDetailsLabel">Machine Learning Enhancements</h5>
                <button type="button" className="close" onClick={() => setActiveModal(null)} aria-label="Close">
                    <span aria-hidden="true" onClick={() => setActiveModal(null)} style={{ cursor: "pointer" }}>&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <p>This project focuses on enhancing existing machine learning models through optimization and fine-tuning techniques. Aims to improve model accuracy and efficiency.</p>
                <p>Includes algorithm tuning, hyperparameter optimization, and performance evaluation.</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setActiveModal(null)}>Close</button>
            </div>
        </div>
    </div>
</div>

	{/* ================End Portfolio Area ================= */}

	{/* ================ Start Experience Area ================= */}
	<div className="experience_area section_gap_bottom">
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-lg-8 text-center">
					<div className="main_title">
						<h2>Experience</h2>
						<p>Explore my journey through various roles and projects, highlighting my growth and achievements in the field of technology and research.</p>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="testi_slider owl-carousel">
					{/*  Experience Item 1  */}
					<div className="testi_item">
						<div className="row">
							<div className="col-lg-4">
								<div className="testi_icon" style={{"fontSize": "60px", "color": "#007FFF"}}>
									<i className="fa fa-rocket" aria-hidden="true"></i>
								</div>
							</div>
							<div className="col-lg-8">
								<div className="testi_text">
									<h4>I Aim Labs - Founder</h4>
									<span className="date">August 2024 - Present</span>
									<p>As the founder of `I Aim Labs`, I lead a team focused on developing cutting-edge solutions in machine learning and data analytics. Our work involves creating innovative tools and enhancing existing technologies to drive advancements in the field.</p>
								</div>
							</div>
						</div>
					</div>
					{/*  Experience Item 2  */}
					<div className="testi_item">
						<div className="row">
							<div className="col-lg-4">
								<div className="testi_icon" style={{"fontSize": "60px", "color": "#007FFF"}}>
									<i className="fa fa-cogs" aria-hidden="true"></i>
								</div>
							</div>
							<div className="col-lg-8">
								<div className="testi_text">
									<h4>Geek Theory Pvt. Ltd. - R&D Intern</h4>
									<span className="date">March 2024 - July 2024</span>
									<p>During my internship at Geek Theory, I contributed to the development of Cordova plugins, improved machine learning models, and collaborated with cross-functional teams to achieve project goals. This role provided valuable experience in both technical and collaborative aspects of research and development.</p>
								</div>
							</div>
						</div>
					</div>
					{/*  Experience Item 3  */}
					<div className="testi_item">
						<div className="row">
							<div className="col-lg-4">
								<div className="testi_icon" style={{"fontSize": "60px", "color": "#007FFF"}}>
									<i className="fa fa-code" aria-hidden="true"></i>
								</div>
							</div>
							<div className="col-lg-8">
								<div className="testi_text">
									<h4>Freelancer - Web Design & Development</h4>
									<span className="date">January 2022 - December 2023</span>
									<p>Freelancing experience includes working with various technologies:</p>
									<ul>
										<li><i className="fa fa-python" style={{"fontSize": "24px", "color": "#306998"}}></i> Python Development</li>
										<li><i className="fa fa-java" style={{"fontSize": "24px", "color": "#007396"}}></i> Core Java</li>
										<li><i className="fa fa-html5" style={{"fontSize": "24px", "color": "#E34F26"}}></i> Web Design (HTML/CSS)</li>
										<li><i className="fa fa-cogs" style={{"fontSize": "24px", "color": "#007FFF"}}></i> Machine Learning Models</li>
									</ul>
									<p>Worked on various projects involving web design, Python scripting, Core Java development, and machine learning model implementation.</p>
								</div>
							</div>
						</div>
					</div>
					{/*  Add more experience items as needed  */}
				</div>
			</div>
		</div>
	</div>

	{/*  style use:  */}
	<style dangerouslySetInnerHTML={{ __html: `
		.experience_area {
			background-color: #f9f9f9;
			padding: 60px 0;
		}
	
		.testi_slider {
			position: relative;
		}
	
		.testi_item {
			padding: 20px;
			background-color: #fff;
			border-radius: 8px;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
			margin-bottom: 20px;
		}
	
		.testi_icon {
			font-size: 60px;
			color: #007FFF;
			margin: 20px auto;
		}
	
		.testi_text {
			margin-left: 80px;
		}
	
		.testi_text h4 {
			color: #007FFF;
			margin-top: 0;
		}
	
		.testi_text .date {
			display: block;
			font-size: 14px;
			color: #555;
			margin-bottom: 10px;
		}
	
		.testi_text ul {
			list-style: none;
			padding: 0;
		}
	
		.testi_text ul li {
			margin: 10px 0;
			font-size: 16px;
		}
	
		.testi_text ul li i {
			margin-right: 10px;
		}
	` }} />
	{/*  styke end  */}
{/* ================ End Experience Area ================= */}

	{/* ================ Start Newsletter Area ================= */}
<section className="newsletter_area" style={{"backgroundColor": "#007FFF", "padding": "60px 0"}}>
    <div className="container">
        <div className="row justify-content-center align-items-center">
            <div className="col-lg-12 text-center">
                <div className="subscription_box text-center">
                    <h2 className="text-uppercase text-white" style={{"fontSize": "36px", "fontWeight": "bold"}}>Get Updates from Anywhere</h2>
                    <p className="text-white" style={{"fontSize": "18px", "marginTop": "10px"}}>
                        Stay informed with the latest updates and exclusive offers. Subscribe now to receive notifications directly to your inbox.
                    </p>
                    <div className="subcribe-form" id="mc_embed_signup" style={{"marginTop": "20px"}}>
                        <form target="_blank" noValidate action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&amp;id=92a4423d01" method="get" className="subscription relative" style={{"display": "flex", "justifyContent": "center", "alignItems": "center"}}>
                            <input name="EMAIL" placeholder="Email address"   required type="email" style={{"padding": "10px", "borderRadius": "5px", "border": "none", "marginRight": "10px", "width": "250px"}} />
                            <button className="primary-btn hover d-inline" style={{"backgroundColor": "#FF6F61", "color": "#fff", "padding": "10px 20px", "border": "none", "borderRadius": "5px", "cursor": "pointer", "transition": "background-color 0.3s"}}>
                                <i className="fa fa-paper-plane" aria-hidden="true"></i> Get Started
                            </button>
                            <div className="info"></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
{/* ================ End Newsletter Area ================= */}

<style dangerouslySetInnerHTML={{ __html: `
    .newsletter_area {
        background-color: #007FFF;
        padding: 60px 0;
        color: #fff;
    }

    .subscription_box h2 {
        font-size: 36px;
        font-weight: bold;
        margin-bottom: 20px;
    }

    .subscription_box p {
        font-size: 18px;
        margin-top: 10px;
    }

    .subcribe-form form {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .subcribe-form input[type="email"] {
        padding: 10px;
        border-radius: 5px;
        border: none;
        margin-right: 10px;
        width: 250px;
    }

    .primary-btn {
        background-color: #FF6F61;
        color: #fff;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .primary-btn:hover {
        background-color: #FF4C4C;
    }

    .primary-btn i {
        margin-right: 8px;
    }
` }} />
{/*  News letter css style end  */}


	{/* ================ Footer Area ================= */}
    </>
  );
}
