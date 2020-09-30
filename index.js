const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

exports.handler = async (data) => {
  console.log(`Sending SMS to ${data.to}`);
  console.log('Test');
  const msg = await client.messages
  .create({
     body: data.body,
     from: process.env.TWILIO_NUMBER,
     to: data.to
   });
   
   return msg;
};
