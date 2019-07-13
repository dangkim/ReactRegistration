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
import {createJobs} from '../_models/JobType';
//import {configContent} from 'configContent';

import { history } from '../_helpers';

class DashBoardPage extends Component {

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
            <div className="app-container app-theme-white body-tabs-shadow fixed-header fixed-sidebar">
    <div className="app-header header-shadow">
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
        </div>    <div className="app-header__content">
            <div className="app-header-left">
                <div className="search-wrapper">
                    <div className="input-holder">
                        <input type="text" className="search-input" placeholder="Type to search"/>
                        <button className="search-icon"><span></span></button>
                    </div>
                    <button className="close"></button>
                </div>
                <ul className="header-megamenu nav">
                    <li className="nav-item">
                        <a href="javascript:void(0);" data-placement="bottom" rel="popover-focus" data-offset="300" data-toggle="popover-custom" className="nav-link">
                            <i className="nav-link-icon pe-7s-gift"> </i>
                            Mega Menu
                            <i className="fa fa-angle-down ml-2 opacity-5"></i>
                        </a>
                        <div className="rm-max-width">
                            <div className="d-none popover-custom-content">
                                <div className="dropdown-mega-menu">
                                    <div className="grid-menu grid-menu-3col">
                                        <div className="no-gutters row">
                                            <div className="col-sm-6 col-xl-4">
                                                <ul className="nav flex-column">
                                                    <li className="nav-item-header nav-item">
                                                        Overview
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="javascript:void(0);" className="nav-link">
                                                            <i className="nav-link-icon lnr-inbox">
                                                            </i>
                                                            <span>
                                                                Contacts
                                                            </span>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="javascript:void(0);" className="nav-link">
                                                            <i className="nav-link-icon lnr-book">
                                                            </i>
                                                            <span>
                                                                Incidents
                                                            </span>
                                                            <div className="ml-auto badge badge-pill badge-danger">5
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="javascript:void(0);" className="nav-link">
                                                            <i className="nav-link-icon lnr-picture">
                                                            </i>
                                                            <span>
                                                                Companies
                                                            </span>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a disabled="" href="javascript:void(0);" className="nav-link disabled">
                                                            <i className="nav-link-icon lnr-file-empty">
                                                            </i>
                                                            <span>
                                                                Dashboards
                                                            </span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-sm-6 col-xl-4">
                                                <ul className="nav flex-column">
                                                    <li className="nav-item-header nav-item">
                                                        Favourites
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="javascript:void(0);" className="nav-link">
                                                            Reports Conversions
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="javascript:void(0);" className="nav-link">
                                                            Quick Start
                                                            <div className="ml-auto badge badge-success">New</div>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="javascript:void(0);" className="nav-link">Users &amp; Groups</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="javascript:void(0);" className="nav-link">Proprieties</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-sm-6 col-xl-4">
                                                <ul className="nav flex-column">
                                                    <li className="nav-item-header nav-item">Sales &amp; Marketing
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="javascript:void(0);" className="nav-link">Queues
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="javascript:void(0);" className="nav-link">Resource Groups
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="javascript:void(0);" className="nav-link">Goal Metrics
                                                            <div className="ml-auto badge badge-warning">3
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="javascript:void(0);" className="nav-link">Campaigns
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="btn-group nav-item">
                        <a  className="nav-link" data-toggle="dropdown" aria-expanded="false">
                            <span className="badge badge-pill badge-danger ml-0 mr-2">4</span>
                            Settings
                            <i className="fa fa-angle-down ml-2 opacity-5"></i>
                        </a>
                        <div tabIndex="-1" role="menu" aria-hidden="true" className="rm-pointers dropdown-menu">
                            <div className="dropdown-menu-header">
                                <div className="dropdown-menu-header-inner bg-secondary">
                                    <div className="menu-header-image opacity-5" style={{backgroundImage: `url(${abstract2})`}}></div>
                                    <div className="menu-header-content">
                                        <h5 className="menu-header-title">Overview</h5>
                                        <h6 className="menu-header-subtitle">Dropdown menus for everyone</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="scroll-area-xs">
                                <div className="scrollbar-container">
                                    <h6 tabIndex="-1" className="dropdown-header">Key Figures</h6>
                                    <button type="button" tabIndex="0" className="dropdown-item">Service Calendar</button>
                                    <button type="button" tabIndex="0" className="dropdown-item">Knowledge Base</button>
                                    <button type="button" tabIndex="0" className="dropdown-item">Accounts</button>
                                    <div tabIndex="-1" className="dropdown-divider"></div>
                                    <button type="button" tabIndex="0" className="dropdown-item">Products</button>
                                    <button type="button" tabIndex="0" className="dropdown-item">Rollup Queries</button>
                                </div>
                            </div>
                            <ul className="nav flex-column">
                                <li className="nav-item-divider nav-item"></li>
                                <li className="nav-item-btn nav-item">
                                    <button className="btn-wide btn-shadow btn btn-danger btn-sm">Cancel</button>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="dropdown nav-item">
                        <a aria-haspopup="true"  data-toggle="dropdown" className="nav-link" aria-expanded="false">
                            <i className="nav-link-icon pe-7s-settings"></i>
                            Projects
                            <i className="fa fa-angle-down ml-2 opacity-5"></i>
                        </a>
                        <div tabIndex="-1" role="menu" aria-hidden="true" className="dropdown-menu-rounded dropdown-menu-lg rm-pointers dropdown-menu">
                            <div className="dropdown-menu-header">
                                <div className="dropdown-menu-header-inner bg-success">
                                    <div className="menu-header-image opacity-1" style={{backgroundImage: `url(${abstract3})`}}></div>
                                    <div className="menu-header-content text-left">
                                        <h5 className="menu-header-title">Overview</h5>
                                        <h6 className="menu-header-subtitle">Unlimited options</h6>
                                        <div className="menu-header-btn-pane">
                                            <button className="mr-2 btn btn-dark btn-sm">Settings</button>
                                            <button className="btn-icon btn-icon-only btn btn-warning btn-sm">
                                                <i className="pe-7s-config btn-icon-wrapper"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="button" tabIndex="0" className="dropdown-item"><i className="dropdown-icon lnr-file-empty"> </i>Graphic Design</button>
                            <button type="button" tabIndex="0" className="dropdown-item"><i className="dropdown-icon lnr-file-empty"> </i>App Development</button>
                            <button type="button" tabIndex="0" className="dropdown-item"><i className="dropdown-icon lnr-file-empty"> </i>Icon Design</button>
                            <div tabIndex="-1" className="dropdown-divider"></div>
                            <button type="button" tabIndex="0" className="dropdown-item"><i className="dropdown-icon lnr-file-empty"> </i>Miscellaneous</button>
                            <button type="button" tabIndex="0" className="dropdown-item"><i className="dropdown-icon lnr-file-empty"> </i>Frontend Dev</button>
                        </div>
                    </li>
                </ul>        </div>
            <div className="app-header-right">
                <div className="header-dots">
                    <div className="dropdown">
                        <button type="button" aria-haspopup="true" aria-expanded="false" data-toggle="dropdown" className="p-0 mr-2 btn btn-link">
                            <span className="icon-wrapper icon-wrapper-alt rounded-circle">
                                <span className="icon-wrapper-bg bg-primary"></span>
                                <i className="icon text-primary ion-android-apps"></i>
                            </span>
                        </button>
                        <div tabIndex="-1" role="menu" aria-hidden="true" className="dropdown-menu-xl rm-pointers dropdown-menu dropdown-menu-right">
                            <div className="dropdown-menu-header">
                                <div className="dropdown-menu-header-inner bg-plum-plate">
                                    <div className="menu-header-image" style={{backgroundImage: `url(${abstract4})`}}></div>
                                    <div className="menu-header-content text-white">
                                        <h5 className="menu-header-title">Grid Dashboard</h5>
                                        <h6 className="menu-header-subtitle">Easy grid navigation inside dropdowns</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="grid-menu grid-menu-xl grid-menu-3col">
                                <div className="no-gutters row">
                                    <div className="col-sm-6 col-xl-4">
                                        <button className="btn-icon-vertical btn-square btn-transition btn btn-outline-link">
                                            <i className="pe-7s-world icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3"></i>
                                            Automation
                                        </button>
                                    </div>
                                    <div className="col-sm-6 col-xl-4">
                                        <button className="btn-icon-vertical btn-square btn-transition btn btn-outline-link">
                                            <i className="pe-7s-piggy icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3"> </i>
                                            Reports
                                        </button>
                                    </div>
                                    <div className="col-sm-6 col-xl-4">
                                        <button className="btn-icon-vertical btn-square btn-transition btn btn-outline-link">
                                            <i className="pe-7s-config icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3"> </i>
                                            Settings
                                        </button>
                                    </div>
                                    <div className="col-sm-6 col-xl-4">
                                        <button className="btn-icon-vertical btn-square btn-transition btn btn-outline-link">
                                            <i className="pe-7s-browser icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3"> </i>
                                            Content
                                        </button>
                                    </div>
                                    <div className="col-sm-6 col-xl-4">
                                        <button className="btn-icon-vertical btn-square btn-transition btn btn-outline-link">
                                            <i className="pe-7s-hourglass icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3"> </i>
                                            Activity
                                        </button>
                                    </div>
                                    <div className="col-sm-6 col-xl-4">
                                        <button className="btn-icon-vertical btn-square btn-transition btn btn-outline-link">
                                            <i className="pe-7s-world icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3"> </i>
                                            Contacts
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <ul className="nav flex-column">
                                <li className="nav-item-divider nav-item"></li>
                                <li className="nav-item-btn text-center nav-item">
                                    <button className="btn-shadow btn btn-primary btn-sm">Follow-ups</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button type="button" aria-haspopup="true" aria-expanded="false" data-toggle="dropdown" className="p-0 mr-2 btn btn-link">
                            <span className="icon-wrapper icon-wrapper-alt rounded-circle">
                                <span className="icon-wrapper-bg bg-danger"></span>
                                <i className="icon text-danger icon-anim-pulse ion-android-notifications"></i>
                                <span className="badge badge-dot badge-dot-sm badge-danger">Notifications</span>
                            </span>
                        </button>
                        <div tabIndex="-1" role="menu" aria-hidden="true" className="dropdown-menu-xl rm-pointers dropdown-menu dropdown-menu-right">
                            <div className="dropdown-menu-header mb-0">
                                <div className="dropdown-menu-header-inner bg-deep-blue">
                                    <div className="menu-header-image opacity-1" style={{backgroundImage: `url(${city3})`}}></div>
                                    <div className="menu-header-content text-dark">
                                        <h5 className="menu-header-title">Notifications</h5>
                                        <h6 className="menu-header-subtitle">You have <b>21</b> unread messages</h6>
                                    </div>
                                </div>
                            </div>
                            <ul className="tabs-animated-shadow tabs-animated nav nav-justified tabs-shadow-bordered p-3">
                                <li className="nav-item">
                                    <a role="tab" className="nav-link active" data-toggle="tab" href="#tab-messages-header">
                                        <span>Messages</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a role="tab" className="nav-link" data-toggle="tab" href="#tab-events-header">
                                        <span>Events</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a role="tab" className="nav-link" data-toggle="tab" href="#tab-errors-header">
                                        <span>System Errors</span>
                                    </a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div className="tab-pane active" id="tab-messages-header" role="tabpanel">
                                    <div className="scroll-area-sm">
                                        <div className="scrollbar-container">
                                            <div className="p-3">
                                                <div className="notifications-box">
                                                    <div className="vertical-time-simple vertical-without-time vertical-timeline vertical-timeline--one-column">
                                                        <div className="vertical-timeline-item dot-danger vertical-timeline-element">
                                                            <div><span className="vertical-timeline-element-icon bounce-in"></span>
                                                                <div className="vertical-timeline-element-content bounce-in"><h4 className="timeline-title">All Hands Meeting</h4><span className="vertical-timeline-element-date"></span></div>
                                                            </div>
                                                        </div>
                                                        <div className="vertical-timeline-item dot-warning vertical-timeline-element">
                                                            <div><span className="vertical-timeline-element-icon bounce-in"></span>
                                                                <div className="vertical-timeline-element-content bounce-in"><p>Yet another one, at <span className="text-success">15:00 PM</span></p><span className="vertical-timeline-element-date"></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="vertical-timeline-item dot-success vertical-timeline-element">
                                                            <div><span className="vertical-timeline-element-icon bounce-in"></span>
                                                                <div className="vertical-timeline-element-content bounce-in">
                                                                    <h4 className="timeline-title">Build the production release
                                                                        <span className="badge badge-danger ml-2">NEW</span>
                                                                    </h4>
                                                                    <span className="vertical-timeline-element-date"></span></div>
                                                            </div>
                                                        </div>
                                                        <div className="vertical-timeline-item dot-primary vertical-timeline-element">
                                                            <div><span className="vertical-timeline-element-icon bounce-in"></span>
                                                                <div className="vertical-timeline-element-content bounce-in">
                                                                    <h4 className="timeline-title">Something not important
                                                                        <div className="avatar-wrapper mt-2 avatar-wrapper-overlap">
                                                                            <div className="avatar-icon-wrapper avatar-icon-sm">
                                                                                <div className="avatar-icon"><img
                                                                                        src={avatar1}
                                                                                        alt=""/></div>
                                                                            </div>
                                                                            <div className="avatar-icon-wrapper avatar-icon-sm">
                                                                                <div className="avatar-icon"><img
                                                                                        src={avatar2}
                                                                                        alt=""/></div>
                                                                            </div>
                                                                            <div className="avatar-icon-wrapper avatar-icon-sm">
                                                                                <div className="avatar-icon"><img
                                                                                        src={avatar3}
                                                                                        alt=""/></div>
                                                                            </div>
                                                                            <div className="avatar-icon-wrapper avatar-icon-sm">
                                                                                <div className="avatar-icon"><img
                                                                                        src={avatar4}
                                                                                        alt=""/></div>
                                                                            </div>
                                                                            <div className="avatar-icon-wrapper avatar-icon-sm">
                                                                                <div className="avatar-icon"><img
                                                                                        src={avatar5}
                                                                                        alt=""/></div>
                                                                            </div>
                                                                            <div className="avatar-icon-wrapper avatar-icon-sm">
                                                                                <div className="avatar-icon"><img
                                                                                        src={avatar9}
                                                                                        alt=""/></div>
                                                                            </div>
                                                                            <div className="avatar-icon-wrapper avatar-icon-sm">
                                                                                <div className="avatar-icon"><img
                                                                                        src={avatar7}
                                                                                        alt=""/></div>
                                                                            </div>
                                                                            <div className="avatar-icon-wrapper avatar-icon-sm">
                                                                                <div className="avatar-icon"><img
                                                                                        src={avatar8}
                                                                                        alt=""/></div>
                                                                            </div>
                                                                            <div className="avatar-icon-wrapper avatar-icon-sm avatar-icon-add">
                                                                                <div className="avatar-icon"><i>+</i></div>
                                                                            </div>
                                                                        </div>
                                                                    </h4>
                                                                    <span className="vertical-timeline-element-date"></span></div>
                                                            </div>
                                                        </div>
                                                        <div className="vertical-timeline-item dot-info vertical-timeline-element">
                                                            <div><span className="vertical-timeline-element-icon bounce-in"></span>
                                                                <div className="vertical-timeline-element-content bounce-in"><h4 className="timeline-title">This dot has an info state</h4><span className="vertical-timeline-element-date"></span></div>
                                                            </div>
                                                        </div>
                                                        <div className="vertical-timeline-item dot-danger vertical-timeline-element">
                                                            <div><span className="vertical-timeline-element-icon bounce-in"></span>
                                                                <div className="vertical-timeline-element-content bounce-in"><h4 className="timeline-title">All Hands Meeting</h4><span className="vertical-timeline-element-date"></span></div>
                                                            </div>
                                                        </div>
                                                        <div className="vertical-timeline-item dot-warning vertical-timeline-element">
                                                            <div><span className="vertical-timeline-element-icon bounce-in"></span>
                                                                <div className="vertical-timeline-element-content bounce-in"><p>Yet another one, at <span className="text-success">15:00 PM</span></p><span className="vertical-timeline-element-date"></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="vertical-timeline-item dot-success vertical-timeline-element">
                                                            <div><span className="vertical-timeline-element-icon bounce-in"></span>
                                                                <div className="vertical-timeline-element-content bounce-in">
                                                                    <h4 className="timeline-title">Build the production release
                                                                        <span className="badge badge-danger ml-2">NEW</span>
                                                                    </h4>
                                                                    <span className="vertical-timeline-element-date"></span></div>
                                                            </div>
                                                        </div>
                                                        <div className="vertical-timeline-item dot-dark vertical-timeline-element">
                                                            <div><span className="vertical-timeline-element-icon bounce-in"></span>
                                                                <div className="vertical-timeline-element-content bounce-in"><h4 className="timeline-title">This dot has a dark state</h4><span className="vertical-timeline-element-date"></span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane" id="tab-events-header" role="tabpanel">
                                    <div className="scroll-area-sm">
                                        <div className="scrollbar-container">
                                            <div className="p-3">
                                                <div className="vertical-without-time vertical-timeline vertical-timeline--animate vertical-timeline--one-column">
                                                    <div className="vertical-timeline-item vertical-timeline-element">
                                                        <div><span className="vertical-timeline-element-icon bounce-in"><i className="badge badge-dot badge-dot-xl badge-success"> </i></span>
                                                            <div className="vertical-timeline-element-content bounce-in"><h4 className="timeline-title">All Hands Meeting</h4>
                                                                <p>Lorem ipsum dolor sic amet, today at <a href="javascript:void(0);">12:00 PM</a></p><span className="vertical-timeline-element-date"></span></div>
                                                        </div>
                                                    </div>
                                                    <div className="vertical-timeline-item vertical-timeline-element">
                                                        <div><span className="vertical-timeline-element-icon bounce-in"><i className="badge badge-dot badge-dot-xl badge-warning"> </i></span>
                                                            <div className="vertical-timeline-element-content bounce-in"><p>Another meeting today, at <b className="text-danger">12:00 PM</b></p>
                                                                <p>Yet another one, at <span className="text-success">15:00 PM</span></p><span className="vertical-timeline-element-date"></span></div>
                                                        </div>
                                                    </div>
                                                    <div className="vertical-timeline-item vertical-timeline-element">
                                                        <div><span className="vertical-timeline-element-icon bounce-in"><i className="badge badge-dot badge-dot-xl badge-danger"> </i></span>
                                                            <div className="vertical-timeline-element-content bounce-in"><h4 className="timeline-title">Build the production release</h4>
                                                                <p>Lorem ipsum dolor sit amit,consectetur eiusmdd tempor incididunt ut labore et dolore magna elit enim at minim veniam quis nostrud</p><span
                                                                        className="vertical-timeline-element-date"></span></div>
                                                        </div>
                                                    </div>
                                                    <div className="vertical-timeline-item vertical-timeline-element">
                                                        <div><span className="vertical-timeline-element-icon bounce-in"><i className="badge badge-dot badge-dot-xl badge-primary"> </i></span>
                                                            <div className="vertical-timeline-element-content bounce-in"><h4 className="timeline-title text-success">Something not important</h4>
                                                                <p>Lorem ipsum dolor sit amit,consectetur elit enim at minim veniam quis nostrud</p><span className="vertical-timeline-element-date"></span></div>
                                                        </div>
                                                    </div>
                                                    <div className="vertical-timeline-item vertical-timeline-element">
                                                        <div><span className="vertical-timeline-element-icon bounce-in"><i className="badge badge-dot badge-dot-xl badge-success"> </i></span>
                                                            <div className="vertical-timeline-element-content bounce-in"><h4 className="timeline-title">All Hands Meeting</h4>
                                                                <p>Lorem ipsum dolor sic amet, today at <a href="javascript:void(0);">12:00 PM</a></p><span className="vertical-timeline-element-date"></span></div>
                                                        </div>
                                                    </div>
                                                    <div className="vertical-timeline-item vertical-timeline-element">
                                                        <div><span className="vertical-timeline-element-icon bounce-in"><i className="badge badge-dot badge-dot-xl badge-warning"> </i></span>
                                                            <div className="vertical-timeline-element-content bounce-in"><p>Another meeting today, at <b className="text-danger">12:00 PM</b></p>
                                                                <p>Yet another one, at <span className="text-success">15:00 PM</span></p><span className="vertical-timeline-element-date"></span></div>
                                                        </div>
                                                    </div>
                                                    <div className="vertical-timeline-item vertical-timeline-element">
                                                        <div><span className="vertical-timeline-element-icon bounce-in"><i className="badge badge-dot badge-dot-xl badge-danger"> </i></span>
                                                            <div className="vertical-timeline-element-content bounce-in"><h4 className="timeline-title">Build the production release</h4>
                                                                <p>Lorem ipsum dolor sit amit,consectetur eiusmdd tempor incididunt ut labore et dolore magna elit enim at minim veniam quis nostrud</p><span
                                                                        className="vertical-timeline-element-date"></span></div>
                                                        </div>
                                                    </div>
                                                    <div className="vertical-timeline-item vertical-timeline-element">
                                                        <div><span className="vertical-timeline-element-icon bounce-in"><i className="badge badge-dot badge-dot-xl badge-primary"> </i></span>
                                                            <div className="vertical-timeline-element-content bounce-in"><h4 className="timeline-title text-success">Something not important</h4>
                                                                <p>Lorem ipsum dolor sit amit,consectetur elit enim at minim veniam quis nostrud</p><span className="vertical-timeline-element-date"></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane" id="tab-errors-header" role="tabpanel">
                                    <div className="scroll-area-sm">
                                        <div className="scrollbar-container">
                                            <div className="no-results pt-3 pb-0">
                                                <div className="swal2-icon swal2-success swal2-animate-success-icon">
                                                    <div className="swal2-success-circular-line-left" style={{backgroundColor:'rgb(255, 255, 255)'}}></div>
                                                    <span className="swal2-success-line-tip"></span>
                                                    <span className="swal2-success-line-long"></span>
                                                    <div className="swal2-success-ring"></div>
                                                    <div className="swal2-success-fix" style={{backgroundColor:'rgb(255, 255, 255)'}}></div>
                                                    <div className="swal2-success-circular-line-right" style={{backgroundColor:'rgb(255, 255, 255)'}}></div>
                                                </div>
                                                <div className="results-subtitle">All caught up!</div>
                                                <div className="results-title">There are no system errors!</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ul className="nav flex-column">
                                <li className="nav-item-divider nav-item"></li>
                                <li className="nav-item-btn text-center nav-item">
                                    <button className="btn-shadow btn-wide btn-pill btn btn-focus btn-sm">View Latest Changes</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button type="button" data-toggle="dropdown" className="p-0 mr-2 btn btn-link">
                            <span className="icon-wrapper icon-wrapper-alt rounded-circle">
                                <span className="icon-wrapper-bg bg-focus"></span>
                                <span className="language-icon opacity-8 flag large DE"></span>
                            </span>
                        </button>
                        <div tabIndex="-1" role="menu" aria-hidden="true" className="rm-pointers dropdown-menu dropdown-menu-right">
                            <div className="dropdown-menu-header">
                                <div className="dropdown-menu-header-inner pt-4 pb-4 bg-focus">
                                    <div className="menu-header-image opacity-05" style={{backgroundImage: `url(${city2})`}}></div>
                                    <div className="menu-header-content text-center text-white">
                                        <h6 className="menu-header-subtitle mt-0">
                                            Choose Language
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <h6 tabIndex="-1" className="dropdown-header">
                                Popular Languages
                            </h6>
                            <button type="button" tabIndex="0" className="dropdown-item">
                                <span className="mr-3 opacity-8 flag large US"></span>
                                USA
                            </button>
                            <button type="button" tabIndex="0" className="dropdown-item">
                                <span className="mr-3 opacity-8 flag large CH"></span>
                                Switzerland
                            </button>
                            <button type="button" tabIndex="0" className="dropdown-item">
                                <span className="mr-3 opacity-8 flag large FR"></span>
                                France
                            </button>
                            <button type="button" tabIndex="0" className="dropdown-item">
                                <span className="mr-3 opacity-8 flag large ES"></span>
                                Spain
                            </button>
                            <div tabIndex="-1" className="dropdown-divider"></div>
                            <h6 tabIndex="-1" className="dropdown-header">Others</h6>
                            <button type="button" tabIndex="0" className="dropdown-item active">
                                <span className="mr-3 opacity-8 flag large DE"></span>
                                Germany
                            </button>
                            <button type="button" tabIndex="0" className="dropdown-item">
                                <span className="mr-3 opacity-8 flag large IT"></span>
                                Italy
                            </button>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button type="button" aria-haspopup="true" data-toggle="dropdown" aria-expanded="false" className="p-0 btn btn-link dd-chart-btn">
                            <span className="icon-wrapper icon-wrapper-alt rounded-circle">
                                <span className="icon-wrapper-bg bg-success"></span>
                                <i className="icon text-success ion-ios-analytics"></i>
                            </span>
                        </button>
                        <div tabIndex="-1" role="menu" aria-hidden="true" className="dropdown-menu-xl rm-pointers dropdown-menu dropdown-menu-right">
                            <div className="dropdown-menu-header">
                                <div className="dropdown-menu-header-inner bg-premium-dark">
                                    <div className="menu-header-image" style={{backgroundImage: `url(${abstract4})`}}></div>
                                    <div className="menu-header-content text-white">
                                        <h5 className="menu-header-title">Users Online
                                        </h5>
                                        <h6 className="menu-header-subtitle">Recent Account Activity Overview
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <div className="widget-chart">
                                <div className="widget-chart-content">
                                    <div className="icon-wrapper rounded-circle">
                                        <div className="icon-wrapper-bg opacity-9 bg-focus">
                                        </div>
                                        <i className="lnr-users text-white">
                                        </i>
                                    </div>
                                    <div className="widget-numbers">
                                        <span>344k</span>
                                    </div>
                                    <div className="widget-subheading pt-2">
                                        Profile views since last login
                                    </div>
                                    <div className="widget-description text-danger">
                                        <span className="pr-1">
                                            <span>176%</span>
                                        </span>
                                        <i className="fa fa-arrow-left"></i>
                                    </div>
                                </div>
                                <div className="widget-chart-wrapper">
                                    <div id="dashboard-sparkline-carousel-3-pop"></div>
                                </div>
                            </div>
                            <ul className="nav flex-column">
                                <li className="nav-item-divider mt-0 nav-item">
                                </li>
                                <li className="nav-item-btn text-center nav-item">
                                    <button className="btn-shine btn-wide btn-pill btn btn-warning btn-sm">
                                        <i className="fa fa-cog fa-spin mr-2">
                                        </i>
                                        View Details
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div className="header-btn-lg pr-0">
                    <div className="widget-content p-0">
                        <div className="widget-content-wrapper">
                            <div className="widget-content-left">
                                <div className="btn-group">
                                    <a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="p-0 btn">
                                        <img width="42" className="rounded-circle" src={avatar1} alt=""/>
                                        <i className="fa fa-angle-down ml-2 opacity-8"></i>
                                    </a>
                                    <div tabIndex="-1" role="menu" aria-hidden="true" className="rm-pointers dropdown-menu-lg dropdown-menu dropdown-menu-right">
                                        <div className="dropdown-menu-header">
                                            <div className="dropdown-menu-header-inner bg-info">
                                                <div className="menu-header-image opacity-2" style={{backgroundImage: `url(${city3})`}}></div>
                                                <div className="menu-header-content text-left">
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-3">
                                                                <img width="42" className="rounded-circle"
                                                                     src={avatar1}
                                                                     alt=""/>
                                                            </div>
                                                            <div className="widget-content-left">
                                                                <div className="widget-heading">Alina Mcloughlin
                                                                </div>
                                                                <div className="widget-subheading opacity-8">A short profile description
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-right mr-2">
                                                                <button className="btn-pill btn-shadow btn-shine btn btn-focus">Logout
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="scroll-area-xs" style={{height:'150px'}}>
                                            <div className="scrollbar-container ps">
                                                <ul className="nav flex-column">
                                                    <li className="nav-item-header nav-item">Activity
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="javascript:void(0);" className="nav-link">Chat
                                                            <div className="ml-auto badge badge-pill badge-info">8
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="javascript:void(0);" className="nav-link">Recover Password
                                                        </a>
                                                    </li>
                                                    <li className="nav-item-header nav-item">My Account
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="javascript:void(0);" className="nav-link">Settings
                                                            <div className="ml-auto badge badge-success">New
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="javascript:void(0);" className="nav-link">Messages
                                                            <div className="ml-auto badge badge-warning">512
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="javascript:void(0);" className="nav-link">Logs
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <ul className="nav flex-column">
                                            <li className="nav-item-divider mb-0 nav-item"></li>
                                        </ul>
                                        <div className="grid-menu grid-menu-2col">
                                            <div className="no-gutters row">
                                                <div className="col-sm-6">
                                                    <button className="btn-icon-vertical btn-transition btn-transition-alt pt-2 pb-2 btn btn-outline-warning">
                                                        <i className="pe-7s-chat icon-gradient bg-amy-crisp btn-icon-wrapper mb-2"></i>
                                                        Message Inbox
                                                    </button>
                                                </div>
                                                <div className="col-sm-6">
                                                    <button className="btn-icon-vertical btn-transition btn-transition-alt pt-2 pb-2 btn btn-outline-danger">
                                                        <i className="pe-7s-ticket icon-gradient bg-love-kiss btn-icon-wrapper mb-2"></i>
                                                        <b>Support Tickets</b>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <ul className="nav flex-column">
                                            <li className="nav-item-divider nav-item">
                                            </li>
                                            <li className="nav-item-btn text-center nav-item">
                                                <button className="btn-wide btn btn-primary btn-sm">
                                                    Open Messages
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="widget-content-left  ml-3 header-user-info">
                                <div className="widget-heading">
                                    Alina Mclourd
                                </div>
                                <div className="widget-subheading">
                                    VP People Manager
                                </div>
                            </div>
                            <div className="widget-content-right header-user-info ml-3">
                                <button type="button" className="btn-shadow p-1 btn btn-primary btn-sm show-toastr-example">
                                    <i className="fa text-white fa-calendar pr-1 pl-1"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-btn-lg">
                    <button type="button" className="hamburger hamburger--elastic open-right-drawer">
                        <span className="hamburger-box">
                            <span className="hamburger-inner"></span>
                        </span>
                    </button>
                </div>        </div>
        </div>
    </div>    
      <div className="app-main">
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
                </div>    <div className="scrollbar-sidebar">
                    <div className="app-sidebar__inner">
                        <ul className="vertical-nav-menu">
                            <li className="app-sidebar__heading">Menu</li>
                            <li
                                
                                
                                
