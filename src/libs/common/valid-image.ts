import { Code } from './code';
import { SIZE_VALID_IMAGE } from './constants';
import { Exception } from './exception';

export function validImage(file) {
  const extension = file.mimetype.split('/')[1];
  const extensionsValids = ['png', 'jpg', 'jpeg', 'webp', 'octet-stream'];
  if (extensionsValids.indexOf(extension) < 0) {
    throw Exception.new({
      code: Code.BAD_REQUEST_ERROR,
      overrideMessage: `Extension es incorrecta de la imagen ${
        file.originalname
      } - extensiones validas : ${extensionsValids.join(', ')}`,
    });
  }
  if (file.size > SIZE_VALID_IMAGE) {
    throw Exception.new({
      code: Code.BAD_REQUEST_ERROR,
      overrideMessage: `El peso de la imagen '${file.originalname}' no es permitido. [MAX 1 MegaByte]`,
    });
  }
}
