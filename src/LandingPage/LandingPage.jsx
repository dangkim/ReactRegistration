import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import bg3 from '../assets/images/template/bg3.jpg'
import iphone3 from '../assets/images/template/iphone3.png'
import mac from '../assets/images/template/mac.png'
import new_logo from '../assets/images/new_logo.png'
import citydark from '../assets/images/originals/citydark.jpg'
import adobe from '../assets/images/logos/adobe.png'
import ebay from '../assets/images/logos/ebay.png'
import evernote from '../assets/images/logos/evernote.png'
import airbnb from '../assets/images/logos/airbnb.png'
import zappos from '../assets/images/logos/zappos.png'
import zendesk from '../assets/images/logos/zendesk.png'

import home_33 from '../assets/images/template/examples/home_33.jpg'
import home_22 from '../assets/images/template/examples/home_22.jpg'
import home_11 from '../assets/images/template/examples/home_11.jpg'
//import face1 from '../assets/images/faces/face1.jpg'
import face2 from '../assets/images/faces/face2.jpg'
import face3 from '../assets/images/faces/face3.jpg'
import face4 from '../assets/images/faces/face4.jpg'
// import home_33 from '../assets/images/template/examples/home_33.jpg'
// import home_33 from '../assets/images/template/examples/home_33.jpg'
import { userActions } from '../_actions';

