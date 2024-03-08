/*
Fixed sized sliding window
    
E.g. sum of all subarrays of size k 

    The systematic approach is to check the sum of each subarray with 
size k and find the largest one. We start 
from the leftmost window of size k in the array, 
and we can keep track of a window_sum variable that stores 
the sum of the current window. When we shift the window to the right, 
we add a new element to the right of the window and remove the leftmost 
element from the window. To obtain the window_sum of the new window, we can 
add the value of the new element and subtract the value we removed on the left. 
Then, for each window, we wish to check whether the window_sum is at 
least largest where largest is the current largest sum among all processed windows.

*/

function maxSumSubarrayOfSizeK(nums, k) {
    let windowSum = 0, maxSum = 0;
    for (let i = 0; i < k; i++) { // Calculate the sum of the first window
        windowSum += nums[i];
    }
    maxSum = windowSum;
    for (let right = k; right < nums.length; right++) {
        // Slide the window; add the next element and remove the leftmost element
        windowSum += nums[right] - nums[right - k];
        // Update maxSum if the current window's sum is larger
        maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
}


/*

Flexible size sliding window (longest)

E.g. largest subarray sum (lc problem)

    Observe that to find the longest (maximum size) subarray, the condition within 
the window is natually satisfied. That is, before we process the array when 
left == right == 0, the empty array [] is a valid longest subarray during that stage.
In the above example, the empty subarray satisfies the constraint that sum <= target 
To extend the window, we wish to increment the right pointer. This could in fact break 
the constraint of a valid window, so we will need to increment the left pointer until 
the window becomes valid again. Additionally, only invalid windows goes into the while 
loop, which means when the window exits the while loop, it must be valid. At the begining 
of each for loop iteration, the window is valid, and at the very end of each iteration, 
the window is still valid. This is what we call the "invariant" - the condition(s) that 
holds before and after the loop. Using this property, we can update ans at the end of each
for loop iteration, as the window is guaranteed to be valid there. To find the longest 
subarray, we move the left pointer as little as possible. Here is the template.

*/

function longestValidWindow(nums, isValid) {
    let left = 0, maxLength = 0;
    for (let right = 0; right < nums.length; right++) {
        // Expand the window by including nums[right]
        // Your code to update the window based on nums[right], if necessary
        
        // Contract the window from the left until it's valid again
        while (!isValid(/* Your condition for the window based on current left and right */)) {
            // Your code to update the window before moving left, if necessary
            left += 1;
        }
        
        // Update maxLength after ensuring the window is valid
        maxLength = Math.max(maxLength, right - left + 1);
    }
    return maxLength;
}

/*

Flexible size sliding window (shortest)

E.g. shortest subarray that sums up to at least k (lc problem)

    Contrary to the longest window, the very first window (empty window) is natually invalid. 
As in the above example, the starting sum is 0 so its less than target. We would like to 
extend the right pointer until we reach a valid window. If we start with a valid window, 
incrementing right does not break the window condition(s), because adding more elements 
will only make the condition stronger. But we are looking for the shortest subarray, which 
means when we reach a valid window, we must shrink the window to find a smaller valid window 
by incrementing the left pointer until incrementing makes the window becomes invalid. We can 
do this by incrementing the left pointer. In this case to find shortest (minimum) subarray, 
we wish to increment left as much as possible (we can guarantee that left <= right because 
an empty window is invalid!).

*/

function shortestValidWindow(nums, target) {
    let left = 0, minLength = Infinity, windowSum = 0;
    for (let right = 0; right < nums.length; right++) {
        windowSum += nums[right]; // Expand the window by including nums[right]
        
        // Contract the window from the left as long as the condition is satisfied
        while (windowSum >= target) {
            minLength = Math.min(minLength, right - left + 1);
            windowSum -= nums[left]; // Remove the leftmost element from the window
            left += 1; // Move the left pointer to the right
        }
    }
    return minLength === Infinity ? 0 : minLength;
}
