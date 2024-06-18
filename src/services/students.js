import { StudentsCollection } from '../db/models/student.js';

export const getAllStudents = () => {
  const students = StudentsCollection.find();
  return students;
};

export const getStudentById = (studentId) => {
  const student = StudentsCollection.findById(studentId);
  return student;
};
