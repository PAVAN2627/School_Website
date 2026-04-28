import asyncHandler from '../utils/asyncHandler';
import ApiResponse from '../utils/ApiResponse';
import Announcement from '../models/announcements.model';
import ApiError from '../utils/ApiError';


const createNewAnnouncement = asyncHandler(async(req,res)=>{

    const { title, category, date, content } = req.body

    const announcementData = {
      title,
      category,
      date,
      content
    }
    const announcements = await Announcement.create(announcementData)

    if(!announcementData) {
      throw new ApiError(501)
    }


  return res.status(201).json(new ApiResponse(201, announcements, "New Announcement create successfully"))
})

const updateAnnouncement = asyncHandler(async(req,res)=>{

  const { announcementId } =  req.parmas

  const updateAnnouncement = await Announcement.findByIdAndUpdate(announcementId,
    {
        $set : req.body
    },{ new: true, runValidators: true }
  )

  return res.status(200).json(new ApiResponse(200, {}, "Update Announcement"))
})

const getAllAnnouncements = asyncHandler(async(req,res)=>{

    const allAnnouncement = await Announcement.find().lean()

    return res.status(200).json(new ApiResponse(200, allAnnouncement, "fetch all announcements"))

})


const deleteAnnouncement = asyncHandler(async(req,res)=>{

   const { announcementId } =  req.parmas

    await Announcement.findByIdAndDelete(announcementId)


    return res.status(204).json(new ApiResponse(204, {}, "Announcement Delete successfully"))
})


export {
   createNewAnnouncement,
   updateAnnouncement,
   getAllAnnouncements,
   deleteAnnouncement
}
