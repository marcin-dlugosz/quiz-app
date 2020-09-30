const calculateDuration = (startedAt) => {
    let duration = 0
    const seconds = ((Date.now() - startedAt) / 1000).toFixed(0)
    if (seconds > 59) {
        const minutes = seconds / 60
        const fullMinutes = Math.floor(minutes)
        const extractedSeconds = `${((minutes - fullMinutes) * 60).toFixed(0)}`
        duration = `${fullMinutes} minute(s) ${extractedSeconds} second(s)`
    } else {
        duration = Math.floor(seconds) + ' seconds'
    }
    return duration
}

export default calculateDuration
