const parsers = {
  boolean: (text: string) => text.includes('true'),
  removeNewLine: (text: string) => text.replace('\n', ''),
  formatSessionId: (text: string) =>
    text
      .split(' ')
      .map(entry => (entry.includes('-') ? `"${entry}"` : entry))
      .join(' '),
};

export default parsers;
