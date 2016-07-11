'use strict';

var expect = require('chai').expect;
var MusicJsonToolbox = require('../musicjson-toolbox');

var musicjson = require('./example.json');

describe('MusicJsonToolbox Similarity Functions', function() {

  describe('.parsonSimilarity', function() {
    it('calculates similarity based on parsons code', function() {
      expect(MusicJsonToolbox.parsonSimilarity(musicjson, musicjson)).to.equal(0);
    });
  });

  describe('.pitchSimilarity', function() {
    it('calculates similarity based on pitch values', function() {
      expect(MusicJsonToolbox.pitchSimilarity(musicjson, musicjson)).to.equal(0);
    });
  });

  describe('.intervalSimilarity', function() {
    it('calculates similarity based on intervals', function() {
      expect(MusicJsonToolbox.intervalSimilarity(musicjson, musicjson)).to.equal(0);
    });
  });

  describe('.pitchDurationSimilarity', function() {
    it('calculates similarity based on pitch and duration values', function() {
      expect(MusicJsonToolbox.pitchDurationSimilarity(musicjson, musicjson)).to.equal(0);
    });
  });

});
