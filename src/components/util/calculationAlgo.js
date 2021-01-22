export function calEndAmount(amount, percent) {
    let total = amount.reduce((accumulator, currentValue) => accumulator + currentValue);
    let endAmount = [];
    for (let val of percent) {
        endAmount.push(total * val);
    };
    return endAmount;
};

export function calDiff(startAmount, endAmount) {
    let diff = [];
    for (let i = 0; i < startAmount.length; i++) {
        diff.push(endAmount[i] - startAmount[i]);
    };
    return diff;
};

export function calTrans(arr) {
    let diff = arr.slice(0);
    let trans = [];
    let done = false;

    for (let i = 0; i < diff.length - 1; i++) {
        if (diff[i] === 0) continue;
        for (let j = i + 1; j < diff.length; j++) {
            if (diff[j] === 0) continue;
            if (diff[i] + diff[j] === 0) {
                let negativeIdx = diff[i] < 0 ? i : j;
                let positiveIdx = negativeIdx === i ? j : i;
                let amount = (Math.round(diff[positiveIdx] * 100) / 100).toFixed(2);
                trans.push([negativeIdx, positiveIdx, amount]);
                diff.splice(i, 1, 0);
                diff.splice(j, 1, 0);
            };
        };
    };

    while (!done) {
        done = true;
        for (let i = 0; i < diff.length - 1; i++) {
            if (diff[i] === 0) continue;
            for (let j = i + 1; j < diff.length; j++) {
                if (diff[j] === 0 || diff[i] === 0) {
                    continue;
                } else if (diff[i] > 0 && diff[j] > 0) {
                    continue;
                } else if (diff[i] < 0 && diff[j] < 0) {
                    continue;
                };
                done = false;
                let negativeIdx = diff[i] < 0 ? i : j;
                let positiveIdx = negativeIdx === i ? j : i;
                let sum = diff[i] + diff[j];
                if (sum > 0) {
                    let amount = (Math.round(-diff[negativeIdx] * 100) / 100).toFixed(2);
                    trans.push([negativeIdx, positiveIdx, amount]);
                    diff.splice(negativeIdx, 1, 0);
                    diff.splice(positiveIdx, 1, sum);
                } else {
                    let amount = (Math.round(diff[positiveIdx] * 100) / 100).toFixed(2);
                    trans.push([negativeIdx, positiveIdx, amount]);
                    diff.splice(negativeIdx, 1, sum);
                    diff.splice(positiveIdx, 1, 0);
                };
            };
        };
    };
    return trans;
};