import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//import img from '../assets/images/signup-image.jpg'
import city from '../assets/images/originals/city.jpg'
import citynights from '../assets/images/originals/citynights.jpg'
import citydark from '../assets/images/originals/citydark.jpg'
import Slider from "react-slick";
import { brandActions, campaignActions, userActions } from '../_actions';
import Select from 'react-select';

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
                fullName: '',
                email: '',
                brandName: '',
                businessAreas: '',
                phone: '',
                password: '',
                repeatPassword: '',
                location: '',
                selectedOptionLocation: null,
            },
            submitted: false
        };

        this.handleOptionLocationChange = this.handleOptionLocationChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleOptionLocationChange = selectedOptionLocation => {
        this.setState({ selectedOptionLocation });
        console.log(`Option selected:`, selectedOptionLocation);
    };

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
        const { brand, selectedOptionLocation } = this.state;
        const { dispatch, users } = this.props;

        // let locationString = selectedOptionLocation.map((val)=>{  
        //     return val.value + ';'; 
        // })

        let locationString = '';
        var i;
        for (i = 0; i < selectedOptionLocation.length; i++) {
            locationString += selectedOptionLocation[i].value + ',';
        }

        const locationStrim = locationString.replace(/,\s*$/, "");

        if (brand.fullName
            && brand.email
            && brand.brandName
            && brand.businessAreas
            && brand.phone
            && locationString
            && brand.password
            && brand.repeatPassword) {

            const userType = {
                UserName: brand.email,
                Email: brand.email,
                Password: brand.password,
                ConfirmPassword: brand.repeatPassword,
                IsFluencer: false,
                IsBrand: true
            }

            const brandType = {
                ContentItemId: '',
                ContentItemVersionId: '',
                ContentType: 'Brand',
                DisplayText: 'Brand ' + brand.brandName,
                Latest: false,
                Published: false,
                ModifiedUtc: null,
                PublishedUtc: null,
                CreatedUtc: null,
                Owner: 'admin',
                Author: 'admin',
                Brand: {
                    FullName: {
                        Text: brand.fullName
                    },
                    Email: {
                        Text: brand.email
                    },
                    BrandName: {
                        Text: brand.brandName
                    },
                    BusinessAreas: {
                        Text: brand.businessAreas
                    },
                    Phone: {
                        Text: brand.phone
                    },
                    Password: {
                        Text: brand.password
                    },
                    Location: {
                        Text: locationString
                    }
                },
                TitlePart: {
                    Title: 'Brand ' + brand.brandName,
                }
            }

            dispatch(brandActions.register(brandType, userType));
        }
    }

    componentDidMount() {
        const { dispatch } = this.props;
        //dispatch(campaignActions.getAllLocation());

        // else
        // {
        //     history.push('/registerBrandPage');
        // }

    }

    render() {
        const { brands, locations } = this.props;
        const { brand, selectedOptionLocation, submitted } = this.state;
        const options = [
            { value: 'An Giang', label: 'An Giang' },
            { value: 'BàRịa-VũngTàu', label: 'BàRịa-VũngTàu' },
            { value: 'BạcLiêu', label: 'BạcLiêu' },
            { value: 'BắcKạn', label: 'BắcKạn' },
            { value: 'BắcGiang', label: 'BắcGiang' },
            { value: 'BắcNinh', label: 'BắcNinh' },
            { value: 'BếnTre', label: 'BếnTre' },
            { value: 'BìnhDương', label: 'BìnhDương' },
            { value: 'BìnhĐịnh', label: 'BìnhĐịnh' },
            { value: 'BìnhPhước', label: 'BìnhPhước' },
            { value: 'BìnhThuận', label: 'BìnhThuận' },
            { value: 'CàMau', label: 'CàMau' },
            { value: 'CaoBằng', label: 'CaoBằng' },
            { value: 'CầnThơ(TP)', label: 'CầnThơ(TP)' },
            { value: 'ĐàNẵng(TP)', label: 'ĐàNẵng(TP)' },
            { value: 'ĐắkLắk', label: 'ĐắkLắk' },
            { value: 'ĐắkNông', label: 'ĐắkNông' },
            { value: 'ĐiệnBiên', label: 'ĐiệnBiên' },
            { value: 'ĐồngNai', label: 'ĐồngNai' },
            { value: 'ĐồngTháp', label: 'ĐồngTháp' },
            { value: 'GiaLai', label: 'GiaLai' },
            { value: 'HàGiang', label: 'HàGiang' },
            { value: 'HàNam', label: 'HàNam' },
            { value: 'HàNội(TP)', label: 'HàNội(TP)' },
            { value: 'HàTây', label: 'HàTây' },
            { value: 'HàTĩnh', label: 'HàTĩnh' },
            { value: 'HảiDương', label: 'HảiDương' },
            { value: 'HảiPhòng(TP)', label: 'HảiPhòng(TP)' },
            { value: 'HòaBình', label: 'HòaBình' },
            { value: 'HồChíMinh(TP)', label: 'HồChíMinh(TP)' },
            { value: 'HậuGiang', label: 'HậuGiang' },
            { value: 'HưngYên', label: 'HưngYên' },
            { value: 'KhánhHòa', label: 'KhánhHòa' },
            { value: 'KiênGiang', label: 'KiênGiang' },
            { value: 'KonTum', label: 'KonTum' },
            { value: 'LaiChâu', label: 'LaiChâu' },
            { value: 'LàoCai', label: 'LàoCai' },
            { value: 'LạngSơn', label: 'LạngSơn' },
            { value: 'LâmĐồng', label: 'LâmĐồng' },
            { value: 'LongAn', label: 'LongAn' },
            { value: 'NamĐịnh', label: 'NamĐịnh' },
            { value: 'NghệAn', label: 'NghệAn' },
            { value: 'NinhBình', label: 'NinhBình' },
            { value: 'NinhThuận', label: 'NinhThuận' },
            { value: 'PhúThọ', label: 'PhúThọ' },
            { value: 'PhúYên', label: 'PhúYên' },
            { value: 'QuảngBình', label: 'QuảngBình' },
            { value: 'QuảngNam', label: 'QuảngNam' },
            { value: 'QuảngNgãi', label: 'QuảngNgãi' },
            { value: 'QuảngNinh', label: 'QuảngNinh' },
            { value: 'QuảngTrị', label: 'QuảngTrị' },
            { value: 'SócTrăng', label: 'SócTrăng' },
            { value: 'SơnLa', label: 'SơnLa' },
            { value: 'TâyNinh', label: 'TâyNinh' },
            { value: 'TháiBình', label: 'TháiBình' },
            { value: 'TháiNguyên', label: 'TháiNguyên' },
            { value: 'ThanhHóa', label: 'ThanhHóa' },
            { value: 'ThừaThiên-Huế', label: 'ThừaThiên-Huế' },
            { value: 'TiềnGiang', label: 'TiềnGiang' },
            { value: 'TràVinh', label: 'TràVinh' },
            { value: 'TuyênQuang', label: 'TuyênQuang' },
            { value: 'VĩnhLong', label: 'VĩnhLong' },
            { value: 'VĩnhPhúc', label: 'VĩnhPhúc' },
            { value: 'YênBái', label: 'YênBái' },
        ];
        return (
            // <section className="signup">
            //     <div className="containerForm">
            //         <div className="signup-content">
            //             <div className="signup-form">
            //                 <h2 className="form-title">Sign up</h2>
            //                 <form onSubmit={this.handleSubmit} className="register-form" id="register-form">                                                           


            //                     <div className="form-group form-button">
            //                         <input type="submit" name="signup" id="signup" className="form-submit" value="Register"/>
            //                         {
            //                             brands.registering && 
            //                             <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            //                         }
            //                         <Link to="/login" className="btn btn-link">Cancel</Link>
            //                     </div>
            //                 </form>
            //             </div>
            //             <div className="signup-image">
            //                 <figure><img src={img} alt="sing up image"/></figure>
            //                 {/* <a href="#" className="signup-image-link">I am already member</a> */}
            //                 <Link to="/RegisterInfluencerPage" className="signup-image-link">I am an Influencer</Link>
            //                 {/* <Link to={{
            //                     pathname: '/registerCampaignPage',
            //                     state: {
            //                         brands: brands
            //                     }
            //                     }}>Tyler McGinnis
            //                 </Link> */}
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
                                    <div className="app-logo"></div>
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
                                                        <input type="text" name="fullName" id="fullName" placeholder="Your Full Name" value={brand.fullName} onChange={this.handleChange} className="form-control" />
                                                        {
                                                            submitted && !brand.fullName &&
                                                            <div className="help-block text-danger">Full Name is required</div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="position-relative form-group">
                                                        <label htmlFor="email" className="">
                                                            <span className="text-danger">*</span> Email
                                                        </label>
                                                        <input type="email" name="email" id="email" placeholder="Your Email" value={brand.email} onChange={this.handleChange} className="form-control" />
                                                        {
                                                            submitted && !brand.email &&
                                                            <div className="help-block text-danger">Email is required</div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="position-relative form-group">
                                                        <label htmlFor="location" className="">
                                                            <span className="text-danger">*</span> Location</label>
                                                        <Select
                                                            maxMenuHeight={200}
                                                            value={selectedOptionLocation}
                                                            onChange={this.handleOptionLocationChange}
                                                            isMulti
                                                            placeholder="Locations..."
                                                            options={options} />
                                                        {
                                                            submitted && !selectedOptionLocation &&
                                                            <div className="help-block text-danger">Location is required</div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="position-relative form-group">
                                                        <label htmlFor="name" className="">
                                                            <span className="text-danger">*</span> Phone
                                                        </label>
                                                        <input type="text" name="phone" id="phone" placeholder="Your Phone" value={brand.phone} onChange={this.handleChange} className="form-control" />
                                                        {
                                                            submitted && !brand.phone &&
                                                            <div className="help-block text-danger">Phone is required</div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="position-relative form-group">
                                                        <label htmlFor="name" className="">
                                                            <span className="text-danger">*</span> Brand Name
                                                        </label>
                                                        <input type="text" name="brandName" id="brandname" placeholder="Your brand Name" value={brand.brandName} onChange={this.handleChange} className="form-control" />
                                                        {
                                                            submitted && !brand.brandName &&
                                                            <div className="help-block text-danger">Brand Name is required</div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="position-relative form-group">
                                                        <label htmlFor="name" className="">
                                                            <span className="text-danger">*</span> Business areas
                                                        </label>
                                                        <input type="text" name="businessAreas" id="businessAreas" placeholder="Your Business Areas" value={brand.businessAreas} onChange={this.handleChange} className="form-control" />
                                                        {
                                                            submitted && !brand.businessAreas &&
                                                            <div className="help-block text-danger">Business areas is required</div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="position-relative form-group">
                                                        <label htmlFor="pass" className="">
                                                            <span className="text-danger">*</span> Password</label>
                                                        <input type="password" id="password" placeholder="Password" name="password" value={brand.password} onChange={this.handleChange} className="form-control" />
                                                        {
                                                            submitted && !brand.password &&
                                                            <div className="help-block text-danger">Password is required</div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="position-relative form-group">
                                                        <label htmlFor="pass" className="">
                                                            <span className="text-danger">*</span> Repeat Password</label>
                                                        <input type="password" id="repeatPassword" placeholder="Repeat Password" name="repeatPassword" value={brand.repeatPassword} onChange={this.handleChange} className="form-control" />
                                                        {
                                                            submitted && !brand.repeatPassword &&
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
                                                        brands.registering &&
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
                                                <div className="slide-img-bg" style={{ backgroundImage: `url(${citynights})` }}></div>
                                                <div className="slider-content"><h3>Scalable, Modular, Consistent</h3>
                                                    <p>Easily exclude the components you don't require. Lightweight, consistent Bootstrap based styles across all elements and components</p></div>
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
    const { locations, brands, users } = state;
    return {
        brands,
        locations,
        users
    };
}

const connectedRegisterBrandPage = connect(mapStateToProps)(RegisterBrandPage);
export { connectedRegisterBrandPage as RegisterBrandPage };