import { FormGroup, Input } from '@react-spectre/form';
import { Button } from '@react-spectre/button';
import React from 'react';

export default class PostCodeSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
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
        data: [],
        error: '',
        postCodeError: !this.isPostCodeValid(value)
      });
    }
  }

  async getPostCodeDetails(postcode) {
    const host = 'http://localhost:3002',
      url = `${host}/api/postcode?postcode=${postcode}`;
  
    return await (await (fetch(url))).json();
  }

  async onSubmit(event) {
    event.preventDefault();

    const postCode = this.state.postCode;

    if (this.isPostCodeValid(postCode)) {
      try {
        const { error, data = [] } = await this.getPostCodeDetails(postCode);

        this.setState({ data, error });
      } catch (error) {
        console.error('error', error);
        this.setState({ error });
      }
    } else {
      this.setState({ 
        postCodeError: true
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        { 
          this.state.error ? 
            <div class='toast toast-error'>{this.state.error.message}</div> : 
            '' 
        }
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

        {
          this.state.data.map(({ office, type, district, state}) => (
            <div class="card bg-primary m-1">
              <div class="card-header">
                <div class="card-title h5">{office}</div>
                <div class="card-subtitle">{type}</div>
              </div>
              <div class="card-body">
                {district}, {state}
              </div>
            </div>
          ))
        }
      </React.Fragment>
    );
  }
}