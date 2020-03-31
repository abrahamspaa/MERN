import { FormGroup, Input } from '@react-spectre/form';
import { Button } from '@react-spectre/button';
import React from 'react';

export default class PostCodeSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postCode: ''
    };
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <FormGroup label="Postcode">
          <Input 
            name="postCode"
            placeholder="Ex: 6000056" 
            value={this.state.postCode} 
            onChange={event => this.handleChange(event)} />
        </FormGroup>

        <Button primary loading={false}>Search</Button>
      </form>
    );
  }
}