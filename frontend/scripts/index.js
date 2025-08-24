const form = document.getElementById("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("inputName").value;
  const email = document.getElementById("inputEmail").value;
  const message = document.getElementById("inputMessage").value;

  try {
    const res = await fetch('http://localhost:3000/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Error al enviar el mensaje');
    }

    const data = await res.json();
    alert('✅ Enviado:\n' + JSON.stringify(data.data, null, 2));
    form.reset();
  } catch (e) {
    alert('❌ ' + e.message);
    console.error(e);
  }
});
