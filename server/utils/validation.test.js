const moment = require('moment');
const expect = require('expect');

const { isRealString } = require('./validation');

describe('validation', () => {
    it('should reject non string values', () => {
        let result = isRealString(1);
        expect(result).toBe(false);
    });

    it('should reject strings with (only) white space ', () => {
        let result = isRealString('      ');
        expect(result).toBe(false);
    });

    it('should allow strings with non white spaces ', () => {
        let result = isRealString('some string');
        expect(result).toBe(true);
    });
});