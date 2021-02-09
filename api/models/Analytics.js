module.exports = {

  attributes: {
    timestamp: { type: 'number', required: true, isInteger: true },
    user: { type: 'string', required: true },
    event: { type: 'string', required: true , isIn: ['click', 'impression']},
  },

};

