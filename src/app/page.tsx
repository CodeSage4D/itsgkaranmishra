"use client";

import React, { useState } from "react";
import Link from "next/link";
import { NeuralBackground } from "@/components/NeuralBackground";
import { RoadTimelineExperience } from "@/components/RoadTimelineExperience";
import { ModernContactSection } from "@/components/ModernContactSection";
import { ModernProjectsSection } from "@/components/ModernProjectsSection";

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

	{/* ================ Start About Us Area (Classic Open Editorial Layout) ================= */}
	<section className="about_area section_gap" id="about-section">
		<div className="container">
			<div className="row justify-content-start align-items-center">
				<div className="col-lg-5 text-center mb-4 mb-lg-0">
					<div className="about_img_wrapper" style={{ position: "relative", display: "inline-block" }}>
						<img
							className="img-fluid"
							src="/img/about-us.png"
							alt="Karan Mishra"
							style={{ borderRadius: "16px", maxWidth: "100%", height: "auto" }}
						/>
						{/* Floating Heartbeat Live Status Badge */}
						<div
							className="about_floating_pill heartbeat_soft"
							style={{
								position: "absolute",
								bottom: "16px",
								right: "16px",
								background: "rgba(15, 23, 42, 0.88)",
								backdropFilter: "blur(10px)",
								border: "1px solid rgba(255, 255, 255, 0.2)",
								borderRadius: "50px",
								padding: "8px 16px",
								color: "#ffffff",
								fontSize: "0.82rem",
								fontWeight: 700,
								display: "inline-flex",
								alignItems: "center",
								gap: "8px",
								boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
							}}
						>
							<span
								className="pulse_dot heartbeat_fluctuate"
								style={{
									width: "8px",
									height: "8px",
									borderRadius: "50%",
									background: "#10b981",
									display: "inline-block",
								}}
							></span>
							<span>Founder &bull; Aurxon</span>
						</div>
					</div>
				</div>

				<div className="offset-lg-1 col-lg-6">
					<div className="main_title text-left">
						<span
							className="badge badge-light px-3 py-2 text-primary font-weight-bold mb-3"
							style={{ fontSize: "0.82rem", letterSpacing: "0.06em", textTransform: "uppercase" }}
						>
							About Karan Mishra
						</span>
						<h2>
							Let’s <br />
							Introduce about <br />
							myself
						</h2>
						<p>
							Hey there! I'm <strong>Karan Mishra</strong>, a tech enthusiast and AI engineer with a passion for turning complex ideas into practical, innovative software solutions. With over <strong>3+ years of professional engineering experience</strong>, my journey spans deep machine learning, Python systems architecture, and scalable full-stack development.
						</p>
						<p>
							I’m the proud founder of <strong>Aurxon</strong> (formerly known as i AIM LABS), where I bring my vision to life—creating cutting-edge software solutions, enterprise platforms (like <strong>Aurxon ERP Lite</strong>), and AI intelligence engines (such as <strong>Cognivex</strong> and <strong>HemoAI</strong>) that empower modern organizations.
						</p>
						<p>
							When I'm not immersed in the world of code and models, you’ll likely find me planning my next travel adventure, exploring new tech, or contributing to over 47+ open-source repositories on GitHub.
						</p>
						<p>
							I’m always eager to collaborate on groundbreaking AI initiatives, enterprise architectures, or research projects. Let's connect!
						</p>

						{/* Side-by-side action buttons: Download CV & Let's Connect */}
						<div className="d-flex flex-wrap align-items-center gap-3 mt-4">
							<a
								className="primary_btn mr-3 mb-2"
								href="/pdf/Karan_Mishra_ResumeDetailed.pdf"
								download="Karan_Mishra_CV.pdf"
							>
								<i className="fa fa-download mr-2"></i>
								<span>Download CV</span>
							</a>
							<a
								className="primary_btn tr-bg mb-2 heartbeat_soft"
								href="#direct-contact-section"
							>
								<i className="fa fa-comments-o mr-2"></i>
								<span>Let&apos;s Connect</span>
								<i className="fa fa-arrow-right ml-2"></i>
							</a>
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

	{/* ================ Start Modern Projects Section (Quality Work & GitHub Deployments) ================= */}
	<ModernProjectsSection />
	{/* ================ End Modern Projects Section ================= */}

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
