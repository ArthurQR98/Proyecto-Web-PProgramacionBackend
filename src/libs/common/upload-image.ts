import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

export const uploadImage = async (image, configService) => {
  const s3 = new S3();
  const upload = await s3
    .upload({
      Bucket: configService.get('AWS_PUBLIC_BUCKET_NAME'),
      Body: image.buffer,
      Key: `${uuid()}-${image?.originalname}`,
    })
    .promise();
  return upload;
};

export const deleteImage = async (key, configService) => {
  const s3 = new S3();
  await s3
    .deleteObject({
      Bucket: configService.get('AWS_PUBLIC_BUCKET_NAME'),
      Key: key,
    })
    .promise();
};
