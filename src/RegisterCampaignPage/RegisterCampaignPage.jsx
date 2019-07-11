import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import img from '../assets/images/hand.jpg'
//import { campaignActions } from '../_actions';
import { campaignActions, infActions, brandActions } from '../_actions';
//import Select from 'react-select';
import {createJobs} from './../_models/JobType';
//import {configContent} from 'configContent';

import { history } from '../_helpers';

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
            job: {
                jobName:'',
                jobHashTag:'',
                jobKeyword:'',
                jobDescription:'',
                jobLink:''
            },
            selectedOptionLocation: null,
            selectedOptionInteresting: null,
            selectedOptionJobCategory: null,
            selectedInfluencers: [],
            submitted: false,
            isFormStep:true,
            isInfluencerStep:false,
            isJobStep:false,
            isChecked: false,
            checkedInfluencers: new Map(),
        };

        this.handleCampaignChange = this.handleCampaignChange.bind(this);
        this.handleJobChange = this.handleJobChange.bind(this);
        this.handleSubmitJobs = this.handleSubmitJobs.bind(this);
        this.handleOptionLocationChange = this.handleOptionLocationChange.bind(this);
        this.handleOptionInterestingChange = this.handleOptionInterestingChange.bind(this);
        this.handleOptionJobCategoryChange = this.handleOptionJobCategoryChange.bind(this);
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
        this.handleInfluencerStep = this.handleInfluencerStep.bind(this);
        this.handleBackStep = this.handleBackStep.bind(this);
        this.handleJobStep = this.handleJobStep.bind(this);
        
    }

    handleCampaignChange(event) {
        const { name, value } = event.target;
        const { campaign } = this.state;
        this.setState({
            campaign: {
                ...campaign,
                [name]: value
            }
        });
    }

    handleJobChange(event) {
        const { name, value } = event.target;
        const { job } = this.state;
        this.setState({
            job: {
                ...job,
                [name]: value
            }
        });
    }

    handleSubmitJobs(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { campaign, 
                job, 
                selectedOptionLocation,
                selectedOptionInteresting,
                selectedOptionJobCategory,
                selectedInfluencers,
                checkedInfluencers } = this.state;
        const { dispatch, brands } = this.props;
        const brand = brands.brand;

        if (campaign.campaignName && 
            campaign.campaignTarget && 
            campaign.fromDate &&
            campaign.toDate &&
            campaign.fromAge &&
            campaign.toAge &&
            campaign.productInfo &&
            campaign.gender &&
            campaign.budget &&
            selectedOptionLocation &&
            selectedOptionInteresting &&
            job.jobDescription &&
            job.jobHashTag &&
            job.jobKeyword &&
            job.jobName &&
            checkedInfluencers.size > 0) {            
           
            const jobsLocal = createJobs(job, selectedOptionJobCategory);
            
            dispatch(campaignActions.register(campaign,
                                                jobsLocal,
                                                selectedOptionLocation,
                                                selectedOptionInteresting,
                                                brand,
                                                selectedInfluencers));
            this.setState({ isFormStep: true, isInfluencerStep: false, isJobStep: false });    
        }
    }

    handleInfluencerStep(event) {
        event.preventDefault();
        this.setState({isFormStep:false, isInfluencerStep:true, isJobStep:false});
    }

    handleJobStep(event) {
        event.preventDefault();
        this.setState({isFormStep:false, isInfluencerStep:false, isJobStep:true});
    }

    handleBackStep(event) {
        event.preventDefault();
        const { isInfluencerStep, isJobStep } = this.state;
        if(isInfluencerStep==true)
        {
            this.setState({isFormStep:true, isInfluencerStep:false, isJobStep: false});
            return;
        }

        if(isJobStep==true)
        {
            this.setState({isFormStep:false, isInfluencerStep:true, isJobStep: false});
            return;
        }
        //dispatch(infActions.getAll());
    }

    handleOptionLocationChange = selectedOptionLocation => {
        this.setState({ selectedOptionLocation });
        console.log(`Option selected:`, selectedOptionLocation);
    };

    handleOptionInterestingChange = selectedOptionInteresting => {
        this.setState({ selectedOptionInteresting });
        console.log(`Option selected:`, selectedOptionInteresting);
    };

    handleOptionJobCategoryChange = selectedOptionJobCategory => {
        this.setState({ selectedOptionJobCategory });
        console.log(`Option selected:`, selectedOptionJobCategory);
    };

    handleCheckBoxChange(event) {

        const { influencers } = this.props;
        const { selectedInfluencers } = this.state;
        const selectedInfluencersLocal = selectedInfluencers;

        const item = event.target.name;
        const isChecked = event.target.checked;

        this.setState(prevState => ({ checkedInfluencers: prevState.checkedInfluencers.set(item, isChecked) }));       
        
        influencers.items.influencer.map((item, key) =>
        {
            if(item.contentItemId === event.target.name && isChecked == true){
                selectedInfluencersLocal.push(item);
            }
            else if(item.contentItemId === event.target.name && isChecked == false){
                selectedInfluencersLocal.splice(selectedInfluencersLocal.indexOf(item), 1 );
            }
        });

        this.setState({selectedInfluencers:selectedInfluencersLocal})
    };

    componentDidMount() {
        const { dispatch } = this.props;
        if(this.props.location.state)
        {
            const { brand } = this.props.location.state;
            dispatch(brandActions.getBrandFromBrandPage(brand));
            //dispatch(campaignActions.getAll());
            dispatch(infActions.getAll());
            dispatch(campaignActions.getAllLocation());
            dispatch(campaignActions.getAllInteresting());
            dispatch(infActions.getAllJobCategories());
        }
        else
        {
            history.push('/registerBrandPage');
        }
        
    }

    // handleDeletecampaign(id) {
    //     return (e) => this.props.dispatch(campaignActions.delete(id));
    // }

    render() {

        const { influencers, brands, campaigns, locations, interestings, jobCategories} = this.props;
        const { submitted,
            campaign,
            job,
            selectedOptionLocation,
            selectedOptionInteresting,
            selectedOptionJobCategory,
            isFormStep,
            isInfluencerStep,
            isJobStep,
            checkedInfluencers  } = this.state;

        var localJobCategories = [
        ];
        
        if(jobCategories.jobCategories)
        {
            jobCategories.jobCategories.map((item, key) => 
            {                
                const jobCategory = {value: item, label: item.description};
                localJobCategories.push(jobCategory);
            })
        }

        return (
            <section className="signup">
                {
                    isFormStep &&
                    <div className="containerForm">
                        <div className="signup-content">
                            <div className="signup-form" style={{width: '100%'}}>
                                <h2 className="form-title">Campaign</h2>
                                <form onSubmit={this.handleInfluencerStep} className="register-form" id="register-form">
                                    <div className={'form-group row' + (submitted && !campaign.campaignName ? ' has-error' : '')}>
                                        <div className='col-sm-12'>
                                            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <input type="text" style={{paddingLeft: '15px'}} name="campaignName" id="campaignName" placeholder="Campaign Name" value={campaign.campaignName} onChange={this.handleCampaignChange}/>
                                            {
                                                submitted && !campaign.campaignName &&
                                                <div className="help-block">Campaign Name is required</div>
                                            }
                                        </div>                                        
                                    </div>
                                    <div className="form-group row">
                                        <div className={'col-sm-3' + (submitted && !campaign.fromDate ? ' has-error' : '')}>
                                            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <input type="text" style={{paddingLeft: '15px'}} name="fromDate" id="fromDate" placeholder="From Date" value={campaign.fromDate} onChange={this.handleCampaignChange}/>
                                            {
                                                submitted && !campaign.fromDate &&
                                                <div className="help-block">Campaign Date is required</div>
                                            }
                                        </div>
                                        <div className={'col-sm-3' + (submitted && !campaign.toDate ? ' has-error' : '')}>
                                            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <input type="text" style={{paddingLeft: '15px'}} name="toDate" id="toDate" placeholder="To Date" value={campaign.toDate} onChange={this.handleCampaignChange}/>
                                            {
                                                submitted && !campaign.toDate &&
                                                <div className="help-block">Campaign Date is required</div>
                                            }
                                        </div>
                                        <div className={'col-sm-3' + (submitted && !campaign.fromAge ? ' has-error' : '')}>
                                            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <input type="text" style={{paddingLeft: '15px'}} name="fromAge" id="fromAge" placeholder="From Age" value={campaign.fromAge} onChange={this.handleCampaignChange}/>
                                            {
                                                submitted && !campaign.fromAge &&
                                                <div className="help-block">Age is required</div>
                                            }
                                        </div>
                                        <div className={'col-sm-3' + (submitted && !campaign.toAge ? ' has-error' : '')}>
                                            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <input type="text" style={{paddingLeft: '15px'}} name="toAge" id="toAge" placeholder="To Age" value={campaign.toAge} onChange={this.handleCampaignChange}/>
                                            {
                                                submitted && !campaign.toAge &&
                                                <div className="help-block">Age is required</div>
                                            }
                                        </div>
                                    </div>
                                    <div className={'form-group row' + (submitted && !campaign.productInfo ? ' has-error' : '')}>
                                        <div className='col-sm-12'>
                                            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <input type="text" style={{paddingLeft: '15px'}} name="productInfo" id="productInfo" placeholder="Product Info" value={campaign.productInfo} onChange={this.handleCampaignChange}/>
                                            {
                                                submitted && !campaign.productInfo &&
                                                <div className="help-block">Product Info is required</div>
                                            }
                                        </div>                                        
                                    </div>
                                    <div className={'form-group row' + (submitted && !campaign.campaignTarget ? ' has-error' : '')}>
                                        <div className='col-sm-12'>
                                            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <input type="text" style={{paddingLeft: '15px'}} name="campaignTarget" id="campaignTarget" placeholder="Campaign Target" value={campaign.campaignTarget} onChange={this.handleCampaignChange}/>
                                            {
                                                submitted && !campaign.campaignTarget &&
                                                <div className="help-block">Campaign Target is required</div>
                                            }
                                        </div>                                        
                                    </div>
                                    <div className={"row" + (submitted && !selectedOptionLocation ? ' has-error' : '')} style={{marginBottom: '25px', paddingTop:'10px'}}>
                                        <div className='col-sm-12'>
                                            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <Select
                                                value={selectedOptionLocation}
                                                onChange={this.handleOptionLocationChange}
                                                isMulti
                                                placeholder="Locations..."
                                                getOptionLabel={(obj) => obj.location}
                                                getOptionValue={(obj) => obj.contentItemId}
                                                options={locations.locations}
                                            />
                                        </div>
                                    </div>
                                    <div className={"row" + (submitted && !selectedOptionInteresting ? ' has-error' : '')} style={{marginBottom: '25px', paddingTop:'10px'}}>
                                        <div className='col-sm-12'>
                                            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <Select
                                                value={selectedOptionInteresting}
                                                onChange={this.handleOptionInterestingChange}
                                                isMulti
                                                placeholder="Interestings..."
                                                getOptionLabel={(obj) => obj.interesting}
                                                getOptionValue={(obj) => obj.contentItemId}
                                                options={interestings.interestings}
                                            />
                                        </div>
                                    </div>
                                    <div className='form-group row'>                                        
                                        <div className={'col-sm-6' + (submitted && !campaign.gender ? ' has-error' : '')}>
                                            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <input type="text" style={{paddingLeft: '15px'}} name="gender" id="gender" placeholder="Gender" value={campaign.gender} onChange={this.handleCampaignChange}/>
                                            {
                                                submitted && !campaign.gender &&
                                                <div className="help-block">Gender is required</div>
                                            }
                                        </div>
                                        <div className={'col-sm-6' + (submitted && !campaign.budget ? ' has-error' : '')}>
                                            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <input type="text" style={{paddingLeft: '15px'}} name="budget" id="budget" placeholder="Budget" value={campaign.budget} onChange={this.handleCampaignChange}/>
                                            {
                                                submitted && !campaign.budget &&
                                                <div className="help-block">Budget is required</div>
                                            }
                                        </div>                                        
                                    </div>                                    
                                    <div className="form-group form-button">
                                        <input type="submit" name="nextStep" id="nextStep" className="form-submit" value="Next Step"/>
                                        <Link to="/login" className="btn btn-link">Cancel</Link>
                                    </div>                                    
                                </form>
                            </div>                    
                        </div>
                    </div>
                }
                {
                    isInfluencerStep &&
                    <div className="containerForm">
                        <h2 className="form-title" style={{textAlign:'center'}}>Influencers</h2>
                        <div className="row">
                            {
                                influencers.items && influencers.items.influencer.map((item, key) =>
                                {
                                    if(item.bag && item.photo && item.description){
                                        var configContent = require('configContent')
                                        const imgSrc = configContent.apiUrl + item.photo.urls[0] + '?&width=240&height=240&rmode=';
                                        return (
                                        <div key={key} className="col-sm-4">
                                            <div className="team-member">
                                                <img className="mx-auto rounded-circle" src={imgSrc} alt=""/>
                                                <h6>{item.displayText}</h6>
                                                <p>{item.description}</p>
                                                {
                                                    item.bag.contentItems.map((child, key) =>
                                                    {
                                                        return (
                                                        <div key={key} className="row">
                                                            <p className='col-sm-6'>{child.demoGraphicsName? child.demoGraphicsName: ''}</p><p className='col-sm-6'>{child.percentage? child.percentage: ''}</p>
                                                            <p className='col-sm-6'>{child.price? child.displayText: ''}</p><p className='col-sm-6'>{child.price? child.price: ''}</p>
                                                        </div>
                                                        )
                                                    }
                                                    )
                                                }
                                                <div className="form-group">
                                                <input onChange={this.handleCheckBoxChange} 
                                                    id={item.contentItemId} 
                                                    checked={this.state.checkedInfluencers.get(item.contentItemId) ? this.state.checkedInfluencers.get(item.contentItemId) : false } 
                                                    type="checkbox" 
                                                    name={item.contentItemId} 
                                                    className="agree-term" 
                                                />
                                                <label htmlFor={item.contentItemId} className="label-agree-term"><span><span></span></span>Select</label>
                                            </div>
                                            </div>                                        
                                        </div>
                                    )
                                    }
                                }
                                )
                            }                            
                        </div>
                        <div className="form-group form-button">
                            <input type="button" onClick={this.handleJobStep} name="job" id="job" className="form-submit" value="Last Step"/>
                            <input type="button" onClick={this.handleBackStep} name="backinf" id="backinf" className="form-submit" value="Back"/>
                            {/* <Link to="/login" className="btn btn-link">Cancel</Link> */}
                        </div> 
                    </div>
                }
                {
                    isJobStep &&
                    <div className="containerForm">
                        <div className="signup-content">
                            <div className="signup-form" style={{width: '100%'}}>
                                <h2 className="form-title">Create Job</h2>
                                <form onSubmit={this.handleSubmitJobs} className="register-form" id="register-form">
                                    <div className={'form-group row' + (submitted && !job.jobName ? ' has-error' : '')}>
                                        <div className='col-sm-12'>
                                            <label htmlFor="jobName"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <input type="text" style={{paddingLeft: '15px'}} name="jobName" id="jobName" placeholder="Job Name" value={job.jobName} onChange={this.handleJobChange}/>
                                            {
                                                submitted && !job.jobName &&
                                                <div className="help-block">Job Name is required</div>
                                            }
                                        </div>                                        
                                    </div>
                                    <div className={'form-group row' + (submitted && !job.jobHashTag ? ' has-error' : '')}>
                                        <div className='col-sm-12'>
                                            <label htmlFor="jobHashTag"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <input type="text" style={{paddingLeft: '15px'}} name="jobHashTag" id="jobHashTag" placeholder="Job HashTag" value={job.jobHashTag} onChange={this.handleJobChange}/>
                                            {
                                                submitted && !job.jobHashTag &&
                                                <div className="help-block">Job HashTag is required</div>
                                            }
                                        </div>                                        
                                    </div>
                                    <div className={'form-group row' + (submitted && !job.jobKeyword ? ' has-error' : '')}>
                                        <div className='col-sm-12'>
                                            <label htmlFor="jobKeyword"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <input type="text" style={{paddingLeft: '15px'}} name="jobKeyword" id="jobKeyword" placeholder="Job Keyword" value={job.jobKeyword} onChange={this.handleJobChange}/>
                                            {
                                                submitted && !job.jobKeyword &&
                                                <div className="help-block">Job Keyword is required</div>
                                            }
                                        </div>                                        
                                    </div>
                                    <div className={'form-group row' + (submitted && !job.jobDescription ? ' has-error' : '')}>
                                        <div className='col-sm-12'>
                                            <label htmlFor="jobDescription"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <input type="text" style={{paddingLeft: '15px'}} name="jobDescription" id="jobDescription" placeholder="Job Description" value={job.jobDescription} onChange={this.handleJobChange}/>
                                            {
                                                submitted && !job.jobDescription &&
                                                <div className="help-block">Job Description is required</div>
                                            }
                                        </div>
                                    </div>
                                    <div className="row" style={{marginBottom: '25px', paddingTop:'10px'}}>
                                        <div className='col-sm-12'>
                                            <label htmlFor="jobCategory"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <Select
                                                value={selectedOptionJobCategory}
                                                onChange={this.handleOptionJobCategoryChange}
                                                isMulti
                                                placeholder="Job Category..."
                                                getOptionLabel={(obj) => obj.description}
                                                getOptionValue={(obj) => obj.contentItemId}
                                                options={jobCategories.jobCategories}
                                            />
                                        </div>
                                    </div>
                                    <div className={'form-group row'}>
                                        <div className='col-sm-12'>
                                            <label htmlFor="jobLink"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <input type="text" style={{paddingLeft: '15px'}} name="jobLink" id="jobLink" placeholder="Job Link" value={job.jobLink} onChange={this.handleJobChange}/>
                                        </div>                                        
                                    </div>                                                                      
                                    <div className="form-group form-button">
                                        <input type="submit" name="register" id="register" className="form-submit" value="Register"/>
                                        {
                                            campaigns.loading &&
                                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                        }
                                        <input type="button" onClick={this.handleBackStep} name="backinf" id="backinf" className="form-submit" value="Back"/>
                                    </div>                                                                   
                                </form>
                            </div>                    
                        </div>
                    </div>
                }
            </section>     
        );
    }
}

function mapStateToProps(state) {
    //debugger;
    const { campaigns, influencers, locations, interestings, jobCategories, jobs, brands } = state;
    //const { brand } = influencers;
    return {
        //loggingIn,
        brands,
        jobs,
        jobCategories,
        interestings,
        locations,
        campaigns,
        influencers
    };
}

const connectedRegisterCampaignPage = connect(mapStateToProps)(RegisterCampaignPage);
export { connectedRegisterCampaignPage as RegisterCampaignPage };