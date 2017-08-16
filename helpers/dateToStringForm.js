module.exports = string => {
  let date = new Date(string)
  let year = date.getFullYear()
  let month = '0' + (date.getMonth() + 1 + '').slice(-2)
  let day = date.getDate()

  return `${year}-${month}-${day}`
}
