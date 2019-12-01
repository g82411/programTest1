import React from 'react'
import { Button, Table } from 'semantic-ui-react'

export default class OrderList extends React.Component {
  render () {
    const { orders = [], onRemove } = this.props
    return (
      <div style={{ marginTop: '3vh' }}>
        <Table compact celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>OrderID</Table.HeaderCell>
              <Table.HeaderCell>product_id</Table.HeaderCell>
              <Table.HeaderCell>quantity</Table.HeaderCell>
              <Table.HeaderCell>price</Table.HeaderCell>
              <Table.HeaderCell>shop_id</Table.HeaderCell>
              <Table.HeaderCell>Customer ID</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              orders.map(order =>
                <Table.Row key={order.id}>
                  <Table.Cell>{order.id}</Table.Cell>
                  <Table.Cell>{order.product}</Table.Cell>
                  <Table.Cell>{order.quantity}</Table.Cell>
                  <Table.Cell>{order.price}</Table.Cell>
                  <Table.Cell>{order.shop}</Table.Cell>
                  <Table.Cell>{order.customer}</Table.Cell>
                  <Table.Cell><Button color='red' circular icon='minus' size='mini' onClick={() => { onRemove(order) }}/></Table.Cell>
                </Table.Row>
              )
            }
          </Table.Body>
        </Table>
      </div>
    )
  }
}
