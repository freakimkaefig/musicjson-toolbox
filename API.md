<a name="module_MusicJsonToolbox"></a>

## MusicJsonToolbox
The MusicJsonToolbox class implements static functions to operate with musicjson objects.


* [MusicJsonToolbox](#module_MusicJsonToolbox)
    * [.notes(obj)](#module_MusicJsonToolbox.notes) ⇒ <code>Array</code>
    * [.intervals(notes, keyAdjust)](#module_MusicJsonToolbox.intervals) ⇒ <code>Array</code>
    * [.parsons(notes)](#module_MusicJsonToolbox.parsons) ⇒ <code>Array</code>
    * [.ngrams(array, length)](#module_MusicJsonToolbox.ngrams) ⇒ <code>Array</code>
    * [.base12Pitch(step, keyAdjust, octave, alter, withOctave)](#module_MusicJsonToolbox.base12Pitch) ⇒ <code>number</code>
    * [.pitchDifference(pitch1, keyAdjust, pitch2, withOctave, absolute)](#module_MusicJsonToolbox.pitchDifference) ⇒ <code>number</code>
    * [.durationDifference(duration1, duration2, absolute)](#module_MusicJsonToolbox.durationDifference) ⇒ <code>number</code>
    * [.editDistance(a, b)](#module_MusicJsonToolbox.editDistance) ⇒ <code>number</code>
    * [.uniques(array)](#module_MusicJsonToolbox.uniques) ⇒ <code>Array</code>
    * [.distancePitchNgrams(object, search)](#module_MusicJsonToolbox.distancePitchNgrams) ⇒ <code>object</code>
    * [.distanceIntervalNgrams(object, search)](#module_MusicJsonToolbox.distanceIntervalNgrams) ⇒ <code>object</code>
    * [.distanceParsonsLevenshtein(object, search)](#module_MusicJsonToolbox.distanceParsonsLevenshtein) ⇒ <code>Number</code>
    * [.distanceParsonsNgramsLevenshtein(object, search)](#module_MusicJsonToolbox.distanceParsonsNgramsLevenshtein) ⇒ <code>object</code>

<a name="module_MusicJsonToolbox.notes"></a>

### MusicJsonToolbox.notes(obj) ⇒ <code>Array</code>
Returns an array of all notes (transposed to C major).Example:[ {object}, {object}, ... ]

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>Array</code> - An array containing all notes of the given object  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | The musicjson object |

<a name="module_MusicJsonToolbox.intervals"></a>

### MusicJsonToolbox.intervals(notes, keyAdjust) ⇒ <code>Array</code>
Returns an array of notes as intervalsExample:[ {0}, {2}, {-2}, {5}, ... ]

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>Array</code> - An array of notes as contour  

| Param | Type | Description |
| --- | --- | --- |
| notes | <code>Array</code> | Array of notes for which the contour should be created |
| keyAdjust | <code>number</code> | The position in circle of fifths of the searched notes |

<a name="module_MusicJsonToolbox.parsons"></a>

### MusicJsonToolbox.parsons(notes) ⇒ <code>Array</code>
Generate array of parson code from notes

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>Array</code> - An array of notes as parsons code  

| Param | Type | Description |
| --- | --- | --- |
| notes | <code>Array</code> | Array of notes for which the contour should be created |

<a name="module_MusicJsonToolbox.ngrams"></a>

### MusicJsonToolbox.ngrams(array, length) ⇒ <code>Array</code>
Generates array of ngrams in specified length (based on [https://gist.github.com/eranbetzalel/9f16b1216931e20775ad](https://gist.github.com/eranbetzalel/9f16b1216931e20775ad)).

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>Array</code> - An Array of ngrams with the given length  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | An array of notes (returned by function "notes") |
| length | <code>number</code> | The length of n |

<a name="module_MusicJsonToolbox.base12Pitch"></a>

### MusicJsonToolbox.base12Pitch(step, keyAdjust, octave, alter, withOctave) ⇒ <code>number</code>
Calculates the base 12 represented pitch

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>number</code> - The base12 pitch number  

| Param | Type | Description |
| --- | --- | --- |
| step | <code>string</code> | The step (c, d, e, f, g, a, b) |
| keyAdjust | <code>number</code> | The position in circle of fifths of the searched notes |
| octave | <code>number</code> | The octave |
| alter | <code>number</code> | The value for alter (either from accidental or key) |
| withOctave | <code>boolean</code> | When set, the octave is taken into account, otherwise function return relative value (from 1 to 12) |

<a name="module_MusicJsonToolbox.pitchDifference"></a>

### MusicJsonToolbox.pitchDifference(pitch1, keyAdjust, pitch2, withOctave, absolute) ⇒ <code>number</code>
Calculates difference between two pitches

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>number</code> - The difference between two pitches  

| Param | Type | Description |
| --- | --- | --- |
| pitch1 | <code>object</code> | The first pitch to compare |
| keyAdjust | <code>number</code> | The position in circle of fifths of the searched notes |
| pitch2 | <code>object</code> | The second pitch to compare |
| withOctave | <code>boolean</code> | When set, the octave is taken into account, otherwise function return relative value (from 1 to 12) |
| absolute | <code>boolean</code> | When set, the absolute difference is returned ( | Pitch 2 - Pitch 1 | ) |

<a name="module_MusicJsonToolbox.durationDifference"></a>

### MusicJsonToolbox.durationDifference(duration1, duration2, absolute) ⇒ <code>number</code>
Calculates difference between two durations

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>number</code> - The difference between two durations  

| Param | Type | Description |
| --- | --- | --- |
| duration1 | <code>number</code> | The first duration to compare |
| duration2 | <code>number</code> | The second duration to compare |
| absolute | <code>boolean</code> | When set, the absolute difference is returned ( | Duration 2 - Duration 1 | ) |

<a name="module_MusicJsonToolbox.editDistance"></a>

### MusicJsonToolbox.editDistance(a, b) ⇒ <code>number</code>
Edit-Distance from [https://gist.github.com/andrei-m/982927](https://gist.github.com/andrei-m/982927)Copyright (c) 2011 Andrei MackenziePermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>number</code> - The calculated edit distance  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>string</code> | The first string |
| b | <code>string</code> | The second string |

<a name="module_MusicJsonToolbox.uniques"></a>

### MusicJsonToolbox.uniques(array) ⇒ <code>Array</code>
Returns only unique array values

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>Array</code> - Array with only unique values  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | The array with possible duplicate values |

<a name="module_MusicJsonToolbox.distancePitchNgrams"></a>

### MusicJsonToolbox.distancePitchNgrams(object, search) ⇒ <code>object</code>
Returns the minimum pseudo-edit-distance between the searched notes and corresponding ngrams.Notes are represented with pitch and duration

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>object</code> - The first finding with minimum cost  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | A musicjson object to search in |
| search | <code>Array</code> | An array of notes that should be searched |

<a name="module_MusicJsonToolbox.distanceIntervalNgrams"></a>

### MusicJsonToolbox.distanceIntervalNgrams(object, search) ⇒ <code>object</code>
Returns the minimum distance between the searched notes and the corresponding ngrams.Notes are represented as intervals.

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>object</code> - The first finding with minimum cost  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | A musicjson object to search in |
| search | <code>Array</code> | An array of notes that should be searched |

<a name="module_MusicJsonToolbox.distanceParsonsLevenshtein"></a>

### MusicJsonToolbox.distanceParsonsLevenshtein(object, search) ⇒ <code>Number</code>
Returns minimum edit distance between searched notes and the given document.

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>Number</code> - The edit distance between parsons codes  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | A musicjson object to search in |
| search | <code>Array</code> | An array of notes that should be searched |

<a name="module_MusicJsonToolbox.distanceParsonsNgramsLevenshtein"></a>

### MusicJsonToolbox.distanceParsonsNgramsLevenshtein(object, search) ⇒ <code>object</code>
Returns minimum edit distance between searched notes and the corresponding ngrams.Notes are represented in parsons code.

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>object</code> - The first finding with minimum cost  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | A musicjson object to search in |
| search | <code>Array</code> | An array of notes that should be searched |

