#!/usr/bin/env node

const commandLineArgs = require('command-line-args')
const commandLineUsage = require('command-line-usage')
const process = require('process')
const movieSampler = require('../lib/movie-sampler')

const sections = [
    {
        header: 'movie-sampler',
        content: 'samples sound effects from movies, based on [ Subtitles for the Deaf or Hard-of-Hearing ]'
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'video',
                typeLabel: '{underline file}',
                description: 'path to video file'
            },
            {
                name: 'subs',
                typeLabel: '{underline file}',
                description: 'path to subtitle (.srt) file'
            },
            {
                name: 'out',
                typeLabel: '{underline path}',
                description: 'path to output samples'
            },
            {
                name: 'help',
                description: 'Print this usage guide.'
            }
        ]
    }
]

const optionDefinitions = [
    { name: 'video', type: String },
    { name: 'subs', type: String },
    { name: 'out', type: String },
    { name: 'help', alias: 'h', type: Boolean }
]
const options = commandLineArgs(optionDefinitions)

if (options.help) {
    const usage = commandLineUsage(sections)
    console.log(usage)
    process.exit(0)
}
console.log('')
movieSampler(options)
    .then(() => {
        console.log('done\n');
        process.exit(0);
    })
    .catch(e => {
        console.error(e.message);
        console.log('run "movie-sampler --help" for instructions\n');
        process.exit(1);
    })
