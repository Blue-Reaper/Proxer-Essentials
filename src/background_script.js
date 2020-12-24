// Put all the javascript code here, that you want to execute in background.

$.post('https://proxer.me/api/v1/user/login').done((data) => {
  // todo warten auf proxer api key
  console.log('response error ' + data.error);
  console.log('response message ' + data.message);
  console.log('response code ' + data.code);
  console.log('response data ' + data.data);
});
