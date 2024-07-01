import { Schema, model } from 'mongoose';

import { genderList } from '../../constants/students.js';
import { mongooseSaveError, setUpdateSettings } from './hooks.js';

const studentsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: genderList,
    },
    avgMark: {
      type: Number,
      required: true,
    },
    onDuty: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

studentsSchema.post('save', mongooseSaveError);

studentsSchema.pre('findOneAndUpdate', setUpdateSettings);

studentsSchema.post('findOneAndUpdate', mongooseSaveError);

export const StudentsCollection = model('students', studentsSchema);
