
export { getYoutubeId, showSuccessMessage, showErrorMessage, arrayUnique };


function getYoutubeId(url) {

  // eslint-disable-next-line
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  var match = url.match(regExp);

  return (match && match[7].replace(')', '').length === 11)
    ? match[7].replace(')', '')
    : false;
}

function showSuccessMessage(component, message) {
  component.setState({successText: message, successVisible: true});
      setTimeout(() => {
        component.setState({ successVisible: false });
      }, 5000);
}

function showErrorMessage(component, message) {
  component.setState({alertVisible: true, alertText: message});
  setTimeout(() => {
    component.setState({ alertVisible: false });
  }, 7500);
}

function arrayUnique(array) {
  var a = array.concat();
  for(var i=0; i<a.length; ++i) {
      for(var j=i+1; j<a.length; ++j) {
          if(a[i] === a[j])
              a.splice(j--, 1);
      }
  }

  return a;
}