                                 className="mm-active"
                                
                                
                            >
                                <a href="#">
                                    <i className="metismenu-icon pe-7s-rocket"></i>
                                    Dashboards
                                    <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                                </a>
                                <ul
                                    
                                    
                                    
                                     className="mm-show"
                                    
                                    
                                >
                                    <li>
                                        <a href="index.html">
                                            <i className="metismenu-icon">
                                            </i>Analytics
                                        </a>
                                    </li>
                                    <li>
                                        <a href="dashboards-commerce.html">
                                            <i className="metismenu-icon">
                                            </i>Commerce
                                        </a>
                                    </li>
                                    <li>
                                        <a href="dashboards-sales.html">
                                            <i className="metismenu-icon">
                                            </i>Sales
                                        </a>
                                    </li>
                                    <li
                                        
                                        
                                    >
                                        <a href="#">
                                            <i className="metismenu-icon"></i>
                                            Minimal
                                            <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                                        </a>
                                        <ul
                                            
                                            
                                        >
                                            <li>
                                                <a href="dashboards-minimal-1.html">
                                                    <i className="metismenu-icon">
                                                    </i>Variation 1
                                                </a>
                                            </li>
                                            <li>
                                                <a href="dashboards-minimal-2.html">
                                                    <i className="metismenu-icon">
                                                    </i>Variation 2
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="dashboards-crm.html" className="mm-active">
                                            <i className="metismenu-icon"></i>
                                            CRM
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li
                                
                                
                                
                                
                                
                                
                            >
                                <a href="#">
                                    <i className="metismenu-icon pe-7s-browser"></i>
                                    Pages
                                    <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                                </a>
                                <ul
                                    
                                    
                                    
                                    
                                    
                                    
                                >
                                    <li>
                                        <a href="pages-login.html">
                                            <i className="metismenu-icon"></i>
                                            Login
                                        </a>
                                    </li>
                                    <li>
                                        <a href="pages-login-boxed.html">
                                            <i className="metismenu-icon">
                                            </i>Login Boxed
                                        </a>
                                    </li>
                                    <li>
                                        <a href="pages-register.html">
                                            <i className="metismenu-icon">
                                            </i>Register
                                        </a>
                                    </li>
                                    <li>
                                        <a href="pages-register-boxed.html">
                                            <i className="metismenu-icon">
                                            </i>Register Boxed
                                        </a>
                                    </li>
                                    <li>
                                        <a href="pages-forgot-password.html">
                                            <i className="metismenu-icon">
                                            </i>Forgot Password
                                        </a>
                                    </li>
                                    <li>
                                        <a href="pages-forgot-password-boxed.html">
                                            <i className="metismenu-icon">
                                            </i>Forgot Password Boxed
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li
                                
                                
                                
                                
                                
                                
                            >
                                <a href="#">
                                    <i className="metismenu-icon pe-7s-plugin"></i>
                                    Applications
                                    <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                                </a>
                                <ul
                                    
                                    
                                    