class LandingPage extends Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            userName: '',
            email: '',
            password: '',
            submitted: false,
            token: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { userName, email, password } = this.state;
        const { dispatch } = this.props;
        if (userName && password) {
            dispatch(userActions.getToken(userName, password));
        }
    }

    render() {
        const { loggingIn, token } = this.props;
        const { userName, password, submitted } = this.state;
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <div className="landing-page landing-page1">
                <nav className="navbar navbar-transparent navbar-top" role="navigation">
                    <div className="container">
                        <div className="navbar-header">
                            <div className="logo-container">
                                <div className="logo" style={{border:'none', width:'150px'}}>
                                    <img src={new_logo} alt="Kols Viet" />
                                </div>
                                {/* <div className="brand">
                                        Kols Viet
                                    </div> */}
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="wrapper">
                    <div className="parallax filter-gradient blue" data-color="blue">
                        <div className="parallax-background">
                            <img className="parallax-background-image" src={bg3} />
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-5 hidden-xs">
                                    <div className="parallax-image">
                                        <img className="phone" src={iphone3} style={{ marginTop: '20px' }} />
                                    </div>
                                </div>
                                <div className="col-md-6 col-md-offset-1">
                                    <div className="description">
                                        <h2>Awesome platform page.</h2>
                                        <br />
                                        {/* <h5>Be amazed by the best looking bootstrap landing page on the web! Your new app deserves an amazing page to show all of its features. Clear visual, light colours and beautifully aligned elements - they all try to make the users aware of your great app features!</h5> */}
                                        <div className="">
                                            <a href="http://www.creative-tim.com/product/awesome-landing-page" id="Demo3" className="btn btn-fill btn-info" data-button="info">Get Free Access</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section section-gray section-clients">
                        <div className="container text-center">
                            <h4 className="header-text">Friends in high places</h4>
                            <p>
                                Build customer confidence by listing your users! Anyone who has used your service and has been pleased with it should have a place here! From Fortune 500 to start-ups, all your app enthusiasts will be glad to be featured in this section. Moreover, users will feel confident seing someone vouching for your product!
                                <br />
                            </p>
                            <div className="logos">
                                <ul className="list-unstyled">
                                    <li ><img src={adobe} /></li>
                                    <li ><img src={zendesk} /></li>
                                    <li ><img src={ebay} /></li>
                                    <li ><img src={evernote} /></li>
                                    <li ><img src={airbnb} /></li>
                                    <li ><img src={zappos} /></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="section section-presentation">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="description">
                                        <h4 className="header-text">It's beautiful</h4>
                                        <p>And your app is also probably social, awesome, easy-to-use and vital to users. This is the place to enlist all the good things that your app has to share. Focus on the benefits that the uers will receive. Try to combine imaginery with text and show meaningful printscreens from your app, that will make it clear what exactly the basic functions are. </p>
                                        <p>Try to make it very clear for the people browsing the page that this product will enrich their life and will make a nice addition to the homescreen.</p>
                                    </div>
                                </div>
                                <div className="col-md-5 col-md-offset-1 hidden-xs">
                                    <img src={mac} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section section-demo">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <div id="description-carousel" className="carousel fade" data-ride="carousel">
                                        <div className="carousel-inner">
                                            <div className="item">
                                                <img src={home_33} alt="" />
                                            </div>
                                            <div className="item active">
                                                <img src={home_22} alt="" />
                                            </div>
                                            <div className="item">
                                                <img src={home_11} alt="" />
                                            </div>
                                        </div>
                                        {/* <ol className="carousel-indicators carousel-indicators-blue">
                                            <li data-target="#description-carousel" data-slide-to="0" className=""></li>
                                            <li data-target="#description-carousel" data-slide-to="1" className="active"></li>
                                            <li data-target="#description-carousel" data-slide-to="2" className=""></li>
                                        </ol> */}
                                    </div>
                                </div>
                                <div className="col-md-5 col-md-offset-1">
                                    <h4 className="header-text">Easy to integrate</h4>
                                    <p>
                                        With all the apps that users love! Make it easy for users to share, like, post and tweet their favourite things from the app. Be sure to let users know they continue to remain connected while using your app!
                            </p>
                                    <a href="http://www.creative-tim.com/product/awesome-landing-page" id="Demo3" className="btn btn-fill btn-info" data-button="info">Get Free Access</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section section-features">
                        <div className="container">
                            <h4 className="header-text text-center">Features</h4>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="card card-blue">
                                        <div className="icon">
                                            <i className="pe-7s-note2"></i>
                                        </div>
                                        <div className="text">
                                            <h4>Online Customers Management</h4>
                                            <p>All appointments sync with your Google calendar so your availability is always up to date. See your schedule at a glance from any device.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card card-blue">
                                        <div className="icon">
                                            <i className="pe-7s-bell"></i>
                                        </div>
                                        <h4>Smart Notifications on hands</h4>
                                        <p>Automatic text and email reminders make sure customers always remember their upcoming appointments.</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card card-blue">
                                        <div className="icon">
                                            <i className="pe-7s-graph1"></i>
                                        </div>
                                        <h4>Know your business better now</h4>
                                        <p>Take payments and run your business on the go, in your store and then see how it all adds up with analytics.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section section-testimonial">
                        <div className="container">
                            <h4 className="header-text text-center">What people think</h4>
                            <div id="carousel-example-generic" className="carousel fade" data-ride="carousel">
                                <div className="carousel-inner" role="listbox">
                                    <div className="item">
                                        <div className="mask">
                                            <img src={face4} />
                                        </div>
                                        <div className="carousel-testimonial-caption">
                                            <p>Jay Z, Producer</p>
                                            <h3>"I absolutely love your app! It's truly amazing and looks awesome!"</h3>
                                        </div>
                                    </div>
                                    <div className="item active">
                                        <div className="mask">
                                            <img src={face3} />
                                        </div>
                                        <div className="carousel-testimonial-caption">
                                            <p>Drake, Artist</p>
                                            <h3>"This is one of the most awesome platform I've ever seen! Wish you luck KolsViet!"</h3>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="mask">
                                            <img src={face2} />
                                        </div>
                                        <div className="carousel-testimonial-caption">
                                            <p>Rick Ross, Musician</p>
                                            <h3>"Loving this! Just picked it up the other day. Thank you for the work you put into this."</h3>
                                        </div>
                                    </div>
                                </div>
                                {/* <ol className="carousel-indicators carousel-indicators-blue">
                                    <li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
                                    <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                                    <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                                </ol> */}
                            </div>
                        </div>
                    </div>
                    <div className="section section-no-padding">
                        <div className="parallax filter-gradient blue" data-color="blue">
                            <div className="parallax-background">
                                <img className="parallax-background-image" src={bg3} />
                            </div>
                            <div className="info">
                                <h1>Try this for free!</h1>
                                <p>Beautiful places for you.</p>
                                <a href="http://www.creative-tim.com/product/awesome-landing-page" className="btn btn-neutral btn-lg btn-fill">EXPLORE</a>
                            </div>
                        </div>
                    </div>
                    <footer className="footer">
                        <div className="container">
                            <nav className="pull-left">
                                <ul>
                                    <li>
                                        <a href="#">
                                            Home
                                </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            Company
                                </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            Portfolio
                                </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            Blog
                                </a>
                                    </li>
                                </ul>
                            </nav>
                            <div className="social-area pull-right">
                                <a className="btn btn-social btn-facebook btn-simple">
                                    <i className="fa fa-facebook-square"></i>
                                </a>
                                <a className="btn btn-social btn-twitter btn-simple">
                                    <i className="fa fa-twitter"></i>
                                </a>
                                <a className="btn btn-social btn-pinterest btn-simple">
                                    <i className="fa fa-pinterest"></i>
                                </a>
                            </div>
                            <div className="copyright">
                                &copy; 2016 <a href="http://www.creative-tim.com">Creative Tim</a>, made with love
                    </div>
                        </div>
                    </footer>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn, token } = state.authentication;
    return {
        loggingIn,
        token
    };
}

const connectedLandingPage = connect(mapStateToProps)(LandingPage);
export { connectedLandingPage as LandingPage }; 