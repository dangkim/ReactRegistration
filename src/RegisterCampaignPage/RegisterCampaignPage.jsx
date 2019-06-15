import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import img from '../../images/hand.jpg'
//import { campaignActions } from '../_actions';
import { campaignActions } from '../_actions';

class RegisterCampaignPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {            
            campaign: {
                campaignTarget:'',
                marketPlace:'',
                fromAge:'',
                toAge:'',
                gender:'',
                campaignName:'',
                fromDate:'',
                toDate:'',
                productInfo:'',
                budget:'',
                currency:''
            },            
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { campaign } = this.state;
        this.setState({
            campaign: {
                ...campaign,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { campaign } = this.state;
        const { dispatch } = this.props;
        if (campaign.campaignName && campaign.campaignDate && campaign.title && campaign.html) {
            const campaignType = {
                ContentItemId:'',
                ContentItemVersionId:'',
                ContentType:'Campaign',
                DisplayText:campaign.campaignName,
                Latest:false,
                Published:false,
                ModifiedUtc:null,
                PublishedUtc:null,
                CreatedUtc:null,
                Owner:null,
                Author:null,
                Campaign:{
                    CampaignName:{
                        Text: campaign.campaignName
                    },
                    CampaignDate:{
                        Value: campaign.campaignDate
                    }
                },
                TitlePart:{
                    Title: campaign.title
                }
            }
            debugger;
            dispatch(campaignActions.register(campaignType));
        }
    }

    componentDidMount() {
        //this.props.dispatch(campaignActions.getAll());
    }

    // handleDeletecampaign(id) {
    //     return (e) => this.props.dispatch(campaignActions.delete(id));
    // }

    render() {
        const { campaigns, loggingIn } = this.props;
        const { submitted, campaign } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {campaign.firstName}!</h1>
                <p>
                    <Link to="/login">Logout</Link>
                </p>
                {campaigns.loading && <em>Loading campaigns...</em>}
                {campaigns.error && <span className="text-danger">ERROR: {campaigns.error}</span>}
                    <div className="container">
                        <div className="signup-content">
                            <div className="signup-form">
                                <h2 className="form-title">Campaign</h2>
                                <form onSubmit={this.handleSubmit} className="register-form" id="register-form">
                                    <div className={'form-group' + (submitted && !campaign.campaignName ? ' has-error' : '')}>
                                        <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                        <input type="text" name="campaignName" id="campaignName" placeholder="Campaign Name" value={campaign.campaignName} onChange={this.handleChange}/>
                                        {
                                            submitted && !campaign.campaignName &&
                                            <div className="help-block">Campaign Name is required</div>
                                        }
                                    </div>
                                    <div>
                                    <div className={'col-xs-10 col-sm-4 col-md-4 col-lg-4 form-group' + (submitted && !campaign.fromDate ? ' has-error' : '')}>
                                        <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                        <input type="text" name="fromDate" id="fromDate" placeholder="Campaign From Date" value={campaign.fromDate} onChange={this.handleChange}/>
                                        {
                                            submitted && !campaign.fromDate &&
                                            <div className="help-block">Campaign Date is required</div>
                                        }
                                    </div>
                                    <div className={'col-xs-10 col-sm-4 col-md-4 col-lg-4 form-group' + (submitted && !campaign.toDate ? ' has-error' : '')}>
                                        <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                        <input type="text" name="toDate" id="toDate" placeholder="Campaign Date" value={campaign.toDate} onChange={this.handleChange}/>
                                        {
                                            submitted && !campaign.toDate &&
                                            <div className="help-block">Campaign Date is required</div>
                                        }
                                    </div>
                                    </div>
                                    
                                    {/* <div className={'form-group' + (submitted && !campaign.campaignName ? ' has-error' : '')}>
                                        <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                        <input type="text" name="title" id="title" placeholder="Title" value={campaign.title} onChange={this.handleChange}/>
                                        {
                                            submitted && !campaign.title &&
                                            <div className="help-block">Title is required</div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name"><i className="zmdi zmdi-email"></i></label>
                                        <input type="body" name="html" id="body" placeholder="Body" value={campaign.html} onChange={this.handleChange}/>
                                        {
                                            submitted && !campaign.html &&
                                            <div className="help-block">Body is required</div>
                                        }
                                    </div> */}
                                    <div className="form-group form-button">
                                        <input type="submit" name="register" id="register" className="form-submit" value="Register"/>
                                        {
                                            loggingIn &&
                                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                        }
                                        <Link to="/login" className="btn btn-link">Cancel</Link>
                                    </div>
                                </form>
                            </div>
                            <div className="signup-image">
                                <figure><img src={img} alt="sing up image"/></figure>
                            </div>
                        </div>                        
                    </div>                
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { campaigns, authentication } = state;
    const { campaign, loggingIn } = authentication;
    return {
        campaign,
        campaigns,
        loggingIn
    };
}

const connectedRegisterCampaignPage = connect(mapStateToProps)(RegisterCampaignPage);
export { connectedRegisterCampaignPage as RegisterCampaignPage };