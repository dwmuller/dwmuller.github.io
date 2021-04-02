module.exports = function(eleventyConfig) {

    // For now, don't process styles at all.
    eleventyConfig.addPassthroughCopy('src/styles');

    // Ditto for images.
    eleventyConfig.addPassthroughCopy('src/assets');

    // Markdown plugins.
    let markdownIt = require("markdown-it");
    let options = {
        html: true
    };
    let markdownLib = markdownIt(options).use(require("markdown-it-footnote"));
    eleventyConfig.setLibrary("md", markdownLib);

    return {
        dir: {
            input: "src"
        }
    }
}