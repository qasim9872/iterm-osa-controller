const parsers = {
  boolean: (text) => text.includes('true'),
  removeNewLine: (text) => text.replace('\n', ''),
  formatSessionId: (text) =>
    text
      .split(' ')
      .map((entry) => (entry.includes('-') ? `"${entry}"` : entry))
      .join(' '),
};

module.exports = parsers;
