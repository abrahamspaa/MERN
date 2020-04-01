const { model, Schema } = require('mongoose');

module.exports =  model('postpin', new Schema({
  code: {
    type: Number,
    required: 'Post code is missing'
  },
  office: {
    type: String, 
    required: 'Post office is missing'
  },
  district: {
    type: String, 
    required: 'Post district is missing'
  },
  state: {
    type: String, 
    required: 'Post state is missing'
  },
  type: {
    type: String, 
    required: 'Type of post office is missing'
  }
}));