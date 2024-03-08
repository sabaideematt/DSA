function mergeSort(arr) {
    if(arr.length <= 1) return arr;

    // divide 
    let mid = Math.floor(arr.length/2);
    let left = arr.slice(0, mid);
    let right = arr.slice(mid);

    // conquer

    return merge(mergeSort(left), mergeSort(right));
}

function merge (left, right) {
    let p1 = 0;
    let p2 = 0;
    let temp = [];

    while(p1 < left.length && p2 < right.length) {
        if(left[p1] <= right[p2]) {
            temp.push(left[p1]);
            p1++;
        } else {
            temp.push(right[p2]);
            p2++;
        }
    }

    while(p1 < left.length) {
        temp.push(left[p1]);
        p1++;
    }

    while(p2 < right.length) {
        temp.push(right[p2]);
        p2++;
    }


    return temp;
}