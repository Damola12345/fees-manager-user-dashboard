import { toast } from "react-hot-toast";

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

/* toast functions */
export const alertSuccess = (message) => {
  toast.success(message);
}

export const alertError = (message) => {
  toast.error(message);
}

export const alertPromise = (promise, messages) => {
  toast.promise(promise, messages);
}

export const alertMessage = (message, display, color) => {
  const msg = document.getElementById('err-msg');
  msg.innerHTML = message;
  msg.style.display = display;
  msg.style.color = color;
}


/* Function to get date */
export const getDate = (dateString, fulldate=false) => {

	// Get year, month, and day part from the date
	const date = new Date(dateString);
	if (!fulldate) {
		const year = date.toLocaleString("default", { year: "numeric" });
		const month = date.toLocaleString("default", { month: "2-digit" });
		const day = date.toLocaleString("default", { day: "2-digit" });
		// Generate yyyy-mm-dd date string
		const formattedDate = day + "-" + month + "-" + year;
		return formattedDate;
	} else {
		// Generate full date string
		return date.toUTCString();
	}
}

/* Function to convert number to cash */
export const money = (amount) => {
	const amountStr = String(amount)
	let i = amountStr.length - 1;
	let j = 1;
	let cash = '';
	while (i > -1) {
		cash = amountStr[i] + cash;
		if (i && j % 3 === 0) {
			cash = ',' + cash;
		}
		i--;
		j++;
	}
	return cash;
}

/* Logout function */
export const logout = (navigate) => {
	fetch(`${BACKEND_HOST}/logout`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: "include",
	})
	.then((response) => {
		if (response.ok) {
			response.json().then((message) => {
				localStorage.removeItem('user');
				document.cookie = "auth_key=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
				localStorage.removeItem('currentSchool');
				navigate('/login');
			})
		} else if (response.status === 401) {
			navigate('/login');
		}
	})
	.catch((err) => {
		console.log(err)
	});
}

