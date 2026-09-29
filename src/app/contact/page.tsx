import React from "react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <>
      {/* ================ End Header Area ================= */}

    {/* ================ Start Banner Area ================= */}
    <section className="banner_area">
        <div className="banner_inner d-flex align-items-center">
            <div className="container">
                <div className="banner_content text-center">
                    <h2>Contact Us</h2>
                    <div className="page_link">
                        <a href="/">Home</a>
                        <a href="/contact">Contact</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* ================ End Banner Area ================= */}
    
    {/* ================Contact Area ================= */}
    <section className="contact_area section_gap">
        <div className="container">
            <div className="row">
                <div className="col-lg-3">
                    <div className="contact_info">
                        <div className="info_item">
                            <i className="lnr lnr-home"></i>
                            <h6>Sikandar Bag Colony, Killa Maidan</h6>
                            <p>VIP Road, Indore, MP, India - 452006</p>
                        </div>
                        <div className="info_item">
                            <i className="lnr lnr-phone-handset"></i>
                            <h6><a href="tel:+917804895074">+91 7804895074</a></h6>
                            <p>Mon to Fri 9am to 6 pm</p>
                        </div>
                        <div className="info_item">
                            <i className="lnr lnr-envelope"></i>
                            <h6><a href="mailto:karansmishra.84@gmail.com">karansmishra.84@gmail.com</a></h6>
                            <p>Send us your query anytime!</p>
                        </div>
                        <div className="info_item">
                            <i className="lnr lnr-home"></i>
                            <h6>Company</h6>
                            <p><a href="https://www.linkedin.com/company/iaimlabs" target="_blank">i aim labs</a></p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-9">
                    <form className="row contact_form" action="contact_process.php" method="post" id="contactForm" noValidate>
                        <div className="col-md-6">
                            <div className="form-group">
                                <input type="text" className="form-control" id="name" name="name" placeholder="Enter your name" />
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-control" id="email" name="email" placeholder="Enter email address" />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" id="subject" name="subject" placeholder="Enter Subject" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <textarea className="form-control" name="message" id="message" rows={1} placeholder="Enter Message"></textarea>
                            </div>
                        </div>
                        <div className="col-md-12 text-right">
                            <button type="submit" value="submit" className="primary_btn">
                                <span>Send Message</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div id="mapBox" className="mapBox" 
                data-lat="22.7196" 
                data-lon="75.8577" 
                data-zoom="13" 
                data-info="Sikandar Bag Colony, Killa Maidan, VIP Road, Indore, MP, India - 452006"
                data-mlat="22.7196"
                data-mlon="75.8577">
            </div>
        </div>
    </section>
    {/* ================Contact Area ================= */}
        
    {/* ================ Footer Area ================= */}
    </>
  );
}
