# movie-sampler

Samples sound effects from movies, based on subtitle files.

Download a movie with subtitles that have noise captions and run them through
this script to generate a series of audio files trimmed to the duration of
captioned noises.

If you want to select lines to sample based on other conditions, you can also
supply a query string or regex.

### Prerequisites

#### ffmpeg and ffprobe

Check out [node-fluent-ffmpeg's docs](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg#prerequisites) for installation instructions.

## Installation

with npm

```bash
npm install -g movie-sampler
```

with yarn

```bash
yarn global add movie-sampler
```

## Usage

### cli

```bash
Synopsis

  $ movie-sampler --video /path/to/video/file.mp4 --subs
  /path/to/subtitle/file.srt --out /path/to/output/directory/

Options

  --video file <required>   path to video file
  --subs file <required>    path to subtitle (.srt) file
  --out path <required>     path to output samples
  --margin seconds          make longer samples. Adds [margin] seconds to start 
                            and to end of each sample.
  --offset seconds          offsets subtitles by [offset] seconds
  --ffmpegPath path         path to ffmpeg executable                   
  --regex string            regular expression for selecting lines to sample
  --query string            selects lines to sample if they contain query string
  --help string             Print this usage guide.

```

### javascript module

```javascript
const movieSampler = require("movie-sampler");

const options = {
  video: "/path/to/video.mp4",
  subs: "/path/to/subtitles.srt",
  out: "/path/to/output/directory/"
};

await movieSampler(options);
```

or with more config:

```javascript
const movieSampler = require("movie-sampler");

const options = {
  video: "/path/to/video.mp4",
  subs: "/path/to/subtitles.srt",
  out: "/path/to/output/directory/",
  margin: 0.5,
  offset: 1,
  ffmpegPath: '/path/to/ffmpeg/binary',
  query: 'damn', // regex and query can't be used simultaneously
  regex: '^\S*$' // regex and query can't be used simultaneously
};

await movieSampler(options);
```
