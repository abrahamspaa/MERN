const router = require('express').Router();

router.get('/', function(request, respond) {
  const postcode = request.query.postcode;
  const postOffices = {
    data: [
      {
        office: 'Iyyappanthangal',
        type: 'Sub Office',
        district: 'Kanchipuram',
        state: 'Tamil Nadu'
      },
      {
        office: 'Kattupakkam',
        type: 'Branch Office',
        district: 'Tiruvallur',
        state: 'Tamil Nadu'
      },
      {
        office: 'Poonamallee East',
        type: 'Sub Office',
        district: 'Tiruvallur',
        state: 'Tamil Nadu'
      },
      {
        office: 'Senneerkuppam',
        type: 'Branch Office',
        district: 'Tiruvallur',
        state: 'Tamil Nadu'
      }
    ]
  };

  if (postcode === '600056') {
    return respond.send(postOffices);
  } else {
    return respond.status(404).send({
      error: {
        message: `The ${postcode} not Found..!`
      }
    });    
  }
  
});

module.exports = router;
