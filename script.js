const expenseForm =
    document.getElementById("expenseForm");

const expenseList =
    document.getElementById("expenseList");

const totalDisplay =
    document.getElementById("totalAmount");


let expenses =
    JSON.parse(
        localStorage.getItem("expenses")
    ) || [];



function saveExpenses() {

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

}



function displayExpenses() {

    expenseList.innerHTML = "";

    let totalAmount = 0;


    if (expenses.length === 0) {

        expenseList.innerHTML = `
            <p class="empty">
                No expenses added yet.
            </p>
        `;

        totalDisplay.textContent = "₹0";

        return;
    }



    expenses.forEach(function(expense) {

        totalAmount =
            totalAmount + expense.amount;


        const expenseElement =
            document.createElement("div");

        expenseElement.className =
            "expense";


        expenseElement.innerHTML = `

            <div class="expense-info">

                <h3>
                    ${expense.name}
                </h3>

                <p>
                    Amount: ₹${expense.amount}
                </p>

                <p>
                    Category: ${expense.category}
                </p>

                <p>
                    Date: ${expense.date}
                </p>

            </div>

        `;



        const deleteButton =
            document.createElement("button");


        deleteButton.textContent =
            "Delete";


        deleteButton.className =
            "delete-button";


        deleteButton.type =
            "button";


        deleteButton.addEventListener(
            "click",
            function() {

                expenses =
                    expenses.filter(
                        function(item) {

                            return item.id !== expense.id;

                        }
                    );


                saveExpenses();

                displayExpenses();

            }
        );


        expenseElement.appendChild(
            deleteButton
        );


        expenseList.appendChild(
            expenseElement
        );

    });


    totalDisplay.textContent =
        "₹" + totalAmount;

}



expenseForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document
                .getElementById("expenseName")
                .value
                .trim();


        const amount =
            Number(
                document
                    .getElementById("expenseAmount")
                    .value
            );


        const category =
            document
                .getElementById("expenseCategory")
                .value;


        const date =
            document
                .getElementById("expenseDate")
                .value;



        if (name === "") {

            alert(
                "Please enter an expense name."
            );

            return;

        }


        if (amount <= 0) {

            alert(
                "Please enter an amount greater than 0."
            );

            return;

        }


        if (date === "") {

            alert(
                "Please select a date."
            );

            return;

        }



        const newExpense = {

            id: Date.now(),

            name: name,

            amount: amount,

            category: category,

            date: date

        };


        expenses.push(
            newExpense
        );


        saveExpenses();

        displayExpenses();


        expenseForm.reset();

    }
);



displayExpenses();
