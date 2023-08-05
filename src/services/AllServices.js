/* const loginUser = (event) => {
    setIsLoading(true);
    event ? event.preventDefault() : console.log();
    const credentials = Buffer.from(
      `${guest ? "guest.user@test.me" : email}:${
        guest ? "guestuser" : password
      }`
    ).toString("base64");
    fetch(`${BACKEND_HOST}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: credentials,
      },
      credentials: "include",
      body: JSON.stringify({}),
    })
      .then((response) => {
        //setIsLoading(false);
        if (response.ok) {
          response.json().then((message) => {
            //alertMessage(message.success, 'block', 'green');
            setIsLoading(false);
            localStorage.setItem("currentSchool", "");
            navigate("/");
          });
        } else {
          response.json().then((message) => {
            if (message.error === "Account not verified.") {
              alertMessage(message.error, "block", "red");
              setTimeout(() => {
                setIsLoading(false);
                navigate("/verify-email", { state: { email } });
              }, 2000);
            }
            setTimeout(() => {
              setIsLoading(false);
              alertMessage(message.error, "block", "red");
            }, 1000);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }; */

/* const SignupUser = (event) => {
    setIsLoading(true);
    event.preventDefault();
    if (password1 === password2) {
      const userInfo = {
        firstname,
        lastname,
        email,
        phone,
        password: password2,
      };
      fetch(`${BACKEND_HOST}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((message) => {
              alertMessage(message.success, "block", "green");
              setIsLoading(false);
              navigate("/verify-email", { state: { email } });
            });
          }
          response.json().then((message) => {
            setIsLoading(false);
            alertMessage(message.error, "block", "red");
          });
        })
        .catch((err) => {
          setIsLoading(false);
          alertMessage("An error occured. Please retry", "block", "red");
          console.log(err.message);
        });
    } else {
      setIsLoading(false);
      alertMessage("Passwords don't match", "block", "red");
    }
  }; */
