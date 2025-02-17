import { db, Posts } from "~/server/database";
import cloudinary from 'cloudinary';

const runTimeConfig = useRuntimeConfig()

cloudinary.v2.config({
    cloud_name: 'dzqffwuzr',
    api_key: runTimeConfig.cloud,
    api_secret: runTimeConfig.secretCloud,
});

async function uploadToCloudinary(val) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      { folder: 'post' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    uploadStream.end(val.data);
  });
}

export default defineEventHandler(async (event) => {
    const files = await readMultipartFormData(event);
    const data: Record<string, any> = {};
    if (!files) {
        return createError({
            statusCode: 400,
            message: "FormData is empty",
        });
    }


    for (const field of files) {
        if (field.type?.startsWith('image/')) {
            data[field.name] = await uploadToCloudinary(field);
        } else {
            data[field.name] = field.data.toString();
        }
    }

    const post = {
        userId: data.id,
        title: data.title,
        content: data.content,
        imgUrl: data.image,
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    const result = await db.insert(Posts).values({ ...post }).returning();

    if (result.length) {
            return {
                statusCode: 200,
                message: 'Post is successful saved'
    };
    } else {
        return createError({
            statusCode: 400,
            message: 'Something went wrong'
        })
    }
});
        