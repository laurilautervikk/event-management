//get a message
export async function getData(req, res) {
  try {
    const data = { message: "It's alive" };
    res.status(200).send(data);
  } catch {
    res.status(404).send({ error: "No data found" });
  }
}