                                >
                                    <li>
                                        <a href="apps-mailbox.html">
                                            <i className="metismenu-icon">
                                            </i>Mailbox
                                        </a>
                                    </li>
                                    <li>
                                        <a href="apps-chat.html">
                                            <i className="metismenu-icon">
                                            </i>Chat
                                        </a>
                                    </li>
                                    <li>
                                        <a href="apps-faq-section.html">
                                            <i className="metismenu-icon">
                                            </i>FAQ Section
                                        </a>
                                    </li>
                                    <li
                                        
                                        
                                        
                                    >
                                        <a href="#">
                                            <i className="metismenu-icon"></i>
                                            Forums
                                            <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                                        </a>
                                        <ul
                                            
                                            
                                            
                                        >
                                            <li>
                                                <a href="apps-forum-list.html">
                                                    <i className="metismenu-icon">
                                                    </i>Forum Listing
                                                </a>
                                            </li>
                                            <li>
                                                <a href="apps-forum-threads.html">
                                                    <i className="metismenu-icon">
                                                    </i>Forum Threads
                                                </a>
                                            </li>
                                            <li>
                                                <a href="apps-forum-discussion.html">
                                                    <i className="metismenu-icon">
                                                    </i>Forum Discussion
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li className="app-sidebar__heading">UI Components</li>
                            <li
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                            >
                                <a href="#">
                                    <i className="metismenu-icon pe-7s-diamond"></i>
                                    Elements
                                    <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                                </a>
                                <ul
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                >
                                    <li
                                        
                                        
                                        
                                        
                                        
                                        
                                    >
                                        <a href="#">
                                            <i className="metismenu-icon"></i>
                                            Buttons
                                            <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                                        </a>
                                        <ul
                                            
                                            
                                            
                                            
                                            
                                            
                                        >
                                            <li>
                                                <a href="elements-buttons-standard.html">
                                                    <i className="metismenu-icon">
                                                    </i>Standard
                                                </a>
                                            </li>
                                            <li>
                                                <a href="elements-buttons-pills.html">
                                                    <i className="metismenu-icon">
                                                    </i>Pills
                                                </a>
                                            </li>
                                            <li>
                                                <a href="elements-buttons-square.html">
                                                    <i className="metismenu-icon">
                                                    </i>Square
                                                </a>
                                            </li>
                                            <li>
                                                <a href="elements-buttons-shadow.html">
                                                    <i className="metismenu-icon">
                                                    </i>Shadow
                                                </a>
                                            </li>
                                            <li>
                                                <a href="elements-buttons-icons.html">
                                                    <i className="metismenu-icon">
                                                    </i>With Icons
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="elements-dropdowns.html">
                                            <i className="metismenu-icon">
                                            </i>Dropdowns
                                        </a>
                                    </li>
                                    <li>
                                        <a href="elements-icons.html">
                                            <i className="metismenu-icon">
                                            </i>Icons
                                        </a>
                                    </li>
                                    <li>
                                        <a href="elements-badges-labels.html">
                                            <i className="metismenu-icon">
                                            </i>Badges
                                        </a>
                                    </li>
                                    <li>
                                        <a href="elements-cards.html">
                                            <i className="metismenu-icon">
                                            </i>Cards
                                        </a>
                                    </li>
                                    <li>
                                        <a href="elements-loaders.html">
                                            <i className="metismenu-icon">
                                            </i>Loading Indicators
                                        </a>
                                    </li>
                                    <li>
                                        <a href="elements-list-group.html">
                                            <i className="metismenu-icon">
                                            </i>List Groups
                                        </a>
                                    </li>
                                    <li>
                                        <a href="elements-navigation.html">
                                            <i className="metismenu-icon">
                                            </i>Navigation Menus
                                        </a>
                                    </li>
                                    <li>
                                        <a href="elements-timelines.html">
                                            <i className="metismenu-icon">
                                            </i>Timeline
                                        </a>
                                    </li>
                                    <li>
                                        <a href="elements-utilities.html">
                                            <i className="metismenu-icon">
                                            </i>Utilities
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                            >
                                <a href="#">
                                    <i className="metismenu-icon pe-7s-car"></i>
                                    Components
                                    <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                                </a>
                                <ul
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                >
                                    <li>
                                        <a href="components-tabs.html">
                                            <i className="metismenu-icon">
                                            </i>Tabs
                                        </a>
                                    </li>
                                    <li>
                                        <a href="components-accordions.html">
                                            <i className="metismenu-icon">
                                            </i>Accordions
                                        </a>
                                    </li>
                                    <li>
                                        <a href="components-notifications.html">
                                            <i className="metismenu-icon">
                                            </i>Notifications
                                        </a>
                                    </li>
                                    <li>
                                        <a href="components-modals.html">
                                            <i className="metismenu-icon">
                                            </i>Modals
                                        </a>
                                    </li>
                                    <li>
                                        <a href="components-loading-blocks.html">
                                            <i className="metismenu-icon">
                                            </i>Loading Blockers
                                        </a>
                                    </li>
                                    <li>
                                        <a href="components-progress-bar.html">
                                            <i className="metismenu-icon">
                                            </i>Progress Bar
                                        </a>
                                    </li>
                                    <li>
                                        <a href="components-tooltips-popovers.html">
                                            <i className="metismenu-icon">
                                            </i>Tooltips &amp; Popovers
                                        </a>
                                    </li>
                                    <li>
                                        <a href="components-carousel.html">
                                            <i className="metismenu-icon">
                                            </i>Carousel
                                        </a>
                                    </li>
                                    <li>
                                        <a href="components-calendar.html">
                                            <i className="metismenu-icon">
                                            </i>Calendar
                                        </a>
                                    </li>
                                    <li>
                                        <a href="components-pagination.html">
                                            <i className="metismenu-icon">
                                            </i>Pagination
                                        </a>
                                    </li>
                                    <li>
                                        <a href="components-count-up.html">
                                            <i className="metismenu-icon">
                                            </i>Count Up
                                        </a>
                                    </li>
                                    <li>
                                        <a href="components-scrollable-elements.html">
                                            <i className="metismenu-icon">
                                            </i>Scrollable
                                        </a>
                                    </li>
                                    <li>
                                        <a href="components-tree-view.html">
                                            <i className="metismenu-icon">
                                            </i>Tree View
                                        </a>
                                    </li>
                                    <li>
                                        <a href="components-maps.html">
                                            <i className="metismenu-icon">
                                            </i>Maps
                                        </a>
                                    </li>
                                    <li>
                                        <a href="components-ratings.html">
                                            <i className="metismenu-icon">
                                            </i>Ratings
                                        </a>
                                    </li>
                                    <li>
                                        <a href="components-image-crop.html">
                                            <i className="metismenu-icon">
                                            </i>Image Crop
                                        </a>
                                    </li>
                                    <li>
                                        <a href="components-guided-tours.html">
                                            <i className="metismenu-icon">
                                            </i>Guided Tours
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li
                                
                                
                                
