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

export const updateStudent = (studentId, payload, options = {}) => {
  const rowResult = StudentsCollection.findOneAndUpdate(
    { _id: studentId },
    payload,
    {
      new: true,
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
