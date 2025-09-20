const log = console.log;

function averageOf(nums){
    if(nums.length <1)return 0;
    let s =0;
    for(let n of nums){
        s+=n;
    }
    return s/nums.length;
}
log(averageOf([3,4]))

function reverseAsArr(n){
    let ans =[];
     while(n>0){
        ans.push(n%10);
        n= Math.floor(n/10);
    }
    return ans;
}
log(reverseAsArr(5694))

function foo(a, b){
    let ans =[];
    for(let curr of a){
        if(!b.includes(curr)){
            ans.push(curr);
        }
    }
    return ans;

}

log(foo([1,2,2,3],[2,3]))

function secondLargest(nums){
    if(nums.length==0)return -1;
    if(nums.length==1)return nums[0];
    nums.sort((a,b)=> b-a);
    return nums[1];
}
log(secondLargest([6,8]))

function getPalindroms(words){
    let ans =[];
    for(let word of words){
        if(isPalindrom(word)){
            ans.push(word);
        }
    }
    return ans;
}
 function isPalindrom(str){
    for(let i=0;i<str.length;i++){
        if(str[i] != str[str.length-i-1])return false;
    }
    return true;
 }

log(getPalindroms(["mom", "car", "level", "dog"]));

function mostCommon(nums){
    if(nums.length==0)return -1;
nums.sort((a,b)=> b-a);
let ans= nums[0];
let prevFreq=0;
let currFreq=1;

for(let i=1;i<nums.length;i++){
    if(nums[i]!=nums[i-1] || i == nums.length-1){
        if(prevFreq < currFreq){
            ans =nums[i-1];
            prevFreq = currFreq;
            currFreq =1;
        }else{
            currFreq=1;
        }
    }else{
        currFreq++;
    }
}

return ans;


}
log(mostCommon([4,5,5,6]))

