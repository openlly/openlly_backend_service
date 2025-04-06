import { z } from 'zod';

export const createAvatarSchema = z.object({
    imageUrl: z.string(),
});


//create mock data
export const createMockAvatars = z.array(z.string());


