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

class LeftMenuPage extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        const { userName, type } = this.props;

        return (
            <div className="app-sidebar sidebar-shadow">
                <div className="app-header__logo">
                    {/* <div className="logo-src"></div> */}
                    <div style={{ marginBottom: '3rem', width: '97px', height: '23px' }}>
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
                                        {
                                            type == 'Influencer' && <Link className="metismenu-icon" to={{ pathname: '/InfluencerUpdateCostPage', state: { userName: userName } }}>Update Cost</Link>
                                        }
                                    </li>
                                    <li>
                                        {
                                            type == 'Brand' && <Link className="metismenu-icon" to={{ pathname: '/RegisterCampaignPage', state: { userName: userName } }}>Create Campaign</Link>
                                        }
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="metismenu-icon pe-7s-plugin"></i>
                                    Applications
                                        <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                                </a>
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