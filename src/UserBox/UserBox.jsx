import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    DropdownToggle, DropdownMenu,
    Nav, Button, NavItem, NavLink,
    UncontrolledTooltip, UncontrolledButtonDropdown
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import avatar1 from '../assets/images/avatars/1.jpg';
import {
    faAngleDown
} from '@fortawesome/free-solid-svg-icons';

class UserBox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeSearch: false,
            searchValue: ''
        };
        this.handleChange = this.handleChange.bind(this);
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
                <div className="header-btn-lg pr-0">
                    <div className="widget-content p-0">
                        <div className="widget-content-wrapper">
                            <div className="widget-content-left">
                                <UncontrolledButtonDropdown>
                                    <DropdownToggle color="link" className="p-0">
                                        <img width={42} className="rounded-circle" src={avatar1} alt="" />
                                        <FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown} />
                                    </DropdownToggle>
                                    <DropdownMenu right className="rm-pointers dropdown-menu-lg">
                                        <Nav vertical>
                                            <NavItem className="nav-item-header">
                                                Activity
                                            </NavItem>
                                            <NavItem>
                                                <Link to="/login">Logout</Link>
                                            </NavItem>
                                        </Nav>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
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

const connectedUserBox = connect(mapStateToProps)(UserBox);
export { connectedUserBox as UserBox };