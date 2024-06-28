import { StudentsCollection } from '../db/models/student.js';

export const getAllStudents = () => {
  const students = StudentsCollection.find();
  return students;
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
