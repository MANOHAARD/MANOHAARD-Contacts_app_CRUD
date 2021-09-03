import React from 'react'
import { Link } from 'react-router-dom'
import user from '../images/user.png'

const ContactDetail = (props) => {
    console.log(props)
    console.log(props.history.location.state.contact)
    const { name, email } = props.history.location.state.contact
    return (
        <div className="main">
            <div className="ui card centered" style={{ marginTop: "50px" }}>
                <div className="image">
                    <img src={user} alt="user" />
                </div>
                <div className="content">
                    <div className="header">
                        <h3 className="header">{name}</h3>
                        <h4 className="description">{email}</h4>
                    </div>
                </div>
            </div>
            <div className="ui container">
                <Link to="/">
                    <button className="ui inverted orange button center aligned"> Back to Contacts List</button>
                </Link>
            </div>
        </div>
    );
};

export default ContactDetail;
