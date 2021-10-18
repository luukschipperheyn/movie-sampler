var parseSRT = require('parse-srt')
var fs = require('fs')
var FfmpegCommand = require('fluent-ffmpeg');

module.exports = async function (options) {
    if (!options.video) {
        throw new Error('video option missing')
    }
    if (!options.subs) {
        throw new Error('subs option missing')
    }
    if (!options.out) {
        throw new Error('out option missing')
    }

    const subs = parseSRT(
        fs.readFileSync(
            options.subs,
            'utf-8'
        )
    ).filter(item =>
        item.text.startsWith('[') &&
        item.text.endsWith(']') &&
        !item.text.includes('<br />'))


    for (let i = 0; i < subs.length; i++) {
        const sub = subs[i]
        console.log(sub)
        await new Promise((resolve, reject) => {
            console.log(sub)
            new FfmpegCommand(options.video)
                .seekInput(sub.start)
                .duration(sub.end - sub.start)
                .noVideo()
                .output(`${options.out}${options.out.endsWith('/') ? '' : '/'}${i}-${sub.text}.wav`)
                .on('end', resolve)
                .on('error', reject)
                .run()
        });
    }
}

