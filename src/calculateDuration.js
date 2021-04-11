const calculateDuration = (startedAt) => {
    let duration = 0
    const seconds = ((Date.now() - startedAt) / 1000).toFixed(0)
    if (seconds > 59) {
        const minutes = seconds / 60
        const fullMinutes = Math.floor(minutes)
        const extractedSeconds = `${((minutes - fullMinutes) * 60).toFixed(0)}`
        const formOfMinute =
            fullMinutes < 2 ? 1 + ' minute' : fullMinutes + ' minutes'
        const formOfSecond =
            extractedSeconds < 2 ? 1 + ' second' : extractedSeconds + ' seconds'
        duration = `${formOfMinute} ${formOfSecond}`
    } else {
        duration = Math.floor(seconds) + ' seconds'
    }
    return duration
}

export default calculateDuration
