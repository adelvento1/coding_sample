module.exports = {


  friendlyName: 'Get Analytics Report',

  description: 'Retrieve aggregate counts of users, clicks, and impressions within the hour of the given timestamp',


  inputs: {
    timestamp: {
      type: 'number',
      required: true
    }
  },


  exits: {
    success: {}
  },


  fn: async function ({timestamp}) {

    const miliInHr = 1000 * 60 * 60;
    const initialHour = timestamp - (timestamp % miliInHr);
    const hourLimit = initialHour + miliInHr;

    const allTimestamps = await Analytics.find({timestamp: { '>=': initialHour,  '<':  hourLimit}});

    const usersCount = [...new Set(allTimestamps.map(data => data.user))].length;
    const events = allTimestamps.map(data => data.event);
    const clicksCount = events.filter(event => event === "click").length;
    const impressionsCount = events.filter(event => event === "impression").length;

    return {
      uniqueUsers: usersCount, 
      clicks: clicksCount,
      impressions: impressionsCount
    };
  }

};
