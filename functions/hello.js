

module.exports = async (evnt, ctx) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      huzzah: 'true'
    })
  }
}