<a name="module_MusicJsonToolbox"></a>

## MusicJsonToolbox
The MusicJsonToolbox class implements static functions to operate with musicjson objects.


* [MusicJsonToolbox](#module_MusicJsonToolbox)
    * [.notes(obj)](#module_MusicJsonToolbox.notes) ⇒ <code>Array</code>
    * [.ngrams(array, length)](#module_MusicJsonToolbox.ngrams) ⇒ <code>Array</code>
    * [.base12Pitch(step, octave, alter, absolute)](#module_MusicJsonToolbox.base12Pitch) ⇒ <code>number</code>
    * [.comparePitch(pitch1, pitch2, absolute)](#module_MusicJsonToolbox.comparePitch) ⇒ <code>number</code>
    * [.compareDuration(duration1, duration2)](#module_MusicJsonToolbox.compareDuration) ⇒ <code>number</code>
    * [.uniques(array)](#module_MusicJsonToolbox.uniques) ⇒ <code>Array</code>
    * [.distanceNgrams(object, search)](#module_MusicJsonToolbox.distanceNgrams) ⇒ <code>object</code>

<a name="module_MusicJsonToolbox.notes"></a>

### MusicJsonToolbox.notes(obj) ⇒ <code>Array</code>
Returns an array of all notes (transposed to C major).Example:[ {object}, {object}, ... ]

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>Array</code> - An array containing all notes of the given object  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | The musicjson object |

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

### MusicJsonToolbox.base12Pitch(step, octave, alter, absolute) ⇒ <code>number</code>
Calculates the base 12 represented pitch

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>number</code> - The base12 pitch number  

| Param | Type | Description |
| --- | --- | --- |
| step | <code>string</code> | The step (c, d, e, f, g, a, b) |
| octave | <code>number</code> | The octave |
| alter | <code>number</code> | The value for alter (either from accidental or key) |
| absolute | <code>bool</code> | When set, the octave is taken into account, otherwise function return relative value (from 1 to 12) |

<a name="module_MusicJsonToolbox.comparePitch"></a>

### MusicJsonToolbox.comparePitch(pitch1, pitch2, absolute) ⇒ <code>number</code>
Calculates difference between two pitches

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>number</code> - The difference between two pitches  

| Param | Type | Description |
| --- | --- | --- |
| pitch1 | <code>object</code> | The first pitch to compare |
| pitch2 | <code>object</code> | The second pitch to compare |
| absolute | <code>bool</code> | When set, the octave is taken into account, otherwise function return relative value (from 1 to 12) |

<a name="module_MusicJsonToolbox.compareDuration"></a>

### MusicJsonToolbox.compareDuration(duration1, duration2) ⇒ <code>number</code>
Calculates difference between two durations

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>number</code> - The difference between two durations  

| Param | Type | Description |
| --- | --- | --- |
| duration1 | <code>number</code> | The first duration to compare |
| duration2 | <code>number</code> | The second duration to compare |

<a name="module_MusicJsonToolbox.uniques"></a>

### MusicJsonToolbox.uniques(array) ⇒ <code>Array</code>
Returns only unique array values

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>Array</code> - Array with only unique values  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | The array with possible duplicate values |

<a name="module_MusicJsonToolbox.distanceNgrams"></a>

### MusicJsonToolbox.distanceNgrams(object, search) ⇒ <code>object</code>
Returns the minimum pseudo-edit-distance between the searched notes and corresponding ngrams

**Kind**: static method of <code>[MusicJsonToolbox](#module_MusicJsonToolbox)</code>  
**Returns**: <code>object</code> - The first finding with minimum cost  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | A musicjson object to search in |
| search | <code>Array</code> | An array of notes that should be searched |

