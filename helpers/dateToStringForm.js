module.exports = string => {
	let date = new Date(string)
	// date.setTime(date.getTime() + (7*60*60*1000))
  return date.toISOString().split('.')[0]
}
