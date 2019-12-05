module.exports = {
  plugins: [
    [
      'astroturf/plugin',
      {
        tagName: 'css',
        extension: '.css',
        writeFiles: true, // Writes css files to disk using the result of `getFileName`
        getFileName(hostFilePath, pluginsOptions) {
          const basepath = join(
            dirname(hostFilePath),
            basename(hostFilePath, extname(hostFilePath)),
          );
          return `${basepath}__extracted_style${opts.extension}`;
        },
      },
    ],
  ],
}
