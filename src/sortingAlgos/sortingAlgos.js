export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  heapSort(array, animations);
  return animations;
}

function heapSort(array, animations) {
  const n = array.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i, animations);
  }

  for (let i = n - 1; i > 0; i--) {
    animations.push([0, i, true]);
    [array[0], array[i]] = [array[i], array[0]];

    animations.push([0, array[0]]);
    animations.push([i, array[i]]);

    heapify(array, i, 0, animations);
  }
}

function heapify(array, n, i, animations) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && array[left] > array[largest]) largest = left;

  if (right < n && array[right] > array[largest]) largest = right;

  if (largest !== i) {
    animations.push([i, largest, true]);
    [array[i], array[largest]] = [array[largest], array[i]];

    animations.push([i, array[i]]);
    animations.push([largest, array[largest]]);

    heapify(array, n, largest, animations);
  }
}

export function getInsertionSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  insertionSort(array, animations);
  return animations;
}

function insertionSort(array, animations) {
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > key) {
      animations.push([j, j + 1]);
      animations.push([j, j + 1]);
      animations.push([j + 1, array[j]]);
      array[j + 1] = array[j];
      j--;
    }

    animations.push([j + 1, i]);
    animations.push([j + 1, i]);
    animations.push([j + 1, key]);
    array[j + 1] = key;
  }
}

export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  bubbleSort(array, animations);
  return animations;
}

function bubbleSort(array, animations) {
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      animations.push([j, j + 1]);
      animations.push([j, j + 1]);

      if (array[j] > array[j + 1]) {
        animations.push([j, array[j + 1]]);
        animations.push([j + 1, array[j]]);
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      } else {
        animations.push([j, array[j]]);
        animations.push([j + 1, array[j + 1]]);
      }
    }
  }
}

export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;

  while (i <= middleIdx && j <= endIdx) {
    animations.push([i, j]);
    animations.push([i, j]);

    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k] = auxiliaryArray[i];
      i++;
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k] = auxiliaryArray[j];
      j++;
    }
    k++;
  }

  while (i <= middleIdx) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k] = auxiliaryArray[i];
    i++;
    k++;
  }

  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k] = auxiliaryArray[j];
    j++;
    k++;
  }
}
