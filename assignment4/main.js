const log = console.log;
//1
function deleteLastChar(arr) {
    return arr.map(x => x.slice(0, -1));
}
log(deleteLastChar(["one", "two", "three", ""]));

//2
function sumOftwo(arr) {
    if (arr.length < 2) return 0;
    arr.sort((a, b) => a - b);

    return arr[0] + arr[1];
}
log(sumOftwo([19, 5, 42, 2, 77]));

//3
function group(arr) {

    return arr.reduce((ans, curr) => {

        if (!ans[curr.currency]) {
            ans[curr.currency] = [{ amount: curr.amount }];
        } else {
            ans[curr.currency].push({ amount: curr.amount });
        }
        return ans;
    }, {});

}
log(group([
    { amount: 10, currency: "USD" },
    { amount: 20, currency: "EUR" },
    { amount: 5, currency: "USD" },
    { amount: 50, currency: "EUR" }
]))

//4
function countPositivesSumNegatives(nums) {
    return nums.reduce((ans, n) => {
        if (n < 0) ans[1] += n;
        else ans[0]++;
        return ans;
    }, [0, 0]);
}
log(countPositivesSumNegatives([1, 1]));

//5
function sumOf(arr) {
    let s = 0;
    arr.forEach(el => {
        s += el;
    });
    return s;
}
log(sumOf([10, 12, 4, 2]));

//6
function concatStrings(arr) {
    return arr.reduce((ans, word) => {
        if (word.length > 5) {
            if (ans.length == 0) ans += word;
            else ans += '#' + word;
        }
        return ans;
    }, '');
}
log(concatStrings(["cat", "parrot", "dog", "elephant"]))

//7
function groupByClass(arr) {
    return Object.entries(arr.reduce((ans, curr) => {
        if (!ans[curr.cls]) {
            ans[curr.cls] = { count: 1, gradeSum: curr.grade };
        } else {
            let clas = ans[curr.cls];
            clas.count++;
            clas.gradeSum += curr.grade;

        }
        return ans;


    }, {})).map(([cls, { count, gradeSum }]) => [cls, gradeSum / count]).
        reduce((ans, curr) => {
            ans[curr[0]] = curr[1];
            return ans;
        }, {});

}
log(groupByClass([
    { name: "Ann", cls: "A", grade: 90 },
    { name: "Ben", cls: "B", grade: 75 },
    { name: "Cara", cls: "A", grade: 80 }
]))