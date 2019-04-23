import { types } from "mobx-state-tree"
import ProductModelBase from 'react-storefront/model/ProductModelBase'

const ProductModel = types.compose(ProductModelBase, 
  types.model("ProductModel", {
    // additional product fields go here
    specs: types.maybeNull(types.string),
    productType: types.maybeNull(types.string),
    reviews: types.optional(types.array(types.string), []),
    variantId: types.maybeNull(types.string),
    lineItemId: types.maybeNull(types.string)
  })
)

export default ProductModel