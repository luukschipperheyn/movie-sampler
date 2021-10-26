#!/usr/bin/env node

const commandLineArgs = require("command-line-args");
const commandLineUsage = require("command-line-usage");
const process = require("process");
const movieSampler = require("../lib/movie-sampler");

const sections = [
  {
    header: "movie-sampler",
    content:
      "samples sound effects from movies, based on subtitle files for the deaf or hard-of-hearing that contain noise captions",
  },
  {
    header: "Synopsis",
    content: [
      "$ movie-sampler {bold --video} {underline /path/to/video/file.mp4} {bold --subs} {underline /path/to/subtitle/file.srt} {bold --out} {underline /path/to/output/directory/}",
    ],
  },
  {
    header: "Options",
    optionList: [
      {
        name: "video",
        typeLabel: "{underline file} <required>",
        description: "path to video file",
      },
      {
        name: "subs",
        typeLabel: "{underline file} <required>",
        description: "path to subtitle (.srt) file",
      },
      {
        name: "out",
        typeLabel: "{underline path} <required>",
        description: "path to output samples",
      },
      {
        name: "margin",
        typeLabel: "{underline seconds}",
        description:
          "make longer samples. Adds [margin] seconds to start and to end of each sample.",
      },
      {
        name: "offset",
        typeLabel: "{underline seconds}",
        description: "offsets subtitles by [offset] seconds",
      },
      {
        name: "ffmpegPath",
        typeLabel: "{underline path}",
        description: "path to ffmpeg executable",
      },
      {
        name: "regex",
        typeLabel: "{underline string}",
        description: "regular expression for selecting lines to sample",
      },
      {
        name: "query",
        typeLabel: "{underline string}",
        description: "selects lines to sample if they contain query string",
      },
      {
        name: "help",
        description: "Print this usage guide.",
      },
    ],
  },
];

const optionDefinitions = [
  { name: "video", type: String },
  { name: "subs", type: String },
  { name: "out", type: String },
  { name: "margin", type: Number },
  { name: "ffmpegPath", type: String },
  { name: "regex", type: String },
  { name: "query", type: String },
  { name: "help", alias: "h", type: Boolean },
];
const options = commandLineArgs(optionDefinitions);

if (options.help) {
  const usage = commandLineUsage(sections);
  console.log(usage);
  process.exit(0);
}
console.log("");
movieSampler(options)
  .then(() => {
    console.log("done\n");
    process.exit(0);
  })
  .catch((e) => {
    console.error(e.message);
    console.log('run "movie-sampler --help" for instructions\n');
    process.exit(1);
  });
