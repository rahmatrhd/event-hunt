module.exports = (arr, interests) => {
  return arr.filter(item => {
    return interests.indexOf(item.Category.id) >= 0
  })
}
