let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

let binarySearch = (array, searchVal) => {
	let leftSide, rightSide;
	let half = Math.floor(array.length / 2);
	console.log(array);
	console.log(half);
    if(array.length === 1 && searchVal !== array[half]) return [false, searchVal]
	if (array[half] === searchVal) return [true, array[half]];

	leftSide = array.slice(0, half);
	rightSide = array.slice(half);
	if (searchVal > array[half]) return binarySearch(rightSide, searchVal);
    if (searchVal < array[half]) return binarySearch(leftSide, searchVal);
    console.log("You finally reached here")
};


let generateArray = no => {
    let array = []

    for (let i = 0; i < no; i += 4) {
       array.push((i))
       array.push((i + 1))
       array.push((i + 2))
       array.push((i + 3))
        
    }

    return array;
};

console.log(binarySearch(generateArray(10), 10));
