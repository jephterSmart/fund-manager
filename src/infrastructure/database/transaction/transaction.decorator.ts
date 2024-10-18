import { SetMetadata } from '@nestjs/common';

export const TRANSACTIONAL_KEY = 'TRANSACTIONAL_KEY';
export const Transactional = () => SetMetadata(TRANSACTIONAL_KEY, true);
