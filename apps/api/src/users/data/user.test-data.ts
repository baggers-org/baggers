import { User } from '../entities';

export const User1: User = {
  _id: 'google-oauth1-233838',
  displayName: 'Warren Buffet',
  emails: ['wbuffet666@berkshire.com'],
  photos: ['https://link.come/warrens_face.png'],
  createdAt: new Date('01/01/01'),
  updatedAt: new Date('01/01/01'),
};

export const User2: User = {
  _id: 'fb-something123',
  displayName: 'Daniel Cooke',
  emails: ['dcooke123@gmail.com'],
  photos: ['https://link.come/dans_face.png'],
  createdAt: new Date('01/01/01'),
  updatedAt: new Date('01/01/01'),
};

export const AdminUser: User = {
  _id: 'admin-user',
  displayName: 'Daniel Cooke',
  emails: ['dcooke123@gmail.com'],
  photos: ['https://link.come/dans_face.png'],
  createdAt: new Date('01/01/01'),
  updatedAt: new Date('01/01/01'),
};
export const Users = [User1, User2, AdminUser];
