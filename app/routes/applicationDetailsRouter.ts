import Router from "express-promise-router";
import multer from "multer";

import { createAppDetail, getAppDetail, getAppDetails, updateAppDetail } from "../controllers";
import { randomUUID } from "crypto";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        const fileNameParts = file.originalname.split('.');
        const fileExtension = fileNameParts[fileNameParts.length - 1];
        const fileName = randomUUID();
        const fullFileName = `${fileName}.${fileExtension}`;
        cb(null, fullFileName)
    }
})

const router = Router()
const upload = multer({ storage });

router.get('/', getAppDetails);
router.get('/:id', getAppDetail);
router.post('/', upload.single('image'), createAppDetail);
router.put('/:id', updateAppDetail);

export const ApplicationDetailRouter = router;
