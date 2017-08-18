module.exports = string => {
	let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  let date = new Date(string)
	// date.setTime(date.getTime() - (7*60*60*1000))

  let year = date.getFullYear()
  let month = months[date.getMonth()]
  let day = date.getDate()
  let hours = ('0' + date.getHours()).slice(-2)
  let minutes = ('0' + date.getMinutes()).slice(-2)

  return `${day} ${month} ${year}, ${hours}:${minutes}`
  // return new Date(string).toISOString().split('.')[0]
}
