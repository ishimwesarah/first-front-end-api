import { get } from "mongoose";
import Contact from "../models/contactModal.js";

export const createContact = async (req, res) =>{
    try {
        const {names, email, subject, message, phone} = req.body;
        const newContact = new Contact({names, email, subject, message, phone});
        await newContact.save();
        res.status(201).json({ success: true, message: "Contact created successfully", Contact: newContact});
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error", error: error.message});  
    }
}
 export const getAllContact = async (req, res) =>{
try{
  const contacts = await Contact.find();
  res.status(200).json({ success: true,  contacts});
} 
catch(error){
    res.status(500).json({ success: false, message: "Server error", error: error.message});
 }
}
export const getContactById = async (req, res) =>{
  try{
    const{id}=req.params;
  const contacts=await Contact.findById(id);
  if (!contacts){
       return res.status(404).json({ success: false, message: "Contact not found"});}
      res.status(200).json({ success: true, contacts});
    }

  catch(error){
    res.status(500).json({ success: false, message: "Server error", error: error.message});
  }
}
export const deleteContactById = async (req, res) =>{
  try{
    const {id}=req.params;
    const contacts=await Contact.findByIdAndDelete(id);
    if (!contacts){
      return res.status(404).json({ success: false, message: "Contact not found"});}
      res.status(200).json({ success: true, message: "Contact deleted successfully"});
  }
  catch(error){
    res.status(500).json({ success: false, message: "Server error", error: error.message});
  }
  
}

export const updateContactById = async (req, res) =>{
  try{
    const {id}=req.params;
    
    const updateData=await Contact.findByIdAndUpdate(id, req.body);
    
    if (!updateData){
      return res.status(404).json({ success: false, message: "Contact not found"});}
      res.status(200).json({ success: true, message: "Contact updated successfully", Contact: updateData});
  }
  catch(error){
    res.status(500).json({ success: false, message: "Server error", error: error.message});
  }
}