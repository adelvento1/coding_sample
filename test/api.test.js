var sails = require('sails');

before(function(done) {

  this.timeout(5000);

  sails.lift({
    log: { level: 'warn' }

  }, function(err) {
    if (err) { return done(err); }
    Analytics.createEach([
      {timestamp: 1581454200000, user: '284656', event: 'click'}, //Tuesday, February 11, 2020 8:50:00 PM
      {timestamp: 1581454200000, user: '284656', event: 'impression'}, //Tuesday, February 11, 2020 8:50:00 PM
      {timestamp: 1581377220000, user: '295744', event: 'click'}, //Monday, February 10, 2020 11:27:00 PM
      {timestamp: 1581379199000, user: '282786', event: 'click'}, //Monday, February 10, 2020 11:59:59 PM
      {timestamp: 1581452820000, user: '2849573', event: 'click'}, //Tuesday, February 11, 2020 8:27:00 PM
      {timestamp: 1581463620000, user: '284656', event: 'impression'}, //Tuesday, February 11, 2020 11:27:00 PM

      {timestamp: 1514811599999, user: '284656', event: 'impression'}, //Jan 1 2018 0:59:59.999 AM
      {timestamp: 1514811600000, user: '284656', event: 'impression'}, //Jan 1 2018 1:00:00.000 AM
      {timestamp: 1514811600001, user: '284656', event: 'impression'}, //Jan 1 2018 1:00:00.001 AM
  ]).then(() => done())
  });
});

after(function(done) {

  sails.lower(done);

});