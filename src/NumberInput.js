import React, { Component } from 'react';
  
export default class NumberInput extends React.Component{

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
                    <input type="number" list="options" placeholder={this.props.data.title} required/>
                 :
                    <input type="number" list="options" placeholder={this.props.data.title}/>
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