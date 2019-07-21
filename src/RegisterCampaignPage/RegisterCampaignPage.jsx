import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import img from '../assets/images/hand.jpg'
//import { campaignActions } from '../_actions';
import { campaignActions, infActions, brandActions } from '../_actions';
import Select from 'react-select';
import { createLocations, createInterestings, createJobs } from './../_models/CommonModels';
import city from '../assets/images/originals/city.jpg'
import citynights from '../assets/images/originals/citynights.jpg'
import citydark from '../assets/images/originals/citydark.jpg'
import defaultAvatar from '../assets/images/avatars/default.jpg'
import Slider from "react-slick";
//import {configContent} from 'configContent';

import { history } from '../_helpers';

class RegisterCampaignPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            campaign: {
                campaignTarget: '',
                marketPlace: '',
                fromAge: '',
                toAge: '',
                gender: '',
                campaignName: '',
                fromDate: '',
                toDate: '',
                productInfo: '',
                budget: '',
                currency: ''
            },
            job: {
                jobName: '',
                jobHashTag: '',
                jobKeyword: '',
                jobDescription: '',
                jobLink: ''
            },
            selectedOptionLocation: null,
            selectedOptionInteresting: null,
            selectedOptionJobCategory: null,
            selectedInfluencers: [],
            submitted: false,
            isFormStep: false,
            isInfluencerStep: false,
            isJobStep: true,
            isChecked: false,
            skip: 0,
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
        this.nextPageFluencers = this.nextPageFluencers.bind(this);
        this.prePageFluencers = this.prePageFluencers.bind(this);
    }

    nextPageFluencers() {
        this.setState({ skip: skip + 1 });
    }

    prePageFluencers() {
        const { skip } = this.state;
        if (skip > 0) {
            this.setState({ skip: skip - 1 });
        }
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
        this.setState({ isFormStep: false, isInfluencerStep: true, isJobStep: false });
    }

    handleJobStep(event) {
        event.preventDefault();
        this.setState({ isFormStep: false, isInfluencerStep: false, isJobStep: true });
    }

    handleBackStep(event) {
        event.preventDefault();
        const { isInfluencerStep, isJobStep } = this.state;
        if (isInfluencerStep == true) {
            this.setState({ isFormStep: true, isInfluencerStep: false, isJobStep: false });
            return;
        }

        if (isJobStep == true) {
            this.setState({ isFormStep: false, isInfluencerStep: true, isJobStep: false });
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

        influencers.items.influencer.map((item, key) => {
            if (item.contentItemId === event.target.name && isChecked == true) {
                selectedInfluencersLocal.push(item);
            }
            else if (item.contentItemId === event.target.name && isChecked == false) {
                selectedInfluencersLocal.splice(selectedInfluencersLocal.indexOf(item), 1);
            }
        });

        this.setState({ selectedInfluencers: selectedInfluencersLocal })
    };

    componentDidMount() {
        const first = 9;
        const { dispatch } = this.props;
        dispatch(infActions.getAll(first, 0));
        if (this.props.location.state) {
            debugger;
            const { brand } = this.props.location.state;
            dispatch(brandActions.getBrandFromBrandPage(brand));
            //dispatch(campaignActions.getAll());
            //dispatch(infActions.getAll());
            //dispatch(campaignActions.getAllLocation());
            //dispatch(campaignActions.getAllInteresting());
            //dispatch(infActions.getAllJobCategories());
        }
        else {
            //history.push('/registerBrandPage');
        }

    }

    // handleDeletecampaign(id) {
    //     return (e) => this.props.dispatch(campaignActions.delete(id));
    // }

    render() {
        const { brand } = this.props.location.state;
        const { influencers, campaigns } = this.props;
        let imgSrc = defaultAvatar;
        if (brand && brand.published) {
            imgSrc = item.photo.urls.length == 0 ? defaultAvatar : configContent.apiUrl + item.photo.urls[0] + '?&width=240&height=240&rmode=';
        }

        const { submitted,
            campaign,
            job,
            selectedOptionLocation,
            selectedOptionInteresting,
            selectedOptionJobCategory,
            isFormStep,
            isInfluencerStep,
            isJobStep,
            checkedInfluencers } = this.state;

        const locations = createLocations();
        const interestings = createInterestings();
        const jobs = createJobs();
        debugger;
        return (
            <div className="app-container app-theme-white body-tabs-shadow">
                <div className="app-container">
                    <div className="h-100">
                        {
                            isFormStep &&
                            <div className="h-100 no-gutters row">
                                <div className="h-100 d-md-flex d-sm-block bg-white justify-content-center align-items-center col-md-12 col-lg-8">
                                    <div className="mx-auto app-login-box col-sm-12 col-md-10 col-lg-9">
                                        <div className="app-logo"></div>
                                        <h4>
                                            <div>Welcome,</div>
                                            <span>It only takes a <span className="text-success">few minutes</span> to create your Campaign</span></h4>
                                        <div>
                                            <form className="" onSubmit={this.handleInfluencerStep} id="register-form">
                                                <div className="form-row">
                                                    <div className="col-md-6">
                                                        <div className="position-relative form-group">
                                                            <label htmlFor="name" className="">
                                                                <span className="text-danger">*</span> Campaign Name</label>
                                                            <input type="text" name="campaignName" id="campaignName" placeholder="Campaign Name" value={campaign.campaignName} onChange={this.handleCampaignChange} className="form-control" />
                                                            {
                                                                submitted && !campaign.campaignName &&
                                                                <div className="help-block text-danger">Campaign Name is required</div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="position-relative form-group">
                                                            <label htmlFor="pass" className="">
                                                                <span className="text-danger">*</span> Campaign Target</label>
                                                            <input type="text" className="form-control" name="campaignTarget" id="campaignTarget" placeholder="Campaign Target" value={campaign.campaignTarget} onChange={this.handleCampaignChange} />
                                                            {
                                                                submitted && !campaign.campaignTarget &&
                                                                <div className="help-block text-danger">Campaign Target is required</div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="position-relative form-group">
                                                            <label htmlFor="name" className="">
                                                                <span className="text-danger">*</span> From Date
                                                        </label>
                                                            <input type="text" className="form-control" name="fromDate" id="fromDate" placeholder="From Date" value={campaign.fromDate} onChange={this.handleCampaignChange} />
                                                            {
                                                                submitted && !campaign.fromDate &&
                                                                <div className="help-block text-danger">Campaign Date is required</div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="position-relative form-group">
                                                            <label htmlFor="name" className="">
                                                                <span className="text-danger">*</span> To Date</label>
                                                            <input type="text" className="form-control" name="toDate" id="toDate" placeholder="To Date" value={campaign.toDate} onChange={this.handleCampaignChange} />
                                                            {
                                                                submitted && !campaign.toDate &&
                                                                <div className="help-block text-danger">Campaign Date is required</div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="position-relative form-group">
                                                            <label htmlFor="name" className="">
                                                                <span className="text-danger">*</span> From Age
                                                        </label>
                                                            <input type="text" className="form-control" name="fromAge" id="fromAge" placeholder="From Age" value={campaign.fromAge} onChange={this.handleCampaignChange} />
                                                            {
                                                                submitted && !campaign.fromAge &&
                                                                <div className="help-block text-danger">Age is required</div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="position-relative form-group">
                                                            <label htmlFor="name" className="">
                                                                <span className="text-danger">*</span> To Age
                                                        </label>
                                                            <input type="text" className="form-control" name="toAge" id="toAge" placeholder="To Age" value={campaign.toAge} onChange={this.handleCampaignChange} />
                                                            {
                                                                submitted && !campaign.toAge &&
                                                                <div className="help-block text-danger">Age is required</div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="position-relative form-group">
                                                            <label htmlFor="name" className="">
                                                                <span className="text-danger">*</span> Product Info
                                                        </label>
                                                            <input type="text" className="form-control" name="productInfo" id="productInfo" placeholder="Product Info" value={campaign.productInfo} onChange={this.handleCampaignChange} />
                                                            {
                                                                submitted && !campaign.productInfo &&
                                                                <div className="help-block text-danger">Product Info is required</div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="position-relative form-group">
                                                            <label htmlFor="pass" className="">
                                                                <span className="text-danger">*</span> Location</label>
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
                                                    <div className="col-md-4">
                                                        <div className="position-relative form-group">
                                                            <label htmlFor="pass" className="">
                                                                <span className="text-danger">*</span> Interestings</label>
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
                                                    <div className="col-md-4">
                                                        <div className="position-relative form-group">
                                                            <label htmlFor="pass" className="">
                                                                <span className="text-danger">*</span> Gender</label>
                                                            <input type="text" className="form-control" name="gender" id="gender" placeholder="Gender" value={campaign.gender} onChange={this.handleCampaignChange} />
                                                            {
                                                                submitted && !campaign.gender &&
                                                                <div className="help-block text-dander">Gender is required</div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="position-relative form-group">
                                                            <label htmlFor="pass" className="">
                                                                <span className="text-danger">*</span> Budget</label>
                                                            <input type="text" className="form-control" name="budget" id="budget" placeholder="Budget" value={campaign.budget} onChange={this.handleCampaignChange} />
                                                            {
                                                                submitted && !campaign.budget &&
                                                                <div className="help-block text-danger">Budget is required</div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-4 d-flex align-items-center">
                                                    <div className="ml-auto">
                                                        <input type="submit" name="nextStep" id="nextStep" className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-lg" value="Next Step" />
                                                        {/* <Link to="/login" className="btn btn-link">Cancel</Link> */}
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
                        }
                        {
                            isInfluencerStep &&
                            <div className="h-100 no-gutters row">
                                <div className="d-lg-flex d-xs-none col-lg-12">
                                    <div className="form-row">
                                        {
                                            influencers.items && influencers.items.influencer.map((item, key) => {
                                                debugger;
                                                var configContent = require('configContent')
                                                return (
                                                    <div key={key} className="col-sm-4">
                                                        <div className="team-member">
                                                            <img className="mx-auto rounded-circle" src={imgSrc} alt="" />
                                                            <h6>{item.displayText}</h6>
                                                            <p>{item.description}</p>
                                                            <div key={key} className="row">
                                                                <p className='col-sm-5'>{item.ageDemorgraphic ? item.ageDemorgraphic.ageGraphicsName : ''}</p>
                                                                <p className='col-sm-2'>{item.ageDemorgraphic ? item.ageDemorgraphic.agePercentage : ''}</p>
                                                                <p className='col-sm-3'>{item.genderDemorgraphic ? item.genderDemorgraphic.genderGraphicsName : ''}</p>
                                                                <p className='col-sm-2'>{item.genderDemorgraphic ? item.genderDemorgraphic.genderPercentage : ''}</p>
                                                                <p className='col-sm-8'>{item.geoDemorgraphic ? item.geoDemorgraphic.geoGraphicName : ''}</p>
                                                                <p className='col-sm-4'>{item.geoDemorgraphic ? item.geoDemorgraphic.geoPercentage : ''}</p>
                                                                <p className='col-sm-8'>Share Link</p>
                                                                <p className='col-sm-4'>{item.shareLink ? item.shareLink : ''}</p>
                                                                <p className='col-sm-8'>Post Image</p>
                                                                <p className='col-sm-4'>{item.postImage ? item.postImage : ''}</p>
                                                                <p className='col-sm-8'>Live Stream</p>
                                                                <p className='col-sm-4'>{item.liveStream ? item.liveStream : ''}</p>
                                                                <p className='col-sm-4'>Check In</p>
                                                                <p className='col-sm-3'>{item.checkIn ? item.checkIn : ''}</p>
                                                                <p className='col-sm-2'>Video</p>
                                                                <p className='col-sm-3'>{item.video ? item.video : ''}</p>
                                                            </div>
                                                            <div className="form-group">
                                                                <input onChange={this.handleCheckBoxChange}
                                                                    id={item.contentItemId}
                                                                    checked={this.state.checkedInfluencers.get(item.contentItemId) ? this.state.checkedInfluencers.get(item.contentItemId) : false}
                                                                    type="checkbox"
                                                                    name={item.contentItemId}
                                                                    className="agree-term"
                                                                />
                                                                <label htmlFor={item.contentItemId} className="label-agree-term"><span><span></span></span>Select</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )

                                            })
                                        }
                                        <div className="mt-4 d-flex align-items-center">
                                            <div className="ml-auto">
                                                {/* <input type="submit" name="nextStep" id="nextStep" className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-lg" value="Next Step" /> */}
                                                <input type="button" onClick={this.handleBackStep} name="backinf" id="backinf" className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-lg" value="Back" />
                                                <input type="button" onClick={this.handleJobStep} name="job" id="job" className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-lg" value="Last Step" />

                                                {/* <Link to="/login" className="btn btn-link">Cancel</Link> */}
                                                {/* <Link to="/login" className="btn btn-link">Cancel</Link> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            isJobStep &&
                            <div className="h-100 no-gutters row">
                                <div className="h-100 d-md-flex d-sm-block bg-white justify-content-center align-items-center col-md-12 col-lg-8">
                                    <div className="mx-auto app-login-box col-sm-12 col-md-10 col-lg-9">
                                        <div>
                                            <form className="" onSubmit={this.handleSubmitJobs} id="register-form">
                                                <div className="form-row">
                                                    <div className="col-md-5">
                                                        <div className="position-relative form-group">
                                                            <label htmlFor="jobName" className="">
                                                                <span className="text-danger">*</span> Job Name</label>
                                                            <input type="text" name="jobName" id="jobName" placeholder="Job Name" value={job.jobName} onChange={this.handleJobChange} className="form-control" />
                                                            {
                                                                submitted && !job.jobName &&
                                                                <div className="help-block text-danger">Job Name is required</div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-7">
                                                        <div className="position-relative form-group">
                                                            <label htmlFor="name" className="">
                                                                <span className="text-danger">*</span> Job Description</label>
                                                            <input type="text" className="form-control" name="jobDescription" id="jobDescription" placeholder="Job Description" value={campaign.jobDescription} onChange={this.handleJobChange} />
                                                            {
                                                                submitted && !job.jobDescription &&
                                                                <div className="help-block text-danger">Job Description is required</div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <div className="position-relative form-group">
                                                            <label htmlFor="jobCategory" className="">
                                                                <span className="text-danger">*</span> Job</label>
                                                            <Select
                                                                value={selectedOptionJobCategory}
                                                                onChange={this.handleOptionJobCategoryChange}
                                                                isMulti
                                                                placeholder="Job..."
                                                                options={jobs}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="position-relative form-group">
                                                            <label htmlFor="jobHashTag" className="">
                                                                <span></span> Job HashTag</label>
                                                            <input type="text" className="form-control" name="jobHashTag" id="jobHashTag" placeholder="Job HashTag" value={job.jobHashTag} onChange={this.handleJobChange} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="position-relative form-group">
                                                            <label htmlFor="jobKeyword" className="">
                                                                <span></span> Job Keyword</label>
                                                            <input type="text" className="form-control" name="jobKeyword" id="jobKeyword" placeholder="Job Keyword" value={job.jobKeyword} onChange={this.handleJobChange} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-4 d-flex align-items-center">
                                                    <div className="ml-auto">
                                                        <input type="submit" name="register" id="register" className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-lg" value="Register" />
                                                        {
                                                            campaigns.loading &&
                                                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                                        }
                                                        <input type="button" onClick={this.handleBackStep} name="backinf" id="backinf" className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-lg" value="Back" />
                                                        {/* <Link to="/login" className="btn btn-link">Cancel</Link> */}
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
                        }
                    </div>
                </div>
            </div>
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