'use strict';

var expect = require('chai').expect;
var MusicJsonToolbox = require('../index');

var musicjson = require('./example.json');
var search = require('./search.json');

describe('MusicJsonToolbox Distance Functions', function() {

  describe('MusicJsonToolbox.distanceParsons', function() {
    it('calculates edit-distance between parsons code strings', function() {
      var distanceParsons = MusicJsonToolbox.distanceParsons(musicjson, search);
      expect(distanceParsons).to.be.equal(9);
    });
  });

  describe('MusicJsonToolbox.distancePitch', function() {
    it('calculates edit-distance between pitch values', function() {
      var distancePitch = MusicJsonToolbox.distancePitch(musicjson, search);
      expect(distancePitch).to.be.equal(114);
    });
  });

  describe('MusicJsonToolbox.distanceIntervals', function() {
    it('calculates edit-distance between interval values', function() {
      var distancePitch = MusicJsonToolbox.distanceIntervals(musicjson, search);
      expect(distancePitch).to.be.equal(108);
    });
  });

  describe('MusicJsonToolbox.distanceParsonsNgrams', function() {
    it('calculates edit-distance between ngrams of parsons code strings', function() {
      var distanceParsonsNgrams = MusicJsonToolbox.distanceParsonsNgrams(musicjson, search);
      var result = require('./distance_parsons_ngrams.json');
      expect(distanceParsonsNgrams).to.deep.equal(result);
    });
  });

  describe('MusicJsonToolbox.distancePitchNgrams', function() {
    it('calculates edit-distance between ngrams of pitch values', function() {
      var distancePitchNgrams = MusicJsonToolbox.distancePitchNgrams(musicjson, search);
      var result = require('./distance_pitch_ngrams.json');
      expect(distancePitchNgrams).to.deep.equal(result);
    });
  });

  describe('MusicJsonToolbox.distanceIntervalsNgrams', function() {
    it('calculates edit-distance between ngrams of intervals', function() {
      var distanceIntervalsNgrams = MusicJsonToolbox.distanceIntervalsNgrams(musicjson, search);
      var result = require('./distance_intervals_ngrams.json');
      expect(distanceIntervalsNgrams).to.deep.equal(result);
    });
  });

});
