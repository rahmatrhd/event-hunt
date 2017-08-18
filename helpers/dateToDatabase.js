module.exports = date => {
	date.setTime(date.getTime() - (7*60*60*1000))
	return date
}
