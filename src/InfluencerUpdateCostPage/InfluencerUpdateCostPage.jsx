import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import img from '../assets/images/hand.jpg'
//import { campaignActions } from '../_actions';
import { campaignActions, infActions, brandActions } from '../_actions';
//import Select from 'react-select';
import { createJobs } from '../_models/JobType';
//import {configContent} from 'configContent';

import { history } from '../_helpers';

class InfluencerUpdateCostPage extends Component {

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
            isFormStep: true,
            isInfluencerStep: false,
            isJobStep: false,
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

    // componentDidMount() {
    //     const { dispatch } = this.props;
    //     if(this.props.location.state)
    //     {
    //         const { brand } = this.props.location.state;
    //         dispatch(brandActions.getBrandFromBrandPage(brand));
    //         //dispatch(campaignActions.getAll());
    //         dispatch(infActions.getAll());
    //         dispatch(campaignActions.getAllLocation());
    //         dispatch(campaignActions.getAllInteresting());
    //         dispatch(infActions.getAllJobCategories());
    //     }
    //     else
    //     {
    //         history.push('/registerBrandPage');
    //     }

    // }

    // handleDeletecampaign(id) {
    //     return (e) => this.props.dispatch(campaignActions.delete(id));
    // }

    render() {

        const { influencers, brands, campaigns, locations, interestings, jobCategories } = this.props;
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

        var localJobCategories = [
        ];

        if (jobCategories.jobCategories) {
            jobCategories.jobCategories.map((item, key) => {
                const jobCategory = { value: item, label: item.description };
                localJobCategories.push(jobCategory);
            })
        }

        return (
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <div className="app-page-title">
                        <div className="page-title-wrapper">
                            <div className="page-title-heading">
                                <div className="page-title-icon">
                                    <i className="lnr-picture text-danger">
                                    </i>
                                </div>
                                <div>Form Validation
                                    <div className="page-title-subheading">Inline validation is very easy to implement using the Architect Framework.
                                    </div>
                                </div>
                            </div>
                            <div className="page-title-actions">
                                <button type="button" data-toggle="tooltip" title="Example Tooltip" data-placement="bottom" className="btn-shadow mr-3 btn btn-dark">
                                    <i className="fa fa-star"></i>
                                </button>
                                <div className="d-inline-block dropdown">
                                    <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="btn-shadow dropdown-toggle btn btn-info">
                                        <span className="btn-icon-wrapper pr-2 opacity-7">
                                            <i className="fa fa-business-time fa-w-20"></i>
                                        </span>
                                        Buttons
                                    </button>
                                    <div tabIndex="-1" role="menu" aria-hidden="true" className="dropdown-menu dropdown-menu-right">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <a className="nav-link">
                                                    <i className="nav-link-icon lnr-inbox"></i>
                                                    <span>
                                                        Inbox
                                                    </span>
                                                    <div className="ml-auto badge badge-pill badge-secondary">86</div>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link">
                                                    <i className="nav-link-icon lnr-book"></i>
                                                    <span>
                                                        Book
                                                    </span>
                                                    <div className="ml-auto badge badge-pill badge-danger">5</div>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link">
                                                    <i className="nav-link-icon lnr-picture"></i>
                                                    <span>
                                                        Picture
                                                    </span>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a disabled className="nav-link disabled">
                                                    <i className="nav-link-icon lnr-file-empty"></i>
                                                    <span>
                                                        File Disabled
                                                    </span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>    </div>
                    </div>
                    <div className="main-card mb-3 card">
                        <div className="card-body">
                            <h5 className="card-title">Bootstrap 4 Form Validation</h5>
                            <form id="signupForm" className="col-md-10 mx-auto" method="post" action="">
                                <div className="form-group">
                                    <label htmlFor="firstname">First name</label>
                                    <div>
                                        <input type="text" className="form-control" id="firstname" name="firstname" placeholder="First name" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="lastname">Last name</label>
                                    <div>
                                        <input type="text" className="form-control" id="lastname" name="lastname" placeholder="Last name" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <div>
                                        <input type="text" className="form-control" id="username" name="username" placeholder="Username" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <div>
                                        <input type="text" className="form-control" id="email" name="email" placeholder="Email" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="confirm_password">Confirm password</label>
                                    <div>
                                        <input type="password" className="form-control" id="confirm_password" name="confirm_password" placeholder="Confirm password" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div>
                                        <div className="form-check">
                                            <input type="checkbox" id="agree" name="agree" value="agree" className="form-check-input" />
                                            <label className="form-check-label">Please agree to our policy</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary" name="signup" value="Sign up">Sign up</button>
                                </div>
                            </form>
                        </div>
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

const connectedInfluencerUpdateCostPage = connect(mapStateToProps)(InfluencerUpdateCostPage);
export { connectedInfluencerUpdateCostPage as InfluencerUpdateCostPage };