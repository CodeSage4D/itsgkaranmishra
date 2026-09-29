import React from "react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      {/* ================ End Header Area ================= */}

	{/* ================ Start Banner Area ================= */}
	<section className="banner_area">
		<div className="banner_inner d-flex align-items-center">
			<div className="container">
				<div className="banner_content text-center">
					<h2>About Us</h2>
					<div className="page_link">
						<a href="/">Home</a>
						<a href="/about">About</a>
					</div>
				</div>
			</div>
		</div>
	</section>
	{/* ================ End Banner Area ================= */}

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
						<h2>About Me</h2>
						<p>
							Hello! I’m Karan Mishra, a passionate technology enthusiast with a deep-seated love for
							machine learning and software development. My journey has been fueled by an insatiable
							curiosity and a relentless drive to solve complex problems and create impactful solutions.
						</p>
						<p>
							Currently, I’m working as a Research and Development Intern at Geek Theory Pvt. Ltd., where
							I focus on enhancing machine learning models, developing Cordova plugins, and collaborating
							with cross-functional teams to bring innovative solutions to life.
						</p>
						<p>
							My educational background in Computer Science from Sri Aurobindo Institute of Technology,
							coupled with hands-on experience in Python and various other technologies, has equipped me
							with a diverse skill set. I’m particularly proud of my accomplishments in data analytics and
							model optimization, which have significantly contributed to the projects I’ve been involved
							in.
						</p>
						<p>
							When I’m not coding or analyzing data, you’ll find me traveling, exploring new cultures, or
							catching up on the latest movies and cartoons. These experiences not only provide me with a
							fresh perspective but also inspire creativity in my work.
						</p>
						<a className="primary_btn" href="/pdf/Karan_Mishra_ResumeDetailed.pdf"><span>Download CV</span></a>
					</div>
				</div>
			</div>
		</div>
	</section>
	{/* ================ End About Us Area ================= */}

	{/*  About Page Section  */}
	<section id="about" className="about">
		<div className="main_title text-center">
			<h2>About</h2>
			<p>My Current Professional Journey</p>
		</div>
		<div className="logo-container">
			<img src="/img/iaimlabs_logo\logo-no-background.png" alt="i AIM LABS Logo" className="logo" />
		</div>
		<div className="about-content">
			<div className="founder-info">
				<h2>Karan Mishra</h2>
				<p>Founder and CEO of <strong>i AIM LABS</strong></p>
			</div>
			<div className="company-overview">
				<h3>Company Overview</h3>
				<p>At i AIM LABS, we believe in turning ideas into reality through cutting-edge technology and
					innovation. Our dedicated team of experts leverages the latest in machine learning, artificial
					intelligence, and data analytics to craft solutions that drive business growth and efficiency. We
					are committed to never repeating mistakes, ensuring each project is a step forward in our journey of
					excellence.</p>
				<p>We pride ourselves on our research-driven approach, allowing us to stay ahead of emerging trends and
					deliver tailor-made solutions that not only meet but exceed our clients' expectations. Whether
					you're a startup looking to break new ground or an established enterprise aiming to innovate, i AIM
					LABS is your partner in progress.</p>
				<p>Join us in shaping the future, today.</p>
				<h3>Key Specialties:</h3>
				<ul>
					<li>Machine Learning & AI Solutions</li>
					<li>Software Development</li>
					<li>Data Analytics & Insights</li>
					<li>Innovative Product Development</li>
					<li>Research & Development</li>
				</ul>
				<h3>Our Mission:</h3>
				<p>Our mission at i AIM LABS is to harness the power of technology to create innovative solutions that
					empower businesses to thrive in an ever-evolving digital landscape.</p>
				<h3>Our Vision:</h3>
				<p>To be a global leader in technology innovation, recognized for our commitment to quality, integrity,
					and client satisfaction. We envision a future where every small business can thrive alongside
					industry leaders. By connecting them digitally and ensuring their work is executed with perfection,
					i AIM LABS is dedicated to helping small businesses achieve professional growth and succeed in an
					increasingly digital world.</p>
				<h3>Industry</h3>
				<p>IT Services and IT Consulting</p>
			</div>
		</div>
	</section>
	{/*  style   */}
	<style dangerouslySetInnerHTML={{ __html: `
		/* About Section Styles */
		
		.about {
			background-color: #f4f4f4;
			padding: 50px 0;
			color: #333;
		}

		.logo-container {
			margin-bottom: 100px; /* Space below the logo */
			display: flex;
			justify-content: center; /* Center the logo horizontally */
		  }
		  
		  .logo {
			width: 240px; /* Adjust width as needed */
			height: auto;
		  }
		  
		  .logo img {
			display: block;
			width: 100%; /* Ensure the logo scales with the container */
			height: auto;
		  }

		.about .container {
			width: 90%;
			max-width: 1200px;
			margin: 0 auto;
		}

		.about h1 {
			text-align: center;
			font-size: 2.5em;
			margin-bottom: 20px;
		}

		.about-content {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
		}

		.founder-info {
			flex: 1;
			margin-right: 20px;
		}

		.founder-info h2 {
			font-size: 2em;
			color: #007FFF;
			/* Royal blue color */
		}

		.founder-info p {
			font-size: 1.2em;
		}

		.company-overview {
			flex: 2;
		}

		.company-overview h3 {
			font-size: 1.5em;
			color: #007FFF;
			/* Royal blue color */
			margin-top: 20px;
		}

		.company-overview ul {
			list-style-type: disc;
			margin-left: 20px;
		}

		.company-overview ul li {
			margin-bottom: 10px;
		}

		.company-overview p {
			font-size: 1.1em;
			line-height: 1.6;
		}
	` }} />
	{/*  IAIMLABS endconde  */}
	{/* ================ Start Experience Area ================= */}
	<section className="experience_area section_gap">
		<div className="container">
			<div className="main_title text-center">
				<h2>Experience</h2>
				<p>My Professional Journey</p>
			</div>
			<div className="row">
				{/*  Experience 1  */}
				<div className="col-lg-4 col-md-6">
					<div className="experience_item">
						<div className="icon">
							<i className="fa fa-laptop-code" style={{"fontSize": "3rem", "color": "#007FFF"}}></i>
						</div>
						<div className="content">
							<h4>Software Developer</h4>
							<p>Developed several high-impact software solutions and led cross-functional teams to
								successful project completions. My role involved coding, testing, and deploying software
								that met the needs of clients and stakeholders.</p>
						</div>
					</div>
				</div>
				{/*  Experience 2  */}
				<div className="col-lg-4 col-md-6">
					<div className="experience_item">
						<div className="icon">
							<i className="fa fa-cogs" style={{"fontSize": "3rem", "color": "#FF4500"}}></i>
						</div>
						<div className="content">
							<h4>Machine Learning Engineer</h4>
							<p>Worked on improving model accuracy by 25% through extensive data augmentation and
								fine-tuning of algorithms. My focus was on developing machine learning models that
								provided actionable insights and enhanced decision-making processes.</p>
						</div>
					</div>
				</div>
				{/*  Experience 3  */}
				<div className="col-lg-4 col-md-6">
					<div className="experience_item">
						<div className="icon">
							<i className="fa fa-users" style={{"fontSize": "3rem", "color": "#32CD32"}}></i>
						</div>
						<div className="content">
							<h4>Team Lead</h4>
							<p>Led a team of engineers, coordinating tasks, setting project goals, and ensuring timely
								delivery of projects. My leadership role involved mentoring team members and fostering a
								collaborative environment to drive project success.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	{/* ================ End Experience Area ================= */}

	{/* ================ End Experience Area ================= */}

	{/* ================ Start Footer Area ================= */}

	{/* ================ Footer Area ================= */}
    </>
  );
}
