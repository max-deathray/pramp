'use strict';

function diffBetweenTwoStrings(source, target) {
  /**
	@param source: string
	@param target: string
	@return: string[]
	*/

  // create an empty array, length of source string
  const memo = new Array(source.length);

  let count = source.length - 1;

  // fill the empty array with inner arrays, each the length of the target string
  while (count >= 0) {
    let inner = new Array(target.length).fill(null);

    memo[count] = inner;
    count--;
  }

  // create the DP help func - this uses recursion and memoization
  function dp(i, j) {
    // check if we've moved either pointer beyound the limit of the string
    if (i === source.length) return target.length - j;
    if (j === target.length) return source.length - i;

    // if we have not already calculated the edit distance between these 2 indices, then compute it
    if (memo[i][j] === null) {
      // if the characters at each pointer is the same, calculate the
      if (source[i] === target[j]) {
        // if both chars are same, store the ED of the next chars in the memo;
        memo[i][j] = dp(i + 1, j + 1);
      } else {
        // if the characters are difference, then check if it would be 'cheaper to subtract or add from source'
        memo[i][j] = 1 + Math.min(dp(i + 1, j), dp(i, j + 1));
      }
    }

    // once it's been calculated and stored, just retrieve and return
    return memo[i][j];
  }

  // create an output array to store the output
  const output = [];

  // initialize both poiters at 0
  let i = 0;
  let j = 0;

  // while both pointers are still within the range of the strings
  while (i < source.length && j < target.length) {
    // if the characters are the same,...
    if (source[i] === target[j]) {
      // just push that char into the output array...
      output.push(source[i]);
      // and advance both pointers.
      i++;
      j++;

      // otherwise, if the chars are NOT the same,
      // calculate if it's cheaper/equal to subtract the char from the source
    } else if (dp(i + 1, j) <= dp(i, j + 1)) {
      // if so, then push '- char' into the output string to indicate a subtraction
      output.push('-' + source[i]);
      // and advance the source pointer 'i'
      i = i + 1;
    } else {
      // otherwise, if it's cheaper to add from target, then indicate so in the output
      output.push('+' + target[j]);
      // and advance the target pointer 'j'
      j = j + 1;
    }
  }

  // if we escape the while loop and the target string pointer has not made it to the end
  // of the string, add all the leftover chars from target string
  while (j < target.length) {
    output.push('+' + target[j]);
    j++;
  }

  // return final output array,
  return output;
}

console.log(diffBetweenTwoStrings('AABC', 'ABCD'));
