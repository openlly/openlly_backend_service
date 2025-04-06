import { Request, Response } from 'express';

import apiResponseHandler from '../../../../../../utils/apiResponseHandler';
import { prisma } from '../../../../../../prisma/prisma';
import { createMockAvatars } from '../schema/createAvatarSchema';
import { v4 as uuidv4 } from 'uuid';


///mock data 
/*
[
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859949/avatar_assets/image_104_mocbyh.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859950/avatar_assets/image_119_qqkgqz.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859949/avatar_assets/image_90_jf1tpt.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859948/avatar_assets/image_89_mrm23j.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859949/avatar_assets/image_101_f266j6.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859948/avatar_assets/image_60_azeyqd.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859948/avatar_assets/image_61_dcwpje.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859947/avatar_assets/image_59_ymcz6d.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859947/avatar_assets/image_57_vjybse.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859947/avatar_assets/image_56_aomup7.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859946/avatar_assets/image_54_iro6u5.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859946/avatar_assets/image_46_zctcd6.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859946/avatar_assets/image_42_esf6y1.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859945/avatar_assets/image_39_bmttej.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859945/avatar_assets/image_41_mgqzzt.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859945/avatar_assets/image_37_tjazd7.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859945/avatar_assets/image_33_fotgic.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859945/avatar_assets/image_34_vznwc4.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859944/avatar_assets/image_31_i7r2wh.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859944/avatar_assets/image_32_cfqdmf.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859944/avatar_assets/image_30_lezpji.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859944/avatar_assets/image_25_dnokkm.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859944/avatar_assets/image_23_lgzxe5.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859944/avatar_assets/image_8_bbwlrg.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859943/avatar_assets/image_5_h4rbgd.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859943/avatar_assets/image_9_dqznrf.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859943/avatar_assets/image_17_rdxk35.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859943/avatar_assets/image_4_cu7yhl.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859943/avatar_assets/image_3_zw1e08.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859943/avatar_assets/image_2_uz6dpi.png"
]



*/
const createMockAvatar = async (req: Request, res: Response) => {
    //validate request body
    const reqBody = await createMockAvatars.safeParseAsync(req.body);
    if (!reqBody.success) {
        return apiResponseHandler(res, {
            statusCode: 400,
            hasError: true,
            message: 'Invalid request body',
        });
    }

    //create mock data
    const mockData = reqBody.data.map((avatar) => ({
        imageUrl: avatar,
        id: uuidv4(),
    }));
    //create mock data in database
    await prisma.avatar.createMany({
        data: mockData,
    });
    return apiResponseHandler(res, {
        statusCode: 200,
        hasError: false,
        message: 'Avatar created successfully',
        data: mockData,
    });
}

export default createMockAvatar;