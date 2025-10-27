#!/usr/bin/env node

import { Command } from 'commander'
import { readFile, writeFile } from './utils.js'



const program = new Command();
program
  .name('expense-cli')
  .description('CLI to manage your expenses')
  .version('1.0.0');

program
  .command('add')
  .description('Add a new expense')
    .argument('<amount>', 'Amount of the expense')
    .argument('<category>', 'Category of the expense')
    .action(async (amount, category) => {
        if(isNaN(amount) || parseFloat(amount) <= 10 ){
            console.log('Amount should be a number greater than 10');
            return;
        }
        const expenses = await readFile('expenses.json', true) || [];
        const lastId = expenses.length > 0 ? expenses[expenses.length - 1].id : 0;
        const newExpense = {id: lastId+1, amount: parseFloat(amount), category, date: new Date().toISOString() };
        expenses.push(newExpense);
        await writeFile('expenses.json', expenses);
        console.log('Expense added:', expenses );
    }
);

program
  .command('delete <id>')
  .description('Delete an expense by ID')
    .action( async (id) => {
        const expenses = await readFile('expenses.json', true) || [];
        const index = expenses.findIndex(expense => expense.id === parseInt(id));
        if(index === -1){
            console.log('Expense not found');
            return;
        }
        const deletedExpense = expenses.splice(index, 1);
        await writeFile('expenses.json', expenses);
        console.log('Expense deleted:', deletedExpense[0]);
    }   );

program
    .command('update')
    .description('Update an expense by ID')
    .argument('<id>', 'ID of the expense to update')
    .option('-a, --amount <amount>', 'New amount of the expense','')
    .option('-c, --category <category>', 'New category of the expense','')
    .action( async (id,  opts) => {
        const expenses = await readFile('expenses.json', true) || [];
        const index = expenses.findIndex(expense => expense.id === parseInt(id));
        if(index === -1){
            console.log('Expense not found');
            return;
        }

        const newData= {};
        if(opts.amount){
            if(isNaN(opts.amount) || parseFloat(opts.amount) <= 10 ){
                console.log('Amount should be a number greater than 10');
                return;
            }
            newData.amount = parseFloat(opts.amount);
        }
        if(opts.category){
            newData.category = opts.category;
        }

        expenses[index] = { ...expenses[index], ...newData };
        await writeFile('expenses.json', expenses);
        console.log('Expense updated:', expenses[index]);
    }   );





program
  .command('show')
  .description('Show all expenses')
  .option("--asc", "Sort by createdAt ascending")
  .option("--desc", "Sort by createdAt descending")
  .option("-c, --category <category>", "Filter by category")
  .option("-p, --page <number>", "Page number", "1")
  .option("-t, --take <number>", "Items per page", "10")
  .action(async (opts) => {

        let expenses = await readFile('expenses.json', true);
        if(opts.asc){
            
            expenses.sort((a,b) =>  new Date(a.date).getTime() - new Date(b.date).getTime());
        }
        if(opts.desc){
            expenses.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }
        if(opts.category){
            expenses=expenses.filter(m => m.category === opts.category);
        }
        if(isNaN(opts.page) || isNaN(opts.take) || Number(opts.page) < 1 || Number(opts.take) < 1){
            console.log('Page and size should be positive numbers');
            return;
        }
        const page = Number(opts.page)
        const take = Math.min(Number(opts.take), 10)
        console.log(expenses.slice((page - 1) * take, take * page))
    })





    program
    .command('get <id>')
    .description("Get expense by ID")
    .action(async (id) => {
    const expenses = await readFile('expenses.json', true) ;

    const foundId= expenses.findIndex((e) => e.id === parseInt(id));
    if (foundId === -1) console.log(" Expense not found");
    else console.log("Expense found:", expenses[foundId]);
  });

    program
    .command('search <date>')
    .description('Search expenses by date (YYYY-MM-DD)')
    .action( async (date) => {
        const expenses = await readFile('expenses.json', true) || [];
        const filteredExpenses = expenses.filter(expense => expense.date <= date);
        console.log('Expenses on', date, ':', filteredExpenses);
    }
    );




    program.parse(process.argv);
    
