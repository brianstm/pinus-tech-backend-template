import { Expense } from '../models/Expense.ts';
import { AuthRequest } from '../middleware/auth';

export const createExpense = async (request, response) => {

    try {
        
        const newTransaction = {
            amount: request.body.amount,
            category: request.body.category,
            description: request.body.description,
            date: request.body.date
        }

        const newExpense = await Expense.create(newTransaction);

        return response.status(201).send(newExpense);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
}

export const getExpenses = async (request, response) => {
    
    try {
        const expenses = await Expense.find({})
        return response.status(200).json({
            count: expenses.length,
            data: expenses
        })
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
}

export const getExpressID =  async (request, response) => {
    try {
        
        const { id } = request.params;

        const expenseID = await Expense.findById(id);
        return response.status(200).json(expenseID);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
}

export const updateExpense = async (request, response) => {
    try {

        const { id } = request.params;
        const result = await Expense.findByIdAndUpdate(id, request.body);
        
        
        if (!result) { return response.status(404).json({ message: "Expense not found" })} 
        return response.status(200).send({ message: "Updated successfully "})

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
}

export const deleteExpense = async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Expense.findByIdAndDelete(id);
        if (!result) { return response.status(404).json({ message: "Expense not found" })}
        return response.status(200).send({ message: "Deleted successfully "})
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
}
