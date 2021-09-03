import React from 'react'
import { Link } from 'react-router-dom';
import user from '../images/user.png'

const ContactCard = (props) => {
    const { id, name, email } = props.contact;

    return (
        <div className="main">
            <div className="ui celled centered">
                <div className="image">
                    <img className="ui avatar image" alt="user" src={user} />
                </div>

                <div className="context">
                    <div className="header">
                        <Link to={{ pathname: `/contact/${id}`, state: { contact: props.contact } }}>
                            <h3> {name}</h3>
                            <h4>{email}</h4>
                        </Link>
                    </div>
                </div>
                <i className="trash alternate outline icon"
                    style={{ color: "red", marginTop: "7px", alignContent: 'end' }}
                    onClick={() => props.clickHandler(id)}></i>

                <Link to={{ pathname: `/update`, state: { contact: props.contact } }}>
                    <i className="edit alternate outline icon"
                        style={{ color: "green", marginTop: "7px", alignContent: 'end' }}></i>
                </Link>
            </div >
        </div>
    );
};

export default ContactCard;