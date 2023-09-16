import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  defult_student_password: process.env.DEFULT_STUDENT_PASSWORD,
  default_facilty_password:process.env.DEFULT_FACULTY_PASSWORD,
  default_admin_password:process.env.DEFULT_ADMIN_PASSWORD
};
