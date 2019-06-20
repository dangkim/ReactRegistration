import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import img from '../../images/influencer1.jpg'
import { userActions, infActions } from '../_actions';

class RegisterInfluencerPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            influencer: {
                fullName: '',
                phone: '',
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
        if (influencer.fullName && influencer.phone && influencer.fanpage) {

            const InfluencerType = {
                ContentItemId:'',
                ContentItemVersionId:'',
                ContentType:'Influencer',
                DisplayText: influencer.fullName,
                Latest:false,
                Published:false,
                ModifiedUtc:null,
                PublishedUtc:null,
                CreatedUtc:null,
                Owner:'admin',
                Author:'admin',
                Influencer:{
                    FullName:{
                        Text: influencer.fullName
                    },
                    Phone:{
                        Text: influencer.phone
                    },
                    Fanpage:{
                        Text: influencer.fanpage
                    }                    
                },
                TitlePart:{
                    Title: influencer.fullName,
                }
            }

            dispatch(infActions.register(InfluencerType));
        }
    }

    render() {
        const { influencers  } = this.props;
        const { submitted, influencer } = this.state;
        return (            
            <section className="signup">
                <div className="containerForm">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Sign up</h2>
                            <form onSubmit={this.handleSubmit} className="register-form" id="register-form">
                                <div className={'form-group' + (submitted && !influencer.phone ? ' has-error' : '')}>
                                    <label htmlFor="fullName"><i className="zmdi zmdi-account material-icons-branding_watermark"></i></label>
                                    <input type="text" name="fullName" id="fullName" placeholder="Your Full Name" value={influencer.fullName} onChange={this.handleChange}/>
                                    {
                                        submitted && !influencer.fullName &&
                                        <div className="help-block">Full Name is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !influencer.phone ? ' has-error' : '')}>
                                    <label htmlFor="name"><i className="zmdi zmdi-account material-icons-branding_watermark"></i></label>
                                    <input type="text" name="phone" id="phone" placeholder="Your Phone" value={influencer.phone} onChange={this.handleChange}/>
                                    {
                                        submitted && !influencer.phone &&
                                        <div className="help-block">Phone is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !influencer.fanpage ? ' has-error' : '')}>
                                    <label htmlFor="name"><i className="zmdi zmdi-account material-icons-branding_watermark"></i></label>
                                    <input type="text" name="fanpage" id="fanpage" placeholder="Your Fan Page" value={influencer.fanpage} onChange={this.handleChange}/>
                                    {
                                        submitted && !influencer.fanpage &&
                                        <div className="help-block">Fan Page is required</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                                    <label htmlFor="agree-term" className="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" className="term-service">Terms of service</a></label>
                                </div>
                                <div className="form-group form-button">
                                    <input type="submit" name="signup" id="signup" className="form-submit" value="Register"/>
                                    {
                                        influencers.loading && 
                                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                    }
                                    <Link to="/login" className="btn btn-link">Cancel</Link>
                                </div>
                            </form>
                        </div>
                        <div className="signup-image">
                            <figure><img src={img} alt="sing up image"/></figure>
                            <Link to="/RegisterBrandPage" className="signup-image-link">You are Brand</Link>
                        </div>
                    </div>
                </div>
            </section>
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