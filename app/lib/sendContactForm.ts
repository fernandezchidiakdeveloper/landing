export async function sendContactForm(data: {
  name: string;
  email: string;
  message: string;
}) {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("message", data.message);

  const res = await fetch("/sendmail.php", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.text();
}
