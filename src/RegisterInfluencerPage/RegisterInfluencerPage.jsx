import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import InfImg from '../assets/images/Influencer.jpg'
import { userActions, infActions } from '../_actions';
import new_logo from '../assets/images/new_logo.png'
class RegisterInfluencerPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            influencer: {
                fullName: '',
                email: '',
                phone: '',
                password: '',
                repeatPassword: '',
                fanpage: '',
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { influencer } = this.state;
        this.setState({
            influencer: {
                ...influencer,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { dispatch } = this.props;
        const { influencer } = this.state;

        //const { influencers } = this.props;
        if (influencer.fullName
            && influencer.phone
            && influencer.fanpage
            && influencer.email
            && influencer.password
            && influencer.repeatPassword) {

            const userType = {
                UserName: influencer.email,
                Email: influencer.email,
                Password: influencer.password,
                ConfirmPassword: influencer.repeatPassword,
                IsFluencer: true,
                IsBrand: false
            }

            const InfluencerType = {
                ContentItemId: '',
                ContentItemVersionId: '',
                ContentType: 'Influencer',
                DisplayText: influencer.email + ";" + influencer.fullName,
                Latest: true,
                Published: true,
                ModifiedUtc: '',
                PublishedUtc: '',
                CreatedUtc: '',
                Owner: 'admin',
                Author: 'admin',
                Influencer: {
                    Description: {
                        Text: ''
                    },
                    Photo: {
                        Paths: [
                            ''
                        ],
                        Urls: [
                            ''
                        ]
                    },
                    Fanpage: {
                        Text: influencer.fanpage
                    },
                    Email: {
                        Text: influencer.email
                    },
                    FullName: {
                        Text: influencer.fullName
                    },
                    ShareLink: {
                        Text: 0
                    },
                    PostImage: {
                        Text: 0
                    },
                    LiveStream: {
                        Text: 0
                    },
                    CheckIn: {
                        Text: 0
                    },
                    Video: {
                        Text: 0
                    },
                    Phone: {
                        Text: influencer.phone
                    },
                    NumberOfLike: {
                        Text: ''
                    },
                    NumberOfLove: {
                        Text: ''
                    },
                    NumberOfComment: {
                        Text: ''
                    }
                },
                TitlePart: {
                    Title: influencer.email
                },
                AgeDemorgraphic: {
                    AgePercentage: {
                        Text: '90%'
                    },
                    AgeGraphicsName: {
                        Text: 'Từ 19 tới 30'
                    }
                },
                GenderDemorgraphic: {
                    GenderPercentage: {
                        Text: '90%'
                    },
                    GenderGraphicName: {
                        Text: 'Mọi giới'
                    }
                },
                GeoDemorgraphic: {
                    GeoPercentage: {
                        Text: '90%'
                    },
                    GeoGraphicName: {
                        Text: 'TPHCM'
                    }
                }
            }

            dispatch(infActions.register(InfluencerType, userType));
        }
    }

    render() {
        const { influencers } = this.props;
        const { submitted, influencer } = this.state;
        return (
            // <section className="signup">
            //     <div className="containerForm">
            //         <div className="signup-content">
            //             <div className="signup-form">
            //                 <h2 className="form-title">Sign up</h2>
            //                 <form onSubmit={this.handleSubmit} className="register-form" id="register-form">
            //                     <div className={'form-group' + (submitted && !influencer.phone ? ' has-error' : '')}>
            //                         <label htmlFor="fullName"><i className="zmdi zmdi-account material-icons-influencering_watermark"></i></label>
            //                         <input type="text" name="fullName" id="fullName" placeholder="Your Full Name" value={influencer.fullName} onChange={this.handleChange} />
            //                         {
            //                             submitted && !influencer.fullName &&
            //                             <div className="help-block">Full Name is required</div>
            //                         }
            //                     </div>
            //                     <div className={'form-group' + (submitted && !influencer.phone ? ' has-error' : '')}>
            //                         <label htmlFor="name"><i className="zmdi zmdi-account material-icons-influencering_watermark"></i></label>
            //                         <input type="text" name="phone" id="phone" placeholder="Your Phone" value={influencer.phone} onChange={this.handleChange} />
            //                         {
            //                             submitted && !influencer.phone &&
            //                             <div className="help-block">Phone is required</div>
            //                         }
            //                     </div>
            //                     <div className={'form-group' + (submitted && !influencer.fanpage ? ' has-error' : '')}>
            //                         <label htmlFor="name"><i className="zmdi zmdi-account material-icons-influencering_watermark"></i></label>
            //                         <input type="text" name="fanpage" id="fanpage" placeholder="Your Fan Page" value={influencer.fanpage} onChange={this.handleChange} />
            //                         {
            //                             submitted && !influencer.fanpage &&
            //                             <div className="help-block">Fan Page is required</div>
            //                         }
            //                     </div>
            //                     <div className="form-group">
            //                         <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
            //                         <label htmlFor="agree-term" className="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" className="term-service">Terms of service</a></label>
            //                     </div>
            //                     <div className="form-group form-button">
            //                         <input type="submit" name="signup" id="signup" className="form-submit" value="Register" />
            //                         {
            //                             influencers.loading &&
            //                             <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            //                         }
            //                         <Link to="/login" className="btn btn-link">Cancel</Link>
            //                     </div>
            //                 </form>
            //             </div>
            //             <div className="signup-image">
            //                 <figure><img src={img} alt="sing up image" /></figure>
            //                 <Link to="/RegisterinfluencerPage" className="signup-image-link">You are influencer</Link>
            //             </div>
            //         </div>
            //     </div>
            // </section>
            <div className="app-container app-theme-white body-tabs-shadow">
                <div className="app-container">
                    <div className="h-100">
                        <div className="h-100 no-gutters row">
                            <div className="h-100 d-md-flex d-sm-block bg-white justify-content-center align-items-center col-md-12 col-lg-8">
                                <div className="mx-auto app-login-box col-sm-12 col-md-10 col-lg-9">
                                    {/* <div className="app-logo"></div> */}
                                    <div style={{ marginBottom: '3rem', width: '97px', height: '23px' }}>
                                        <img src={new_logo} alt="Kols Viet" />
                                    </div>
                                    <h4>
                                        <div>Welcome,</div>
                                        <span>It only takes a <span className="text-success">few seconds</span> to create your account</span></h4>
                                    <div>
                                        <form className="" onSubmit={this.handleSubmit} id="register-form">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="position-relative form-group">
                                                        <label htmlFor="name" className="">
                                                            <span className="text-danger">*</span> Full Name</label>
                                                        <input type="text" name="fullName" id="fullName" placeholder="Your Full Name" value={influencer.fullName} onChange={this.handleChange} className="form-control" />
                                                        {
                                                            submitted && !influencer.fullName &&
                                                            <div className="help-block text-danger">Full Name is required</div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="position-relative form-group">
                                                        <label htmlFor="email" className="">
                                                            <span className="text-danger">*</span> Email
                                                        </label>
                                                        <input type="email" name="email" id="email" placeholder="Your Email" value={influencer.email} onChange={this.handleChange} className="form-control" />
                                                        {
                                                            submitted && !influencer.email &&
                                                            <div className="help-block text-danger">Email is required</div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="position-relative form-group">
                                                        <label htmlFor="name" className="">
                                                            <span className="text-danger">*</span> Phone
                                                        </label>
                                                        <input type="text" name="phone" id="phone" placeholder="Your Phone" value={influencer.phone} onChange={this.handleChange} className="form-control" />
                                                        {
                                                            submitted && !influencer.phone &&
                                                            <div className="help-block text-danger">Phone is required</div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="position-relative form-group">
                                                        <label htmlFor="name" className="">
                                                            <span className="text-danger">*</span> Fanpage
                                                        </label>
                                                        <input type="text" name="fanpage" id="fanpage" placeholder="Your Fanpage" value={influencer.fanpage} onChange={this.handleChange} className="form-control" />
                                                        {
                                                            submitted && !influencer.fanpage &&
                                                            <div className="help-block text-danger">Fanpage is required</div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="position-relative form-group">
                                                        <label htmlFor="pass" className="">
                                                            <span className="text-danger">*</span> Password</label>
                                                        <input type="password" id="password" placeholder="Password" name="password" value={influencer.password} onChange={this.handleChange} className="form-control" />
                                                        {
                                                            submitted && !influencer.password &&
                                                            <div className="help-block text-danger">Password is required</div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="position-relative form-group">
                                                        <label htmlFor="pass" className="">
                                                            <span className="text-danger">*</span> Repeat Password</label>
                                                        <input type="password" id="repeatPassword" placeholder="Repeat Password" name="repeatPassword" value={influencer.repeatPassword} onChange={this.handleChange} className="form-control" />
                                                        {
                                                            submitted && !influencer.repeatPassword &&
                                                            <div className="help-block text-danger">Repeat Password is required</div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-3 position-relative form-check"><input name="check" id="exampleCheck" type="checkbox" className="form-check-input" /><label htmlFor="exampleCheck" className="form-check-label">Accept our <a href="javascript:void(0);">Terms
                                        and Conditions</a>.</label></div>
                                            <div className="mt-4 d-flex align-items-center"><h5 className="mb-0">Already have an account? <a href="javascript:void(0);" className="text-primary">Sign in</a></h5>
                                                <div className="ml-auto">
                                                    {/* <button className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-lg">Create Account</button> */}
                                                    <input type="submit" name="signup" id="signup" className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-lg" value="Create Account" />
                                                    {
                                                        influencers.registering &&
                                                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                                    }
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="d-lg-flex d-xs-none col-lg-4">
                                <div className="slider-light">
                                    <div className="slick-slider slick-initialized">
                                        <div>
                                            <div className="position-relative h-100 d-flex justify-content-center align-items-center bg-premium-dark" tabIndex="-1">
                                                <div className="slide-img-bg" style={{ backgroundImage: `url(${InfImg})` }}></div>
                                                <div className="slider-content">
                                                    <p>Easily exclude the components you don't require. Lightweight</p></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { influencers } = state;
    return {
        influencers
    };
}

const connectedRegisterInfluencerPage = connect(mapStateToProps)(RegisterInfluencerPage);
export { connectedRegisterInfluencerPage as RegisterInfluencerPage };