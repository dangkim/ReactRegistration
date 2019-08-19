import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    DropdownToggle, DropdownMenu,
    Nav, Button, NavItem,
    UncontrolledTooltip, UncontrolledButtonDropdown
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import avatar1 from '../assets/images/avatars/1.jpg';

class HeaderLogo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeSearch: false,
            searchValue: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.toggleEnableClosedSidebar = this.toggleEnableClosedSidebar.bind(this);
    }

    toggleEnableClosedSidebar = () => {
        let { enableClosedSidebar, setEnableClosedSidebar } = this.props;
        setEnableClosedSidebar(!enableClosedSidebar);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { searchValue } = this.state;
        this.setState({
            [name]: value
        });
    }

    render() {
        const { searchValue, activeSearch } = this.state;
        return (
            <Fragment>
                <div className="app-header__logo">
                    <div className="logo-src" />
                    <div className="header__pane ml-auto">
                        <div onClick={this.toggleEnableClosedSidebar}>
                            <Hamburger
                                active={enableClosedSidebar}
                                type="elastic"
                                onClick={() => this.setState({ active: !this.state.active })}
                            />
                        </div>
                    </div>
                </div>
                <AppMobileMenu />
            </Fragment>
        )
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

const connectedHeaderLogo = connect(mapStateToProps)(HeaderLogo);
export { connectedHeaderLogo as HeaderLogo };