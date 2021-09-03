import React, { useState, useEffect } from 'react'
import './App.css';
import Header from './Header'
import AddContact from './AddContact'
import ContactList from './ContactList'
import api from "../api/contacts-api"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ContactDetail from './ContactDetail';
import EditContact from './EditContact';

const { v4: uuid_v4 } = require('uuid');

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contactsList, setContactList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResults] = useState([]);

  // Fetching all contacts
  const contacts_lists = async () => {
    const response = await api.get("/contacts")
    return response.data;
  };

  const contactHandler = async (contact) => {
    console.log(contact);
    const request = {
      id: uuid_v4(),
      ...contact
    }

    const response = await api.post("/contacts", request);
    setContactList([...contactsList, response.data]);
  };

  const updatecontactHandler = async (contact) => {
    console.log(contact);
    const response = await api.put(`/contacts/${contact.id}`, contact);
    console.log(response.data);
    const { id, name, email } = response.data;
    setContactList(contactsList.map(contact => {
      return contact.id === id ? { ...response.data } : contact;
    }));
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContacts = contactsList.filter((contact) => {
      return contact.id !== id;
    });

    setContactList(newContacts);
  };

  const searchHandler = (searchTerm) => {
    // console.log(searchTerm)
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newSearchResults = contactsList.filter(contact => {
        return Object.values(contact)
          .join(" ").toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      console.log(newSearchResults)
      setSearchResults(newSearchResults);
    } else {
      setSearchResults(contactsList);
    }

  }

  useEffect(() => {
    // const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retrieveContacts) setContactList(retrieveContacts);
    const getAllContacts = async () => {
      const allContacts = await contacts_lists();
      //console.log(allContacts)
      if (allContacts) setContactList(allContacts);
    };

    getAllContacts();
  }, [])

  useEffect(() => {
    //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contactsList))
  }, [contactsList])

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route
            path="/"
            exact
            render={
              (props) => (
                <ContactList
                  {...props}
                  contacts={searchTerm.length < 1 ? contactsList : searchResult}
                  getContactID={removeContactHandler}
                  term={searchTerm}
                  searchKeyWord={searchHandler}
                />
              )
            }
          />

          <Route
            path="/add"
            exact
            render={
              (props) => (
                <AddContact
                  {...props}
                  contactHandler={contactHandler}
                />
              )
            }

          // component={() =>
          //   <AddContact
          //     contactHandler={contactHandler}
          //   />
          //}
          />

          <Route
            path="/contact/:id"
            component={ContactDetail}
          />

          <Route
            path="/update"
            exact
            render={
              (props) => (
                <EditContact
                  {...props}
                  updatecontactHandler={updatecontactHandler}
                />)}
          />

        </Switch>

        {/* <AddContact contactHandler={contactHandler} /> */}
        {/* <ContactList contacts={contactsList} getContactID={removeContactHandler} /> */}
      </Router>
    </div>
  );
}


export default App;
