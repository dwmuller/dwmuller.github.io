module.exports = function(eleventyConfig) {

    // For now, don't process styles at all.
    eleventyConfig.addPassthroughCopy('src/styles');

    return {
        dir: {
            input: "src"
        }
    }
}