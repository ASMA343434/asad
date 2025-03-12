document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = {
                email: loginForm.email.value,
                password: loginForm.password.value
            };

            try {
                const response = await fetch('/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();
                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    window.location.href = '/dashboard.html';
                } else {
                    alert(data.error);
                }
            } catch (error) {
                alert('حدث خطأ في تسجيل الدخول');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = {
                username: registerForm.username.value,
                email: registerForm.email.value,
                password: registerForm.password.value
            };

            try {
                const response = await fetch('/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();
                if (response.ok) {
                    alert('تم إنشاء الحساب بنجاح');
                    window.location.href = '/index.html';
                } else {
                    alert(data.error);
                }
            } catch (error) {
                alert('حدث خطأ في إنشاء الحساب');
            }
        });
    }
});
