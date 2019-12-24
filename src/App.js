import React, { Component } from 'react';
import './App.css';
import Form from './Form'


class App extends Component{

    constructor(props) {
        super(props);
        this.state = { forms: [], formDescriptors : []};
    }



    getForms() {
        fetch("http://web-engineering-hw2.herokuapp.com/api/forms")
            .then(res => res.json())
            .then(res => {

                this.setState({ forms: res.data})

                this.state.forms.forEach(element => {
                    this.getformDescriptor(element.id)
                })
            });
    }

    componentDidMount() {
        this.getForms();

    }

    getformDescriptor(formId){

        fetch("http://web-engineering-hw2.herokuapp.com/api/forms/" + formId)
            .then(res => res.json())
            .then((json) => {
                var joined = this.state.formDescriptors.concat(json.data);
                this.setState({ formDescriptors: joined })
            });
    }

    sendDataToServer(){

    }

    render() {
        return (
            <div id="root" className="App">                
                {this.state.formDescriptors.map((formDescriptor) => (
                    <div className="card">
                        <div className="card-body">
                            <Form data={formDescriptor}/>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default App;
