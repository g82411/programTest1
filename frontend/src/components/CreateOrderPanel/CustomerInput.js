import React from 'react'
import { Checkbox, Form } from 'semantic-ui-react'

export default class CustomerInput extends React.Component {
  render () {
    const { customer, onChangeCustomer, vipOnly, onCheck } = this.props
    return (
      <div style={{
        flex: 1,
        padding: '3vw 5vw'
      }}>
        <Form>
          <Form.Field>
            <input
              placeholder='Customer ID'
              type='number'
              value={customer}
              onChange={(event) => { onChangeCustomer(event.target.value) }}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox checked={vipOnly} label='是否為vip身分' onChange={(event, data) => {
              onCheck(data.checked)
            }} />
          </Form.Field>
        </Form>
      </div>
    )
  }
}
