let FirstStart = false;

const setFirstStart = (isFirstStart)  => {
    if (isFirstStart) {
        FirstStart = true;
    } else {
        false;
    }
}

export { FirstStart, setFirstStart };