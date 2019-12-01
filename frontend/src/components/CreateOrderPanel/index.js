import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import InputQuantity from './InputQuantity'
import CustomerInput from './CustomerInput'

export default class CreateOrderPanel extends React.Component {
  state = {
    selectProdcution: 1,
    quantity: '',
    customer: '',
    vipOrder: false
  }
  onSubmit = () => {
    const { onSubmit } = this.props
    const { selectProdcution, quantity, customer, vipOrder } = this.state
    onSubmit({
      customer,
      product: selectProdcution,
      quantity,
      isVipOrder: vipOrder
    })
  }
  render () {
    const { products } = this.props
    const productOptions = products.map(product => {
      return {
        key: product.id,
        value: product.id,
        text: `商品 ${product.id}`
      }
    })
    const { quantity, customer, vipOrder } = this.state
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, padding: '3vw 5vw' }}>
          <Dropdown
            placeholder='選擇一個商品'
            onChange={(event, data) => { this.setState({ selectProdcution:data.value }) } }
            fluid
            selection
            options={productOptions}
          />
        </div>
        <InputQuantity
          quantity={quantity}
          changeQuantity={(quantity) => this.setState({ quantity })}
          onSubmit={this.onSubmit}
        />
        <CustomerInput
          customer={customer}
          onChangeCustomer={(customer) => { this.setState({ customer }) }}
          vipOnly={vipOrder}
          onCheck={(vipOrder) => { this.setState({ vipOrder }) }}
        />
      </div>
    )
  }
}
