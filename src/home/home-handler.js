import globalState from '../globalState'
import { withGlobalState } from 'react-storefront/router'
// import { fetchMenu } from 'react-storefront-extensions/shopify'
import { fetchMenu } from 'react-storefront-extensions/shopify-server'

export default function homeHandler(params, request) {
	return fetchMenu()
		.then(menu => {
			console.log('Fetched menu!');
			return withGlobalState(request, globalState, { 
				title: "React Storefront",
				welcomeMessage: "From Shopify Land!",
				menu
			})
		})
		.catch(err => {
			console.log('\n\n\nIssue fetching menu', err);
			return withGlobalState(request, globalState, { 
				title: "React Storefront",
				welcomeMessage: "From Shopify Land!"
			})
		})
}
