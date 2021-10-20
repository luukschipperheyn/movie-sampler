# movie-sampler

Samples sound effects from movies, based on subtitle files for the deaf or hard-of-hearing.

Download a movie with subtitles that have captions for noises using [square brackets] and run them through this script to generate a series of audio files trimmed to the duration of captioned noises.

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
  --help string             Print this usage guide.

```

### javascript module

```javascript
const movieSampler = require("movie-sampler");

const options = {
  video: "/path/to/video.mp4",
  subs: "/path/to/subtitles.srt",
  out: "/path/to/output/directory/",
  margin: 0,
  offset: 0
};

await movieSampler(options);
```
