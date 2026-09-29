import React from "react";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <>
      {/* ================ End Header Area ================= */}

    {/* ================ Start Banner Area ================= */}
    <section className="banner_area">
        <div className="banner_inner d-flex align-items-center">
            <div className="container">
                <div className="banner_content text-center">
                    <h2>Services</h2>
                    <div className="page_link">
                        <a href="/">Home</a>
                        <a href="/services">Services</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* ================ End Banner Area ================= */}

    {/* ================ Start Features Area ================= */}
    <section className="features_area section_gap_top">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-8 text-center">
                    <div className="main_title">
                        <h2>Our Services</h2>
                        <p>We offer a wide range of professional services tailored to your needs. Explore our offerings below.</p>
                    </div>
                </div>
            </div>
            <div className="row feature_inner">
                {/*  <div className="col-lg-3 col-md-6">
                    <div className="feature_item">
                        <i className="fas fa-code icon"></i>
                        <h4>Web Development</h4>
                        <p>Creating modern and responsive websites to boost your online presence.</p>
                    </div>
                </div>  */}
                <div className="col-lg-3 col-md-6">
                    <div className="feature_item">
                        <i className="fas fa-paint-brush icon" style={{"fontSize": "3rem", "color": "#FF6347"}}></i> {/*  UI/UX Design Icon (Tomato)  */}
                        <h4>UI/UX Design</h4>
                        <p>Designing intuitive user interfaces and experiences to enhance user satisfaction.</p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="feature_item">
                        <i className="fas fa-search icon" style={{"fontSize": "3rem", "color": "#1E90FF"}}></i> {/*  SEO Optimization Icon (Dodger Blue)  */}
                        <h4>SEO Optimization</h4>
                        <p>Optimizing your website to rank higher on search engines and attract more visitors.</p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="feature_item">
                        <i className="fas fa-lock icon" style={{"fontSize": "3rem", "color": "#28A745"}}></i> {/*  Cybersecurity Icon (Green)  */}
                        <h4>Cybersecurity</h4>
                        <p>Protecting your digital assets with advanced cybersecurity solutions.</p>
                    </div>
                </div>                
                <div className="col-lg-3 col-md-6">
                    <div className="feature_item">
                        <div className="icon" style={{"fontSize": "3rem", "color": "#FF6347"}}>
                            <i className="fas fa-flask"></i> {/*  Research & Development Icon  */}
                        </div>
                        <h4>Research & Development</h4>
                        <p>
                            Innovating solutions and exploring new technologies to drive progress in the fields of machine learning,
                            AI, and data science, pushing the boundaries of what's possible.
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
                            Transforming raw data into meaningful insights with comprehensive data analysis and
                            visualization techniques to drive informed business decisions.
                        </p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="feature_item">
                        <div className="icon" style={{"fontSize": "3rem", "color": "#FFC107"}}>
                            <i className="fas fa-cloud"></i> {/*  Cloud Computing Icon  */}
                        </div>
                        <h4>Cloud Solutions & Integration</h4>
                        <p>
                            Delivering scalable cloud solutions that seamlessly integrate with your existing systems,
                            enhancing flexibility, collaboration, and business continuity.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* ================ End Features Area ================= */}


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
