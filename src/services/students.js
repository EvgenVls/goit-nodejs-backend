import { StudentsCollection } from '../db/models/student.js';
import { calculationPaginationData } from '../utils/calculatePaginationData.js';

export const getAllStudents = async ({ page, perPage }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const studentsQuery = StudentsCollection.find();

  const studentsCount = await StudentsCollection.find()
    .merge(studentsQuery)
    .countDocuments();

  const students = await studentsQuery.skip(skip).limit(limit).exec();

  const paginationData = calculationPaginationData(
    studentsCount,
    perPage,
    page,
  );

  return {
    data: students,
    ...paginationData,
  };
};

export const getStudentById = (studentId) => {
  const student = StudentsCollection.findById(studentId);
  return student;
};

export const createStudent = (payload) => {
  const student = StudentsCollection.create(payload);
  return student;
};

export const deleteStudent = (studentId) => {
  const student = StudentsCollection.findOneAndDelete({ _id: studentId });
  return student;
};

export const updateStudent = async (studentId, payload, options = {}) => {
  const rowResult = await StudentsCollection.findOneAndUpdate(
    { _id: studentId },
    payload,
    {
      // new: true,           -> перенесено в db/models/hooks.js {setUpdateSettings}
      // runValidators: true, -> перенесено в db/models/hooks.js {setUpdateSettings}
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rowResult || !rowResult.value) return null;

  return {
    student: rowResult.value,
    isNew: Boolean(rowResult?.lastErrorObject?.upserted),
  };
};
