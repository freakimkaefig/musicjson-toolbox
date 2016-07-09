'use strict';

var expect = require('chai').expect;
var MusicJsonToolbox = require('../musicjson-toolbox');

var notes = require('./notes.json');
var intervals = require('./intervals.json');

describe('MusicJsonToolbox interval generator', function() {

  describe('.intervals', function() {
    it('creates array of intervals from array of notes', function() {
      var output = MusicJsonToolbox.intervals(notes);
      expect(JSON.stringify(output)).to.equal(JSON.stringify(intervals));
    });
  });

});

