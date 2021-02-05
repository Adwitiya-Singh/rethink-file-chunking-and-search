My try at the rethink large file display and search challenge
To run the challenge:

- CLONE this repo
- run npm install && npm start
- Open `localhost:3000` in your browser
- It will show the first page of the 2-million lie CSV 
- To get the n'th page just pass a `page=n` query parameter

Implemented: 

- Chunking of huge csv files so that they can be paginated and rendered instantly

To be done:

- Make search work
- Maybe convert CSV to a sqlite db to make search and indexing easier
