import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import img from '../../images/signup-image.jpg'
import { brandActions } from '../_actions';

class RegisterBrandPage extends React.Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     brand: {
        //         firstName: '',
        //         lastName: '',
        //         brandName: '',
        //         email: '',
        //         password: ''
        //     },
        //     submitted: false
        // };

        this.state = {            
            brand: {
                //displayText:'',
                fullName:'',
                email:'',
                brandName:'',
                businessAreas: '',
                phone: '',
                password: '',
                location:''
            },            
            submitted: false
        };
        

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { brand } = this.state;
        this.setState({
            brand: {
                ...brand,
                [name]: value
            }
        });
    }

    // handleSubmit(event) {
    //     event.preventDefault();

    //     this.setState({ submitted: true });
    //     const { brand } = this.state;
    //     const { dispatch } = this.props;
    //     if (brand.firstName && brand.lastName && brand.brandName && brand.email && brand.password) {
    //         dispatch(brandActions.register(brand));
    //     }
    // }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { brand } = this.state;
        const { dispatch } = this.props;
        if (brand.fullName
            && brand.email
            && brand.brandName
            && brand.businessAreas
            && brand.phone
            && brand.location
            && brand.password) {
            const brandType = {
                ContentItemId:'',
                ContentItemVersionId:'',
                ContentType:'Brand',
                DisplayText: 'Brand ' + brand.brandName,
                Latest:false,
                Published:false,
                ModifiedUtc:null,
                PublishedUtc:null,
                CreatedUtc:null,
                Owner:'admin',
                Author:null,
                Brand:{
                    FullName:{
                        Text: brand.fullName
                    },
                    Email:{
                        Text: brand.email
                    },
                    BrandName:{
                        Text: brand.brandName
                    },
                    BusinessAreas:{
                        Text: brand.businessAreas
                    },
                    Phone:{
                        Text: brand.phone
                    },
                    Password:{
                        Text: brand.password
                    },
                    Location:{
                        Text: brand.location
                    }
                },
                TitlePart:{
                    Title: 'Brand' + brand.fullName,
                }
            }
            
            dispatch(brandActions.register(brandType));
        }
    }

    render() {
        const { brands } = this.props;
        const { brand, submitted } = this.state;
        
        return (            
            <section className="signup">
                <div className="containerForm">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Sign up</h2>
                            <form onSubmit={this.handleSubmit} className="register-form" id="register-form">
                                <div className={'form-group' + (submitted && !brand.fullName ? ' has-error' : '')}>
                                    <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="text" name="fullName" id="fullName" placeholder="Your Full Name" value={brand.fullName} onChange={this.handleChange}/>
                                    {
                                        submitted && !brand.fullName &&
                                        <div className="help-block">Full Name is required</div>
                                    }
                                </div>                                
                                <div className="form-group">
                                    <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                                    <input type="email" name="email" id="email" placeholder="Your Email" value={brand.email} onChange={this.handleChange}/>
                                    {
                                        submitted && !brand.email &&
                                        <div className="help-block">Email is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !brand.brandName ? ' has-error' : '')}>
                                    <label htmlFor="name"><i className="zmdi zmdi-account material-icons-branding_watermark"></i></label>
                                    <input type="text" name="brandName" id="brandname" placeholder="Your brand Name" value={brand.brandName} onChange={this.handleChange}/>
                                    {
                                        submitted && !brand.brandName &&
                                        <div className="help-block">brand Name is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !brand.businessAreas ? ' has-error' : '')}>
                                    <label htmlFor="name"><i className="zmdi zmdi-account material-icons-branding_watermark"></i></label>
                                    <input type="text" name="businessAreas" id="businessAreas" placeholder="Your Business Areas" value={brand.businessAreas} onChange={this.handleChange}/>
                                    {
                                        submitted && !brand.businessAreas &&
                                        <div className="help-block">Business areas is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !brand.phone ? ' has-error' : '')}>
                                    <label htmlFor="name"><i className="zmdi zmdi-account material-icons-branding_watermark"></i></label>
                                    <input type="text" name="phone" id="phone" placeholder="Your Phone" value={brand.phone} onChange={this.handleChange}/>
                                    {
                                        submitted && !brand.phone &&
                                        <div className="help-block">Phone is required</div>
                                    }
                                </div>                                
                                <div className="form-group">
                                    <label htmlFor="pass"><i className="zmdi zmdi-lock"></i></label>
                                    <input type="password" id="password" placeholder="Password" name="password" value={brand.password} onChange={this.handleChange}/>
                                    {
                                        submitted && !brand.password &&
                                        <div className="help-block">Password is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !brand.location ? ' has-error' : '')}>
                                    <label htmlFor="name"><i className="zmdi zmdi-account material-icons-branding_watermark"></i></label>
                                    <input type="text" name="location" id="location" placeholder="Your Location" value={brand.location} onChange={this.handleChange}/>
                                    {
                                        submitted && !brand.location &&
                                        <div className="help-block">Location is required</div>
                                    }
                                </div>
                                <div className="form-group form-button">
                                    <input type="submit" name="signup" id="signup" className="form-submit" value="Register"/>
                                    {
                                        brands.registering && 
                                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                    }
                                    <Link to="/login" className="btn btn-link">Cancel</Link>
                                </div>
                            </form>
                        </div>
                        <div className="signup-image">
                            <figure><img src={img} alt="sing up image"/></figure>
                            {/* <a href="#" className="signup-image-link">I am already member</a> */}
                            <Link to="/registerCampaignPage" className="signup-image-link">I am already member</Link>
                            {/* <Link to={{
                                pathname: '/registerCampaignPage',
                                state: {
                                    brands: brands
                                }
                                }}>Tyler McGinnis
                            </Link> */}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

function mapStateToProps(state) {
    const { brands } = state;
    return {
        brands
    };
}

const connectedRegisterBrandPage = connect(mapStateToProps)(RegisterBrandPage);
export { connectedRegisterBrandPage as RegisterBrandPage };