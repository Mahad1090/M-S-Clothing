// addtocart.js

// Function to handle adding items to the cart
function addToCart(productName, price, image, imageSize = { width : 20, height:10}) {
  // Get the cart items from local storage or create an empty array
  var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Check if the product is already in the cart
  var existingItem = cartItems.find(item => item.productName === productName);

  if (existingItem) {
    // If the product is already in the cart, update the quantity
    existingItem.quantity++;
  } else {
    // If the product is not in the cart, add it as a new item
    cartItems.push({ productName, price, image, quantity: 1 });
  }

  // Save the updated cart items back to local storage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  // Update the cart display on the page
  updateCartDisplay();
}

// Function to update the cart display on the page
function updateCartDisplay() {
  // Get the cart items from local storage
  var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Access the table body where the cart items will be displayed
  var tableBody = document.querySelector('tbody');

  // Clear the existing content in the table body
  tableBody.innerHTML = '';

  // Iterate through the cart items and populate the table rows
  cartItems.forEach(item => {
    var row = tableBody.insertRow();

    // Add cells to the row
    var cellImage = row.insertCell(0);
    var cellProduct = row.insertCell(1);
    var cellQuantity = row.insertCell(2);
    var cellPrice = row.insertCell(3);
    var cellTotal = row.insertCell(4);
    var cellAction = row.insertCell(5);

    // Set the content of each cell
    cellImage.innerHTML = `<img src="${item.image}" alt="${item.productName}" style="width:100px;height:100px;">`; 
    cellProduct.textContent = item.productName;
    cellQuantity.textContent = item.quantity;
    cellPrice.textContent = ' Rs. ' + item.price;
    cellTotal.textContent = ' Rs. ' + item.price * item.quantity;

    // Add a remove item link with a class for styling
    var removeLink = document.createElement('span');
    removeLink.textContent = 'Remove';
    removeLink.className = 'remove-item';
    removeLink.onclick = function () {
      removeFromCart(item.productName);
    };

    cellAction.appendChild(removeLink);
  });

  // Calculate and display the total cost
  var totalCost = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  document.querySelector('.total-cost').textContent = ' Total Cost : RS. ' + totalCost.toFixed(0);
}

// Function to remove an item from the cart
function removeFromCart(productName) {
  // Get the cart items from local storage
  var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Remove the item from the cart based on the product name
  cartItems = cartItems.filter(item => item.productName !== productName);

  // Save the updated cart items back to local storage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  // Update the cart display on the page
  updateCartDisplay();
}

// Function to handle the "Proceed to Checkout" button
function proceedToCheckout() {
  // Implement your logic for handling the checkout process
  alert('Proceeding to Checkout');
}

// Function to handle the "Continue Shopping" button
function continueShopping() {
  // Implement your logic for continuing shopping
  alert('Continuing Shopping');
}

// Call the updateCartDisplay function when the page loads
document.addEventListener('DOMContentLoaded', updateCartDisplay);
