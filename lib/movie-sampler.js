var parseSRT = require("parse-srt");
var fs = require("fs");
var path = require("path");
var FfmpegCommand = require("fluent-ffmpeg");

module.exports = async function (options) {
  const missingOptions = [];
  if (!options.video) {
    missingOptions.push("please provide 'video' option");
  }
  if (!options.subs) {
    missingOptions.push("please provide 'subs' option");
  }
  if (!options.out) {
    missingOptions.push("please provide 'out' option");
  }
  if (missingOptions.length) {
    throw new Error(missingOptions.join("\n"));
  }

  const margin = options.margin ? parseFloat(options.margin) : 0;
  const ffmpegPath = options.ffmpegPath;

  if (ffmpegPath) {
    console.log(`setting ffmpeg path to ${ffmpegPath}`);
    FfmpegCommand.setFfmpegPath(ffmpegPath);
  }

  const subs = parseSRT(fs.readFileSync(options.subs, "utf-8")).filter(
    (item) =>
      item.text.startsWith("[") &&
      item.text.endsWith("]") &&
      !item.text.includes("<br />")
  );

  if (!subs.length) {
    throw new Error(
      "no noise captions found in subtitle file. Make sure to use subtitles for the deaf or hard-of-hearing that contain noise captions in square brackets."
    );
  }

  for (let i = 0; i < subs.length; i++) {
    const sub = subs[i];
    console.log(sub);
    if (options.onProcessItem) {
      options.onProcessItem(sub);
    }
    await new Promise((resolve, reject) => {
      new FfmpegCommand(options.video)
        .seekInput(sub.start - margin)
        .duration(sub.end - sub.start + margin * 2)
        .noVideo()
        .output(path.join(options.out, `${i}-${sub.text}.wav`))
        .on("end", resolve)
        .on("error", reject)
        .run();
    });
  }
};
