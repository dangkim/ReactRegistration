import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import city2 from '../assets/images/dropdown-header/city2.jpg';
import city3 from '../assets/images/dropdown-header/city3.jpg';
import city5 from '../assets/images/dropdown-header/city5.jpg';
import abstract2 from '../assets/images/dropdown-header/abstract2.jpg';
import abstract3 from '../assets/images/dropdown-header/abstract3.jpg';
import abstract4 from '../assets/images/dropdown-header/abstract4.jpg';
import avatar1 from '../assets/images/avatars/1.jpg';
import avatar2 from '../assets/images/avatars/2.jpg';
import avatar3 from '../assets/images/avatars/3.jpg';
import avatar4 from '../assets/images/avatars/4.jpg';
import avatar5 from '../assets/images/avatars/5.jpg';
import avatar6 from '../assets/images/avatars/6.jpg';
import avatar7 from '../assets/images/avatars/7.jpg';
import avatar8 from '../assets/images/avatars/8.jpg';
import avatar9 from '../assets/images/avatars/9.jpg';
import avatar10 from '../assets/images/avatars/10.jpg';
import avatar11 from '../assets/images/avatars/11.jpg';
import avatar12 from '../assets/images/avatars/12.jpg';
//import { campaignActions } from '../_actions';
import { campaignActions, infActions, brandActions } from '../_actions';
//import Select from 'react-select';
import { createJobs } from '../_models/JobType';
//import {configContent} from 'configContent';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-bootstrap4';
import { history } from '../_helpers';

class LeftMenuPage extends Component {

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

        // const { influencers, brands, campaigns, locations, interestings, jobCategories} = this.props;
        // const { submitted,
        //     campaign,
        //     job,
        //     selectedOptionLocation,
        //     selectedOptionInteresting,
        //     selectedOptionJobCategory,
        //     isFormStep,
        //     isInfluencerStep,
        //     isJobStep,
        //     checkedInfluencers  } = this.state;

        // var localJobCategories = [
        // ];

        // if(jobCategories.jobCategories)
        // {
        //     jobCategories.jobCategories.map((item, key) => 
        //     {                
        //         const jobCategory = {value: item, label: item.description};
        //         localJobCategories.push(jobCategory);
        //     })
        // }

        return (
            <div className="app-sidebar sidebar-shadow">
                <div className="app-header__logo">
                    <div className="logo-src"></div>
                    <div className="header__pane ml-auto">
                        <div>
                            <button type="button" className="hamburger close-sidebar-btn hamburger--elastic" data-classname="closed-sidebar">
                                <span className="hamburger-box">
                                    <span className="hamburger-inner"></span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="app-header__mobile-menu">
                    <div>
                        <button type="button" className="hamburger hamburger--elastic mobile-toggle-nav">
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </button>
                    </div>
                </div>
                <div className="app-header__menu">
                    <span>
                        <button type="button" className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav">
                            <span className="btn-icon-wrapper">
                                <i className="fa fa-ellipsis-v fa-w-6"></i>
                            </span>
                        </button>
                    </span>
                </div>
                <div className="scrollbar-sidebar">
                    <div className="app-sidebar__inner">
                        <ul className="vertical-nav-menu">
                            <li className="app-sidebar__heading">Menu</li>
                            <li className="mm-active">
                                <a href="#">
                                    <i className="metismenu-icon pe-7s-rocket"></i>
                                    Dashboards
                                        <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                                </a>
                                <ul className="mm-show" >
                                    <li>
                                        <Link to="/DashBoardPage" className="mm-active">
                                            <i className="metismenu-icon"></i>
                                            CRM
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="metismenu-icon pe-7s-browser"></i>
                                    Pages
                                        <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                                </a>
                                <ul>
                                    <li>
                                        {/* <a href="pages-forgot-password-boxed.html">
                                                <i className="metismenu-icon">
                                                </i>Update Cost
                                            </a> */}
                                        <Link to="/InfluencerUpdateCostPage" className="metismenu-icon">Update Cost</Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="metismenu-icon pe-7s-plugin"></i>
                                    Applications
                                        <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                                </a>
                                {/* <ul className="mm-show" >
                                        <li>
                                            <a href="dashboards-crm.html" className="mm-active">
                                                <i className="metismenu-icon"></i>
                                                CRM
                                            </a>
                                        </li>
                                    </ul> */}
                            </li>
                        </ul>
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

const connectedLeftMenuPage = connect(mapStateToProps)(LeftMenuPage);
export { connectedLeftMenuPage as LeftMenuPage };