import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import ContactCard from './ContactCard';

function ContactList(props) {
    //console.log(props)

    const inputEl = useRef("");

    const deleteContactHandler = (id) => {
        props.getContactID(id);
    }

    const getSearchTerm = () => {
        //console.log(inputEl.current.value);
        props.searchKeyWord(inputEl.current.value)
    }

    const renderContactList = props.contacts.map((contact) => {
        return <ContactCard key={contact.id} contact={contact} clickHandler={deleteContactHandler}></ContactCard>;
    });

    return (
        <div style={{ margin: "100px" }}>
            <div>
                <h3>
                    Contact List
                    <Link to="/add">
                        <button className="ui right floated primary button"> Add Contact</button>
                    </Link>
                </h3>
            </div>
            <div className="ui search">
                <div className="ui icon input">
                    <input
                        ref={inputEl}
                        type="text"
                        placeholder="Search"
                        className="prompt"
                        value={props.term}
                        onChange={getSearchTerm} />
                    <i className="search icon" />
                </div>
            </div>
            <div className="ui celled list">
                {renderContactList.length > 0 ? renderContactList : " No Contacts Available :) "}
            </div>
        </div>
    )
}

export default ContactList;
