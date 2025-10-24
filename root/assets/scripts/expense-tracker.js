(() => {
  const STORAGE_KEY = "expense-tracker-v1";
  const BUDGET_KEY = "expense-tracker-budget-v1";

  // DOM elements
  const expenseForm = document.getElementById("expense-form");
  const expensesList = document.getElementById("expenses-list");
  const totalAmountEl = document.getElementById("total-amount");
  const monthlyAmountEl = document.getElementById("monthly-amount");
  const budgetAmountEl = document.getElementById("budget-amount");
  const budgetInput = document.getElementById("budget-input");
  const setBudgetBtn = document.getElementById("set-budget-btn");
  const progressFill = document.getElementById("progress-fill");
  const progressText = document.getElementById("progress-text");
  const categoryFilter = document.getElementById("category-filter");
  const monthFilter = document.getElementById("month-filter");
  const clearFiltersBtn = document.getElementById("clear-filters");
  const clearAllBtn = document.getElementById("clear-all-btn");
  const expenseChart = document.getElementById("expense-chart");

  // State
  let expenses = [];
  let monthlyBudget = 0;
  let editingExpenseId = null;

  // Category colors for chart
  const categoryColors = {
    food: "#e74c3c",
    transport: "#3498db",
    entertainment: "#9b59b6",
    shopping: "#f39c12",
    bills: "#34495e",
    health: "#1abc9c",
    education: "#16a085",
    other: "#95a5a6",
  };

  // Initialize app
  function init() {
    loadData();
    setupEventListeners();
    setCurrentDate();
    setCurrentMonth();
    updateDisplay();
    drawChart();
  }

  // Load data from localStorage
  function loadData() {
    try {
      const expensesData = localStorage.getItem(STORAGE_KEY);
      expenses = expensesData ? JSON.parse(expensesData) : [];

      const budgetData = localStorage.getItem(BUDGET_KEY);
      monthlyBudget = budgetData ? parseFloat(budgetData) : 0;
      budgetInput.value = monthlyBudget > 0 ? monthlyBudget : "";
    } catch (error) {
      console.error("Error loading data:", error);
      expenses = [];
      monthlyBudget = 0;
    }
  }

  // Save data to localStorage
  function saveData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
      localStorage.setItem(BUDGET_KEY, monthlyBudget.toString());
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }

  // Setup event listeners
  function setupEventListeners() {
    expenseForm.addEventListener("submit", handleExpenseSubmit);
    setBudgetBtn.addEventListener("click", handleSetBudget);
    categoryFilter.addEventListener("change", updateDisplay);
    monthFilter.addEventListener("change", updateDisplay);
    clearFiltersBtn.addEventListener("click", clearFilters);
    clearAllBtn.addEventListener("click", clearAllExpenses);
  }

  // Set current date as default
  function setCurrentDate() {
    const today = new Date();
    const dateString = today.toISOString().split("T")[0];
    document.getElementById("expense-date").value = dateString;
  }

  // Set current month for filter
  function setCurrentMonth() {
    const today = new Date();
    const monthString = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}`;
    monthFilter.value = monthString;
  }

  // Handle expense form submission
  function handleExpenseSubmit(e) {
    e.preventDefault();

    const description = document
      .getElementById("expense-description")
      .value.trim();
    const amount = parseFloat(document.getElementById("expense-amount").value);
    const category = document.getElementById("expense-category").value;
    const date = document.getElementById("expense-date").value;

    if (!description || !amount || !category || !date) {
      alert("Please fill in all fields");
      return;
    }

    if (amount <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    const expense = {
      id: editingExpenseId || generateId(),
      description,
      amount,
      category,
      date,
      timestamp: Date.now(),
    };

    if (editingExpenseId) {
      const index = expenses.findIndex((exp) => exp.id === editingExpenseId);
      if (index !== -1) {
        expenses[index] = expense;
      }
      editingExpenseId = null;
      expenseForm.querySelector('button[type="submit"]').innerHTML =
        '<i class="fas fa-plus"></i> Add Expense';
    } else {
      expenses.unshift(expense);
    }

    saveData();
    updateDisplay();
    drawChart();
    expenseForm.reset();
    setCurrentDate();

    // Show success feedback
    showToast(
      editingExpenseId
        ? "Expense updated successfully!"
        : "Expense added successfully!"
    );
  }

  // Handle budget setting
  function handleSetBudget() {
    const budget = parseFloat(budgetInput.value);

    if (isNaN(budget) || budget < 0) {
      alert("Please enter a valid budget amount");
      return;
    }

    monthlyBudget = budget;
    saveData();
    updateDisplay();
    showToast("Budget set successfully!");
  }

  // Generate unique ID
  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  // Update display
  function updateDisplay() {
    updateSummaryCards();
    updateBudgetProgress();
    displayExpenses();
  }

  // Update summary cards
  function updateSummaryCards() {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const currentMonth = getCurrentMonth();
    const monthlyTotal = getMonthlyExpenses(currentMonth).reduce(
      (sum, exp) => sum + exp.amount,
      0
    );

    totalAmountEl.textContent = formatCurrency(total);
    monthlyAmountEl.textContent = formatCurrency(monthlyTotal);
    budgetAmountEl.textContent = formatCurrency(monthlyBudget);
  }

  // Update budget progress
  function updateBudgetProgress() {
    if (monthlyBudget <= 0) {
      progressFill.style.width = "0%";
      progressText.textContent = "No budget set";
      return;
    }

    const currentMonth = getCurrentMonth();
    const monthlyTotal = getMonthlyExpenses(currentMonth).reduce(
      (sum, exp) => sum + exp.amount,
      0
    );
    const percentage = (monthlyTotal / monthlyBudget) * 100;

    progressFill.style.width = `${Math.min(percentage, 100)}%`;

    if (percentage > 100) {
      progressFill.classList.add("over-budget");
      progressText.textContent = `${Math.round(
        percentage
      )}% used (Over budget!)`;
      progressText.style.color = "#e74c3c";
    } else {
      progressFill.classList.remove("over-budget");
      progressText.textContent = `${Math.round(percentage)}% used`;
      progressText.style.color = "#666";
    }
  }

  // Display expenses with filters
  function displayExpenses() {
    let filteredExpenses = [...expenses];

    // Apply category filter
    const selectedCategory = categoryFilter.value;
    if (selectedCategory) {
      filteredExpenses = filteredExpenses.filter(
        (exp) => exp.category === selectedCategory
      );
    }

    // Apply month filter
    const selectedMonth = monthFilter.value;
    if (selectedMonth) {
      filteredExpenses = filteredExpenses.filter((exp) =>
        exp.date.startsWith(selectedMonth)
      );
    }

    // Sort by date (newest first)
    filteredExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (filteredExpenses.length === 0) {
      expensesList.innerHTML = `
                <div class="no-expenses">
                    <i class="fas fa-receipt"></i>
                    <p>No expenses found</p>
                </div>
            `;
      return;
    }

    expensesList.innerHTML = filteredExpenses
      .map(
        (expense) => `
            <div class="expense-item fade-in">
                <div class="expense-details">
                    <div class="expense-description">${
                      expense.description
                    }</div>
                    <div class="expense-meta">
                        <span>${getCategoryEmoji(
                          expense.category
                        )} ${getCategoryName(expense.category)}</span>
                        <span>${formatDate(expense.date)}</span>
                    </div>
                </div>
                <div class="expense-amount">₹${expense.amount.toLocaleString(
                  "en-IN",
                  { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                )}</div>
                <div class="expense-actions">
                    <button class="btn-edit" onclick="editExpense('${
                      expense.id
                    }')" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-delete" onclick="deleteExpense('${
                      expense.id
                    }')" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `
      )
      .join("");
  }

  // Get category emoji
  function getCategoryEmoji(category) {
    const emojis = {
      food: "🍔",
      transport: "🚗",
      entertainment: "🎬",
      shopping: "🛍️",
      bills: "📄",
      health: "🏥",
      education: "📚",
      other: "📦",
    };
    return emojis[category] || "📦";
  }

  // Get category name
  function getCategoryName(category) {
    const names = {
      food: "Food",
      transport: "Transport",
      entertainment: "Entertainment",
      shopping: "Shopping",
      bills: "Bills",
      health: "Health",
      education: "Education",
      other: "Other",
    };
    return names[category] || "Other";
  }

  // Edit expense
  window.editExpense = function (expenseId) {
    const expense = expenses.find((exp) => exp.id === expenseId);
    if (!expense) return;

    document.getElementById("expense-description").value = expense.description;
    document.getElementById("expense-amount").value = expense.amount;
    document.getElementById("expense-category").value = expense.category;
    document.getElementById("expense-date").value = expense.date;

    editingExpenseId = expenseId;
    expenseForm.querySelector('button[type="submit"]').innerHTML =
      '<i class="fas fa-save"></i> Update Expense';

    // Scroll to form
    document
      .querySelector(".expense-form-container")
      .scrollIntoView({ behavior: "smooth" });
  };

  // Delete expense
  window.deleteExpense = function (expenseId) {
    if (!confirm("Are you sure you want to delete this expense?")) return;

    const expenseElement = document
      .querySelector(`[onclick*="${expenseId}"]`)
      .closest(".expense-item");
    expenseElement.classList.add("slide-out");

    setTimeout(() => {
      expenses = expenses.filter((exp) => exp.id !== expenseId);
      saveData();
      updateDisplay();
      drawChart();
      showToast("Expense deleted successfully!");
    }, 300);
  };

  // Clear filters
  function clearFilters() {
    categoryFilter.value = "";
    monthFilter.value = "";
    updateDisplay();
  }

  // Clear all expenses
  function clearAllExpenses() {
    if (
      !confirm(
        "Are you sure you want to delete all expenses? This action cannot be undone."
      )
    )
      return;

    expenses = [];
    saveData();
    updateDisplay();
    drawChart();
    showToast("All expenses cleared!");
  }

  // Get current month in YYYY-MM format
  function getCurrentMonth() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  }

  // Get monthly expenses
  function getMonthlyExpenses(month) {
    return expenses.filter((exp) => exp.date.startsWith(month));
  }

  // Format currency
  function formatCurrency(amount) {
    return `₹${amount.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  // Format date
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  // Draw chart
  function drawChart() {
    const ctx = expenseChart.getContext("2d");
    const canvas = expenseChart;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Get category data
    const categoryData = getCategoryData();
    const categories = Object.keys(categoryData);

    if (categories.length === 0) {
      ctx.font = "16px Segoe UI";
      ctx.fillStyle = "#bdc3c7";
      ctx.textAlign = "center";
      ctx.fillText("No data to display", canvas.width / 2, canvas.height / 2);
      return;
    }

    // Chart dimensions
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 40;

    // Calculate angles
    const total = Object.values(categoryData).reduce(
      (sum, amount) => sum + amount,
      0
    );
    let currentAngle = -Math.PI / 2;

    // Draw pie slices
    categories.forEach((category, index) => {
      const amount = categoryData[category];
      const percentage = amount / total;
      const sliceAngle = percentage * 2 * Math.PI;

      // Draw slice
      ctx.beginPath();
      ctx.arc(
        centerX,
        centerY,
        radius,
        currentAngle,
        currentAngle + sliceAngle
      );
      ctx.lineTo(centerX, centerY);
      ctx.fillStyle = categoryColors[category] || "#95a5a6";
      ctx.fill();

      // Draw label
      if (percentage > 0.05) {
        // Only show label if slice is > 5%
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
        const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);

        ctx.fillStyle = "white";
        ctx.font = "bold 12px Segoe UI";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`${Math.round(percentage * 100)}%`, labelX, labelY);
      }

      currentAngle += sliceAngle;
    });

    // Draw legend
    drawLegend(ctx, categories, categoryData, total);
  }

  // Draw legend
  function drawLegend(ctx, categories, categoryData, total) {
    const legendX = 20;
    let legendY = 20;
    const legendItemHeight = 25;

    ctx.font = "14px Segoe UI";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";

    categories.forEach((category, index) => {
      const amount = categoryData[category];
      const percentage = ((amount / total) * 100).toFixed(1);

      // Draw color box
      ctx.fillStyle = categoryColors[category] || "#95a5a6";
      ctx.fillRect(legendX, legendY - 8, 16, 16);

      // Draw text
      ctx.fillStyle = "#333";
      ctx.fillText(
        `${getCategoryName(category)} (${percentage}%)`,
        legendX + 25,
        legendY
      );

      legendY += legendItemHeight;
    });
  }

  // Get category data for chart
  function getCategoryData() {
    const data = {};

    // Use filtered month if selected
    let filteredExpenses = expenses;
    const selectedMonth = monthFilter.value;
    if (selectedMonth) {
      filteredExpenses = expenses.filter((exp) =>
        exp.date.startsWith(selectedMonth)
      );
    }

    filteredExpenses.forEach((expense) => {
      data[expense.category] = (data[expense.category] || 0) + expense.amount;
    });

    return data;
  }

  // Show toast notification
  function showToast(message) {
    // Create toast element
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #2ecc71;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            font-weight: 600;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.style.transform = "translateX(0)";
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.transform = "translateX(100%)";
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }

  // Initialize the app when DOM is loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
