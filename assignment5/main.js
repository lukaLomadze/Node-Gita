const log = console.log;

//1
function deleteProp(obj, prop){
if(prop in obj){
    delete obj[prop];
}
return obj
}
log(deleteProp({ name: "luka", score: 100 }, "score"))

//2
function getLeaderboard(arr){
    arr.sort((a,b)=>b.score-a.score);
    for(let i=0;i<arr.length;i++){
        arr[i].rank=i+1;
    }
    return arr;

}
log(getLeaderboard( [{ name: "Ana", score: 50 },
  { name: "Nika", score: 80 },
  { name: "Luka", score: 70 }
]))

//3
function getLongestTitle(arr){
    arr.sort((a,b)=>b.title.length-a.title.length);
    return arr.length>0? arr[0] : null;

}
log(getLongestTitle( [
    { title: "Up", year: 2009 },
    { title: "The Lord of the Rings", year: 2001 }
]))


//4
function calculateAvareageOfDep(arr){

     return Object.entries(arr.reduce((ans, curr) => {
        if (!ans[curr.dept]) {
            ans[curr.dept] = { count: 1, ageSum: curr.age };
        } else {
            let dep = ans[curr.dept];
            dep.count++;
            dep.ageSum += curr.age;

        }
        return ans;


    }, {})).map(([dep, { count, ageSum }]) => [dep, ageSum / count]).
        reduce((ans, curr) => {
            ans[curr[0]] = curr[1];
            return ans;
        }, {});

}
log(calculateAvareageOfDep( [
  { name: "Ana", dept: "HR", age: 25 },
  { name: "Nika", dept: "IT", age: 30 },
  { name: "Luka", dept: "IT", age: 22 }
]))


//5
function countWords(arr){
    let ans =0;
    arr.forEach(el => {
        ans+= el.comment.split(' ')
        .filter(elem=> elem.length >0).length;
        
    });
    return ans;
}
log(countWords([
  { id:1, comment:"Hello world" }, 
  { id:2, comment:"This is great!" },
  { id:3, comment:"" }
] ))
