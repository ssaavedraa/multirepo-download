# Multi-repository clone

### Setup:

1. Create links.txt file
2. Add repository links to `links.txt` file (separated by a new line)
3. Run using `node index.js` The script will create the required folder with all the repositories cloned inside.

- If want to use docker to setup you database instance:

1. change `.env.example` file to `.env` and setup your environment variables
2. run `docker compose up -d`
3. your database should be available in `localhost:5432`

This is an improved version from Jorge Vega's script written for Henry mentors. Credits for him.
