'use strict';

var expect = require('chai').expect;
var MusicJsonToolbox = require('../index');

var musicjson = require('./example.json');
var searchPitch = [1, 6, 1, 6];
var searchParsons = '*udu';
var searchIntervals = ['*', 5, -5, 5];
var searchPitchDuration = [
  {value: 49, duration: 0.25},
  {value: 54, duration: 0.5},
  {value: 49, duration: 0.125},
  {value: 54, duration: 0.125}
];

describe('MusicJsonToolbox Distance Functions', function() {

  describe('.distanceParsons', function() {
    it('calculates edit-distance between parsons code strings', function() {
      var distanceParsons = MusicJsonToolbox.distanceParsons(musicjson, searchParsons);
      expect(distanceParsons).to.be.equal(8);
    });
  });

  describe('.distancePitch', function() {
    it('calculates edit-distance between pitch values', function() {
      var distancePitch = MusicJsonToolbox.distancePitch(musicjson, searchPitch);
      expect(distancePitch).to.be.equal(11);
    });
  });

  describe('.distanceIntervals', function() {
    it('calculates edit-distance between interval values', function() {
      var distancePitch = MusicJsonToolbox.distanceIntervals(musicjson, searchIntervals);
      expect(distancePitch).to.be.equal(8);
    });
  });

  describe('.distancePitchDurations', function() {
    it('calculates weighted edit-distance between pitch & duration values', function() {
      var distancePitchDuration = MusicJsonToolbox.distancePitchDuration(musicjson, searchPitchDuration);
      expect(distancePitchDuration).to.be.equal(16);
    });
  });

  describe('.distanceParsonsNgrams', function() {
    it('calculates edit-distance between ngrams of parsons code strings', function() {
      var distanceParsonsNgrams = MusicJsonToolbox.distanceParsonsNgrams(musicjson, searchParsons);
      var result = require('./distance_parsons_ngrams.json');
      expect(distanceParsonsNgrams).to.deep.equal(result);
    });
  });

  describe('.distancePitchNgrams', function() {
    it('calculates edit-distance between ngrams of pitch values', function() {
      var distancePitchNgrams = MusicJsonToolbox.distancePitchNgrams(musicjson, searchPitch);
      var result = require('./distance_pitch_ngrams.json');
      expect(distancePitchNgrams).to.deep.equal(result);
    });
  });

  describe('.distanceIntervalsNgrams', function() {
    it('calculates edit-distance between ngrams of intervals', function() {
      var distanceIntervalsNgrams = MusicJsonToolbox.distanceIntervalsNgrams(musicjson, searchIntervals);
      var result = require('./distance_intervals_ngrams.json');
      expect(distanceIntervalsNgrams).to.deep.equal(result);
    });
  });

  describe('.distancePitchDurationsNgrams', function() {
    it('calculates weighted edit-distance between pitch & duration values', function() {
      var distancePitchDurationNgrams = MusicJsonToolbox.distancePitchDurationNgrams(musicjson, searchPitchDuration);
      var result = require('./distance_pitch_duration_ngrams.json');
      expect(distancePitchDurationNgrams).to.deep.equal(result);
    });
  });

});
