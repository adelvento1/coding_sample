module.exports = {


  friendlyName: 'Store event',


  description: 'Post request handler that stores a timestamp, event type, and user.',


  inputs: {
    timestamp: {
      description: 'time of action',
      type: 'number',
      required: true
    },
    user: {
      description: 'userid of user who completed action',
      type: 'number',
      required: true
    }, 
    event: {
      description: 'click || impression action',
      type: 'string',
      required: true
    }
  },


  exits: {
    success: {
      statusCode: 204
    },
  },


  fn: async function (inputs) {
    await Analytics.create(inputs)
  }


};
