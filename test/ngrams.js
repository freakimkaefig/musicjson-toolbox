'use strict';

var expect = require('chai').expect;
var MusicJsonToolbox = require('../index');

var notes = require('./notes.json');
var ngrams = require('./ngrams.json');

describe('MusicJsonToolbox.ngrams', function() {

  it('creates array of ngrams from array of notes', function() {
    var output = MusicJsonToolbox.ngrams(notes, 4);
    expect(JSON.stringify(output)).to.equal(JSON.stringify(ngrams));
  });

});