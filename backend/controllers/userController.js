export async function getData(req, res) {
  try {
    const data = { message: "OK" };
    res.status(200).send(data);
  } catch {
    res.status(404).send({ error: "No user found" });
  }
}
