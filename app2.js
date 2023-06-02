// Store the orders in an object
var orders = {};

// Counter for assigning unique IDs to order elements
var orderIdCounter = 1;

//function to add an order
function addOrder() {
    var dishName = document.getElementById("dishName").value;
    var dishPrice = document.getElementById("dishPrice").value;
    var table = document.getElementById("table").value;
  
    var order = {
      dishName: dishName,
      dishPrice: dishPrice,
    };
  
    axios.post("https://crudcrud.com/api/5c4f77fda21c4a57aa27d21783c35815/orders", order)
      .then(function (response) {
        var orderId = response.data._id;
  
        if (!orders[table]) {
          orders[table] = [];
        }
  
        orders[table].push({
          id: orderId,
          dishName: dishName,
          dishPrice: dishPrice,
        });
  
        var tableElement = document.getElementById(table);
        if (!tableElement) {
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
  
        document.getElementById("dishName").value = "";
        document.getElementById("dishPrice").value = "";
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
//function to delete an order
function deleteOrder(table, orderId) {
    axios.delete("https://crudcrud.com/api/5c4f77fda21c4a57aa27d21783c35815/orders/" + orderId)
      .then(function () {
        var tableOrders = orders[table];
        var index = tableOrders.findIndex(function (order) {
          return order.id === orderId;
        });
  
        if (index !== -1) {
          tableOrders.splice(index, 1);
          var orderElement = document.getElementById(orderId);
          orderElement.remove();
        }
  
        if (tableOrders.length === 0) {
          var tableElement = document.getElementById(table);
          tableElement.remove();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
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
