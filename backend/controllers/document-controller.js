import asyncHandler from 'express-async-handler'
import document from '../models/document-model.js'

//@desc Get documents
//@route GET /api/documents
//@access Private
const getDocuments = asyncHandler(async (req, res) => {
  const documents = await Document.find({ document: req.document.id })
  res.status(200).json(documents)
})

//@desc Create/update documents
//@route POST /api/documents
//@access Private
const setDocument = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Document text required')
  }

  const document = await Document.create({ text: req.body.text, document: req.document.id })
  res.status(200).json({ document })
})

//@desc Delete documents
//@route DELETE /api/document/:id
//@access Private
const deleteDocument = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400)
    throw new Error('Id for the document to be deleted is required')
  }

  const documentToDelete = await Document.findById(req.params.id)

  if (!documentToDelete) {
    res.status(404)
    throw new Error('Document not found')
  }

  //document check
  if (!req.document) {
    res.status(401)
    throw new Error('document not found')
  }

  if (documentToDelete.document.toString() !== req.document.id) {
    res.status(401)
    throw new Error('document not authrised to delete this document')
  }

  await documentToDelete.remove()

  res.status(200).json({ message: 'Document deleted successfully', id: req.params.id })
})

//@desc Update documents
//@route PUT /api/documents/:id
//@access Private
const updateDocument = asyncHandler(async (req, res) => {
  const documentToUpdate = await Document.findById({ _id: req.params.id })
  if (!documentToUpdate) {
    res.status(400)
    throw new Error('Document not found')
  }

  //document check
  if (!req.document) {
    res.status(401)
    throw new Error('document not found')
  }

  if (document.document.toString() !== req.document.id) {
    res.status(401)
    throw new Error('document not authrised to edit this document')
  }

  const updatedDocument = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.status(200).json({ message: 'Document updated successfully', document: updatedDocument })
})

export { getDocuments, setDocument, deleteDocument, updateDocument }
