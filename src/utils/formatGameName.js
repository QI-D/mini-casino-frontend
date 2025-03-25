export const formatGameNameToImage = (gameName) => {
    return gameName
      .toLowerCase()
      .replace(/ /g, '_')
      .replace(/[^\w\s]/gi, '')
      .replace('__', '_');
};
