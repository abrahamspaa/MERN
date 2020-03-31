import { FormGroup, Input } from '@react-spectre/form';
import { Button } from '@react-spectre/button';
import React from 'react';

export default class PostCodeSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postCode: '',
      postCodeError: false
    };
  }

  isPostCodeValid = postCode => new RegExp('^[1-9][0-9]{5}$').test(postCode);

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });

    if (name === 'postCode') {
      this.setState({ 
        postCodeError: !this.isPostCodeValid(value)
      });
    }
    
  }

  onSubmit(event) {

    if (this.isPostCodeValid(this.state.postCode)) {
      // Code for ajax
    } else {
      this.setState({ 
        postCodeError: true
      });
    }

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={event => this.onSubmit(event)}>
        <FormGroup label="Postcode" className={ this.state.postCodeError ? 'has-error' : '' }>
          <Input 
            name="postCode"
            placeholder="Ex: 6000056" 
            value={this.state.postCode} 
            onChange={event => this.handleChange(event)} />
          { 
            this.state.postCodeError ? 
              <p className='form-input-hint'>Please enter valid post code</p> : 
              '' 
          }
        </FormGroup>

        <Button primary loading={false}>Search</Button>
      </form>
    );
  }
}