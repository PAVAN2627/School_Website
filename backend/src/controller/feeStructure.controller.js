import asyncHandler from '../utils/asyncHandler';
import ApiResponse from '../utils/ApiResponse';
import ApiError from '../utils/ApiError';
import FeeStructure from '../models/feeStructure.model';

const addClassFees = asyncHandler(async(req,res)=>{

  const {
      classOrGrade,
      tutionFee,
      admissionFee,
      examFee,
      otherCharges
  } = req.body

  if(!classOrGrade,!tutionFee,!admissionFee,!examFee,!otherCharges) {
    throw new ApiError(404, "all Filed are required")
  }

      const classFeeData = {
        classOrGrade,
        tutionFee,
        admissionFee,
        examFee,
        otherCharges
    }

  if(typeof tutionFee === "string") return classFeeData.tutionFee = Number(tutionFee)
  if(typeof admissionFee === "string") return classFeeData.admissionFee = Number(admissionFee)
  if(typeof examFee === "string") return classFeeData.examFee = Number(examFee)
  if(typeof otherCharges === "string") return classFeeData.otherCharges=  Number(otherCharges)


    const createClassFee = await FeeStructure.create(classFeeData)

    if(!createClassFee) {
      throw new ApiError(404, "class fee Didn' create")
    }

  return res.status(201).json(new ApiResponse(201, createClassFee, "Add New Class Fees Successfully"))
})

const updateClassFee = asyncHandler(async(req,res)=>{

  const { classId } = req.body
  const {
      classOrGrade,
      tutionFee,
      admissionFee,
      examFee,
      otherCharges
  } = req.body

  const classFeesStructure = await FeeStructure.findById(classId)

  if(!classFeesStructure) {
    throw new ApiError(404, "class fee structure didn't find")
  }

  const updateData = {}

  if(classOrGrade) return updateData.classOrGrade = classOrGrade
  if(tutionFee &&  typeof tutionFee === "string") return classFeeData.tutionFee = Number(tutionFee)
  if(admissionFee && typeof admissionFee === "string") return classFeeData.admissionFee = Number(admissionFee)
  if(examFee && typeof examFee === "string") return classFeeData.examFee = Number(examFee)
  if(otherCharges && typeof otherCharges === "string") return classFeeData.otherCharges=  Number(otherCharges)

    const updateFeeStructure = await FeeStructure.findByIdAndUpdate(
      classId,
      {
         $set : updateData
      },
      { new: true, runValidators: true }
    )

    if(!updateFeeStructure) {
      throw new ApiError(404, "fee structure didn't update")
    }

 return res.status(200).json(new ApiResponse(200, updateFeeStructure, "Update Fee Structure Successfully"))

})

const getFullOfFeeStructure = asyncHandler(async(req,res)=>{

  const getfullstructure = await FeeStructure.find().lean()

  return res.status(200).json(new ApiResponse(200, getfullstructure, "fetch full of fee structure successfully"))
})

const deleteFeeStructreClass = asyncHandler(async(req,res)=>{

    const { classId } = req.body

    const classFeeStructre = await FeeStructure.findById(classId)

    if(!classFeeStructre) {
       throw new ApiError(404, "can't find Class Fee Structure")
    }

    await FeeStructure.findByIdAndDelete(classId)

  return res.status(200).json(new ApiResponse(200, {}, "Fee Structure delete succesfully"))
})


export {
  addClassFees,
  updateClassFee,
  getFullOfFeeStructure,
  deleteFeeStructreClass
}
