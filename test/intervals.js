'use strict';

var expect = require('chai').expect;
var MusicJsonToolbox = require('../index');

var notes = require('./notes.json');
var intervals = require('./intervals.json');

describe('MusicJsonToolbox.intervals', function() {

  it('creates array of intervals from array of notes', function() {
    var output = MusicJsonToolbox.intervals(notes, 0);
    expect(JSON.stringify(output)).to.equal(JSON.stringify(intervals));
  });

});
