document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    clearErrors();

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if (!email || !password) {
        alert('Todos los campos son obligatorios.');
        return;
    }

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        if (response.ok) {
            alert('Inicio de sesión completado.');
            window.location.href = '/home'; // Redirige a la página principal o dashboard
        } else {
            const result = await response.json();
            alert(result.error);
        }
    } catch (error) {
        console.log('Error:', error);
        alert('Ocurrió un error al iniciar sesión.');
    }
});

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(el => el.innerText = '');
}
