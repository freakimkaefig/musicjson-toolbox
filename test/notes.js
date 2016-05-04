'use strict';

var expect = require('chai').expect;
var MusicJsonToolbox = require('../index');

var musicjson = require('./example.json');
var notes = require('./notes.json');

describe('MusicJsonToolbox.notes', function() {

  it('creates array of notes from musicjson', function() {
    var output = MusicJsonToolbox.notes(musicjson);
    expect(JSON.stringify(output)).to.equal(JSON.stringify(notes));
  });

});
