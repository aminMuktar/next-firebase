import { rmdir, mkdirSync, existsSync, rmdirSync, rm, rmSync } from "fs";
import multer from "multer";
import nextConnect from "next-connect";

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const path = `./public/uploads/profileImage/${req.query.userId}`;
            if (existsSync(path)) {
                rmSync(path, { recursive: true, force: true })
            }
            mkdirSync(path, { recursive: true })
            cb(null, path);
        },
        filename: (req, file, cb) => {
            return cb(null, file.originalname);
        },
    }),
});

const apiRoute = nextConnect({
    // Handle any other HTTP method
    onNoMatch(req, res) {
        res.status(405).json({ message: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.use(upload.single("profileImage"));

// Process a POST request
apiRoute.post((req, res) => {
    res.status(200).json({ result: `${req.file.path.replace("public\\", '')}` });
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};
