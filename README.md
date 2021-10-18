# movie-sampler

Samples sound effects from movies, based on [ Subtitles for the Deaf or Hard-of-Hearing ].

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

```bash
movie-sampler --video /path/to/video.mp4 --subs /path/to/subs.srt --out /output/directory
```
