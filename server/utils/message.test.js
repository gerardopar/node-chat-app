const expect = require('expect');

let { generateMessage } = require('./message.js');

describe('generateMessage', () => {
    it('it should generate the correct object message', () => {
        let result = generateMessage('gerardo', 'hello world');
        expect(result).toEqual({from: 'gerardo', text: 'hello world', createdAt: new Date().getTime()});
    });
});