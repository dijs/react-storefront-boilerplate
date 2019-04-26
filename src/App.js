import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Header from './header/Header'
import NavTabs from 'react-storefront/NavTabs'
import Pages from 'react-storefront/Pages'
import SearchDrawer from 'react-storefront/SearchDrawer'
import Helmet from 'react-helmet'
import CategorySkeleton from './category/CategorySkeleton'
import SubcategorySkeleton from './subcategory/SubcategorySkeleton'
import ProductSkeleton from './product/ProductSkeleton'
import 'js-cookie'
import { getCart } from 'react-storefront-extensions/shopify'
import { observer, inject } from 'mobx-react'

@withStyles(theme => ({
  '@global': {
    body: {
      margin: '0',
      padding: '0',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize
    },
    a: {
      textDecoration: 'underline'
    }
  }
}))
@inject(({ app }) => ({ cart: app.cart }))
@observer
export default class App extends Component {
  async componentDidMount() {
    // DO we have a session?
    const sessionId = window.Cookies.get('sessionid');
    if (!sessionId) {
      console.log('We do not have a session, fetching one');
      await fetch('/session');
    }
    getCart(sessionId).then(items => {
      this.props.cart.setItems(items);
    }).catch(err => {
      console.log('Error getting session', err);
    })
  }
  render() {
    return (
      <div>
        <Helmet>
          <link rel="shortcut icon" href="/icons/favicon.ico"/>
          <meta name="description" content="Build and deploy sub-second e-commerce progressive web apps in record time."/>
          <script src="http://sdks.shopifycdn.com/js-buy-sdk/v2/latest/index.umd.min.js" />
        </Helmet>
        <Header/> 
        <NavTabs/>
        <Pages
          loadMasks={{
            Category: CategorySkeleton,
            Subcategory: SubcategorySkeleton,            
            Product: ProductSkeleton
          }}
          components={universal => ({
            Home: universal(import('./home/Home')),
            Category: universal(import('./category/Category')),
            Subcategory: universal(import('./subcategory/Subcategory')),
            Product: universal(import('./product/Product')),
            Cart: universal(import('./cart/Cart')),
            Checkout: universal(import('./checkout/Checkout')),
            Confirmation: universal(import('./checkout/Confirmation')),
            Error: universal(import('./ErrorPage'))
          })}
        />
        <SearchDrawer/>
      </div>
    )
  }

}
