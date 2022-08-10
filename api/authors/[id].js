export default async function handler(request, response) {
  response.status(200).json({message: `get author with id ${request.query.id} goes here`});
}
