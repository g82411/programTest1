import React from 'react'
import { Checkbox, Table } from 'semantic-ui-react'

export default class ProductList extends React.Component {
  render () {
    const { products = [] } = this.props
    return (
      <div>
        <Table compact celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ProductID</Table.HeaderCell>
              <Table.HeaderCell>Stock_pcs</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Shop_id</Table.HeaderCell>
              <Table.HeaderCell>Vip</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              products.map(product =>
                <Table.Row>
                  <Table.Cell>{product.id}</Table.Cell>
                  <Table.Cell>{product.inventory}</Table.Cell>
                  <Table.Cell>{product.price}</Table.Cell>
                  <Table.Cell>{product.shop}</Table.Cell>
                  <Table.Cell>
                    <Checkbox checked={product.vipOnly} />
                  </Table.Cell>
                </Table.Row>
              )
            }
          </Table.Body>
        </Table>
      </div>
    )
  }
}
