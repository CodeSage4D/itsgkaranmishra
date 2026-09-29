"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function PortfolioDetailsPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

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
    <section className="page-header">
        <div className="container">
            <h2>Portfolio Details</h2>
        </div>
    </section>
    {/* ================ End Banner Area ================= */}

    {/* ================ Start Portfolio Details Area ================= */}
    <section className="portfolio_details_area section_gap">
        <div className="container">
            {/*  Project 1  */}
            <div className="portfolio-item">
                <div className="title">Sentiment Analysis Model</div>
                <img src="/img/portfolio/sentiment_analysis.png" alt="Sentiment Analysis Model" />
                <div className="description">
                    <p>Developed an advanced sentiment analysis model that enhanced the accuracy of sentiment classification. Utilized various machine learning algorithms and fine-tuned hyperparameters to improve performance and reliability.</p>
                </div>
                <div className="details">
                    <ul>
                        <li><i className="fa fa-cogs"></i> Technologies Used: Python, TensorFlow, Scikit-learn</li>
                        <li><i className="fa fa-calendar"></i> Duration: 6 Months</li>
                        <li><i className="fa fa-user"></i> Team Size: 3</li>
                    </ul>
                </div>
                <a href="https://github.com/CodeSage4D/sentiment-analysis" className="btn-primary" target="_blank">View Project</a>
            </div>

            {/*  Project 2  */}
            <div className="portfolio-item">
                <div className="title">Machine Learning Web Application</div>
                <img src="/img/portfolio/ml_web_app.png" alt="Machine Learning Web Application" />
                <div className="description">
                    <p>Created a web application for real-time machine learning predictions using Flask. Integrated various machine learning models for predictive analytics and provided a user-friendly interface for data input and result visualization.</p>
                </div>
                <div className="details">
                    <ul>
                        <li><i className="fa fa-cogs"></i> Technologies Used: Flask, HTML/CSS, JavaScript</li>
                        <li><i className="fa fa-calendar"></i> Duration: 4 Months</li>
                        <li><i className="fa fa-user"></i> Team Size: 2</li>
                    </ul>
                </div>
                <a href="https://github.com/CodeSage4D/ml-web-app" className="btn-primary" target="_blank">View Project</a>
            </div>

            {/*  Project 3  */}
            <div className="portfolio-item">
                <div className="title">Real-Time Data Visualization Tool</div>
                <img src="/img/portfolio/data_viz_tool.png" alt="Real-Time Data Visualization Tool" />
                <div className="description">
                    <p>Developed a real-time data visualization tool using JavaScript libraries like D3.js and Chart.js. Enabled users to interact with complex data sets and gain insights through dynamic charts and graphs.</p>
                </div>
                <div className="details">
                    <ul>
                        <li><i className="fa fa-cogs"></i> Technologies Used: JavaScript, D3.js, Chart.js</li>
                        <li><i className="fa fa-calendar"></i> Duration: 5 Months</li>
                        <li><i className="fa fa-user"></i> Team Size: 4</li>
                    </ul>
                </div>
                <a href="https://github.com/CodeSage4D/data-viz-tool" className="btn-primary" target="_blank">View Project</a>
            </div>

            {/*  Add more projects in a similar format  */}

        </div>
    </section>
    {/* ================ End Portfolio Details Area ================= */}

    {/* ================ Footer Area ================= */}
    </>
  );
}
