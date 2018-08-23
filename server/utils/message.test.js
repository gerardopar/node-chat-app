const expect = require('expect');

let { generateMessage, generateLocationMessage } = require('./message.js');

describe('generateMessage', () => {
    it('it should generate the correct object message', () => {
        let result = generateMessage('gerardo', 'hello world');
        expect(result).toEqual({from: 'gerardo', text: 'hello world', createdAt: new Date().getTime()});
    });
});

describe('generate location message', () => {
    it('should generate correct location object', () => {
        let from = 'admin';
        let latitude = 1;
        let longitude = 2;
        let result = generateLocationMessage(from, latitude, longitude);
        expect(result).toEqual({
            from: from,
            url: `https://www.google.com/maps?q=${latitude},${longitude}`,
            createdAt: new Date().getTime()
        });
    });
});