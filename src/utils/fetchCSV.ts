import Papa from 'papaparse'

export const fetchCSV = async (url: string): Promise<any[]> => {
  const response = await fetch(url)
  const text = await response.text()

  return new Promise((resolve, reject) => {
    Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: reject,
    })
  })
}