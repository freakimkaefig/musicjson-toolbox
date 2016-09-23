'use strict';

var expect = require('chai').expect;
var MusicJsonToolbox = require('../musicjson-toolbox');

var musicjson = require('./example.json');
var notes = require('./notes.json');
var notesRepeated = require('./notes_repeated.json');
var notesWithRests = require('./notes_with_rests.json');

describe('MusicJsonToolbox notes generator', function() {

  describe('.notes', function () {
    it('creates array of notes from musicjson', function () {
      var output = MusicJsonToolbox.notes(musicjson, false, false);
      expect(output).to.deep.equal(notes);
    });

    it('creates array of repeated notes from musicjson', function () {
      var output = MusicJsonToolbox.notes(musicjson, true, false);
      expect(output).to.deep.equal(notesRepeated);
    });

    it('creates array of repeated notes from musicjson', function () {
      var output = MusicJsonToolbox.notes(musicjson, false, true);
      expect(output).to.deep.equal(notesWithRests);
    });
  });

});
