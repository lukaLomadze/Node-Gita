#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";

const program = new Command();
const API_KEY = "895284fb2d2c50a520ea537456963d9c";

program
  .argument("<city>", "City name to get weather info")
  .action(async city => {
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        if (res.status === 404) {
          console.log(chalk.red("City not found."));
        } else {
          console.log(chalk.red("Error fetching weather data."));
        }
        return;
      }

      const data = await res.json();
        //console.log(data);
     
      console.log(chalk.green(`Temperature:`), `${data.main.temp}°C`);
      console.log(chalk.blue(`Feels like:`), `${data.main.feels_like}°C`);
      console.log(chalk.magenta(`Condition:`), data.weather[0].description);

    } catch (err) {
      console.log(chalk.red("Network error or invalid city."));
      console.log(chalk.red(err.message ));
    }
  });

program.parse(process.argv);
