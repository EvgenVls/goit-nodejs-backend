import { getAllStudents, getStudentById } from '../services/students.js';

export const getAllStudentsController = async (req, res) => {
  const students = await getAllStudents();

  res.status(200).json({
    data: students,
  });
};

export const getStudentByIdController = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const student = await getStudentById(studentId);

    // if (!student) {
    //   return res.status(404).json({
    //     message: 'Student not found',
    //   });
    // }

    if (!student) {
      next(new Error('Student not found'));
      return;
    }

    res.status(200).json({
      data: student,
    });
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) {
      error.status = 404;
    }
    const { status = 500 } = error;
    res.status(status).json({
      message: error.message,
    });
  }
};
