import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { Check } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axios, { AxiosError } from "axios";


interface IncomeSource {
    name: string;
    amount: number;
}

const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

interface AddNewBudgetProps {
    setTab: React.Dispatch<React.SetStateAction<string>>;
}

const AddNewBudget: React.FC<AddNewBudgetProps> = ({ setTab }) => {

    /* ---------------------- Budget calculation  -------------------*/
    const [budgetName, setBudgetName] = useState("");
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [incomeSources, setIncomeSources] = useState<IncomeSource[]>([
        { name: '', amount: 0 }
    ]);
    const [loading, setLoading] = useState(false);

    // Calculate total budget from income sources
    const totalBudget = incomeSources.reduce((sum, source) => sum + source.amount, 0);

    const handleIncomeChange = (index: number, field: keyof IncomeSource, value: string) => {
        const newIncomeSources = [...incomeSources];
        newIncomeSources[index] = {
            ...newIncomeSources[index],
            [field]: field === 'amount' ? Number(value) : value
        };
        setIncomeSources(newIncomeSources);
    };

    const addIncomeSource = () => {
        setIncomeSources([...incomeSources, { name: '', amount: 0 }]);
    };

    const removeIncomeSource = (index: number) => {
        if (incomeSources.length > 1) {
            const newIncomeSources = [...incomeSources];
            newIncomeSources.splice(index, 1);
            setIncomeSources(newIncomeSources);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/budgets/add-budget`, {
                month,
                year,
                name: budgetName || monthNames[month - 1],
                budgetAmount: totalBudget,
                incomeSources: incomeSources.filter(source => source.name && source.amount > 0)
            });

            if (response.status === 201) {
                alert('Budget created successfully!');
                // Reset form
                setBudgetName("");
                setMonth(new Date().getMonth() + 1);
                setYear(new Date().getFullYear());
                setIncomeSources([{ name: '', amount: 0 }]);
                setTab("this-month");
            }
        } catch (err) {
            const error = err as AxiosError<{ error?: string; errors?: string[] }>;

        if (error.response?.data) {
            const { errors, error: singleError } = error.response.data;

            if (errors && Array.isArray(errors)) {
                alert(errors.join('\n'));
            } else if (singleError) {
                alert(singleError);
            } else {
                alert('An unknown server error occurred.');
            }
        } else {
            alert('Failed to create budget. Please try again later.');
        }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-sidebar p-6 rounded-xl">
            {/* Sidebar */}
            <div
                className="w-[325px] bg-white p-6 rounded-xl shadow-sm"
            >
                <h2 className="text-lg font-semibold text-primary">Get Started Finance Management</h2>
                <p className="text-sm text-muted-foreground mt-2">
                    Take control of your finances by setting up your monthly budgets, tracking income sources, and monitoring spending habits.
                    Start by adding your budget to build a clear picture of your financial goals.
                </p>

                <Separator className="my-4" />

                <div className="space-y-6 mt-6">
                    {/* Step 1: Give Budget Name */}
                    <div className="flex items-center gap-3">
                        {
                            !budgetName ?
                                <div className="relative w-6 h-6">
                                    <div className="w-6 h-6 rounded-full border-2 border-blue-500 flex items-center justify-center">
                                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                                    </div>
                                </div>
                                :
                                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                    <Check className="w-4 h-4 text-white" />
                                </div>
                        }

                        <div className="min-w-[200px]">
                            <p className="font-medium text-md">Add Budget Name</p>
                            <p className={`text-sm font-semibold ${!budgetName ? "text-blue-500" : "text-green-500"}`}>
                                {!budgetName ? "Not Started" : "Completed"}
                            </p>
                        </div>
                    </div>

                    {/* Step 2: Add Month and Year */}
                    <div className="flex items-center gap-3">
                        {
                            !month || !year ?
                                <div className="relative w-6 h-6">
                                    <div className="w-6 h-6 rounded-full border-2 border-blue-500 flex items-center justify-center">
                                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                                    </div>
                                </div>
                                :
                                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                    <Check className="w-4 h-4 text-white" />
                                </div>
                        }

                        <div className="min-w-[200px]">
                            <p className="font-medium text-md">Select Month and Year</p>
                            <p className={`text-sm font-semibold ${!month || !year ? "text-blue-500" : "text-green-500"}`}>
                                {!month || !year ? "Not Started" : "Completed"}
                            </p>
                        </div>
                    </div>

                    {/* Step 3: Add Income Sources */}
                    <div className="flex items-center gap-3">
                        {
                            incomeSources.some(src => !src.name || src.amount <= 0) ?
                                <div className="relative w-6 h-6">
                                    <div className="w-6 h-6 rounded-full border-2 border-blue-500 flex items-center justify-center">
                                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                                    </div>
                                </div>
                                :
                                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                    <Check className="w-4 h-4 text-white" />
                                </div>
                        }

                        <div className="min-w-[200px]">
                            <p className="font-medium text-md">Add Income Sources</p>
                            <p className={`text-sm font-semibold ${incomeSources.some(src => !src.name || src.amount <= 0)
                                ? "text-blue-500"
                                : "text-green-500"
                                }`}>
                                {
                                    incomeSources.some(src => !src.name || src.amount <= 0)
                                        ? "Not Started"
                                        : "Completed"
                                }
                            </p>
                        </div>
                    </div>

                    {/* Step 4: Verify Budget & Create */}
                    <div className="flex items-center gap-3">
                        {
                            totalBudget > 0 ?
                                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                    <Check className="w-4 h-4 text-white" />
                                </div>
                                :
                                <div className="relative w-6 h-6">
                                    <div className="w-6 h-6 rounded-full border-2 border-blue-500 flex items-center justify-center">
                                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                                    </div>
                                </div>
                        }

                        <div className="min-w-[200px]">
                            <p className="font-medium text-md">Verify & Create Budget</p>
                            <p className={`text-sm font-semibold ${totalBudget > 0 ? "text-green-500" : "text-blue-500"}`}>
                                {totalBudget > 0 ? "Ready to Submit" : "Not Started"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side Dynamic Panel */}
            <div className="mx-auto">
                <Card className="max-w-4xl">
                    <CardHeader>
                        <CardTitle className="text-center py-1">Create New Budget</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="budgetName">Budget Name</Label>
                                <Input
                                    id="budgetName"
                                    value={budgetName}
                                    onChange={(e) => setBudgetName(e.target.value)}
                                    placeholder="January 2025 Budget"
                                    className="mt-1"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label>Month</Label>
                                    <select
                                        value={month}
                                        onChange={(e) => setMonth(Number(e.target.value))}
                                        className="w-full p-2 mt-1 border rounded"
                                    >
                                        {monthNames.map((name, index) => (
                                            <option key={name} value={index + 1}>
                                                {name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <Label>Year</Label>
                                    <Input
                                        type="number"
                                        value={year}
                                        onChange={(e) => setYear(Number(e.target.value))}
                                        className="mt-1"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Label className="text-semibold text-lg">Income Sources</Label>
                                {incomeSources.map((source, index) => (
                                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-end">
                                        <div>
                                            <Label>Source Name</Label>
                                            <Input
                                                value={source.name}
                                                onChange={(e) => handleIncomeChange(index, 'name', e.target.value)}
                                                placeholder="Salary, Freelance, etc."
                                                className="mt-1"
                                                required
                                                disabled={index !== incomeSources.length - 1}
                                            />
                                        </div>
                                        <div>
                                            <Label>Amount</Label>
                                            <Input
                                                type="number"
                                                value={source.amount || ''}
                                                onChange={(e) => handleIncomeChange(index, 'amount', e.target.value)}
                                                placeholder="0"
                                                className="mt-1"
                                                required
                                                min="0"
                                                disabled={index !== incomeSources.length - 1}
                                            />
                                        </div>

                                        <div className="flex gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => removeIncomeSource(index)}
                                                disabled={incomeSources.length <= 1}
                                            >
                                                Remove
                                            </Button>
                                            {index === incomeSources.length - 1 && (
                                                <Button
                                                    type="button"
                                                    variant="secondary"
                                                    onClick={addIncomeSource}
                                                    disabled={!source.name || source.amount <= 0}
                                                    title={!source.name || source.amount <= 0 ? "Complete this income source before adding another." : ""}
                                                >
                                                    Add More
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <Label>Total Budget</Label>
                                <Input
                                    type="number"
                                    value={totalBudget}
                                    readOnly
                                    className="font-semibold mt-1"
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setTab("this-month")}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={loading}>
                                    {loading ? "Creating..." : "Create Budget"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default AddNewBudget;