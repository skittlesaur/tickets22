const checkErrorDefaults = (body: any) => {
  expect(body).toHaveProperty('message')
  expect(body).toHaveProperty('details')
  expect(body).toHaveProperty('help')
}

export default checkErrorDefaults