                            >
                                <a href="#">
                                    <i className="metismenu-icon pe-7s-display2"></i>
                                    Tables
                                    <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                                </a>
                                <ul
                                    
                                    
                                    
                                >
                                    <li>
                                        <a href="tables-data-tables.html">
                                            <i className="metismenu-icon">
                                            </i>Data Tables
                                        </a>
                                    </li>
                                    <li>
                                        <a href="tables-regular.html">
                                            <i className="metismenu-icon">
                                            </i>Regular Tables
                                        </a>
                                    </li>
                                    <li>
                                        <a href="tables-grid.html">
                                            <i className="metismenu-icon">
                                            </i>Grid Tables
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="app-sidebar__heading">Dashboard Widgets</li>
                            <li>
                                <a href="widgets-chart-boxes.html">
                                    <i className="metismenu-icon pe-7s-graph">
                                    </i>Chart Boxes 1
                                </a>
                            </li>
                            <li>
                                <a href="widgets-chart-boxes-2.html">
                                    <i className="metismenu-icon pe-7s-way">
                                    </i>Chart Boxes 2
                                </a>
                            </li>
                            <li>
                                <a href="widgets-chart-boxes-3.html">
                                    <i className="metismenu-icon pe-7s-ball">
                                    </i>Chart Boxes 3
                                </a>
                            </li>
                            <li>
                                <a href="widgets-profile-boxes.html">
                                    <i className="metismenu-icon pe-7s-id">
                                    </i>Profile Boxes
                                </a>
                            </li>
                            <li className="app-sidebar__heading">Forms</li>
                            <li
                                
                                
                                
                                
                            >
                                <a href="#">
                                    <i className="metismenu-icon pe-7s-light"></i>
                                    Elements
                                    <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                                </a>
                                <ul
                                    
                                    
                                    
                                    
                                >
                                    <li>
                                        <a href="forms-controls.html">
                                            <i className="metismenu-icon">
                                            </i>Controls
                                        </a>
                                    </li>
                                    <li>
                                        <a href="forms-layouts.html">
                                            <i className="metismenu-icon">
                                            </i>Layouts
                                        </a>
                                    </li>
                                    <li>
                                        <a href="forms-validation.html">
                                            <i className="metismenu-icon">
                                            </i>Validation
                                        </a>
                                    </li>
                                    <li>
                                        <a href="forms-wizard.html">
                                            <i className="metismenu-icon">
                                            </i>Wizard
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li
                                
                                
                                
                                
                                
                                
                                
                                
                                
