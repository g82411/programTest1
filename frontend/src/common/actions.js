import * as HTTP from './http'

export const getProducts = async () => {
  const response = await HTTP.getProducts()
  if (response.status === 200) {
    const res = await response.json()
    return res
  } else {
    return []
  }
}

export const getOrders = async () => {
  const response = await HTTP.getOrders()
  if (response.status === 200) {
    const res = await response.json()
    return res
  } else {
    return []
  }
}

export const createOrder = async (order) => {
  const response = await HTTP.createOrder(order)
  const res = await response.json()
  return res
}

export const removeOrder = async (orderID) => {
  const response = await HTTP.removeOrder(orderID)
  const res = await response.json()
  return res
}
