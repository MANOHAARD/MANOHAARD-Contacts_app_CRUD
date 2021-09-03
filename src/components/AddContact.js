import React, { Component } from 'react'

class AddContact extends Component {
    state = {
        name: "",
        email: "",
    }

    addContact = (e) => {
        e.preventDefault();
        if (this.state.name === "" || this.state.email === "") {
            alert("All fields are required");
            return;
        }
        this.props.contactHandler(this.state);
        this.setState({ name: "", email: "" });
        this.props.history.push("/");
    }
    render() {
        return (
            <div className="ui main">
                <h2> Add Contact</h2>
                <form method="post" className="ui form" onSubmit={this.addContact}>
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
                    <button className="ui button blue"> Add </button>
                </form>
            </div>
        )
    }
}

export default AddContact
