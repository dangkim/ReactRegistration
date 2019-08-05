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
import new_logo from '../assets/images/new_logo.png'
//import { campaignActions } from '../_actions';
import { campaignActions, infActions, brandActions } from '../_actions';
//import Select from 'react-select';
import { createJobs } from '../_models/JobType';
//import {configContent} from 'configContent';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-bootstrap4';
import { history } from '../_helpers';

class TopHeaderPage extends Component {

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
        //console.log(`Option selected:`, selectedOptionLocation);
    };

    handleOptionInterestingChange = selectedOptionInteresting => {
        this.setState({ selectedOptionInteresting });
        //console.log(`Option selected:`, selectedOptionInteresting);
    };

    handleOptionJobCategoryChange = selectedOptionJobCategory => {
        this.setState({ selectedOptionJobCategory });
        //console.log(`Option selected:`, selectedOptionJobCategory);
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

    render() {        

        return (            
            <div className="app-header header-shadow">
                <div className="app-header__logo">
                    {/* <div className="logo-src"></div> */}
                    <div style={{ width: '97px', height: '23px' }}>
                        <img src={new_logo} alt="Kols Viet" />
                    </div>
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
                <div className="app-header__content">
                    <div className="app-header-left">
                        <div className="search-wrapper">
                            <div className="input-holder">
                                <input type="text" className="search-input" placeholder="Type to search" />
                                <button className="search-icon"><span></span></button>
                            </div>
                            <button className="close"></button>
                        </div>
                        <ul className="header-megamenu nav">
                            <li className="btn-group nav-item">
                                <a className="nav-link" data-toggle="dropdown" aria-expanded="false">
                                    <span className="badge badge-pill badge-danger ml-0 mr-2">4</span>
                                    Settings
                                    <i className="fa fa-angle-down ml-2 opacity-5"></i>
                                </a>
                                <div tabIndex="-1" role="menu" aria-hidden="true" className="rm-pointers dropdown-menu">
                                    <div className="dropdown-menu-header">
                                        <div className="dropdown-menu-header-inner bg-secondary">
                                            <div className="menu-header-image opacity-5" style={{ backgroundImage: `url(${abstract2})` }}></div>
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
                                <a aria-haspopup="true" data-toggle="dropdown" className="nav-link" aria-expanded="false">
                                    <i className="nav-link-icon pe-7s-settings"></i>
                                    Projects
                                    <i className="fa fa-angle-down ml-2 opacity-5"></i>
                                </a>
                                <div tabIndex="-1" role="menu" aria-hidden="true" className="dropdown-menu-rounded dropdown-menu-lg rm-pointers dropdown-menu">
                                    <div className="dropdown-menu-header">
                                        <div className="dropdown-menu-header-inner bg-success">
                                            <div className="menu-header-image opacity-1" style={{ backgroundImage: `url(${abstract3})` }}></div>
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
                                        <span className="icon-wrapper-bg bg-danger"></span>
                                        <i className="icon text-danger icon-anim-pulse ion-android-notifications"></i>
                                        <span className="badge badge-dot badge-dot-sm badge-danger">Notifications</span>
                                    </span>
                                </button>
                                <div tabIndex="-1" role="menu" aria-hidden="true" className="dropdown-menu-xl rm-pointers dropdown-menu dropdown-menu-right">
                                    <div className="dropdown-menu-header mb-0">
                                        <div className="dropdown-menu-header-inner bg-deep-blue">
                                            <div className="menu-header-image opacity-1" style={{ backgroundImage: `url(${city3})` }}></div>
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
                                                                                            alt="" /></div>
                                                                                    </div>
                                                                                    <div className="avatar-icon-wrapper avatar-icon-sm">
                                                                                        <div className="avatar-icon"><img
                                                                                            src={avatar2}
                                                                                            alt="" /></div>
                                                                                    </div>
                                                                                    <div className="avatar-icon-wrapper avatar-icon-sm">
                                                                                        <div className="avatar-icon"><img
                                                                                            src={avatar3}
                                                                                            alt="" /></div>
                                                                                    </div>
                                                                                    <div className="avatar-icon-wrapper avatar-icon-sm">
                                                                                        <div className="avatar-icon"><img
                                                                                            src={avatar4}
                                                                                            alt="" /></div>
                                                                                    </div>
                                                                                    <div className="avatar-icon-wrapper avatar-icon-sm">
                                                                                        <div className="avatar-icon"><img
                                                                                            src={avatar5}
                                                                                            alt="" /></div>
                                                                                    </div>
                                                                                    <div className="avatar-icon-wrapper avatar-icon-sm">
                                                                                        <div className="avatar-icon"><img
                                                                                            src={avatar9}
                                                                                            alt="" /></div>
                                                                                    </div>
                                                                                    <div className="avatar-icon-wrapper avatar-icon-sm">
                                                                                        <div className="avatar-icon"><img
                                                                                            src={avatar7}
                                                                                            alt="" /></div>
                                                                                    </div>
                                                                                    <div className="avatar-icon-wrapper avatar-icon-sm">
                                                                                        <div className="avatar-icon"><img
                                                                                            src={avatar8}
                                                                                            alt="" /></div>
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
                                                            <div className="swal2-success-circular-line-left" style={{ backgroundColor: 'rgb(255, 255, 255)' }}></div>
                                                            <span className="swal2-success-line-tip"></span>
                                                            <span className="swal2-success-line-long"></span>
                                                            <div className="swal2-success-ring"></div>
                                                            <div className="swal2-success-fix" style={{ backgroundColor: 'rgb(255, 255, 255)' }}></div>
                                                            <div className="swal2-success-circular-line-right" style={{ backgroundColor: 'rgb(255, 255, 255)' }}></div>
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
                        </div>
                        <div className="header-btn-lg pr-0">
                            <div className="widget-content p-0">
                                <div className="widget-content-wrapper">
                                    <div className="widget-content-left">
                                        <div className="btn-group">
                                            <a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="p-0 btn">
                                                <img width="42" className="rounded-circle" src={avatar1} alt="" />
                                                <i className="fa fa-angle-down ml-2 opacity-8"></i>
                                            </a>
                                            <div tabIndex="-1" role="menu" aria-hidden="true" className="rm-pointers dropdown-menu-lg dropdown-menu dropdown-menu-right">
                                                <div className="dropdown-menu-header">
                                                    <div className="dropdown-menu-header-inner bg-info">
                                                        <div className="menu-header-image opacity-2" style={{ backgroundImage: `url(${city3})` }}></div>
                                                        <div className="menu-header-content text-left">
                                                            <div className="widget-content p-0">
                                                                <div className="widget-content-wrapper">
                                                                    <div className="widget-content-left mr-3">
                                                                        <img width="42" className="rounded-circle"
                                                                            src={avatar1}
                                                                            alt="" />
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
                                                <div className="scroll-area-xs" style={{ height: '150px' }}>
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

const connectedTopHeaderPage = connect(mapStateToProps)(TopHeaderPage);
export { connectedTopHeaderPage as TopHeaderPage };