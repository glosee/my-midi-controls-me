# My MIDI controls me

This is an attempt at making a very simple synth in the browser.

It is a learning exercise in the Web MIDI and Web Audio APIs.

The intention is to be able to make sounds in the browser, and to tweak them using UI controls and potentially a MIDI controller.

## Goals

* ~~Create sounds in the browser~~
* ~~Capture MIDI input in the browser from my keyboard~~
* ~~Map MIDI input to notes~~
* ~~Ability to change wave form type~~
* Play different notes with the qwerty keyboard
* Adjust frequency and gain with knobs on midi controller
* Play with filters
* Ability to use pitch bend on midi controller
* Have multiple synth playing at the same time

## Resources

* [Making Music in the Browser – Web Audio API, Part 1](https://www.keithmcmillen.com/blog/making-music-in-the-browser-web-audio-api-part-1/)
* [Making Music in the Browser – Web MIDI API](https://www.keithmcmillen.com/blog/making-music-in-the-browser-web-midi-api/)
* [Web Audio API Docs on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

## How to use

*NOTE*: Assumes `node@7.x` and `npm@3.10.x`.

```
$ git clone `this repo` && cd my-midi-controls-me
$ npm install
$ npm run dev
```
