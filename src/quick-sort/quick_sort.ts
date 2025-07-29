export const quickSort = (array: number[], left = 0, right = array.length - 1): number[] => {
    if (left > right) return array;

    const pivot = array[Math.floor((left + right) / 2)]

    let i = left;
    let j = right;

    while (i <= j){
        while (array[i] < pivot) {
            i++;
        }
        while (array[j] > pivot) {
            j--;
        }

        if (i <= j){
            [array[i], array[j]] = [array[j], array[i]];
            i++;
            j--;
        }

    }

   if (left < j) quickSort(array, left, j);
   if (i < right) quickSort(array, i, right);
   return array;
}

// const arr = [14, 2, -1, 15, 6, 100, -200, 5.5, 18, -10, 3, 4, 6, 6, -5]
// console.log(quickSort(arr));
