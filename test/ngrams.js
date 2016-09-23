'use strict';

var expect = require('chai').expect;
var MusicJsonToolbox = require('../musicjson-toolbox');

var notes = require('./notes.json');
var ngrams = require('./ngrams.json');

describe('MusicJsonToolbox ngram generator', function() {

  describe('.ngrams', function () {
    it('creates array of ngrams from array of notes', function () {
      var output = MusicJsonToolbox.ngrams(notes, 4);
      expect(JSON.stringify(output)).to.equal(JSON.stringify(ngrams));
    });
  });

});
