module.exports = function(eleventyConfig) {

    // For now, don't process styles at all.
    eleventyConfig.addPassthroughCopy('src/styles');

    // Ditto for images.
    eleventyConfig.addPassthroughCopy('src/assets');

    return {
        dir: {
            input: "src"
        }
    }
}