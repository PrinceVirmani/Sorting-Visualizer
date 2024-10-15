import React, { useState, useEffect } from "react";
import { getMergeSortAnimations } from "../sortingAlgos/sortingAlgos";
import "./sortingVisualizer.css";

const ANIMATION_SPEED_MS = 50;
const NUMBER_OF_ARRAY_BARS = 60; // Set to 60 for a good fit inside the container
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
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
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
        <button onClick={mergeSort}>Merge Sort</button>
        <button onClick={heapSort}>Heap Sort</button>
        <button onClick={insertionSort}>Insertion Sort</button>
        <button onClick={bubbleSort}>Bubble Sort</button>
      </div>
    </div>
  );
};

// Helper functions
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualizer;
