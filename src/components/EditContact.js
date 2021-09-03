import React, { Component } from 'react'

class EditContact extends Component {
    constructor(props) {
        super(props)
        const { id, name, email } = props.location.state.contact

        this.state = {
            id,
            name,
            email,
        };
    }


    updateContact = (e) => {
        e.preventDefault();
        if (this.state.name === "" || this.state.email === "") {
            alert("All fields are required");
            return;
        }
        this.props.updatecontactHandler(this.state);
        this.setState({ name: "", email: "" });
        this.props.history.push("/");
    }
    render() {
        return (
            <div className="ui main">
                <h2> Edit Contact</h2>
                <form method="post" className="ui form" onSubmit={this.updateContact}>
                    <div className="field">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={(e) => this.setState({ name: e.target.value })}
                            placeholder="Enter Name" />
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={this.state.email}
                            onChange={(e) => this.setState({ email: e.target.value })} />
                    </div>
                    <button className="ui button blue"> Update </button>
                </form>
            </div>
        )
    }
}

export default EditContact;
