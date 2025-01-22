import React, { useState, useEffect } from "react";
import {
  getMergeSortAnimations,
  getHeapSortAnimations,
  getInsertionSortAnimations,
  getBubbleSortAnimations,
} from "../sortingAlgos/sortingAlgos";

import "./sortingVisualizer.css";

const ANIMATION_SPEED_MS = 100;
const NUMBER_OF_ARRAY_BARS = 10;
const PRIMARY_COLOR = "turquoise";
const SECONDARY_COLOR = "red";

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const newArray = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      newArray.push(randomIntFromInterval(5, 500));
    }
    setArray(newArray);
  };

  const animateSorting = (animations) => {
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const [barOneIdx, barTwoIdx, action] = animations[i];

      if (action === "compare" || action === "revert") {
        const color = action === "compare" ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          arrayBars[barOneIdx].style.backgroundColor = color;
          arrayBars[barTwoIdx].style.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barIdx, newHeight] = animations[i];
          arrayBars[barIdx].style.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  };

  const mergeSort = () => {
    const animations = getMergeSortAnimations(array);
    animateSorting(animations);
  };

  const heapSort = () => {
    const animations = getHeapSortAnimations(array);
    animateSorting(animations);
  };

  const insertionSort = () => {
    const animations = getInsertionSortAnimations(array);
    animateSorting(animations);
  };

  const bubbleSort = () => {
    const animations = getBubbleSortAnimations(array);
    animateSorting(animations);
  };

  return (
    <div>
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              height: `${value}px`,
            }}
          ></div>
        ))}
      </div>
      <div className="button-container">
        <button onClick={resetArray}>Generate New Array</button>
        <button onClick={heapSort}>Heap Sort</button>
        <button onClick={insertionSort}>Insertion Sort</button>
        <button onClick={bubbleSort}>Bubble Sort</button>
        <button onClick={mergeSort}>Merge Sort</button>
      </div>
    </div>
  );
};

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualizer;
