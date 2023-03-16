// Create an array of three Promises
const promises = [
  createPromise(),
  createPromise(),
  createPromise()
];

// Helper function to create a Promise that resolves after a random time between 1 and 3 seconds
function createPromise() {
  const delay = Math.floor(Math.random() * 3000) + 1000;
  return new Promise(resolve => setTimeout(() => resolve(delay), delay));
}

// Add a row that spans 2 columns with the text Loading...
const output = document.getElementById('output');
const loadingRow = document.createElement('tr');
const loadingCell = document.createElement('td');
loadingCell.setAttribute('colspan', '2');
loadingCell.innerText = 'Loading...';
loadingRow.appendChild(loadingCell);
output.appendChild(loadingRow);

// Wait for all the Promises to resolve using Promise.all
Promise.all(promises)
  .then(results => {
    // Remove the loading text
    output.removeChild(loadingRow);
    
    // Populate the table with the required values
    for (let i = 0; i < promises.length; i++) {
      const row = document.createElement('tr');
      const nameCell = document.createElement('td');
      const timeCell = document.createElement('td');
      nameCell.innerText = `Promise ${i + 1}`;
      timeCell.innerText = `${results[i] / 1000}`;
      row.appendChild(nameCell);
      row.appendChild(timeCell);
      output.appendChild(row);
    }
    
    // Add the total row
    const totalRow = document.createElement('tr');
    const totalNameCell = document.createElement('td');
    const totalTimeCell = document.createElement('td');
    const totalTime = results.reduce((acc, curr) => acc + curr, 0) / 1000;
    totalNameCell.innerText = 'Total';
    totalTimeCell.innerText = totalTime.toFixed(3);
    totalRow.appendChild(totalNameCell);
    totalRow.appendChild(totalTimeCell);
    output.appendChild(totalRow);
  })
  .catch(error => console.log(error));
