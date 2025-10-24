function findMissingNumbers(arr) {
    arr.sort((a, b) => a - b);
    const missingNumbers = [];
    const start = arr[0];
    const end = arr[arr.length - 1];
    const numSet = new Set(arr);
    
    for (let num = start; num <= end; num++) {
        if (!numSet.has(num)) {
            missingNumbers.push(num);
        }
    }
    
    return missingNumbers;
}
const sequence = [1, 3, 4, 6, 7, 9, 10];
console.log(findMissingNumbersEfficient(sequence));