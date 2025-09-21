const log = console.log;

function deleteLastChar(arr) {
    return arr.map(x => x.slice(0, -1));
}
log(deleteLastChar(["one", "two", "three", ""]));


function sumOftwo(arr){
    if(arr.length<2) return 0;
    arr.sort((a,b)=>a-b);
 
    return arr[0]+arr[1]; 
}
log(sumOftwo([19,5,42,2,77]));



function countPositivesSumNegatives(nums){
  return  nums.reduce((ans, n)=> {
    if(n<0)ans[1]+=n;
    else ans[0]++;
    return ans;
}, [0,0]);
}
log(countPositivesSumNegatives([1,1]));

function sumOf(arr){
    let s =0;
    arr.forEach(el => {
        s+=el;
    });
    return s;
}
log(sumOf([10, 12, 4, 2]));

function concatStrings(arr){
    return arr.reduce((ans, word)=>{
        if(word.length>5){
            if(ans.length==0)ans+=word;
            else ans+='#'+word;
        }
        return ans;
    }, '');
}
log(concatStrings(["cat","parrot","dog","elephant"] ))