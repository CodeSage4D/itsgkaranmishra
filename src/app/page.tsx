"use client";

import React, { useState } from "react";
import Link from "next/link";
import { NeuralBackground } from "@/components/NeuralBackground";
import { RoadTimelineExperience } from "@/components/RoadTimelineExperience";
import { ModernContactSection } from "@/components/ModernContactSection";

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

      <section className="home_banner_area" style={{ position: "relative", overflow: "hidden" }}>
		{/* Interactive Neural AI Constellation Background */}
		<NeuralBackground particleCount={55} />

		<div className="banner_inner" style={{ position: "relative", zIndex: 2 }}>
			<div className="container">
				<div className="row align-items-center">
					<div className="col-lg-7">
						<div className="banner_content">
							<h3 className="text-uppercase" style={{ letterSpacing: "2px", color: "#4458dc", fontWeight: 700 }}>Hello</h3>
							<h1 className="text-uppercase" style={{ fontWeight: 800 }}>I am Karan Mishra</h1>
							<h5 className="text-uppercase" style={{ color: "#334155", fontWeight: 600 }}>
								Founder &bull; Aurxon &bull; Machine Learning &amp; Python Engineer
							</h5>
							<p className="mt-3 mb-4 text-muted" style={{ maxWidth: "560px", lineHeight: "1.7", fontSize: "1.05rem" }}>
								Building transformative enterprise AI platforms, neural architectures, and scalable full-stack software. Open-source contributor with 47+ GitHub repositories and 3+ years of professional engineering experience.
							</p>
							<div className="d-flex flex-wrap align-items-center gap-3">
								<Link className="primary_btn mr-3 mb-2" href="/contact">
									<span>Direct Message / Hire Me</span>
								</Link>
								<a className="primary_btn tr-bg mb-2" href="/pdf/Karan_Mishra_ResumeDetailed.pdf" download="Karan_Mishra_CV.pdf">
									<span>Get CV</span>
								</a>
							</div>
						</div>
					</div>
					<div className="col-lg-5">
						<div className="home_right_img text-center">
							<img className="img-fluid" src="/img/banner/home-right.png" alt="Karan Mishra" style={{ maxHeight: "500px", objectFit: "contain" }} />
						</div>
					</div>
				</div>

				{/* Professional Live Analytics Stats Bar */}
				<div className="hero_analytics_container mt-5 pt-3">
					<div className="row justify-content-center text-center">
						<div className="col-6 col-md-3 mb-3">
							<div className="hero_stat_card">
								<div className="stat_number">3+</div>
								<div className="stat_label">Years Experience</div>
							</div>
						</div>
						<div className="col-6 col-md-3 mb-3">
							<div className="hero_stat_card">
								<a href="https://github.com/CodeSage4D" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
									<div className="stat_number">47+</div>
									<div className="stat_label">GitHub Repositories</div>
								</a>
							</div>
						</div>
						<div className="col-6 col-md-3 mb-3">
							<div className="hero_stat_card">
								<div className="stat_number">15+</div>
								<div className="stat_label">ML/AI Architectures</div>
							</div>
						</div>
						<div className="col-6 col-md-3 mb-3">
							<div className="hero_stat_card">
								<div className="stat_number" style={{ background: "linear-gradient(135deg, #4458dc, #854fee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
									AURXON
								</div>
								<div className="stat_label">Venture Platform</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	{/* ================ End Home Banner Area ================= */}

	{/* ================ Start About Us Area (Cut-Off Concise Design) ================= */}
	<section className="about_area section_gap concise_cutoff_about">
		<div className="container">
			<div className="cutoff_card_container">
				{/* Top-Right Decorative Cut-Off Tag */}
				<div className="cutoff_accent_corner">
					<span className="cutoff_tag_text heartbeat_fluctuate">
						<i className="fa fa-heart mr-1 text-danger"></i> AI Innovator
					</span>
				</div>

				<div className="row align-items-center">
					<div className="col-lg-5 mb-4 mb-lg-0 text-center">
						<div className="about_avatar_frame">
							<img className="img-fluid about_profile_img" src="/img/about-us.png" alt="Karan Mishra" />
							<div className="about_floating_badge heartbeat_soft">
								<span className="badge_pulse_dot heartbeat_fluctuate"></span>
								<span>Founder &bull; Aurxon</span>
							</div>
						</div>
					</div>

					<div className="col-lg-7">
						<div className="about_concise_content">
							<div className="d-flex align-items-center gap-2 mb-2">
								<span className="about_kicker">Executive Bio</span>
								<span className="kicker_divider">/</span>
								<span className="about_subkicker">Smart City Indore, India</span>
							</div>

							<h2 className="about_main_heading">
								Engineering Intelligent Systems That <span className="text_gradient_purple">Scale</span>
							</h2>

							<p className="about_lead_summary">
								I&apos;m <strong>Karan Mishra</strong>, an AI &amp; Machine Learning Engineer with <strong>3+ years of professional engineering experience</strong>. I specialize in translating complex neural algorithms and Python architectures into reliable, production-grade applications that solve tangible problems.
							</p>

							{/* Key Concise Value Highlights */}
							<div className="about_points_grid row g-3 my-4">
								<div className="col-sm-6 mb-3">
									<div className="concise_point_box">
										<div className="point_icon"><i className="fa fa-cubes"></i></div>
										<div>
											<h5 className="point_title">Enterprise AI &amp; SaaS</h5>
											<p className="point_desc">Architect of Aurxon ERP Lite and AI intelligence suites for institutions.</p>
										</div>
									</div>
								</div>
								<div className="col-sm-6 mb-3">
									<div className="concise_point_box">
										<div className="point_icon"><i className="fa fa-cogs"></i></div>
										<div>
											<h5 className="point_title">NLP &amp; Semantic Search</h5>
											<p className="point_desc">Cognivex resume embeddings, SentiVoice speech-to-text sentiment handling.</p>
										</div>
									</div>
								</div>
								<div className="col-sm-6 mb-3">
									<div className="concise_point_box">
										<div className="point_icon"><i className="fa fa-heartbeat"></i></div>
										<div>
											<h5 className="point_title">Predictive Healthcare</h5>
											<p className="point_desc">HemoAI predictive blood bank demand and patient prioritization algorithms.</p>
										</div>
									</div>
								</div>
								<div className="col-sm-6 mb-3">
									<div className="concise_point_box">
										<div className="point_icon"><i className="fa fa-github"></i></div>
										<div>
											<h5 className="point_title">Open Source Contributions</h5>
											<p className="point_desc">47+ public codebases on GitHub, Cordova plugins, and Python toolkits.</p>
										</div>
									</div>
								</div>
							</div>

							<div className="d-flex flex-wrap align-items-center gap-3">
								<a className="primary_btn mr-3 mb-2" href="/pdf/Karan_Mishra_ResumeDetailed.pdf" download="Karan_Mishra_CV.pdf">
									<i className="fa fa-download mr-2"></i>
									<span>Download Resume</span>
								</a>
								<a className="primary_btn tr-bg mb-2" href="#direct-contact-section">
									<i className="fa fa-paper-plane mr-2"></i>
									<span>Collaborate With Me</span>
								</a>
							</div>
						</div>
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
						<div className="d-flex mb-50 align-items-center">
							<span className="lage">3+</span>
							<span className="smll">Years Experience &bull; AI, ML &amp; Python</span>
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

	{/* ================ Start Storytelling Road Timeline Experience Area ================= */}
	<RoadTimelineExperience />
	{/* ================ End Storytelling Road Timeline Experience Area ================= */}

	{/* ================ Start Modern Direct Contact & Consultation Area ================= */}
	<ModernContactSection />
	{/* ================ End Modern Direct Contact & Consultation Area ================= */}

	{/* Scoped Page Component Styling */}
	<style dangerouslySetInnerHTML={{ __html: `
		/* Cut-off Concise About Section Styles */
		.concise_cutoff_about {
			position: relative;
			background: #f8fafc;
			transition: background-color 0.3s ease;
		}

		.dark .concise_cutoff_about {
			background: #090d16 !important;
		}

		.cutoff_card_container {
			background: #ffffff;
			border: 1px solid rgba(226, 232, 240, 0.9);
			border-radius: 24px;
			padding: 48px;
			position: relative;
			box-shadow: 0 14px 40px rgba(15, 23, 42, 0.05);
			overflow: hidden;
		}

		.dark .cutoff_card_container {
			background: #131c31;
			border-color: #1e293b;
			box-shadow: 0 16px 45px rgba(0, 0, 0, 0.4);
		}

		.cutoff_accent_corner {
			position: absolute;
			top: 0;
			right: 0;
			padding: 10px 24px;
			background: linear-gradient(135deg, rgba(68, 88, 220, 0.1) 0%, rgba(133, 79, 238, 0.15) 100%);
			border-bottom-left-radius: 20px;
			border-left: 1px solid rgba(68, 88, 220, 0.2);
			border-bottom: 1px solid rgba(68, 88, 220, 0.2);
		}

		.cutoff_tag_text {
			font-size: 0.8rem;
			font-weight: 800;
			color: #4458dc;
			text-transform: uppercase;
			letter-spacing: 0.06em;
		}

		.dark .cutoff_tag_text {
			color: #818cf8;
		}

		.about_avatar_frame {
			position: relative;
			display: inline-block;
			max-width: 380px;
		}

		.about_profile_img {
			border-radius: 20px;
			box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
		}

		.about_floating_badge {
			position: absolute;
			bottom: 15px;
			right: 15px;
			background: rgba(15, 23, 42, 0.85);
			backdrop-filter: blur(8px);
			border: 1px solid rgba(255, 255, 255, 0.2);
			color: #ffffff;
			padding: 8px 16px;
			border-radius: 50px;
			font-size: 0.82rem;
			font-weight: 700;
			display: inline-flex;
			align-items: center;
			gap: 8px;
			box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
		}

		.badge_pulse_dot {
			width: 8px;
			height: 8px;
			border-radius: 50%;
			background: #10b981;
		}

		.about_kicker {
			font-size: 0.8rem;
			font-weight: 800;
			color: #4458dc;
			text-transform: uppercase;
			letter-spacing: 0.06em;
		}

		.kicker_divider {
			color: #94a3b8;
			font-weight: 700;
		}

		.about_subkicker {
			font-size: 0.82rem;
			color: #64748b;
			font-weight: 600;
		}

		.about_main_heading {
			font-size: 2.2rem;
			font-weight: 800;
			color: #0f172a;
			line-height: 1.25;
			margin-bottom: 18px;
		}

		.dark .about_main_heading {
			color: #ffffff;
		}

		.text_gradient_purple {
			background: linear-gradient(135deg, #4458dc 0%, #854fee 100%);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}

		.about_lead_summary {
			font-size: 1.02rem;
			line-height: 1.7;
			color: #334155;
			margin-bottom: 20px;
		}

		.dark .about_lead_summary {
			color: #cbd5e1;
		}

		.concise_point_box {
			display: flex;
			align-items: flex-start;
			gap: 14px;
			padding: 14px;
			background: #f8fafc;
			border: 1px solid #e2e8f0;
			border-radius: 12px;
			height: 100%;
			transition: all 0.25s ease;
		}

		.dark .concise_point_box {
			background: #0f172a;
			border-color: #1e293b;
		}

		.concise_point_box:hover {
			transform: translateY(-2px);
			border-color: #4458dc;
			box-shadow: 0 6px 16px rgba(68, 88, 220, 0.1);
		}

		.point_icon {
			width: 38px;
			height: 38px;
			border-radius: 10px;
			background: rgba(68, 88, 220, 0.1);
			color: #4458dc;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 1.05rem;
			flex-shrink: 0;
		}

		.dark .point_icon {
			background: rgba(99, 102, 241, 0.15);
			color: #818cf8;
		}

		.point_title {
			font-size: 0.95rem;
			font-weight: 700;
			color: #0f172a;
			margin: 0 0 3px 0;
		}

		.dark .point_title {
			color: #ffffff;
		}

		.point_desc {
			font-size: 0.82rem;
			line-height: 1.45;
			color: #64748b;
			margin: 0;
		}

		.dark .point_desc {
			color: #94a3b8;
		}

		/* Responsive Adjustments */
		@media (max-width: 767px) {
			.cutoff_card_container {
				padding: 28px 20px;
			}
			.about_main_heading {
				font-size: 1.7rem;
			}
		}
	`}} />
{/*  News letter css style end  */}


	{/* ================ Footer Area ================= */}
    </>
  );
}
