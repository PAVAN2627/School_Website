import asyncHandler from '../utils/asyncHandler';
import ApiResponse from '../utils/ApiResponse';
import Announcement from '../models/announcements.model';
import { fieldNotFound } from '../utils/helper';
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




export {
   createNewAnnouncement
}
