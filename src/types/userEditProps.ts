import type { TUser } from '../types/user';
import type { Dispatch, SetStateAction, FormEvent } from 'react';

type UserFormData = Omit<TUser, '_id'>;

export interface UserEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: UserFormData;
  setFormData: Dispatch<SetStateAction<UserFormData>>;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isUpdating: boolean;
}