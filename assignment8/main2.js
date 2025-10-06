const btn = document.getElementById('btn');
const dataDiv = document.getElementById('data');
btn.addEventListener('click', (e) => {
    e.preventDefault();

    fetch("https://dummyjson.com/quotes").
        then((response) => response.json()).
        then((data) => {
            dataDiv.innerHTML = "";
            data.quotes.forEach(el => {
                dataDiv.innerHTML += `<p>${el.quote}</p>`;
            });

        }

        ).catch((err) => console.log(err));
});