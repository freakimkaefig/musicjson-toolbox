'use strict';

var expect = require('chai').expect;
var MusicJsonToolbox = require('../index');

var notes = require('./notes.json');
var parsons = require('./parsons.json');

describe('MusicJsonToolbox.parsons', function() {

  it('creates array of parsons code from array of notes', function() {
    var output = MusicJsonToolbox.parsons(notes);
    expect(JSON.stringify(output)).to.equal(JSON.stringify(parsons));
  });

});