import { SortOrder } from "mongoose";
import { calculatePagination } from "../../../helpers/paginationHelpers";
import { IGenericResponse } from "../../../interfaces/common";
import { PaginationOptions } from "../../../interfaces/pagination";
import { IAcademicFaculty, academicFacultySearchTerm } from "./academicFaculty.interface";
import { academicFaculty } from "./academicFaculty.model";
import { academicFacultySearchableField } from "./academicFaculty.constance";


// --------------Create Faculty------------------
// ---------------**************************-----------------
const createFaculty=async(payload:IAcademicFaculty):Promise<IAcademicFaculty>=>{
const result=await academicFaculty.create(payload)
return result
}

// --------------Get All Faculty------------------
// ---------------**************************-----------------
const getAllFaculty=async(filters:academicFacultySearchTerm,paginationOptions:PaginationOptions):Promise<IGenericResponse<IAcademicFaculty[]>>=>{
    const { searchTerm, ...filtersData } = filters;

    const andCondition = [];
  
    if (searchTerm) {
      andCondition.push({
        $or: academicFacultySearchableField.map(field => ({
          [field]: { $regex: searchTerm, $options: 'i' },
        })),
      });
    }
  
    if (Object.keys(filtersData).length) {
      andCondition.push({
        $and: Object.entries(filtersData).map(([field, value]) => ({
          [field]: value,
        })),
      });
    }
  
    const { page, limit, skip, sortBy, sortOrder } =
      calculatePagination(paginationOptions);
  
    const sortCondition: { [key: string]: SortOrder } = {};
  
    if (sortBy && sortOrder) {
      sortCondition[sortBy] = sortOrder;
    }
  
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  
    const result = await academicFaculty.find(whereCondition)
      .sort(sortCondition)
      .skip(skip)
      .limit(limit);
  
    const total = await academicFaculty.countDocuments();
  
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
}


//---------------Get Single Faculty-----------------
// -----------------******************-------------------------
const getsingleFaculty=async(id:string):Promise<IAcademicFaculty|null>=>{
  const result= await academicFaculty.findById(id)
  return result
}


//---------------update Faculty-----------------
// -----------------******************-------------------------
const updateFaculty=async(id:string,payload:Partial<IAcademicFaculty>):Promise<IAcademicFaculty|null>=>{
  const result =await academicFaculty.findOneAndUpdate({_id:id},payload,{new:true})
  return result
}

//---------------update Faculty-----------------
// -----------------******************-------------------------
const deleteFaculty=async(id:string):Promise<IAcademicFaculty|null>=>{
const result=await academicFaculty.findByIdAndDelete(id)
return result
}



export const facultyService={
    createFaculty,
    getAllFaculty,
    getsingleFaculty,
    updateFaculty,
    deleteFaculty
}