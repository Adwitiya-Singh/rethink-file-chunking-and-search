My attempt at the Rethink large file display and search challenge

This project has a `node.js(Express)` server which has the pagination and search logic. 

Since running this project is a little more complex due to the involvement of `.CSV` and sqlite DB files, a quick demo of this project can be found [here](https://www.youtube.com/watch?v=uk2RglaIylk)

There are multiple ways to run this challenge. You can either download the sqlite DB that I used and just put it in the `Database` directory or download the `.CSV` file and convert it to a sqlite DB yourself by either using the `csv_to_sqlite` script in the `Database` directory or using a program like [DB Browser](https://sqlitebrowser.org/dl/) since the script does line by line insertions at the moment and can be pretty time consuming. The `.CSV` file can be found [here](https://drive.google.com/file/d/1AnwQWAmB_t9nC8FxbG3W5f_fjXrcMpYo/view?usp=sharing) and the sqlite database can be found [here](https://drive.google.com/file/d/1wNGO46ksrat8TunUjjeOyx-qkwfcPPom/view?usp=sharing)


To run the challenge:

- CLONE this repo
- Either download the sqlite DB or download the `CSV` file and convert it into a sqlite DB
- name the DB `test.db` and the table `data` with all fields being `string`s if you are manually converting from `CSV`
- save the DB file in the `Database` directory
- run  `npm install && npm start` in the root directory. This will start the backend server.
- `cd` into the `Front` folder and run `npm install && npm start`. This will start the frontend.
- Open `localhost:3000` in your browser
- It will show the first page of the 2-million line CSV 

Features Implemented: 

- Chunking of large `.CSV` files so that they can be paginated and rendered instantly
- Near-Instant Fuzzy search for all columns of DB
- `.CSV` to sqlite DB service
- Scalability to up to 10 million+ lines with minimum performance loss

Limitations:

- Hard coded for one `.CSV` file
- Fuzzy search logic is primitive
- `csv_to_sqlite` service has a poor time complexity


Packages Used:
- [express](https://www.npmjs.com/package/express)
- [sqlite3](https://www.npmjs.com/package/sqlite3)
- [react-table](https://www.npmjs.com/package/react-table)
- [styled-components](https://www.npmjs.com/package/styled-components)


Future Works:
- `.CSV` to sqlite service can be made orders of magnitude faster by doing batch insertions
- search can be made faster for files with more than 10 million lines by using [FTS5](https://sqlite.org/fts5.html)
- The app can be made more generic by abstracting away the sql-to-csv layer which will make it work for any provided `.CSV` file
