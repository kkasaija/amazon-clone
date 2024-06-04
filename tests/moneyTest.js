//testing the formartCurrency() function in money.js file

//This function takes cents and returns a string representing a dollar

import { formatCurrency } from "../scripts/utils/money.js";

//test case 1
if (formatCurrency(2095) === "20.95") {
	console.log("test passed");
} else {
	console.log("test failed");
}

//test case 2
if (formatCurrency(0) === "0.00") {
	console.log("test passed");
} else {
	console.log("test failed");
}

//test case 3
if (formatCurrency(2000.5) === "20.01") {
	console.log("test passed");
} else {
	console.log("test failed");
}

//test case 4
if (formatCurrency(2000.4) === "20.00") {
	console.log("test passed");
} else {
	console.log("test failed");
}