                            >
                                <a href="#">
                                    <i className="metismenu-icon pe-7s-joy"></i>
                                    Widgets
                                    <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                                </a>
                                <ul
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                >
                                    <li>
                                        <a href="forms-datepicker.html">
                                            <i className="metismenu-icon">
                                            </i>Datepicker
                                        </a>
                                    </li>
                                    <li>
                                        <a href="forms-range-slider.html">
                                            <i className="metismenu-icon">
                                            </i>Range Slider
                                        </a>
                                    </li>
                                    <li>
                                        <a href="forms-input-selects.html">
                                            <i className="metismenu-icon">
                                            </i>Input Selects
                                        </a>
                                    </li>
                                    <li>
                                        <a href="forms-toggle-switch.html">
                                            <i className="metismenu-icon">
                                            </i>Toggle Switch
                                        </a>
                                    </li>
                                    <li>
                                        <a href="forms-wysiwyg-editor.html">
                                            <i className="metismenu-icon">
                                            </i>WYSIWYG Editor
                                        </a>
                                    </li>
                                    <li>
                                        <a href="forms-input-mask.html">
                                            <i className="metismenu-icon">
                                            </i>Input Mask
                                        </a>
                                    </li>
                                    <li>
                                        <a href="forms-clipboard.html">
                                            <i className="metismenu-icon">
                                            </i>Clipboard
                                        </a>
                                    </li>
                                    <li>
                                        <a href="forms-textarea-autosize.html">
                                            <i className="metismenu-icon">
                                            </i>Textarea Autosize
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="app-sidebar__heading">Charts</li>
                            <li>
                                <a href="charts-chartjs.html">
                                    <i className="metismenu-icon pe-7s-graph2">
                                    </i>ChartJS
                                </a>
                            </li>
                            <li>
                                <a href="charts-apexcharts.html">
                                    <i className="metismenu-icon pe-7s-graph">
                                    </i>Apex Charts
                                </a>
                            </li>
                            <li>
                                <a href="charts-sparklines.html">
                                    <i className="metismenu-icon pe-7s-graph1">
                                    </i>Chart Sparklines
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>    
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <div className="app-page-title">
                        <div className="page-title-wrapper">
                            <div className="page-title-heading">
                                <div className="page-title-icon">
                                    <i className="pe-7s-graph icon-gradient bg-ripe-malin">
                                    </i>
                                </div>
                                <div>CRM Dashboard
                                    <div className="page-title-subheading">It is just how powerful Kol Viet really is!
                                    </div>
                                </div>
                            </div>
                            </div>
                    </div>
                    <div className="tabs-animation">
                        <div className="row">
                            <div className="col-md-6 col-xl-4">
                                <div className="card mb-3 widget-content">
                                    <div className="widget-content-outer">
                                        <div className="widget-content-wrapper">
                                            <div className="widget-content-left">
                                                <div className="widget-heading">Total Orders</div>
                                                <div className="widget-subheading">Last year expenses</div>
                                            </div>
                                            <div className="widget-content-right">
                                                <div className="widget-numbers text-success">1896</div>
                                            </div>
                                        </div>
                                        <div className="widget-progress-wrapper">
                                            <div className="progress-bar-sm progress">
                                                <div className="progress-bar bg-primary" role="progressbar" aria-valuenow="71" aria-valuemin="0" aria-valuemax="100" style={{width: '71%'}}></div>
                                            </div>
                                            <div className="progress-sub-label">
                                                <div className="sub-label-left">YoY Growth</div>
                                                <div className="sub-label-right">100%</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-4">
                                <div className="card mb-3 widget-content">
                                    <div className="widget-content-outer">
                                        <div className="widget-content-wrapper">
                                            <div className="widget-content-left">
                                                <div className="widget-heading">Products Sold</div>
                                                <div className="widget-subheading">Revenue streams</div>
                                            </div>
                                            <div className="widget-content-right">
                                                <div className="widget-numbers text-warning">$3M</div>
                                            </div>
                                        </div>
                                        <div className="widget-progress-wrapper">
                                            <div className="progress-bar-sm progress-bar-animated-alt progress">
                                                <div className="progress-bar bg-danger" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100" style={{width: '85%'}}></div>
                                            </div>
                                            <div className="progress-sub-label">
                                                <div className="sub-label-left">Sales</div>
                                                <div className="sub-label-right">100%</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-4">
                                <div className="card mb-3 widget-content">
                                    <div className="widget-content-outer">
                                        <div className="widget-content-wrapper">
                                            <div className="widget-content-left">
                                                <div className="widget-heading">Followers</div>
                                                <div className="widget-subheading">People Interested</div>
                                            </div>
                                            <div className="widget-content-right">
                                                <div className="widget-numbers text-danger">45,9%</div>
                                            </div>
                                        </div>
                                        <div className="widget-progress-wrapper">
                                            <div className="progress-bar-sm progress-bar-animated-alt progress">
                                                <div className="progress-bar bg-success" role="progressbar" aria-valuenow="46" aria-valuemin="0" aria-valuemax="100" style={{width: '46%'}}></div>
                                            </div>
                                            <div className="progress-sub-label">
                                                <div className="sub-label-left">Twitter Progress</div>
                                                <div className="sub-label-right">100%</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-xl-none d-lg-block col-md-6 col-xl-4">
                                <div className="card mb-3 widget-content">
                                    <div className="widget-content-outer">
                                        <div className="widget-content-wrapper">
                                            <div className="widget-content-left">
                                                <div className="widget-heading">Income</div>
                                                <div className="widget-subheading">Expected totals</div>
                                            </div>
                                            <div className="widget-content-right">
                                                <div className="widget-numbers text-focus">$147</div>
                                            </div>
                                        </div>
                                        <div className="widget-progress-wrapper">
                                            <div className="progress-bar-sm progress-bar-animated-alt progress">
                                                <div className="progress-bar bg-info" role="progressbar" aria-valuenow="54" aria-valuemin="0" aria-valuemax="100" style={{width: '54%'}}></div>
                                            </div>
                                            <div className="progress-sub-label">
                                                <div className="sub-label-left">Expenses</div>
                                                <div className="sub-label-right">100%</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-xl-12">
                                <div className="row">
                                    <div className="col-md-6 col-lg-3 col-xl-6">
                                        <div className="card mb-3 widget-chart widget-chart2 text-left card-btm-border card-shadow-success border-success">
                                            <div className="widget-chat-wrapper-outer">
                                                <div className="widget-chart-content pt-3 pl-3 pb-1">
                                                    <div className="widget-chart-flex">
                                                        <div className="widget-numbers">
                                                            <div className="widget-chart-flex">
                                                                <div className="fsize-4">
                                                                    <small className="opacity-5">$</small>
                                                                    <span>874</span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <h6 className="widget-subheading mb-0 opacity-5">sales last month</h6></div>
                                                <div className="no-gutters widget-chart-wrapper mt-3 mb-3 pl-2 he-auto row">
                                                    <div className="col-md-9">
                                                        <div id="dashboard-sparklines-1"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-3 col-xl-6">
                                        <div className="card mb-3 widget-chart widget-chart2 text-left card-btm-border card-shadow-primary border-primary">
                                            <div className="widget-chat-wrapper-outer">
                                                <div className="widget-chart-content pt-3 pl-3 pb-1">
                                                    <div className="widget-chart-flex">
                                                        <div className="widget-numbers">
                                                            <div className="widget-chart-flex">
                                                                <div className="fsize-4">
                                                                    <small className="opacity-5">$</small>
                                                                    <span>1283</span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <h6 className="widget-subheading mb-0 opacity-5">sales Income</h6></div>
                                                <div className="no-gutters widget-chart-wrapper mt-3 mb-3 pl-2 he-auto row">
                                                    <div className="col-md-9">
                                                        <div id="dashboard-sparklines-2"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-3 col-xl-6">
                                        <div className="card mb-3 widget-chart widget-chart2 text-left card-btm-border card-shadow-warning border-warning">
                                            <div className="widget-chat-wrapper-outer">
                                                <div className="widget-chart-content pt-3 pl-3 pb-1">
                                                    <div className="widget-chart-flex">
                                                        <div className="widget-numbers">
                                                            <div className="widget-chart-flex">
                                                                <div className="fsize-4">
                                                                    <small className="opacity-5">$</small>
                                                                    <span>1286</span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <h6 className="widget-subheading mb-0 opacity-5">last month sales</h6></div>
                                                <div className="no-gutters widget-chart-wrapper mt-3 mb-3 pl-2 he-auto row">
                                                    <div className="col-md-9">
                                                        <div id="dashboard-sparklines-3"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-3 col-xl-6">
                                        <div className="card mb-3 widget-chart widget-chart2 text-left card-btm-border card-shadow-danger border-danger">
                                            <div className="widget-chat-wrapper-outer">
                                                <div className="widget-chart-content pt-3 pl-3 pb-1">
                                                    <div className="widget-chart-flex">
                                                        <div className="widget-numbers">
                                                            <div className="widget-chart-flex">
                                                                <div className="fsize-4">
                                                                    <small className="opacity-5">$</small>
                                                                    <span>564</span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <h6 className="widget-subheading mb-0 opacity-5">total revenue</h6></div>
                                                <div className="no-gutters widget-chart-wrapper mt-3 mb-3 pl-2 he-auto row">
                                                    <div className="col-md-9">
                                                        <div id="dashboard-sparklines-4"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="main-card mb-3 card">
                            <div className="card-header-tab card-header">
                                <div className="card-header-title font-size-lg text-capitalize font-weight-normal"><i className="header-icon lnr-dice mr-3 text-muted opacity-6"> </i>Easy Dynamic Tables</div>
                                <div className="btn-actions-pane-right actions-icon-btn">
                                    <div className="btn-group dropdown">
                                        <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="btn-icon btn-icon-only btn btn-link">
                                            <i className="pe-7s-menu btn-icon-wrapper"></i>
                                        </button>
                                        <div tabIndex="-1" role="menu" aria-hidden="true" className="dropdown-menu-shadow dropdown-menu-hover-link dropdown-menu">
                                            <h6 tabIndex="-1" className="dropdown-header">Header</h6>
                                            <button type="button" tabIndex="0" className="dropdown-item"><i className="dropdown-icon lnr-inbox"> </i><span>Menus</span></button>
                                            <button type="button" tabIndex="0" className="dropdown-item"><i className="dropdown-icon lnr-file-empty"> </i><span>Settings</span></button>
                                            <button type="button" tabIndex="0" className="dropdown-item"><i className="dropdown-icon lnr-book"> </i><span>Actions</span></button>
                                            <div tabIndex="-1" className="dropdown-divider"></div>
                                            <div className="p-3 text-right">
                                                <button className="mr-2 btn-shadow btn-sm btn btn-link">View Details</button>
                                                <button className="mr-2 btn-shadow btn-sm btn btn-primary">Action</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <table data-toggle="table"
                                       data-url="https://api.github.com/users/wenzhixin/repos?type=owner&sort=full_name&direction=asc&per_page=10&page=1"
                                       data-sort-name="stargazers_count"
                                       data-sort-order="desc">
                                    <thead>
                                    <tr>
                                        <th data-field="name"
                                            data-sortable="true">
                                            Name
                                        </th>
                                        <th data-field="stargazers_count"
                                            data-sortable="true">
                                            Stars
                                        </th>
                                        <th data-field="forks_count"
                                            data-sortable="true">
                                            Forks
                                        </th>
                                        <th data-field="description"
                                            data-sortable="true">
                                            Description
                                        </th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="mb-3 card">
                                    <div className="card-header-tab card-header-tab-animation card-header">
                                        <div className="card-header-title">
                                            <i className="header-icon lnr-apartment icon-gradient bg-love-kiss"> </i>
                                            Sales Report
                                        </div>
                                        <div className="btn-actions-pane-right text-capitalize">
                                            <button className="btn-wide btn-outline-2x btn btn-outline-success btn-sm">View All</button>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="tab-content">
                                            <div className="tab-pane fade active show" id="tab-eg-11">
                                                <div className="card mb-3 widget-chart widget-chart2 text-left p-0">
                                                    <div className="widget-chat-wrapper-outer">
                                                        <div className="widget-chart-content pt-3 pr-3 pl-3">
                                                            <div className="widget-chart-flex">
                                                                <div className="widget-numbers">
                                                                    <div className="widget-chart-flex">
                                                                        <div>
                                                                            <small className="opacity-5">$</small>
                                                                            <span>368</span></div>
                                                                        <div className="widget-title ml-2 opacity-5 font-size-lg text-muted">Total Leads</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="widget-chart-wrapper he-auto opacity-10 m-0">
                                                            <div id="dashboard-sparkline-carousel-2"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <h6 className="text-muted text-uppercase font-size-md opacity-5 font-weight-normal">Top Authors</h6>
                                                <div className="scroll-area-sm">
                                                    <div className="scrollbar-container">
                                                        <ul className="rm-list-borders rm-list-borders-scroll list-group list-group-flush">
                                                            <li className="list-group-item">
                                                                <div className="widget-content p-0">
                                                                    <div className="widget-content-wrapper">
                                                                        <div className="widget-content-left mr-3">
                                                                            <img width="42" className="rounded-circle" src={avatar9} alt=""/>
                                                                        </div>
                                                                        <div className="widget-content-left">
                                                                            <div className="widget-heading">Ella-Rose Henry</div>
                                                                            <div className="widget-subheading">Web Developer</div>
                                                                        </div>
                                                                        <div className="widget-content-right">
                                                                            <div className="font-size-xlg text-muted">
                                                                                <small className="opacity-5 pr-1">$</small>
                                                                                <span>129</span>
                                                                                <small className="text-danger pl-2">
                                                                                    <i className="fa fa-angle-down"></i>
                                                                                </small>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className="list-group-item">
                                                                <div className="widget-content p-0">
                                                                    <div className="widget-content-wrapper">
                                                                        <div className="widget-content-left mr-3">
                                                                            <img width="42" className="rounded-circle" src={avatar5} alt=""/>
                                                                        </div>
                                                                        <div className="widget-content-left">
                                                                            <div className="widget-heading">Ruben Tillman</div>
                                                                            <div className="widget-subheading">UI Designer</div>
                                                                        </div>
                                                                        <div className="widget-content-right">
                                                                            <div className="font-size-xlg text-muted">
                                                                                <small className="opacity-5 pr-1">$</small>
                                                                                <span>54</span>
                                                                                <small className="text-success pl-2">
                                                                                    <i className="fa fa-angle-up"></i>
                                                                                </small>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className="list-group-item">
                                                                <div className="widget-content p-0">
                                                                    <div className="widget-content-wrapper">
                                                                        <div className="widget-content-left mr-3">
                                                                            <img width="42" className="rounded-circle" src={avatar4} alt=""/>
                                                                        </div>
                                                                        <div className="widget-content-left">
                                                                            <div className="widget-heading">Vinnie Wagstaff</div>
                                                                            <div className="widget-subheading">Java Programmer</div>
                                                                        </div>
                                                                        <div className="widget-content-right">
                                                                            <div className="font-size-xlg text-muted">
                                                                                <small className="opacity-5 pr-1">$</small>
                                                                                <span>429</span>
                                                                                <small className="text-warning pl-2">
                                                                                    <i className="fa fa-dot-circle"></i>
                                                                                </small>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className="list-group-item">
                                                                <div className="widget-content p-0">
                                                                    <div className="widget-content-wrapper">
                                                                        <div className="widget-content-left mr-3">
                                                                            <img width="42" className="rounded-circle" src={avatar3} alt=""/>
                                                                        </div>
                                                                        <div className="widget-content-left">
                                                                            <div className="widget-heading">Ella-Rose Henry</div>
                                                                            <div className="widget-subheading">Web Developer</div>
                                                                        </div>
                                                                        <div className="widget-content-right">
                                                                            <div className="font-size-xlg text-muted">
                                                                                <small className="opacity-5 pr-1">$</small>
                                                                                <span>129</span>
                                                                                <small className="text-danger pl-2">
                                                                                    <i className="fa fa-angle-down"></i>
                                                                                </small>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className="list-group-item">
                                                                <div className="widget-content p-0">
                                                                    <div className="widget-content-wrapper">
                                                                        <div className="widget-content-left mr-3">
                                                                            <img width="42" className="rounded-circle" src={avatar2} alt=""/>
                                                                        </div>
                                                                        <div className="widget-content-left">
                                                                            <div className="widget-heading">Ruben Tillman</div>
                                                                            <div className="widget-subheading">UI Designer</div>
                                                                        </div>
                                                                        <div className="widget-content-right">
                                                                            <div className="font-size-xlg text-muted">
                                                                                <small className="opacity-5 pr-1">$</small>
                                                                                <span>54</span>
                                                                                <small className="text-success pl-2">
                                                                                    <i className="fa fa-angle-up"></i>
                                                                                </small>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="divider"></div>
                                                <h6 className="text-muted text-uppercase font-size-md opacity-5 font-weight-normal">Last Month Top Seller</h6>
                                                <ul className="rm-list-borders rm-list-borders-scroll list-group list-group-flush">
                                                    <li className="list-group-item">
                                                        <div className="widget-content p-0">
                                                            <div className="widget-content-wrapper">
                                                                <div className="widget-content-left mr-3">
                                                                    <img width="42" className="rounded-circle" src={avatar8} alt=""/>
                                                                </div>
                                                                <div className="widget-content-left">
                                                                    <div className="widget-heading">Ruben Tillman</div>
                                                                    <div className="widget-subheading">UI Designer</div>
                                                                </div>
                                                                <div className="widget-content-right">
                                                                    <div className="font-size-xlg text-muted">
                                                                        <small className="opacity-5 pr-1">$</small>
                                                                        <span>54</span>
                                                                        <small className="text-success pl-2">
                                                                            <i className="fa fa-angle-up">
                                                                            </i>
                                                                        </small>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="app-wrapper-footer">
                    <div className="app-footer">
                        <div className="app-footer__inner">
                            <div className="app-footer-left">
                                <div className="footer-dots">
                                    <div className="dropdown">
                                        <a aria-haspopup="true" aria-expanded="false" data-toggle="dropdown" className="dot-btn-wrapper">
                                            <i className="dot-btn-icon lnr-bullhorn icon-gradient bg-mean-fruit"></i>
                                            <div className="badge badge-dot badge-abs badge-dot-sm badge-danger">Notifications</div>
                                        </a>
                                        <div tabIndex="-1" role="menu" aria-hidden="true" className="dropdown-menu-xl rm-pointers dropdown-menu">
                                            <div className="dropdown-menu-header mb-0">
                                                <div className="dropdown-menu-header-inner bg-deep-blue">
                                                    <div className="menu-header-image opacity-1" style={{backgroundImage: `url(${city3})`}}></div>
                                                    <div className="menu-header-content text-dark">
                                                        <h5 className="menu-header-title">Notifications</h5>
                                                        <h6 className="menu-header-subtitle">You have <b>21</b> unread messages</h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <ul className="tabs-animated-shadow tabs-animated nav nav-justified tabs-shadow-bordered p-3">
                                                <li className="nav-item">
                                                    <a role="tab" className="nav-link active" data-toggle="tab" href="#tab-messages-header1">
                                                        <span>Messages</span>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a role="tab" className="nav-link" data-toggle="tab" href="#tab-events-header1">
                                                        <span>Events</span>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a role="tab" className="nav-link" data-toggle="tab" href="#tab-errors-header1">
                                                        <span>System Errors</span>
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="tab-content">
                                                <div className="tab-pane active" id="tab-messages-header1" role="tabpanel">
                                                    <div className="scroll-area-sm">
                                                        <div className="scrollbar-container">
                                                            <div className="p-3">
                                                                <div className="notifications-box">
                                                                    <div className="vertical-time-simple vertical-without-time vertical-timeline vertical-timeline--one-column">
                                                                        <div className="vertical-timeline-item dot-danger vertical-timeline-element">
                                                                            <div><span className="vertical-timeline-element-icon bounce-in"></span>
                                                                                <div className="vertical-timeline-element-content bounce-in"><h4 className="timeline-title">All Hands Meeting</h4><span className="vertical-timeline-element-date"></span></div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="vertical-timeline-item dot-warning vertical-timeline-element">
                                                                            <div><span className="vertical-timeline-element-icon bounce-in"></span>
                                                                                <div className="vertical-timeline-element-content bounce-in"><p>Yet another one, at <span className="text-success">15:00 PM</span></p><span className="vertical-timeline-element-date"></span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="vertical-timeline-item dot-success vertical-timeline-element">
                                                                            <div><span className="vertical-timeline-element-icon bounce-in"></span>
                                                                                <div className="vertical-timeline-element-content bounce-in">
                                                                                    <h4 className="timeline-title">Build the production release
                                                                                        <span className="badge badge-danger ml-2">NEW</span>
                                                                                    </h4>
                                                                                    <span className="vertical-timeline-element-date"></span></div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="vertical-timeline-item dot-primary vertical-timeline-element">
                                                                            <div><span className="vertical-timeline-element-icon bounce-in"></span>
                                                                                <div className="vertical-timeline-element-content bounce-in">
                                                                                    <h4 className="timeline-title">Something not important
                                                                                        <div className="avatar-wrapper mt-2 avatar-wrapper-overlap">
                                                                                            <div className="avatar-icon-wrapper avatar-icon-sm">
                                                                                                <div className="avatar-icon"><img
                                                                                                        src={avatar1}
                                                                                                        alt=""/></div>
                                                                                            </div>
                                                                                            <div className="avatar-icon-wrapper avatar-icon-sm">
                                                                                                <div className="avatar-icon"><img
                                                                                                        src={avatar2}
                                                                                                        alt=""/></div>
                                                                                            </div>
                                                                                            <div className="avatar-icon-wrapper avatar-icon-sm">
                                                                                                <div className="avatar-icon"><img
                                                                                                        src={avatar3}
                                                                                                        alt=""/></div>
                                                                                            </div>
                                                                                            <div className="avatar-icon-wrapper avatar-icon-sm">
                                                                                                <div className="avatar-icon"><img
                                                                                                        src={avatar4}
                                                                                                        alt=""/></div>
                                                                                            </div>
                                                                                            <div className="avatar-icon-wrapper avatar-icon-sm">
                                                                                                <div className="avatar-icon"><img
                                                                                                        src={avatar5}
                                                                                                        alt=""/></div>
                                                                                            </div>
                                                                                            <div className="avatar-icon-wrapper avatar-icon-sm">
                                                                                                <div className="avatar-icon"><img
                                                                                                        src={avatar9}
                                                                                                        alt=""/></div>
                                                                                            </div>
                                                                                            <div className="avatar-icon-wrapper avatar-icon-sm">
                                                                                                <div className="avatar-icon"><img
                                                                                                        src={avatar7}
                                                                                                        alt=""/></div>
                                                                                            </div>
                                                                                            <div className="avatar-icon-wrapper avatar-icon-sm">
                                                                                                <div className="avatar-icon"><img
                                                                                                        src={avatar8}
                                                                                                        alt=""/></div>
                                                                                            </div>
                                                                                            <div className="avatar-icon-wrapper avatar-icon-sm avatar-icon-add">
                                                                                                <div className="avatar-icon"><i>+</i></div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </h4>
                                                                                    <span className="vertical-timeline-element-date"></span></div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="vertical-timeline-item dot-info vertical-timeline-element">
                                                                            <div><span className="vertical-timeline-element-icon bounce-in"></span>
                                                                                <div className="vertical-timeline-element-content bounce-in"><h4 className="timeline-title">This dot has an info state</h4><span className="vertical-timeline-element-date"></span></div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="vertical-timeline-item dot-danger vertical-timeline-element">
                                                                            <div><span className="vertical-timeline-element-icon bounce-in"></span>
                                                                                <div className="vertical-timeline-element-content bounce-in"><h4 className="timeline-title">All Hands Meeting</h4><span className="vertical-timeline-element-date"></span></div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="vertical-timeline-item dot-warning vertical-timeline-element">
                                                                            <div><span className="vertical-timeline-element-icon bounce-in"></span>
                                                                                <div className="vertical-timeline-element-content bounce-in"><p>Yet another one, at <span className="text-success">15:00 PM</span></p><span className="vertical-timeline-element-date"></span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="vertical-timeline-item dot-success vertical-timeline-element">
                                                                            <div><span className="vertical-timeline-element-icon bounce-in"></span>
                                                                                <div className="vertical-timeline-element-content bounce-in">
                                                                                    <h4 className="timeline-title">Build the production release
                                                                                        <span className="badge badge-danger ml-2">NEW</span>
                                                                                    </h4>
                                                                                    <span className="vertical-timeline-element-date"></span></div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="vertical-timeline-item dot-dark vertical-timeline-element">
                                                                            <div><span className="vertical-timeline-element-icon bounce-in"></span>
                                                                                <div className="vertical-timeline-element-content bounce-in"><h4 className="timeline-title">This dot has a dark state</h4><span className="vertical-timeline-element-date"></span></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tab-pane" id="tab-events-header1" role="tabpanel">
                                                    <div className="scroll-area-sm">
                                                        <div className="scrollbar-container">
                                                            <div className="p-3">
                                                                <div className="vertical-without-time vertical-timeline vertical-timeline--animate vertical-timeline--one-column">
                                                                    <div className="vertical-timeline-item vertical-timeline-element">
                                                                        <div><span className="vertical-timeline-element-icon bounce-in"><i className="badge badge-dot badge-dot-xl badge-success"> </i></span>
                                                                            <div className="vertical-timeline-element-content bounce-in"><h4 className="timeline-title">All Hands Meeting</h4>
                                                                                <p>Lorem ipsum dolor sic amet, today at <a href="javascript:void(0);">12:00 PM</a></p><span className="vertical-timeline-element-date"></span></div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="vertical-timeline-item vertical-timeline-element">
                                                                        <div><span className="vertical-timeline-element-icon bounce-in"><i className="badge badge-dot badge-dot-xl badge-warning"> </i></span>
                                                                            <div className="vertical-timeline-element-content bounce-in"><p>Another meeting today, at <b className="text-danger">12:00 PM</b></p>
                                                                                <p>Yet another one, at <span className="text-success">15:00 PM</span></p><span className="vertical-timeline-element-date"></span></div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="vertical-timeline-item vertical-timeline-element">
                                                                        <div><span className="vertical-timeline-element-icon bounce-in"><i className="badge badge-dot badge-dot-xl badge-danger"> </i></span>
                                                                            <div className="vertical-timeline-element-content bounce-in"><h4 className="timeline-title">Build the production release</h4>
                                                                                <p>Lorem ipsum dolor sit amit,consectetur eiusmdd tempor incididunt ut labore et dolore magna elit enim at minim veniam quis nostrud</p><span
                                                                                        className="vertical-timeline-element-date"></span></div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="vertical-timeline-item vertical-timeline-element">
                                                                        <div><span className="vertical-timeline-element-icon bounce-in"><i className="badge badge-dot badge-dot-xl badge-primary"> </i></span>
                                                                            <div className="vertical-timeline-element-content bounce-in"><h4 className="timeline-title text-success">Something not important</h4>
                                                                                <p>Lorem ipsum dolor sit amit,consectetur elit enim at minim veniam quis nostrud</p><span className="vertical-timeline-element-date"></span></div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="vertical-timeline-item vertical-timeline-element">
                                                                        <div><span className="vertical-timeline-element-icon bounce-in"><i className="badge badge-dot badge-dot-xl badge-success"> </i></span>
                                                                            <div className="vertical-timeline-element-content bounce-in"><h4 className="timeline-title">All Hands Meeting</h4>
                                                                                <p>Lorem ipsum dolor sic amet, today at <a href="javascript:void(0);">12:00 PM</a></p><span className="vertical-timeline-element-date"></span></div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="vertical-timeline-item vertical-timeline-element">
                                                                        <div><span className="vertical-timeline-element-icon bounce-in"><i className="badge badge-dot badge-dot-xl badge-warning"> </i></span>
                                                                            <div className="vertical-timeline-element-content bounce-in"><p>Another meeting today, at <b className="text-danger">12:00 PM</b></p>
                                                                                <p>Yet another one, at <span className="text-success">15:00 PM</span></p><span className="vertical-timeline-element-date"></span></div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="vertical-timeline-item vertical-timeline-element">
                                                                        <div><span className="vertical-timeline-element-icon bounce-in"><i className="badge badge-dot badge-dot-xl badge-danger"> </i></span>
                                                                            <div className="vertical-timeline-element-content bounce-in"><h4 className="timeline-title">Build the production release</h4>
                                                                                <p>Lorem ipsum dolor sit amit,consectetur eiusmdd tempor incididunt ut labore et dolore magna elit enim at minim veniam quis nostrud</p><span
                                                                                        className="vertical-timeline-element-date"></span></div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="vertical-timeline-item vertical-timeline-element">
                                                                        <div><span className="vertical-timeline-element-icon bounce-in"><i className="badge badge-dot badge-dot-xl badge-primary"> </i></span>
                                                                            <div className="vertical-timeline-element-content bounce-in"><h4 className="timeline-title text-success">Something not important</h4>
                                                                                <p>Lorem ipsum dolor sit amit,consectetur elit enim at minim veniam quis nostrud</p><span className="vertical-timeline-element-date"></span></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tab-pane" id="tab-errors-header1" role="tabpanel">
                                                    <div className="scroll-area-sm">
                                                        <div className="scrollbar-container">
                                                            <div className="no-results pt-3 pb-0">
                                                                <div className="swal2-icon swal2-success swal2-animate-success-icon">
                                                                    <div className="swal2-success-circular-line-left" style={{backgroundColor:'rgb(255, 255, 255)'}}></div>
                                                                    <span className="swal2-success-line-tip"></span>
                                                                    <span className="swal2-success-line-long"></span>
                                                                    <div className="swal2-success-ring"></div>
                                                                    <div className="swal2-success-fix" style={{backgroundColor:'rgb(255, 255, 255)'}}></div>
                                                                    <div className="swal2-success-circular-line-right" style={{backgroundColor:'rgb(255, 255, 255)'}}></div>
                                                                </div>
                                                                <div className="results-subtitle">All caught up!</div>
                                                                <div className="results-title">There are no system errors!</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <ul className="nav flex-column">
                                                <li className="nav-item-divider nav-item"></li>
                                                <li className="nav-item-btn text-center nav-item">
                                                    <button className="btn-shadow btn-wide btn-pill btn btn-focus btn-sm">View Latest Changes</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="dots-separator"></div>
                                    <div className="dropdown">
                                        <a className="dot-btn-wrapper" aria-haspopup="true" data-toggle="dropdown" aria-expanded="false">
                                            <i className="dot-btn-icon lnr-earth icon-gradient bg-happy-itmeo">
                                            </i>
                                        </a>
                                        <div tabIndex="-1" role="menu" aria-hidden="true" className="rm-pointers dropdown-menu">
                                            <div className="dropdown-menu-header">
                                                <div className="dropdown-menu-header-inner pt-4 pb-4 bg-focus">
                                                    <div className="menu-header-image opacity-05" style={{backgroundImage: `url(${city2})`}}></div>
                                                    <div className="menu-header-content text-center text-white">
                                                        <h6 className="menu-header-subtitle mt-0">
                                                            Choose Language
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <h6 tabIndex="-1" className="dropdown-header">
                                                Popular Languages
                                            </h6>
                                            <button type="button" tabIndex="0" className="dropdown-item">
                                                <span className="mr-3 opacity-8 flag large US"></span>
                                                USA
                                            </button>
                                            <button type="button" tabIndex="0" className="dropdown-item">
                                                <span className="mr-3 opacity-8 flag large CH"></span>
                                                Switzerland
                                            </button>
                                            <button type="button" tabIndex="0" className="dropdown-item">
                                                <span className="mr-3 opacity-8 flag large FR"></span>
                                                France
                                            </button>
                                            <button type="button" tabIndex="0" className="dropdown-item">
                                                <span className="mr-3 opacity-8 flag large ES"></span>
                                                Spain
                                            </button>
                                            <div tabIndex="-1" className="dropdown-divider"></div>
                                            <h6 tabIndex="-1" className="dropdown-header">Others</h6>
                                            <button type="button" tabIndex="0" className="dropdown-item active">
                                                <span className="mr-3 opacity-8 flag large DE"></span>
                                                Germany
                                            </button>
                                            <button type="button" tabIndex="0" className="dropdown-item">
                                                <span className="mr-3 opacity-8 flag large IT"></span>
                                                Italy
                                            </button>
                                        </div>
                                    </div>
                                    <div className="dots-separator"></div>
                                    <div className="dropdown">
                                        <a className="dot-btn-wrapper dd-chart-btn-2" aria-haspopup="true" data-toggle="dropdown" aria-expanded="false">
                                            <i className="dot-btn-icon lnr-pie-chart icon-gradient bg-love-kiss"></i>
                                            <div className="badge badge-dot badge-abs badge-dot-sm badge-warning">Notifications</div>
                                        </a>
                                        <div tabIndex="-1" role="menu" aria-hidden="true" className="dropdown-menu-xl rm-pointers dropdown-menu">
                                            <div className="dropdown-menu-header">
                                                <div className="dropdown-menu-header-inner bg-premium-dark">
                                                    <div className="menu-header-image" style={{backgroundImage: `url(${abstract4})`}}></div>
                                                    <div className="menu-header-content text-white">
                                                        <h5 className="menu-header-title">Users Online
                                                        </h5>
                                                        <h6 className="menu-header-subtitle">Recent Account Activity Overview
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="widget-chart">
                                                <div className="widget-chart-content">
                                                    <div className="icon-wrapper rounded-circle">
                                                        <div className="icon-wrapper-bg opacity-9 bg-focus">
                                                        </div>
                                                        <i className="lnr-users text-white">
                                                        </i>
                                                    </div>
                                                    <div className="widget-numbers">
                                                        <span>344k</span>
                                                    </div>
                                                    <div className="widget-subheading pt-2">
                                                        Profile views since last login
                                                    </div>
                                                    <div className="widget-description text-danger">
                                                        <span className="pr-1">
                                                            <span>176%</span>
                                                        </span>
                                                        <i className="fa fa-arrow-left"></i>
                                                    </div>
                                                </div>
                                                <div className="widget-chart-wrapper">
                                                    <div id="dashboard-sparkline-carousel-4-pop"></div>
                                                </div>
                                            </div>
                                            <ul className="nav flex-column">
                                                <li className="nav-item-divider mt-0 nav-item">
                                                </li>
                                                <li className="nav-item-btn text-center nav-item">
                                                    <button className="btn-shine btn-wide btn-pill btn btn-warning btn-sm">
                                                        <i className="fa fa-cog fa-spin mr-2">
                                                        </i>
                                                        View Details
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    </div>
    </div>
</div>);
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

const connectedDashBoardPage = connect(mapStateToProps)(DashBoardPage);
export { connectedDashBoardPage as DashBoardPage };