document.getElementById("carid").addEventListener("input", async (e) => {
    const id = e.target.value;
    fetch(`https://myfakeapi.com/api/cars/${id}`).then((response) => response.json())
        .then((data) => {

            document.getElementById("data").innerHTML = `<p>${data.Car.car} ${data.Car.car_model} ${data.Car.car_model_year}</p>`;
            console.log(data);


        }).catch((err) => {
            console.log(err);
            alert("Car not found");
        }
        );


});