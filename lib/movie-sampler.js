var parseSRT = require("parse-srt");
var fs = require("fs");
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

  const subs = parseSRT(fs.readFileSync(options.subs, "utf-8")).filter(
    (item) =>
      item.text.startsWith("[") &&
      item.text.endsWith("]") &&
      !item.text.includes("<br />")
  );

  for (let i = 0; i < subs.length; i++) {
    const sub = subs[i];
    console.log(sub);
    if (options.onProcessItem) {
      options.onProcessItem(sub);
    }
    await new Promise((resolve, reject) => {
      new FfmpegCommand(options.video)
        .seekInput(sub.start)
        .duration(sub.end - sub.start)
        .noVideo()
        .output(
          `${options.out}${options.out.endsWith("/") ? "" : "/"}${i}-${
            sub.text
          }.wav`
        )
        .on("end", resolve)
        .on("error", reject)
        .run();
    });
  }
};
