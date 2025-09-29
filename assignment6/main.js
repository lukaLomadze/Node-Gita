const log = console.log;
//1
// 1, 5, 4, 3, 2

//2
// 1, 5, 3, 2, 4

//3
async function sleep(ms){
    return new Promise(res => setTimeout(res,ms));
}
log(1);
await sleep(5000);
log(2);

//4
function randomNums(n){
    if(n<1|| n>20)return;
    let interval = setInterval(()=>{
        let num = Math.floor(Math.random()*20)+1;
        log("num = "+num);
        if(num==n)clearInterval(interval);
    },1000)
}
//randomNums(5);

//5
function logNums(n,ms){
    if(n<0)return;
    let interval = setInterval(()=>{
        log(n);
        if(n==0)clearInterval(interval);
        n--;
    },ms)

}
//logNums(6,500);