import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Dropdown } from 'semantic-ui-react'
import { getProducts, getOrders, createOrder, removeOrder } from '../common/actions'
import CreateOrderPanel from './CreateOrderPanel/'
import ProductList from './ProductList'
import OrderList from './OrderList'

class App extends Component {
  state = {
    products: [],
    orders: []
  }
  componentDidMount () {
    getProducts().then((res) => {
      const { products } = res
      this.setState({ products })
    })
    getOrders().then((res) => {
      const { orders } = res
      this.setState({ orders })
    })
  }
  submitOrder = (order) => {
    createOrder(order).then((res) => {
      if (!res.message) {
        const { id, product, quantity, price, shop, customer } = res
        const { orders, products } = this.state
        const netProducts = products.map(productObj => {
          if (productObj.id === product) {
            return { ...productObj, inventory: productObj.inventory - quantity }
          } else {
            return productObj
          }
        })
        this.setState({ orders: [...orders, { id, product, quantity, price, shop, customer }], products: netProducts })
      } else {
        alert(res.message)
      }
    })
  }
  removeOrder = (order) => {
    removeOrder(order.id).then((res) => {
      if (res.message === 'success') {
        const { orders, products } = this.state
        const netProducts = products.map(productObj => {
          if (productObj.id === order.product) {
            return { ...productObj, inventory: productObj.inventory + order.quantity }
          } else {
            return productObj
          }
        })
        this.setState({ orders: orders.filter(o => order.id !== o.id), products: netProducts })
      } else {
        alert(res.message)
      }
    })
  }
  render () {
    const { products, orders } = this.state
    return (
      <React.Fragment>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '80%' }}>
            <CreateOrderPanel products={products} onSubmit={this.submitOrder}/>
            <ProductList products={products} />
            <OrderList orders={orders} onRemove={this.removeOrder}/>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const wrapper = document.getElementById('app')

ReactDOM.render(<App />, wrapper)
