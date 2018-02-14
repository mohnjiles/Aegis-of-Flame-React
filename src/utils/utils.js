
export { getYoutubeId };


function getYoutubeId(url) {

  // eslint-disable-next-line
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  var match = url.match(regExp);

  return (match && match[7].replace(')', '').length === 11)
    ? match[7].replace(')', '')
    : false;
}
