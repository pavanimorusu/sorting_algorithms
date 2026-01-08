let delay = 500;

// ---------- Helpers ----------
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getArray() {
    return document.getElementById("input").value
        .trim()
        .split(" ")
        .map(Number)
        .filter(n => !isNaN(n));
}

function createBars(arr) {
    const bars = document.getElementById("bars");
    bars.innerHTML = "";

    arr.forEach(v => {
        const bar = document.createElement("div");
        bar.className = "bar";
        bar.style.height = v * 4 + "px";
        bar.innerText = v;
        bars.appendChild(bar);
    });
}

function updateBar(bar, val, color = "#22c55e") {
    bar.style.height = val * 4 + "px";
    bar.innerText = val;
    bar.style.background = color;
}

function showSortedArray(arr) {
    document.getElementById("output").innerText =
        "Sorted Array: " + arr.join(" ");
}

// ---------- Bubble Sort ----------
async function bubbleSort(arr) {
    let bars = document.getElementsByClassName("bar");

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            bars[j].style.background = "red";
            bars[j + 1].style.background = "red";
            await sleep(delay);

            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                updateBar(bars[j], arr[j]);
                updateBar(bars[j + 1], arr[j + 1]);
            }

            bars[j].style.background = "#22c55e";
            bars[j + 1].style.background = "#22c55e";
        }
    }
}

// ---------- Selection Sort ----------
async function selectionSort(arr) {
    let bars = document.getElementsByClassName("bar");

    for (let i = 0; i < arr.length; i++) {
        let min = i;
        bars[min].style.background = "blue";

        for (let j = i + 1; j < arr.length; j++) {
            bars[j].style.background = "red";
            await sleep(delay);

            if (arr[j] < arr[min]) {
                bars[min].style.background = "#22c55e";
                min = j;
                bars[min].style.background = "blue";
            } else {
                bars[j].style.background = "#22c55e";
            }
        }

        [arr[i], arr[min]] = [arr[min], arr[i]];
        updateBar(bars[i], arr[i]);
        updateBar(bars[min], arr[min]);
        bars[i].style.background = "#22c55e";
    }
}

// ---------- Insertion Sort ----------
async function insertionSort(arr) {
    let bars = document.getElementsByClassName("bar");

    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        bars[i].style.background = "red";
        await sleep(delay);

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            updateBar(bars[j + 1], arr[j]);
            j--;
            await sleep(delay);
        }

        arr[j + 1] = key;
        updateBar(bars[j + 1], key);
        bars[i].style.background = "#22c55e";
    }
}

// ---------- Quick Sort ----------
async function quickSort(arr, l = 0, r = arr.length - 1) {
    if (l >= r) return;
    let bars = document.getElementsByClassName("bar");

    let pivot = arr[r];
    bars[r].style.background = "purple";
    let i = l;

    for (let j = l; j < r; j++) {
        bars[j].style.background = "red";
        await sleep(delay);

        if (arr[j] < pivot) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            updateBar(bars[i], arr[i]);
            updateBar(bars[j], arr[j]);
            i++;
        }
        bars[j].style.background = "#22c55e";
    }

    [arr[i], arr[r]] = [arr[r], arr[i]];
    updateBar(bars[i], arr[i]);
    updateBar(bars[r], arr[r]);
    bars[r].style.background = "#22c55e";

    await quickSort(arr, l, i - 1);
    await quickSort(arr, i + 1, r);
}

// ---------- Merge Sort ----------
async function mergeSort(arr, l = 0, r = arr.length - 1) {
    if (l >= r) return;
    let m = Math.floor((l + r) / 2);
    await mergeSort(arr, l, m);
    await mergeSort(arr, m + 1, r);
    await merge(arr, l, m, r);
}

async function merge(arr, l, m, r) {
    let bars = document.getElementsByClassName("bar");
    let left = arr.slice(l, m + 1);
    let right = arr.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;

    while (i < left.length && j < right.length) {
        bars[k].style.background = "red";
        await sleep(delay);

        if (left[i] <= right[j]) arr[k] = left[i++];
        else arr[k] = right[j++];

        updateBar(bars[k], arr[k]);
        k++;
    }

    while (i < left.length) {
        arr[k] = left[i++];
        updateBar(bars[k], arr[k++]);
        await sleep(delay);
    }

    while (j < right.length) {
        arr[k] = right[j++];
        updateBar(bars[k], arr[k++]);
        await sleep(delay);
    }
}

// ---------- Heap Sort ----------
async function heapSort(arr) {
    let n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(arr, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        let bars = document.getElementsByClassName("bar");
        updateBar(bars[0], arr[0]);
        updateBar(bars[i], arr[i]);
        await heapify(arr, i, 0);
    }
}

async function heapify(arr, n, i) {
    let bars = document.getElementsByClassName("bar");
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        updateBar(bars[i], arr[i]);
        updateBar(bars[largest], arr[largest]);
        await sleep(delay);
        await heapify(arr, n, largest);
    }
}

// ---------- Controller ----------
async function startSort() {
    let arr = getArray();
    if (arr.length === 0) return alert("Enter valid numbers!");

    document.getElementById("output").innerText = "";
    createBars(arr);

    let algo = document.getElementById("algo").value;

    if (algo === "bubble") await bubbleSort(arr);
    else if (algo === "selection") await selectionSort(arr);
    else if (algo === "insertion") await insertionSort(arr);
    else if (algo === "quick") await quickSort(arr);
    else if (algo === "merge") await mergeSort(arr);
    else if (algo === "heap") await heapSort(arr);

    showSortedArray(arr);
}
