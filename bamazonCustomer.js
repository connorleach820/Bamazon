var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "bouncer820",
	database: "bamazon"
});

function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return "Please enter a whole number.";
	}
}

function promptPurchase() {
	inquirer.prompt([
		{
			type: "input",
			name: "item_id",
			message: "Please enter the ID of the item you would like to purchase",
			validate: validateInput,
			filter: Number
		},
		{
			type: "input",
			name: "quantity",
			message: "How many would you like to purchase?",
			validate: validateInput,
			filter: Number
		}
	]).then(function(input) {
		var item = input.item_id;
		var quantity = input.quantity;
		var queryStr = "SELECT * FROM products WHERE ?";
		connection.query(queryStr, {item_id: item}, function(err, data) {
			if (err) throw err;
			if (data.length === 0) {
				console.log("ERROR: Invalid ID.  Select a valid ID.");
				displayInventory();
			} else {
				var productInfo = data[0];
				if (quantity <= productInfo.stock_quantity) {
					console.log("The product you're looking for is in stock!");
					var updateQueryStr = "UPDATE products SET stock_quantity = " + (productInfo.stock_quantity - quantity);

					connection.query(updateQueryStr, function(err, data) {
						if (err) throw err;
						console.log("You're order has been placed! Your total is $" + productInfo.price * quantity);
						console.log("Thanks for shopping with us!");
						console.log("\n---------------------------\n");
						connection.end();
					})
				} else {
					console.log("Sorry, that item is no longer in stock.  Your order cannot be placed.");
					console.log("Please update order.");
					console.log("\n---------------------------\n");

					displayInventory();
				}
			}
		})
	})
}

function displayInventory() {
	queryStr = "SELECT * FROM products";

	connection.query(queryStr, function(err, data) {
		if (err) throw err;

		console.log("Remainng Inventory: ");
		console.log("\n---------------------------\n");

		var strOut = "";
		for (var i = 0; i < data.length; i++) {
			strOut = "";
			strOut += "Item ID: " + data[i].item_id + " // ";
			strOut += "Product Name: " + data[i].product_name + " // ";
			strOut += "Department: " + data[i].department_name + " // ";
			strOut += "Price: $" + data[i].price + "\n";

			console.log(strOut);
		}

		console.log("\n---------------------------\n");
		promptPurchase();
	})
}

function runBamazon() {
	displayInventory();
}
runBamazon();