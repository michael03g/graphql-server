# GraphQL Server (Alaffia)
**Node + Express + Apollo Server + GraphQL + TypeORM + Postgres + Jest**


## Queries
1. User and Facilities
```gql
query user(id: UUID!) {
	id
	firstName
	lastName
	email
	role
	createdAt
	facilities: {
		id
		name
		createdAt
		locations: {
			id
			state
			zip
			address
		}
	}
}
```

2. Users by location
```gql
query usersByLocation(UsersByLocationInput) {
	location {
			id
			state
			zip
			address
			facility {
				id
				name
				createdAt
			}
			users {
				id
				firstName
				lastName
				email
				role
				createdAt
			}
	}
}
```

## Database
### Modeling
- User
  - id: uuid
  - firstName: string
  - lastName: string
  - email: string
  - role: string
  - createdAt: DateTime

- Facility
  - id: uuid
  - name: string
  - createdAt: DateTime

- Location
  - id: uuid
  - state: string
  - zip: string
  - address: string

### Relationship
- User and Facility relation: many-to-many.
- Facility and Location relation: one-to-many.

## How to run the project
1. Make sure you installed PostgreSQL.

2. Clone the project.
```shell
git clone https://github.com/michael03g/graphql-server.git
```

3. Install node modules.
```shell
npm install
```

4. Clone `.env.template` and create your .env

5. Run the project.
```shell
npm run dev
```
The default port of this project would be 4000.

6. Run test cases.
```shell
npm run test
```
