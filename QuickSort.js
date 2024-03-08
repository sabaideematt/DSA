function quickSort(arr) {
    return quickSortUtil(arr, 0, arr.length-1);
}

function quickSortUtil(arr, left, right) {
    if(left >= right) return arr;

    let pivot = Math.floor(Math.random() * (right - left + 1)) + left;
    let pivotVal = arr[pivot];

    // move the pivot val all the way to the left
    [arr[pivot], arr[left]] = [arr[left], arr[pivot]];

    let smaller = left + 1;
    let bigger = right;

    while(smaller <= bigger) {
        if(arr[smaller] < pivotVal) {
            smaller++;
        } else if(arr[bigger] > pivotVal) {
            bigger--;
        } else {
            // swap
            [arr[smaller], arr[bigger]] = [arr[bigger], arr[smaller]];
            smaller++;
            bigger--;
        }
    }

    // now put pivot in the right place
    [arr[left], arr[bigger]] = [arr[bigger], arr[left]];

    // now do the sub problems
    quickSortUtil(arr, left, bigger - 1);
    quickSortUtil(arr, smaller, right);

    return arr;
}