var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('Generate Message Object', () => {
        var from = "TestUser";
        var text = "Test Text";
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    });
});

describe('generateLocationMessage', () => {
    it('Generate Location Message Object', () => {
        var from = "TestUser";
        var lat = 30.2560595;
        var long = -97.74624;
        var url = `https://www.google.com/maps?q=${lat},${long}`;

        var message = generateLocationMessage(from, lat, long);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url});
    });
});
