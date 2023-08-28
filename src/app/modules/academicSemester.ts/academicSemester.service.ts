import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { calculatePagination } from '../../../helpers/paginationHelpers';
import { PaginationOptions } from '../../../interfaces/pagination';
import { AcademicTitleCodemapping, academicSemesterSearchableField } from './academicSemester.Constance';
import { IAcademicSearchTerm, IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import status from 'http-status';
import { IGenericResponse } from '../../../interfaces/common';


const createAcademicSemester = async (
  academicSemester: IAcademicSemester,
): Promise<IAcademicSemester> => {
  if (
    AcademicTitleCodemapping[academicSemester.title] !== academicSemester.code
  ) {
    throw new ApiError(400, 'Title and Code not match');
  }
  const createAcademicService = await AcademicSemester.create(academicSemester);
  if (!createAcademicService) {
    throw new ApiError(status.BAD_REQUEST, 'AcademicSemester not Creted');
  }
  return createAcademicService;
};

// ----------------****************getAllSemester***************************---------------------
//-----------------------*********************************--------------------------------
const getAllSemester = async (filters:IAcademicSearchTerm,
  paginationOptions: PaginationOptions,): Promise<IGenericResponse<IAcademicSemester[]>> => {

    const {searchTerm,...filtersData}=filters

    const andCondition=[]

    if(searchTerm){
      andCondition.push({
        $or:academicSemesterSearchableField.map((field)=>({[field]:{$regex:searchTerm,$options:'i'}}))
      })
    }


    if(Object.keys(filtersData).length){
    andCondition.push({
        $and:Object.entries(filtersData).map(([field,value])=>({
        [field]:value
      }))
    })
    }


  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

const whereCondition=andCondition.length>0?{$and:andCondition}:{}

  const result = await AcademicSemester.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};



// ----------------****************get Single Semester***************************---------------------
//-----------------------*********************************--------------------------------
const getSingleSemester=async(id:string):Promise<IAcademicSemester|null>=>{
  const result=AcademicSemester.findById(id)
  return result
}


// ----------------****************updateSemester***************************---------------------
//-----------------------*********************************--------------------------------
const updateSemester=async(id:string,payload:Partial<IAcademicSemester>):Promise<IAcademicSemester|null>=>{
  if (payload.title && payload.code && AcademicTitleCodemapping[payload.title] !== payload.code) {
    throw new ApiError(400, 'Title and Code not match');
  }
  const result=AcademicSemester.findOneAndUpdate({_id:id},payload,{new:true})
  return result
}
// ----------------****************Delete Semester***************************---------------------
//-----------------------*********************************--------------------------------
const deleteSemester=async(id:string):Promise<IAcademicSemester|null>=>{

  const result=AcademicSemester.findByIdAndDelete(id)
  return result
}


export const academicSemesterService = {
  createAcademicSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
  deleteSemester
};
