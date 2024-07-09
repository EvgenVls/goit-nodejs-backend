import { Schema, model } from 'mongoose';

import { emailRegexp } from '../../constants/users.js';
import { ROLES } from '../../constants/index.js';

import { mongooseSaveError, setUpdateSettings } from './hooks.js';

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      match: emailRegexp,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [ROLES.PARENT, ROLES.TEACHER],
      default: ROLES.PARENT,
    },
  },
  { timestamps: true, versionKey: false },
);

usersSchema.post('save', mongooseSaveError);

usersSchema.pre('findOneAndUpdate', setUpdateSettings);

usersSchema.post('findOneAndUpdate', mongooseSaveError);

export const UsersCollection = model('user', usersSchema);
