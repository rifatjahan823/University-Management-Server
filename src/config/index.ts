import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  defult_student_password: process.env.DEFULT_STUDENT_PASSWORD,
  default_facilty_password: process.env.DEFULT_FACULTY_PASSWORD,
  default_admin_password: process.env.DEFULT_ADMIN_PASSWORD,
  bcript_salt_round: process.env.BCRYPT_SALT_ROUNDS,
  jwt:{
    scret:process.env.JWT_SECRET,
    refresh_secret:process.env.JWT_REFRESH_SECRET,
    expired_In:process.env.JWT_EXPIRES_IN,
    refresh_expired_In:process.env.JWT_REFRESH_EXPIRES_IN
  }
};
