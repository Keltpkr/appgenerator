process.env.NODE_ENV = 'test';

var chai = require('chai');
var expect = require('chai').expect;

describe('Plural to Singular', function() {
    describe('-ses', function() {
        var plural = require('../app/lib/plural')
        it('should return adress', function() {
            var response = plural.getSingular('adresses');
            expect(response).to.equal('adress');
        });
    });
    describe('-ies', function() {
        var plural = require('../app/lib/plural')
        it('should return country', function() {
            var response = plural.getSingular('countries');
            expect(response).to.equal('country');
        });
    });
    describe('-ches', function() {
        var plural = require('../app/lib/plural')
        it('should return branch', function() {
            var response = plural.getSingular('branches');
            expect(response).to.equal('branch');
        });
    });
    describe('-shes', function() {
        var plural = require('../app/lib/plural')
        it('should return brush', function() {
            var response = plural.getSingular('brushes');
            expect(response).to.equal('brush');
        });
    });
    describe('-ves', function() {
        var plural = require('../app/lib/plural')
        it('should return life', function() {
            var response = plural.getSingular('lives');
            expect(response).to.equal('life');
        });
    }); 
    describe('Exceptions', function() {
        var plural = require('../app/lib/plural')
        it('should return ellipsis', function() {
            var response = plural.getSingular('ellipses');
            expect(response).to.equal('ellipsis');
        });
    });
    describe('Aircraft', function() {
        var plural = require('../app/lib/plural')
        it('should return aircraft', function() {
            var response = plural.getSingular('aircraft');
            expect(response).to.equal('aircraft');
        });
    });
    describe('Sheep', function() {
        var plural = require('../app/lib/plural')
        it('should return sheep', function() {
            var response = plural.getSingular('sheep');
            expect(response).to.equal('sheep');
        });
    });
});