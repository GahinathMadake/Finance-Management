import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import axios from 'axios';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AlertDialogCancel, AlertDialogDescription } from '@radix-ui/react-alert-dialog';
import { MoveDown, MoveUp, Search } from 'lucide-react';
import TransactionTable from './transactions/List';
import type { Transaction } from '@/interfaces/Database';

//form schema
const transactionSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    amount: z.number().positive('Amount must be positive'),
    date: z.string().nonempty('Date is required'),
    description: z.string().optional(),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

const Transactions: React.FC = () => {

    const [open, setOpen] = useState(false);

    const form = useForm<TransactionFormData>({
        resolver: zodResolver(transactionSchema),
        defaultValues: {
            name: '',
            amount: 0,
            date: '',
            description: '',
        },
    });

    // Submit handler
    const onSubmit = async (data: TransactionFormData) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/transaction/add-transaction`, data);

            if (response.status === 201) {
                alert('Transaction added successfully!');
                form.reset();
                setOpen(false);
                fetchTransactions(true);
            }
        } catch (error) {
            console.error('Error adding transaction:', error);
            alert('Failed to add transaction');
        }
    };


    /* ------------------------ Tab of Searching ----------------------------- */

    const [initialTab, setInitialTab] = useState<string>('this-month');


    /* ------------------------ Searching Filters----------------------------- */
    const [filter, setFilter] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');
    const [applyChange, setApplyChange] = useState(false);

    const applyChangeHandler = () => {
        setApplyChange(true);

        setTimeout(() => {
            if (initialTab === "this-month") {
                const sorted = sortData(transactions);
                setTransactions(sorted);
            } else {
                const sorted = sortData(allTransaction);
                setAllTransactions(sorted);
            }

            setApplyChange(false);
        }, 0);
    };




    const sortData = (data: Transaction[]): Transaction[] => {
        const validKeys: (keyof Transaction)[] = ['name', 'amount', 'date', 'description'];

        if (!validKeys.includes(filter as keyof Transaction)) return data;

        const key = filter as keyof Transaction;

        return [...data].sort((a, b) => {
            let aValue = a[key];
            let bValue = b[key];

            if (aValue === undefined || bValue === undefined) return 0;

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            if (key === 'date') {
                aValue = new Date(aValue as string).getTime();
                bValue = new Date(bValue as string).getTime();
            }

            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    };




    /* ------------------------ Fetch Data ----------------------------- */
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [allTransaction, setAllTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchTransactions = async (force = false) => {
        setLoading(true);

        try {
            if (initialTab === 'this-month') {
                if (!force && transactions.length > 0) return;

                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/transaction/this-month`);
                const sorted = sortData(response.data || []);
                setTransactions(sorted);
            } else {
                if (!force && allTransaction.length > 0) return;

                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/transaction/all`);
                const sorted = sortData(response.data || []);
                setAllTransactions(sorted);
            }
        }
        catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchTransactions(true);
    }, [initialTab]);




    return (
        <div>
            <div className='py-2 flex justify-between px-6 sm:px-2 md:px-6 lg:px-8'>
                <h1 className='text-xl font-semibold'>Transactions</h1>

                <AlertDialog open={open} onOpenChange={setOpen}>
                    <AlertDialogTrigger asChild>
                        <Button onClick={() => setOpen(true)}>+ Add Transaction</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Add New Transaction</AlertDialogTitle>
                            <AlertDialogDescription>
                                Fill in the form below to create a new transaction.
                            </AlertDialogDescription>
                        </AlertDialogHeader>

                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <Label htmlFor="name">Transaction Name</Label>
                                <Input
                                    id="name"
                                    {...form.register("name")}
                                    placeholder="Groceries, Rent, etc."
                                    className="mt-1 focus:outline-none focus:ring-0 focus:border-transparent"
                                />
                                {form.formState.errors.name && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {form.formState.errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="amount">Amount</Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    {...form.register("amount", { valueAsNumber: true })}
                                    placeholder="0.00"
                                    className="mt-1 focus:outline-none focus:ring-0 focus:border-transparent"
                                />
                                {form.formState.errors.amount && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {form.formState.errors.amount.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="date">Date & Time</Label>
                                <Input
                                    id="date"
                                    type="datetime-local"
                                    {...form.register("date")}
                                    className="mt-1 focus:outline-none focus:ring-0 focus:border-transparent"
                                />
                                {form.formState.errors.date && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {form.formState.errors.date.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="description">Description (Optional)</Label>
                                <Textarea
                                    id="description"
                                    {...form.register("description")}
                                    placeholder="Any additional details..."
                                    className="mt-1 focus:outline-none focus:ring-0 focus:border-transparent"
                                />
                            </div>

                            <div className="flex justify-end gap-2">
                                <AlertDialogCancel asChild>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            form.reset();
                                            setOpen(false);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </AlertDialogCancel>
                                <Button type="submit">Add Transaction</Button>
                            </div>
                        </form>

                    </AlertDialogContent>
                </AlertDialog>
            </div>

            <Separator />

            {/* Category  and List*/}
            <div className='pt-4 px-4'>
                <div className="flex justify-start items-center border-b gap-4">
                    <span
                        className={`pb-2 font-semibold cursor-pointer hover:text-blue-700 ${initialTab === 'this-month'
                            ? 'border-b-4 border-blue-700 text-blue-700'
                            : 'text-red-500'
                            }`}
                        onClick={() => setInitialTab('this-month')}
                    >
                        This month
                    </span>

                    <span
                        className={`pb-2 font-semibold cursor-pointer hover:text-blue-700 ${initialTab === 'all'
                            ? 'border-b-4 border-blue-700 text-blue-700'
                            : 'text-red-500'
                            }`}
                        onClick={() => setInitialTab('all')}
                    >
                        All
                    </span>
                </div>

                {/* Filter and Search Button */}
                <div className="flex items-center justify-between w-full px-4 py-2 border-b bg-white">

                    <div className="flex items-center border rounded-lg px-3 py-1 w-64 text-sm text-gray-700 bg-white">
                        <Search className="h-4 w-4 text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Search here..."
                            onChange={(e) => console.log(e)}
                            className="w-full outline-none bg-transparent placeholder-gray-400"
                        />
                    </div>

                    {/* Filter dropdown with sort toggle */}
                    <div className="flex gap-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="border rounded px-3 py-1 bg-white focus:outline-none"
                            >
                                <option value="amount">Based on Amount</option>
                                <option value="date">Based on Date</option>
                            </select>

                            <div className="flex items-center border rounded px-2 bg-white">
                                {sortOrder === 'asc' ? (
                                    <MoveUp className="h-4 w-4 text-gray-600 mr-1" />
                                ) : (
                                    <MoveDown className="h-4 w-4 text-gray-600 mr-1" />
                                )}
                                <select
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                    className="bg-transparent outline-none py-1 pr-1 text-sm"
                                >
                                    <option value="asc">Inc</option>
                                    <option value="desc">Dec</option>
                                </select>
                            </div>
                        </div>

                        <Button
                            variant={"outline"}
                            onClick={applyChangeHandler}
                            className='p-2'
                        >
                            Apply
                        </Button>
                    </div>
                </div>

               {
                    loading ? (
                        <div className="flex justify-center items-center py-10 text-gray-500">Loading transactions...</div>
                    ) : applyChange ? (
                        <div className="flex justify-center items-center py-10 text-gray-500">Filtering transactions...</div>
                    ) : initialTab === "this-month" ? (
                        <TransactionTable transactions={transactions} />
                    ) : (
                        <TransactionTable transactions={allTransaction} />
                    )
                }

            </div>
        </div>
    );
};

export default Transactions;