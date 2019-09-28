let intervals = {};

export default {
    save(code, interval) {
        intervals[code] = interval;
    },

    stop(code) {
        if (intervals[code]) {
            clearInterval(intervals[code]);
        }
    },
    flush() {
        for (var i in intervals) {
            this.stop(i);
        }
    }

}
