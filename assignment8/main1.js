function debounce(cb, delay) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            cb(...args)
        }, delay)
    }
}

window.addEventListener('mousemove',debounce ((e) => {
    console.log(e.clientX, e.clientY)
},300))


