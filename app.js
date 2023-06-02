// Store the orders in an object
var orders = {};

// Counter for assigning unique IDs to order elements
var orderIdCounter = 1;

// Function to handle the "Add Order" button click
function addOrder() {
  // Get the input values
  var dishName = document.getElementById("dishName").value;
  var dishPrice = document.getElementById("dishPrice").value;
  var table = document.getElementById("table").value;

  // Store the order in the orders object
  if (!orders[table]) {
    orders[table] = [];
  }

  var orderId = "order-" + orderIdCounter++;

  orders[table].push({
    id: orderId,
    dishName: dishName,
    dishPrice: dishPrice,
  });

  // Append the order element under the appropriate table
  var tableElement = document.getElementById(table);
  if (!tableElement) {
    // If the table element doesn't exist, create a new one
    tableElement = document.createElement("div");
    tableElement.id = table;
    tableElement.innerHTML = "<h3>" + table + "</h3>";
    document.getElementById("orders").appendChild(tableElement);
  }

  var orderElement = document.createElement("p");
  orderElement.id = orderId;
  orderElement.textContent = dishName + " - Rs" + dishPrice;

  var deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = function () {
    deleteOrder(table, orderId);
  };

  orderElement.appendChild(deleteButton);
  tableElement.appendChild(orderElement);

  // Clear the input values for the next order
  document.getElementById("dishName").value = "";
  document.getElementById("dishPrice").value = "";
}

// Function to delete an order
function deleteOrder(table, orderId) {
  var tableOrders = orders[table];
  var index = tableOrders.findIndex(function (order) {
    return order.id === orderId;
  });

  if (index !== -1) {
    tableOrders.splice(index, 1);
    var orderElement = document.getElementById(orderId);
    orderElement.remove();
  }
}

// Function to display existing orders on page load
function displayOrders() {
  var ordersContainer = document.getElementById("orders");
  for (var table in orders) {
    var tableElement = document.createElement("div");
    tableElement.id = table;
    tableElement.innerHTML = "<h3>" + table + "</h3>";
    ordersContainer.appendChild(tableElement);

    orders[table].forEach(function (order) {
      var orderElement = document.createElement("p");
      orderElement.id = order.id;
      orderElement.textContent = order.dishName + " - Rs" + order.dishPrice;

      var deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = function () {
        deleteOrder(table, order.id);
      };

      orderElement.appendChild(deleteButton);
      tableElement.appendChild(orderElement);
    });
  }
}

// Display existing orders on page load
displayOrders();
