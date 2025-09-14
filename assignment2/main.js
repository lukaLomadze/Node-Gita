function getAbbr(str){
    let words = str.split(" ");
    let ans = "";
    for(let word of words){
        if(word.length>1){ // articlebi ro ar gaitvaliswonos
            ans +=word[0].toUpperCase()+ "."
        }
    }
    if(ans.length >1){
        ans = ans.slice(0,-1);
    }
    return ans;
}
console.log(getAbbr('john doe'));

function getSumOfDigit(n){
    let ans =0;
    while(n>0){
        ans+=n%10;
        n= Math.floor(n/10);
    }
    return ans;
}

console.log(getSumOfDigit(123))


function removeDuplicates(str){
    let ans = '';
    for(let ch of str){
        if(!ans.includes(ch))ans+=ch;
    }
    return ans;
}
console.log(removeDuplicates('banana'));

function removeSpaces(str){
    let ans="";
    for(let ch of str){
        
        if(ch !== ' '){
            ans+=ch;
        }
    }
    return ans;
}

console.log(removeSpaces('1 2 abb'))

function reverseEachWord(str){
    let words = str.split(' ');
    let ans ="";
    for(let word of words ){
        ans +=reverse(word) + ' ';
    }
    return ans;
}
// es wina davalebidan
function reverse(str) {
    let strAsArr = str.split('');
    strAsArr.reverse();
    let reversed = strAsArr.join("")
    return reversed;
}

console.log(reverseEachWord('hello world'))

