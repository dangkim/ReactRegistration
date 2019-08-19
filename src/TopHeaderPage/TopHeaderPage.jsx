import React, { Component }  from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import avatar1 from '../assets/images/avatars/1.jpg';

//import { campaignActions } from '../_actions';
import { campaignActions, infActions, brandActions } from '../_actions';
import cx from 'classnames';
import { SearchBox } from '../SearchBox';
import { UserBox } from '../UserBox';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class TopHeaderPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
        };
    }

    render() {

        //backgroundColor: 'bg-royal sidebar-text-light',
        const headerBackgroundColor = 'bg-strong-bliss header-text-light';
        const enableMobileMenuSmall = '';
        // enableBackgroundImage: true,
        // enableClosedSidebar: false,
        // enableFixedHeader: true,
        const enableHeaderShadow = true;
        // enableSidebarShadow: true,
        // enableFixedFooter: true,
        // enableFixedSidebar: true,
        // colorScheme: 'white',
        // backgroundImage: sideBar6,
        // backgroundImageOpacity: 'opacity-06',
        // enablePageTitleIcon: true,
        // enablePageTitleSubheading: true,
        // enablePageTabsAlt: false,
        return (
                <ReactCSSTransitionGroup
                    component="div"
                    className={cx("app-header", headerBackgroundColor, { 'header-shadow': enableHeaderShadow })}
                    transitionName="HeaderAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={1500}
                    transitionEnter={false}
                    transitionLeave={false}>

                    {/* <HeaderLogo /> */}

                    <div className={cx(
                        "app-header__content",
                        { 'header-mobile-open': enableMobileMenuSmall },
                    )}>
                        <div className="app-header-left">
                            <SearchBox />
                        </div>
                        <div className="app-header-right">
                            <UserBox />
                        </div>
                    </div>
                </ReactCSSTransitionGroup>
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