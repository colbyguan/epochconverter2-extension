
const _MULTIPLIERS = {
    's': 1,
    'm': 60,
    'h': 60 * 60,
    'd': 24 * 60 * 60,
}

// Returns: 
// 0 if user probably still typing input / empty str
// -1 if bad format
// otherwise seconds to substract from current time
const timeStringToOffset = s => {
    console.log(s);
    if (s.length < 3) {
        return 0;
    }
    const unit = s.charAt(s.length - 1);
    if (unit in _MULTIPLIERS) {
        const num = s.substring(1, s.length - 1);
        return _MULTIPLIERS[unit] * num;
    } else {
        return -1;
    }
}

export {timeStringToOffset}
