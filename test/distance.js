'use strict';

var expect = require('chai').expect;
var MusicJsonToolbox = require('../index');

var musicjson = require('./example.json');
var searchPitch = [1, 6, 1, 6];
var searchParsons = '*udu';
var searchIntervals = [0, 5, -5, 5];

describe('MusicJsonToolbox Distance Functions', function() {

  describe('MusicJsonToolbox.distanceParsons', function() {
    it('calculates edit-distance between parsons code strings', function() {
      var distanceParsons = MusicJsonToolbox.distanceParsons(musicjson, searchParsons);
      expect(distanceParsons).to.be.equal(9);
    });
  });

  describe('MusicJsonToolbox.distancePitch', function() {
    it('calculates edit-distance between pitch values', function() {
      var distancePitch = MusicJsonToolbox.distancePitch(musicjson, searchPitch);
      expect(distancePitch).to.be.equal(114);
    });
  });

  describe('MusicJsonToolbox.distanceIntervals', function() {
    it('calculates edit-distance between interval values', function() {
      var distancePitch = MusicJsonToolbox.distanceIntervals(musicjson, searchIntervals);
      expect(distancePitch).to.be.equal(108);
    });
  });

  describe('MusicJsonToolbox.distanceParsonsNgrams', function() {
    it('calculates edit-distance between ngrams of parsons code strings', function() {
      var distanceParsonsNgrams = MusicJsonToolbox.distanceParsonsNgrams(musicjson, searchParsons);
      var result = require('./distance_parsons_ngrams.json');
      expect(distanceParsonsNgrams).to.deep.equal(result);
    });
  });

  describe('MusicJsonToolbox.distancePitchNgrams', function() {
    it('calculates edit-distance between ngrams of pitch values', function() {
      var distancePitchNgrams = MusicJsonToolbox.distancePitchNgrams(musicjson, searchPitch);
      var result = require('./distance_pitch_ngrams.json');
      expect(distancePitchNgrams).to.deep.equal(result);
    });
  });

  describe('MusicJsonToolbox.distanceIntervalsNgrams', function() {
    it('calculates edit-distance between ngrams of intervals', function() {
      var distanceIntervalsNgrams = MusicJsonToolbox.distanceIntervalsNgrams(musicjson, searchIntervals);
      var result = require('./distance_intervals_ngrams.json');
      expect(distanceIntervalsNgrams).to.deep.equal(result);
    });
  });

});
