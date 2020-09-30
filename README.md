# Twilio Cage
[Evervault](https://evervault.com) makes it easy to encrypt data at source, process it in a Cage — a secure, serverless function — and never store it unencrypted.

This is a simple Evervault Cage example, to help get you up and running on the Evervault platform quickly, using an external API (Twilio).

## Getting started with Evervault

Evervault consists of two parts, encrypting your data at source, using either our Node SDK, or Browser and React SDKs and then sending that encrypted data to a cage to be processed securely.

This Cage takes a payload that should contain two keys, `body` and `to`, representing the message and the number this message will be sent to.

## The steps
1. Encrypt your data at source, using either the Node SDK or Browser and React SDKs.
2. Process the encrypted data in a cage

### Encrypting at source
```javascript
// This example uses the Evervault Node SDK.
const Evervault = require('@evervault/sdk');
// Initialize the client with your team’s API key
const evervault = new Evervault('<YOUR-API-KEY>');

// Encrypt your data
const encrypted = await evervault.encrypt({ body: 'Hey there from Evervault!', to: '+3538972215123' });
```

### Process your encrypted data in a cage
You should encrypt this payload using either our Node SDK or Browser SDK, then run it in the Hello Cage:

```javascript
// Process the encrypted data in a Cage
const result = await evervault.run('twilio-cage', encrypted);
```

## Understanding the Cage
This cage is very simple, here is the full code:
```javascript
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

exports.handler = async (data) => {
  const msg = await client.messages
  .create({
     body: data.body,
     from: process.env.TWILIO_NUMBER,
     to: data.to
   });
   
   return msg;
};
```

Or check it out in [index.js](./index.js).

In this cage we are using some environment variables. `TWILIO_SID`, `TWILIO_AUTH_TOKEN` and `TWILIO_NUMBER`. You can get your own values for these by [signing up for Twilio](https://www.twilio.com/).

When you have them, you can populate them in the Cage view in the [Evervault dashboard](https://app.evervault.com).

--- 
If you want to know more about Evervault, check out our [documentation](https://docs.evervault.com).

_Note: you'll need you documentation login to access these docs for now. If you don't have one, please [join our waiting list](https://evervault.com)_
