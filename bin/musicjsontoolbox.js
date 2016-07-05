/* eslint-disable */
'use strict';

var program = require('commander');
var fs = require('fs');
program.version(require('../package.json').version);
program.parse(process.argv);

// ==============================
// ========== Toolbox =========
// ==============================
var MusicJsonToolbox = require('../index');
// var doc = require('../test/example.json');
var doc = require('../test/example.json');
var searchPitch = [1, 6, 1, 6];
var searchParsons = '*uuruddrdrr';
var searchIntervals = ['*', 5, -5, 5];
var searchIntervalsDuration = [
  {value: 12, rest: false, duration: 4},
  {value: 7, rest: false, duration: 4},
  {value: 12, rest: false, duration: 2},
  {value: 7, rest: false, duration: 1}
];

// var notes = MusicJsonToolbox.notes(doc, false, false);
// var parsons = MusicJsonToolbox.parsons(notes);
// var intervals = MusicJsonToolbox.intervals(MusicJsonToolbox.notes(doc, false), doc.attributes.key.fifths);
// var ngrams = MusicJsonToolbox.ngrams(notes, searchPitch.length);
// var pitchDurationValues = MusicJsonToolbox.pitchDurationValues(notes, -1, 4, 4);
// var value = MusicJsonToolbox.base12Pitch('C', 0, 4, 0, true);

// console.log(parsons);

// ==============================
// ========== DISTANCE ==========
// ==============================
// var distance = MusicJsonToolbox.distanceParsons(doc, searchParsons);
// var distance = MusicJsonToolbox.distanceParsonsNgrams(doc, searchParsons);

// var distance = MusicJsonToolbox.distancePitch(doc, searchPitch);
// var distance = MusicJsonToolbox.distancePitchNgrams(doc, searchPitch);

// var distance = MusicJsonToolbox.distanceIntervals(doc, searchIntervals);
// var distance = MusicJsonToolbox.distanceIntervalsNgrams(doc, searchIntervals);

var distance = MusicJsonToolbox.distancePitchDuration(doc, searchIntervalsDuration);
// var distance = MusicJsonToolbox.distancePitchDurationNgrams(doc, searchIntervalsDuration);

console.log(distance);

// console.log(MusicJsonToolbox.notes(doc, false, true));
// console.log(MusicJsonToolbox.pitchDurationValues(MusicJsonToolbox.notes(doc, false, true), -1, 4, 4));

// console.log(MusicJsonToolbox.weightInterval(
//   { value: 11, duration: 4},
//   { value: 2, duration: 4}
// ));
// var output = MusicJsonToolbox.weightedEditDistance(
//   [
//     {value: 1, duration: 4},
//     {value: 3, duration: 4},
//     {value: 5, duration: 2},
//     {value: 6, duration: 2}
//   ],
//   [
//     {value: 1, duration: 4},
//     {value: 6, duration: 4},
//     {value: 5, duration: 2},
//     {value: 6, duration: 1},
//     {value: 6, duration: 1}
//   ]);

// for (var i=0; i<distance.length; i++) {
//   console.log(parsons.map(function(item) {
//     return item.value;
//   }).join(' '));
// }
// fs.writeFileSync('../data/output.json',JSON.stringify(ngrams));