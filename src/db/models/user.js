import { Schema, model } from 'mongoose';

import { emailRegexp } from '../../constants/users.js';

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
  },
  { timestamps: true, versionKey: false },
);

usersSchema.post('save', mongooseSaveError);

usersSchema.pre('findOneAndUpdate', setUpdateSettings);

usersSchema.post('findOneAndUpdate', mongooseSaveError);

export const UsersCollection = model('user', usersSchema);
