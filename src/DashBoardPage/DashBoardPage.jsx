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
import { LeftMenuPage } from '../LeftMenuPage';
import { TopHeaderPage } from '../TopHeaderPage';


class DashBoardPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: ''
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

    componentDidMount() {
        const { dispatch } = this.props;
        if (this.props.location.state) {
            const { userName } = this.props.location.state;
            this.setState({ userName: userName });
            //dispatch(brandActions.getBrandFromBrandPage(brand));
            //dispatch(campaignActions.getAll());
            //dispatch(infActions.getAllJobCategories());
        }
        else {
            history.push('/');
        }

    }

    // handleDeletecampaign(id) {
    //     return (e) => this.props.dispatch(campaignActions.delete(id));
    // }

    render() {
        const { userName } = this.state;

        return (
            <div>
                <TopHeaderPage />
                <div className="app-main">
                    <LeftMenuPage userName={userName} />
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
                                                        <div className="progress-bar bg-primary" role="progressbar" aria-valuenow="71" aria-valuemin="0" aria-valuemax="100" style={{ width: '71%' }}></div>
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
                                                        <div className="progress-bar bg-danger" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100" style={{ width: '85%' }}></div>
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
                                                        <div className="progress-bar bg-success" role="progressbar" aria-valuenow="46" aria-valuemin="0" aria-valuemax="100" style={{ width: '46%' }}></div>
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
                                                        <div className="progress-bar bg-info" role="progressbar" aria-valuenow="54" aria-valuemin="0" aria-valuemax="100" style={{ width: '54%' }}></div>
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
                                        <div className="card-header-title font-size-lg text-capitalize font-weight-normal"><i className="header-icon lnr-dice mr-3 text-muted opacity-6"> </i>Easy Dynamic Tables
                                    </div>
                                    </div>
                                    <div className="card-body">
                                        <Grid
                                            rows={[
                                                { id: 0, product: 'DevExtreme', owner: 'DevExpress' },
                                                { id: 1, product: 'DevExtreme Reactive', owner: 'DevExpress' },
                                            ]}
                                            columns={[
                                                { name: 'id', title: 'ID' },
                                                { name: 'product', title: 'Product' },
                                                { name: 'owner', title: 'Owner' },
                                            ]}>
                                            <Table />
                                            <TableHeaderRow />
                                        </Grid>
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
                                                                                    <img width="42" className="rounded-circle" src={avatar9} alt="" />
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
                                                                                    <img width="42" className="rounded-circle" src={avatar5} alt="" />
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
                                                                                    <img width="42" className="rounded-circle" src={avatar4} alt="" />
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
                                                                                    <img width="42" className="rounded-circle" src={avatar3} alt="" />
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
                                                                                    <img width="42" className="rounded-circle" src={avatar2} alt="" />
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
                                                                            <img width="42" className="rounded-circle" src={avatar8} alt="" />
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
                                                            <div className="menu-header-image opacity-1" style={{ backgroundImage: `url(${city3})` }}></div>
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
                                            <div className="dots-separator"></div>
                                            <div className="dropdown">
                                                <a className="dot-btn-wrapper" aria-haspopup="true" data-toggle="dropdown" aria-expanded="false">
                                                    <i className="dot-btn-icon lnr-earth icon-gradient bg-happy-itmeo">
                                                    </i>
                                                </a>
                                                <div tabIndex="-1" role="menu" aria-hidden="true" className="rm-pointers dropdown-menu">
                                                    <div className="dropdown-menu-header">
                                                        <div className="dropdown-menu-header-inner pt-4 pb-4 bg-focus">
                                                            <div className="menu-header-image opacity-05" style={{ backgroundImage: `url(${city2})` }}></div>
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
                                                            <div className="menu-header-image" style={{ backgroundImage: `url(${abstract4})` }}></div>
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

const connectedDashBoardPage = connect(mapStateToProps)(DashBoardPage);
export { connectedDashBoardPage as DashBoardPage };