/* global fetch */
const requestHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

export const getProducts = () => {
  const options = {
    method: 'GET',
    headers: requestHeaders,
    credentials: 'include'
  }
  return fetch(`/api/v1/product/`, options)
}

export const getOrders = () => {
  const options = {
    method: 'GET',
    headers: requestHeaders,
    credentials: 'include'
  }
  return fetch(`/api/v1/order/`, options)
}

export const createOrder = (order) => {
  const options = {
    method: 'POST',
    headers: requestHeaders,
    credentials: 'include',
    body: JSON.stringify(order)
  }
  return fetch(`/api/v1/order/`, options)
}

export const removeOrder = (orderID) => {
  const options = {
    method: 'DELETE',
    headers: requestHeaders,
    credentials: 'include',
    body: JSON.stringify({ order: orderID })
  }
  return fetch(`/api/v1/order/`, options)
}
