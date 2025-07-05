import React, { useState } from 'react';
import AddNewBudget from './Create-new-Budget';

const SetBudget: React.FC = () => {

  /* -------------------- Tab Values --------------------*/
  const [tab, setTab] = useState<string>("this-month");

  
  const currentMonthName = new Date().toLocaleString('default', { month: 'long' });
  const currentYear = new Date().getFullYear();

  return (
    <div>
        <div className='py-2 flex justify-between px-4 sm:px-2 md:px-4 lg:px-6 border-b'>
            <div>
                <h1 className='text-xl font-semibold'>Budget Listing</h1>
                <p className='text-sm text-muted-foreground'>
                View and manage your monthly budgets for the current year.
                </p>
            </div>
        </div>

        <div className='mt-4 px-2'>
            <div className="flex justify-start items-center border-b gap-4">
                    <span
                        className={`pb-2 font-semibold cursor-pointer hover:text-blue-700 ${tab === 'this-month'
                            ? 'border-b-4 border-blue-700 text-blue-700'
                            : 'text-red-500'
                            }`}
                        onClick={() => setTab('this-month')}
                    >
                         {currentMonthName}-month
                    </span>

                    <span
                        className={`pb-2 font-semibold cursor-pointer hover:text-blue-700 ${tab === 'year'
                            ? 'border-b-4 border-blue-700 text-blue-700'
                            : 'text-red-500'
                            }`}
                        onClick={() => setTab('year')}
                    >
                        Year {currentYear}
                    </span>
                    <span
                        className={`pb-2 font-semibold cursor-pointer hover:text-blue-700 ${tab === 'create-new'
                            ? 'border-b-4 border-blue-700 text-blue-700'
                            : 'text-red-500'
                            }`}
                        onClick={() => setTab('create-new')}
                    >
                        + Add New
                    </span>
            </div>

            <div className='mt-4'>

                {
                    tab=="this-month"
                    &&
                    <div> This Month </div>

                }
                {
                    tab=="year"
                    &&
                    <div>Year</div>
                    
                }
                {
                    tab=="create-new"
                    && (
                        <AddNewBudget setTab={setTab}/>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default SetBudget;