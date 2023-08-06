// script.js

document.addEventListener("DOMContentLoaded", function () {
    const sendButton = document.getElementById("sendButton");

    sendButton.addEventListener("click", function () {
        const recipient = document.getElementById("recipient").value;
        const message = document.getElementById("message").value;
        const name = document.getElementById("name").value;
        const senderEmail = document.getElementById("senderEmail").value;
        const location = document.getElementById("location").value;
        const pinCode = document.getElementById("pinCode").value;

        const data = {
            recipient: recipient,
            message: message,
            name: name,
            senderEmail: senderEmail,
            location: location,
            pinCode: pinCode
        };

        fetch("/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            // Optionally, display a success message to the user
        })
        .catch((error) => {
            console.error("Error sending email:", error);
            // Optionally, display an error message to the user
        });
    });
});
