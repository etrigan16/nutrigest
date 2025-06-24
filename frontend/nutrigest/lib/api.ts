export async function getPacientes() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pacientes`);
  if (!res.ok) throw new Error('Error al obtener pacientes');
  return res.json();
}
