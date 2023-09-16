import { IAcademicSemester } from '../academicSemester.ts/academicSemester.interface';
import { User } from './user.model';

export const findLastStudentId = async () => {
  const lastUser = await User.findOne({role:'student'}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastUser?.id?lastUser.id.substring(4):undefined;
};

// ----------------**************Student Id**************----------------------
// --------------********************---------------********------------------
export const genarateStudentId = async (academicSemester:IAcademicSemester) => {
  const currentId = (await findLastStudentId()) || (0).toString().padStart(5, '0');
  //increment by 1
   let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

   incrementedId=`${academicSemester?.year.substring(2)}${academicSemester.code}${incrementedId}`

  return incrementedId;
};

// ----------------**************Faculty Id**************----------------------
// --------------********************---------------********------------------
export const findLastFacultyId=async()=>{
  const findLastFacultyId=await User.findOne({role:"faculty"},{id:1,_id:0}).sort({createdAt: -1}).lean()
  return findLastFacultyId?.id?findLastFacultyId.id.substring(2):undefined
}

export const facultyId=async()=>{
  const currentId=(await findLastFacultyId()) || (0).toString().padStart(5,'0');
 let incrementedId=(parseInt(currentId)+1).toString().padStart(5,'0');
 incrementedId=`F-${incrementedId}`;
 return incrementedId
}

// ----------------**************AdminId**************----------------------
// --------------********************---------------********------------------
export const findLastAdminId=async()=>{
  const findLastAdminId=await User.findOne({role:"admin"},{id:1,_id:0}).sort({createdAt: -1}).lean()
  return findLastAdminId?.id?findLastAdminId.id.substring(2):undefined
}

export const adminId=async()=>{
  const currentId=(await findLastAdminId()) || (0).toString().padStart(5,'0');
 let incrementedId=(parseInt(currentId)+1).toString().padStart(5,'0');
 incrementedId=`A-${incrementedId}`;
 return incrementedId
}