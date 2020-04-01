const router = require('express').Router();
const model = require('./model');

router.get('/', async function(request, respond) {
  const postcode = request.query.postcode;

  try {
    const postOffices = await model.find({ code: postcode })

    if (postOffices && postOffices.length) {
      return respond.send({
        data: postOffices
      });
    } else {
      return respond.status(404).send({
        error: {
          message: `The ${postcode} not Found..!`
        }
      });    
    }
  } catch (error) {
    console.error(error)
    return respond.status(500).send({
      error: {
        message: `Server error ${error}`
      }
    }); 
  }
});

module.exports = router;
