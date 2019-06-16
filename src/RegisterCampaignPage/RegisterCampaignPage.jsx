import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import img from '../../images/hand.jpg'
//import { campaignActions } from '../_actions';
import { campaignActions, infActions } from '../_actions';
import Select from 'react-select';
import {config} from 'config';

class RegisterCampaignPage extends Component {

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
            selectedOption: null,
            submitted: false,
            isForm:false,
            isInfluencer:true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
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
            
            debugger;
            dispatch(campaignActions.register(campaign));
        }
    }

    handleNextSubmit(event) {
        event.preventDefault();
        dispatch(infActions.getAll());
    }

    handleOptionChange = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };

    componentDidMount() {
        //debugger;
        this.props.dispatch(infActions.getAll());
    }

    // handleDeletecampaign(id) {
    //     return (e) => this.props.dispatch(campaignActions.delete(id));
    // }

    render() {
        const { loggingIn, influencers } = this.props;
        const { submitted, campaign, selectedOption, isForm, isInfluencer  } = this.state;       
        const locations = [
            { value: 'Đà Nẵng', label: 'Đà Nẵng' },
            { value: 'THPCM', label: 'THPCM' },
            { value: 'Hà Nội', label: 'Hà Nội' },
        ];
        const interestings = [
            { value: 'sport', label: 'Sport' },
            { value: 'fashion', label: 'Fashion' },
            { value: 'music', label: 'Music' },
            { value: 'healty', label: 'Healty' },
        ];

        //debugger;
        return (
            <section className="signup">
                {
                    isForm &&
                    <div className="containerForm">
                        <div className="signup-content">
                            <div className="signup-form" style={{width: '100%'}}>
                                <h2 className="form-title">Campaign</h2>
                                <form onSubmit={this.handleNextSubmit} className="register-form" id="register-form">
                                    <div className={'form-group row' + (submitted && !campaign.campaignName ? ' has-error' : '')}>
                                        <div className='col-sm-12'>
                                            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <input type="text" style={{paddingLeft: '15px'}} name="campaignName" id="campaignName" placeholder="Campaign Name" value={campaign.campaignName} onChange={this.handleChange}/>
                                            {
                                                submitted && !campaign.campaignName &&
                                                <div className="help-block">Campaign Name is required</div>
                                            }
                                        </div>                                        
                                    </div>
                                    <div className="form-group row">
                                        <div className={'col-sm-3' + (submitted && !campaign.fromDate ? ' has-error' : '')}>
                                            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <input type="text" style={{paddingLeft: '15px'}} name="fromDate" id="fromDate" placeholder="From Date" value={campaign.fromDate} onChange={this.handleChange}/>
                                            {
                                                submitted && !campaign.fromDate &&
                                                <div className="help-block">Campaign Date is required</div>
                                            }
                                        </div>
                                        <div className={'col-sm-3' + (submitted && !campaign.toDate ? ' has-error' : '')}>
                                            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <input type="text" style={{paddingLeft: '15px'}} name="toDate" id="toDate" placeholder="To Date" value={campaign.toDate} onChange={this.handleChange}/>
                                            {
                                                submitted && !campaign.toDate &&
                                                <div className="help-block">Campaign Date is required</div>
                                            }
                                        </div>
                                        <div className={'col-sm-3' + (submitted && !campaign.fromAge ? ' has-error' : '')}>
                                            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <input type="text" style={{paddingLeft: '15px'}} name="fromAge" id="fromAge" placeholder="From Age" value={campaign.fromAge} onChange={this.handleChange}/>
                                            {
                                                submitted && !campaign.fromAge &&
                                                <div className="help-block">Age is required</div>
                                            }
                                        </div>
                                        <div className={'col-sm-3' + (submitted && !campaign.toAge ? ' has-error' : '')}>
                                            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <input type="text" style={{paddingLeft: '15px'}} name="toAge" id="toAge" placeholder="To Age" value={campaign.toAge} onChange={this.handleChange}/>
                                            {
                                                submitted && !campaign.toAge &&
                                                <div className="help-block">Age is required</div>
                                            }
                                        </div>
                                    </div>
                                    <div className={'form-group row' + (submitted && !campaign.productInfo ? ' has-error' : '')}>
                                        <div className='col-sm-12'>
                                            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <input type="text" style={{paddingLeft: '15px'}} name="productInfo" id="productInfo" placeholder="Product Info" value={campaign.productInfo} onChange={this.handleChange}/>
                                            {
                                                submitted && !campaign.productInfo &&
                                                <div className="help-block">Product Info is required</div>
                                            }
                                        </div>                                        
                                    </div>
                                    <div className={'form-group row' + (submitted && !campaign.campaignTarget ? ' has-error' : '')}>
                                        <div className='col-sm-12'>
                                            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <input type="text" style={{paddingLeft: '15px'}} name="campaignTarget" id="campaignTarget" placeholder="Campaign Target" value={campaign.campaignTarget} onChange={this.handleChange}/>
                                            {
                                                submitted && !campaign.campaignTarget &&
                                                <div className="help-block">Campaign Target is required</div>
                                            }
                                        </div>                                        
                                    </div>
                                    <div className="row" style={{marginBottom: '25px', paddingTop:'10px'}}>
                                        <div className='col-sm-12'>
                                            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <Select
                                                value={selectedOption}
                                                onChange={this.handleOptionChange}
                                                isMulti
                                                placeholder="Locations..."
                                                options={locations}
                                            />
                                        </div>
                                    </div>
                                    <div className="row" style={{marginBottom: '25px', paddingTop:'10px'}}>
                                        <div className='col-sm-12'>
                                            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <Select
                                                value={selectedOption}
                                                onChange={this.handleOptionChange}
                                                isMulti
                                                placeholder="Interestings..."
                                                options={interestings}
                                            />
                                        </div>
                                    </div>
                                    <div className='form-group row'>                                        
                                        <div className={'col-sm-6' + (submitted && !campaign.gender ? ' has-error' : '')}>
                                            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <input type="text" style={{paddingLeft: '15px'}} name="gender" id="gender" placeholder="Gender" value={campaign.gender} onChange={this.handleChange}/>
                                            {
                                                submitted && !campaign.gender &&
                                                <div className="help-block">Gender is required</div>
                                            }
                                        </div>
                                        <div className={'col-sm-6' + (submitted && !campaign.budget ? ' has-error' : '')}>
                                            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <input type="text" style={{paddingLeft: '15px'}} name="budget" id="budget" placeholder="Budget" value={campaign.budget} onChange={this.handleChange}/>
                                            {
                                                submitted && !campaign.budget &&
                                                <div className="help-block">Budget is required</div>
                                            }
                                        </div>                                        
                                    </div>                                    
                                    <div className="form-group form-button">
                                        <input type="submit" name="nextStep" id="nextStep" className="form-submit" value="Next Step"/>
                                        {
                                            loggingIn &&
                                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                        }
                                        <Link to="/login" className="btn btn-link">Cancel</Link>
                                    </div>                                    
                                </form>
                            </div>                    
                        </div>
                    </div>
                }
                {
                    isInfluencer &&
                    <div className="containerForm">
                        <h2 className="form-title" style={{textAlign:'center'}}>Influencers</h2>
                        <div className="row">
                            {
                                influencers.items && influencers.items.influencer.map((item, key) =>
                                {
                                    const imgSrc = 'https://localhost:44300' + item.photo.urls[0] + '?&width=240&height=240&rmode=';
                                    return (
                                    <div key={key} className="col-sm-4">
                                        <div className="team-member">
                                            <img className="mx-auto rounded-circle" src={imgSrc} alt=""/>
                                            <h6>{item.title}</h6>
                                            <p>{item.description}</p>
                                            {
                                                item.bag.contentItems.map((child, key) =>
                                                {
                                                    return (
                                                    <div key={key} className="row">
                                                        <p className='col-sm-6'>{child.demoGraphicsName? child.demoGraphicsName: ''}</p><p className='col-sm-6'>{child.percentage? child.percentage: ''}</p>
                                                        <p className='col-sm-6'>{child.price? child.title: ''}</p><p className='col-sm-6'>{child.price? child.price: ''}</p>
                                                    </div>
                                                    )
                                                }
                                                )
                                            }
                                            <div className="form-group">
                                            <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                                            <label htmlFor="agree-term" className="label-agree-term"><span><span></span></span>Select</label>
                                        </div>
                                        </div>                                        
                                    </div>
                                )
                                }
                                )
                            }                            
                        </div>
                        <div className="form-group form-button">
                            <input type="submit" name="register" id="register" className="form-submit" value="Register"/>
                            {
                                loggingIn &&
                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            }
                            <Link to="/login" className="btn btn-link">Cancel</Link>
                        </div> 
                    </div>
                }
            </section>     
        );
    }
}

function mapStateToProps(state) {
    const { campaigns, influencers } = state;
    //const { campaign, loggingIn } = authentication;
    return {
        //campaign,
        //campaigns,
        //loggingIn,
        influencers
    };
}

const connectedRegisterCampaignPage = connect(mapStateToProps)(RegisterCampaignPage);
export { connectedRegisterCampaignPage as RegisterCampaignPage };