import React, { Component } from 'react';
import MapsView from './MapsView'
import TextInput from './TextInput'
import NumberInput from './NumberInput';
import io from 'socket.io-client';
import server from './config/config';
import {Collapse} from 'react-bootstrap'
var update = require('immutability-helper');



export default class Form extends React.Component {

    constructor(props){
        super(props);
        this.state = {open: true, submittedData : [], formId : props.data.id, formDescriptor : props.data }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeElementValue = this.changeElementValue.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        this.socket = io(server);
    }

    handleSubmit(event){

        event.preventDefault()
        

        fetch(`${server}/api/submit`, 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: this.state.formId,
                    data: this.state.submittedData
                    }
                )
            }
        ).then();

        
    }

    changeElementValue(name, valuee){
       
        var index = this.state.submittedData.findIndex(function(c) { 
            return c.name == name; 
        });

        if(index !== -1){
            this.state.submittedData.splice(index, 1);
        }
    
        var object = {
            name : name,
            value : valuee
        }
        var joined = this.state.submittedData.concat(object);
        this.setState({ submittedData: joined}) 
             
    }
    
    toggle(e) {
        this.setState({
          open: !this.state.open
        });
      }

    render() {
        
        return (
            <div>
                <p onClick={(e)=>this.toggle(e)}>{this.props.title}</p>
                {this.state.open === true &&
                    <form  onSubmit={this.handleSubmit}>
                    <p>{this.state.formDescriptor.title}</p>
                    {this.state.formDescriptor.fields.map((element) => (
                        <div>
                            {element.type === "Text" && 
                                <TextInput data={element} onValueChanged={this.changeElementValue}/>
                            }
                            {element.type === "Number" && 
                                <div>
                                    <NumberInput data={element}/>                                         
                                </div>
                            }
                            {element.type === "Location" && 
                                <div height="auto" width="auto">
                                    <MapsView/>
                                </div>
                            }

                            {element.type === "Date" && 
                                <div>
                                    { (typeof element.required != 'undefined' && element.required === true) ?
                                        <input type="date" placeholder={element.title} required/>
                                        :
                                        <input type="date" placeholder={element.title}/>
                                    }  
                                </div>
                            }
                        </div>
                    ))}
                
                    <input type="submit" value="Submit"/>
                </form>}
            </div>
        );
      }

}
