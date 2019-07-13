import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import city from '../assets/images/originals/city.jpg'
import citynights from '../assets/images/originals/citynights.jpg'
import citydark from '../assets/images/originals/citydark.jpg'
import Slider from "react-slick";

import { userActions } from '../_actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            userName: '',
            email:'',
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
            <section>
                {/* <div className="containerForm">
                <div className="signin-content">
                    <div className="signin-image">
                        <figure><img src={img} alt="sign in image"/></figure>
                        <Link to="/registerBrandPage" className="btn btn-link">Create an account</Link>
                    </div>

                    <div className="signin-form">
                        <h2 className="form-title">Sign in</h2>
                        <form onSubmit={this.handleSubmit} className="register-form" id="login-form">
                            <div className={'form-group' + (submitted && !userName ? ' has-error' : '')}>
                                <label htmlFor="username"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" className="form-control" name="userName" placeholder="User Name" value={userName} onChange={this.handleChange} />
                                {submitted && !userName &&
                                    <div className="help-block">Username is required</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                <label htmlFor="password"><i className="zmdi zmdi-lock"></i></label>
                                <input type="password" className="form-control" name="password" placeholder="Password" value={password} onChange={this.handleChange} />
                                {submitted && !password &&
                                    <div className="help-block">Password is required</div>
                                }
                            </div>
                            <div className="form-group form-button">                                
                                <input type="submit" name="signin" id="signin" className="form-submit" value="Log in"/>
                                {loggingIn &&
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }                                
                            </div>
                        </form>
                        <div className="social-login">
                            <span className="social-label">Or login with</span>
                            <ul className="socials">
                                <li><a href="#"><i className="display-flex-center zmdi zmdi-facebook"></i></a></li>
                                <li><a href="#"><i className="display-flex-center zmdi zmdi-twitter"></i></a></li>
                                <li><a href="#"><i className="display-flex-center zmdi zmdi-google"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div> */}
            
            <div className="app-container app-theme-white body-tabs-shadow">
                <div className="app-container">
                    <div className="h-100">
                        <div className="h-100 no-gutters row">
                            <div className="d-none d-lg-block col-lg-4">
                                <div className="slider-light">
                                <div className="slick-slider">
                                    <Slider {...settings}>
                                    <div>
                                        <div className="position-relative h-100 d-flex justify-content-center align-items-center bg-plum-plate" tabIndex="-1">
                                            <div className="slide-img-bg" style={{backgroundImage: `url(${city})`}}></div>
                                            <div className="slider-content"><h3>Perfect Balance</h3>
                                                <p>ArchitectUI is like a dream. Some think it's too good to be true! Extensive collection of unified React Boostrap Components and Elements.</p></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="position-relative h-100 d-flex justify-content-center align-items-center bg-premium-dark" tabIndex="-1">
                                                    <div className="slide-img-bg" style={{backgroundImage: `url(${citynights})`}}></div>
                                                    <div className="slider-content"><h3>Scalable, Modular, Consistent</h3>
                                                        <p>Easily exclude the components you don't require. Lightweight, consistent Bootstrap based styles across all elements and components</p></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="position-relative h-100 d-flex justify-content-center align-items-center bg-sunny-morning" tabIndex="-1">
                                                <div className="slide-img-bg" style={{backgroundImage: `url(${citydark})`}}></div>
                                                <div className="slider-content"><h3>Complex, but lightweight</h3>
                                                    <p>We've included a lot of components that cover almost all use cases for any type of application.</p></div>
                                        </div>
                                    </div>
                                    </Slider>
                                </div>
                                </div>
                            </div>
                            <div className="h-100 d-flex bg-white justify-content-center align-items-center col-md-12 col-lg-8">
                                <div className="mx-auto app-login-box col-sm-12 col-md-10 col-lg-9">
                                    <div className="app-logo"></div>
                                    <h4 className="mb-0">
                                        <span className="d-block">Welcome back,</span>
                                        <span>Please sign in to your account.</span></h4>
                                    <h6 className="mt-3">No account? <a href="javascript:void(0);" className="text-primary">Sign up now</a></h6>
                                    <div className="divider row"></div>
                                    <div>
                                        <form className="" onSubmit={this.handleSubmit}>
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="position-relative form-group">                                                        
                                                        <label htmlFor="userName" className="">Email</label>
                                                        <input type="userName" name="userName" id="userName" placeholder="User name here..." type="text" className="form-control" value={userName} onChange={this.handleChange}/>
                                                        {submitted && !userName &&
                                                            <div className="help-block">User name is required</div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="position-relative form-group">
                                                        <label htmlFor="password" className="">Password</label>
                                                        <input name="password" id="password" placeholder="Password here..." type="password" className="form-control" value={password} onChange={this.handleChange}/>
                                                        {submitted && !password &&
                                                            <div className="help-block">Password is required</div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="position-relative form-check"><input name="check" id="exampleCheck" type="checkbox" className="form-check-input"/><label htmlFor="exampleCheck" className="form-check-label">Keep me logged in</label></div>
                                            <div className="divider row"></div>
                                            <div className="d-flex align-items-center">
                                                <div className="ml-auto"><a href="javascript:void(0);" className="btn-lg btn btn-link">Recover Password</a>
                                                    <button type="submit" className="btn btn-primary btn-lg">Login to Dashboard</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
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

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 