import postgres from "postgres";

const sql = postgres("postgres://postgres:user@localhost/TechCompany");

export default sql;