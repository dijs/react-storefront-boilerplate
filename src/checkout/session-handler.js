import { createSessionId } from 'react-storefront-extensions/shopify'

export default function sessionHandler(params, request, response) {
  return createSessionId().then(sessionId => {
  	console.log('Created session id', sessionId);
  	response.set('Set-Cookie', 'sessionid=' + sessionId);
  	return response.json({ success: true });
  }).catch(err => {
		// console.log('\n\nCould not create session');
		// console.log(err.response);
		return response.json({ success: false, error: err.message });
	})
} 
