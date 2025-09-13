function CelsiusToFahrenheit(cel) {
    return 1.8 * cel + 32;
}


function reverse(str) {
    let strAsArr = str.split('');
    strAsArr.reverse();
    let reversed = strAsArr.join("")
    return reversed;
}
console.log(reverse("luka"))


function countWords(str) {
    let strAsArr = str.split(' ');
    let n = 0;
    for (let i = 0; i < strAsArr.length; i++) {
        let word = strAsArr[i];
        if (word.length > 0) {
            n++;
        }
    }


    return n;

}
console.log(countWords(" jdnc j    nkdj"));

function countVowels(str) {
    const vowels = "aeiouy";
    let ans = 0;
    for (let i = 0; i < str.length; i++) {
        if (vowels.includes(str[i])) {
            ans++;
        }

    }
    return ans;
}
console.log(countVowels("luka lomadze"))

function factorial(n) {
    let ans = 1;
    for (let i = 1; i <= n; i++) {
        ans *= i;
    }
    return ans;
}
console.log(factorial(6))

function factorialRecursive(n) {
    if (n < 2) return 1;
    return n * factorialRecursive(n - 1);
}
console.log(factorial(6))


function sumEvens(n) {
    let ans = 0;
    for (let i = 0; i <= n; i += 2) {
        ans += i;
    }
    return ans;
}
console.log(sumEvens(2))


function grade(score) {
    const grades = ["F", "E", "D", "C", "B", "A"]
    let g = parseInt((score - 1) / 10) - 4;
    if (g < 0) g = 0;
    return grades[g];
}
console.log(grade(100))
console.log(grade(91))
console.log(grade(51))
console.log(grade(40))
console.log(grade(81))
console.log(grade(78))

function checkPassword(password) {
    if (password.length < 8) return false;

    let hasNum = false;
    let hasUpper = false;
    for (let i = 0; i < password.length; i++) {

        if (Number(password[i])) {
            hasNum = true;
            continue;
        }

        if (password[i] === password[i].toUpperCase()) {
            hasUpper = true;
        }
    }
    return hasNum && hasUpper;
}

console.log(checkPassword("bbbbBB79B"))

