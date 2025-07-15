import { apiUrl } from "../utils/apiUrl";

const JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NjkyMWVmODc0YjE4MjkxN2ZhMzg3NSIsImlhdCI6MTc1MjA1NDUzNCwiZXhwIjoxNzU0NjQ2NTM0fQ.uy9f4CfGVk3LdrarSZDF_qJGZ-4YgAXS1LEpZTacl4s"

type Group = "men" | "women" | "kids"
export default async function getProducts(group: Group ) {
  const url =`${apiUrl}/products?group=${group}`
  const response = await fetch(url, {
    method: "GET",
    headers: {Authorization: `Bearer ${JWT_TOKEN}`}
  })
  const products = await response.json()
  return products
}