export const getDateOptions = () => {
    const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)
    const months = Array.from({ length: 12 }, (_, i) => i + 1)
    const days = Array.from({ length: 31 }, (_, i) => i + 1)
    const yearsOptions = years.map(year => ({ label: year, value: year }))
    const monthsOptions = months.map(month => ({ label: month, value: month }))
    const daysOptions = days.map(day => ({ label: day, value: day }))
    return { yearsOptions, monthsOptions, daysOptions }
}
