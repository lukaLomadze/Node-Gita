function CelsiusToFahrenheit(cel){
    return 1.4 * cel +32;
}


function reverse(str){
    let strAsArr = str.split('');
    strAsArr.reverse();
    let reversed = strAsArr.join("")
    return reversed;
}
console.log(reverse("luka"))


function countWords(str){
    let strAsArr = str.split(' ');
    let n =0;
    for(let i =0;i<strAsArr.length;i++){
        let word = strAsArr[i];
        if(word.length >0){
            n++;
        }
    }


    return n;

}
console.log(countWords(" jdnc j    nkdj"));


