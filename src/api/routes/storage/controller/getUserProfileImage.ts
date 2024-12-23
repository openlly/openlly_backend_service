import {Response,Request} from 'express';
import { prisma } from '../../../../prisma/prisma';


export default async function getUserProfileImage(req: Request, res: Response) {
    //check parm id
    const id = req.query.id as string;  

    //get from user avatar prisma base64 string
    const user = await prisma.userAvatar.findUnique({ where: { id: id } });
    if (user) {
       const base64String = user.avatar.split(',')[1];
       const buffer = Buffer.from(base64String, 'base64');
       const mimeType = user.avatar.split(';')[0].split(':')[1];
       res.contentType(mimeType);
       res.send(buffer);
    } else {
        res.status(404).send('User not found');
    
    }   

}