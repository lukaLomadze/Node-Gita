
let countPerPage =30;

const buttonsDiv = document.getElementById("buttons");
const dataDiv = document.getElementById("data");
const res  = await fetch("https://dummyjson.com/users");
const data = await res.json();
const count = data.total;

console.log(Math.ceil(count/countPerPage));
console.log(count);


for(let i = 1; i <= Math.ceil(count/countPerPage); i++){

 const btn = document.createElement("button");
    btn.textContent = i;

    btn.addEventListener("click", async () => {
      const res = await fetch(
        `https://dummyjson.com/users?limit=${countPerPage}&skip=${(i - 1) * countPerPage}`
      );
      const data = await res.json();

      dataDiv.innerHTML = "";
      data.users.forEach(user => {
        dataDiv.innerHTML += `<p>${user.firstName} ${user.lastName}</p>`;
      });
    });

    buttonsDiv.appendChild(btn);

}

document.querySelector("button")?.click();

