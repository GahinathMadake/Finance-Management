# 💰 Personal Finance Visualizer

A simple web application to help users track personal finances — including adding, editing, and deleting transactions, along with budget management and basic visual summaries. Built with **React**, **shadcn/ui**, **Recharts**, **MongoDB**, and **Node.js**.

---

## 🚀 Live Demo

🌐 [Live App URL](https://your-deployment-url.com)

---

## 📂 Repository

🔗 [GitHub Repository](https://github.com/GahinathMadake/Finance-Management)

---

## ✅ Submission Stage

**Stage 1**  
✔ Add/Edit/Delete Transactions  
✔ Transaction List View  
✔ Monthly Expenses Bar Chart  
✔ Basic Budget Entry  
✔ Basic Dashboard  
❌ No Login (Shared Database)

---

## 🛠 Tech Stack

- **Frontend**: React + Vite + TypeScript, shadcn/ui, Recharts
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **UI Framework**: Tailwind CSS (via shadcn/ui)
- **Charts**: Recharts

---

## 📸 Features Implemented

### ✅ Stage 1

- Add, edit, and delete financial transactions (amount, date, description)
- Monthly expenses bar chart
- View all transactions in a list
- Basic form validation and error handling
- Create monthly budgets
- Dashboard to summarize current finances
- Responsive UI with smooth UX

---

## 🧪 Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/GahinathMadake/Finance-Management.git
cd finance-visualizer

#. Start the backend
1. 📁 Navigate to /backend
cd backend
npm install

2. ⚙️ Create .env file with following variable in /backend
DATABASE_URL=your_mongodb_connection_string
PORT=5000

3. ▶️ Run backend
npm run dev


#Start the frontend
1. 📁 Navigate to /frontend
cd ../frontend
npm install

2. ⚙️ Create .env file in /frontend
VITE_BACKEND_URL=http://localhost:5000

3. ▶️ Run frontend
npm run dev
