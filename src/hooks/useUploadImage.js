import { useState } from 'react'
import { v4 as uuidv4 } from "uuid";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const useUploadImage = () => {
	const [message, setMessage] = useState();
	const [uploadProgress, setUploadProgress] = useState(null);

	const uploadImage = (image) => {
		if (!image) {
			console.log(`There is still no image!`);
			return;
		}
		try {
			

			// generate a uuid for the file
			const uuid = uuidv4();

			// find file extension
			const ext = image.name.substring(image.name.lastIndexOf(".") + 1);

			// create a reference to upload the file to
			const fileRef = ref(storage, `images/${uuid}.${ext}`);

			// upload image to fileRef
			const uploadTask = uploadBytesResumable(fileRef, image);

			// attach upload observer
			uploadTask.on(
				"state_changed",
				(uploadTaskSnapshot) => {
					setUploadProgress(
						Math.round(
							(uploadTaskSnapshot.bytesTransferred /
								uploadTaskSnapshot.totalBytes) *
								100
						)
					);
				},
				(e) => {
					console.log("NOT so great success, fail!", e);

					setMessage({
						type: "warning",
						msg: `Image failed to upload due to the following error: ${e.message}`,
					});
				},
				async () => {
					// get download url to uploaded file
					const url = await getDownloadURL(fileRef);

					// get reference to collection 'images'
					const collectionRef = collection(db, "images");

					// create document in db for the uploaded file
					await addDoc(collectionRef, {
						name: image.name,
						path: fileRef.fullPath,
						size: image.size,
						type: image.type,
						ext,
						url,
						uuid,
					});

					setMessage({
						type: "success",
						msg: "Image successfully uploaded 🤩",
					});
				}
			);
		} catch (e) {
			console.log(`error`, e);
		}
	};

	return {
        message,
        uploadProgress,
        uploadImage
    }
}

export default useUploadImage
