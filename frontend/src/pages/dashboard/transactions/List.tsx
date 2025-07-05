import { Pencil, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import type { Transaction } from '@/interfaces/Database';
import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  const [data, setData] = useState<Transaction[]>(transactions);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [editTxn, setEditTxn] = useState<Transaction | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const form = useForm<Transaction>({
    defaultValues: {
      name: '',
      amount: 0,
      date: '',
      description: '',
    },
  });

  const handleDelete = async (deleteId: string) => {
    if (loadingId) return;
    setLoadingId(deleteId);

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/transaction/delete/${deleteId}`);
      setData(prev => prev.filter(txn => txn._id !== deleteId));
    } catch (error) {
      console.error('Error deleting transaction:', error);
      alert('Failed to delete transaction');
    } finally {
      setLoadingId(null);
    }
  };

  const handleEditClick = (txn: Transaction) => {
    setEditTxn(txn);
    form.reset({
      name: txn.name,
      amount: txn.amount,
      date: txn.date.slice(0, 16),
      description: txn.description || '',
    });
    setIsEditOpen(true);
  };

  const onEditSubmit = async (formData: Transaction) => {
    if (!editTxn) return;

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/transaction/update/${editTxn._id}`,
        formData
      );

      setData(prev =>
        prev.map(t => (t._id === editTxn._id ? { ...t, ...res.data } : t))
      );
      setIsEditOpen(false);
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update transaction');
    }
  };

  return (
    <div className="overflow-x-auto shadow-sm">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-100 text-xs uppercase text-gray-500">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Amount</th>
            <th className="px-6 py-3">Date & Time</th>
            <th className="px-6 py-3 text-center">Edit</th>
            <th className="px-6 py-3 text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map(txn => (
            <tr key={txn._id} className="border-b hover:bg-gray-50 transition duration-150">
              <td className="px-6 py-4 font-medium text-gray-900">{txn.name}</td>
              <td className="px-6 py-4">₹{txn.amount.toLocaleString()}</td>
              <td className="px-6 py-4">
                {new Date(txn.date).toLocaleString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </td>
              <td className="px-6 py-4 text-center">
                <button onClick={() => handleEditClick(txn)} className="text-blue-600 hover:text-blue-800">
                  <Pencil size={18} />
                </button>
              </td>
              <td className="px-6 py-4 text-center">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Transaction</AlertDialogTitle>
                    </AlertDialogHeader>
                    <p>Are you sure you want to delete this transaction? This action cannot be undone.</p>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(txn._id)} disabled={loadingId === txn._id}>
                        {loadingId === txn._id ? 'Deleting...' : 'Continue'}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Dialog */}
      <AlertDialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Transaction</AlertDialogTitle>
          </AlertDialogHeader>

          <form onSubmit={form.handleSubmit(onEditSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Transaction Name</Label>
              <Input id="name" {...form.register('name')} />
            </div>

            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input type="number" id="amount" {...form.register('amount', { valueAsNumber: true })} />
            </div>

            <div>
              <Label htmlFor="date">Date & Time</Label>
              <Input type="datetime-local" id="date" {...form.register('date')} />
            </div>

            <div>
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea id="description" {...form.register('description')} />
            </div>

            <div className="flex justify-end gap-2">
              <AlertDialogCancel asChild>
                <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
                  Cancel
                </Button>
              </AlertDialogCancel>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TransactionTable;