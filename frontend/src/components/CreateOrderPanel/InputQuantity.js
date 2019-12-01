import React from 'react'
import { Form, Button } from 'semantic-ui-react'

export default class InputQuantity extends React.Component {
  render () {
    const { changeQuantity, quantity = 0, onSubmit } = this.props
    return (
      <div style={{
        flex: 1,
        padding: '3vw 5vw',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Form>
          <Form.Field>
            <input placeholder='請輸入數量' type='number' onChange={(event) => { changeQuantity(event.target.value) }} value={quantity} />
          </Form.Field>
        </Form>
        <Button icon='plus' circular color='green' size='tiny' onClick={onSubmit} />
      </div>
    )
  }
}
