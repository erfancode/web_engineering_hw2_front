import React, { Component } from 'react';
  
export default class DateInput extends React.Component{

    constructor(props){

        super(props);

        this.valueChanged = this.valueChanged.bind(this);
    }

    valueChanged(event){
        this.props.onValueChanged(this.props.data.name, event.target.value)
    }

    render() {

        var isRequired = false;
        var hasOptions =false;
        var options = [];

        if(typeof this.props.data.required != 'undefined' && this.props.data.required === true){
            isRequired = true;
        }

        if((typeof this.props.data.options) != "undefined"){
            hasOptions = true;
            options = this.props.data.options;
        }

        return (
            
            <div>
            
                {isRequired ?  
                    <input type="date" onChange={this.valueChanged} placeholder={element.title} required/>
                 :
                    <input type="date" onChange={this.valueChanged} placeholder={element.title}/>
                }    
                
                {hasOptions  && 
                    <datalist id="options">
                        {options.map((element) => (
                            <option value={element.value} />
                        ))}
                    </datalist>
                }            
            </div>
        );
    }

}