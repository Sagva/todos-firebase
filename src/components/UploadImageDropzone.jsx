import React, { useCallback, useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import Alert from "react-bootstrap/Alert";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const UploadImageDropzone = () => {
	
	const [message, setMessage] = useState();
	const [uploadProgress, setUploadProgress] = useState(null);

	const uploadImage = (image) => {
		if (!image) {
			console.log(`There is still no image!`);
			return;
		}
		try {
			setUploadProgress(null);

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
	const onDrop = useCallback(async (acceptedFiles) => {
		console.log("Got me zum files 😊", acceptedFiles);
		if (acceptedFiles[0]) {
			uploadImage(acceptedFiles[0]);
		}
		console.log("File is here!", acceptedFiles[0]);
	}, []);

	const {
		getRootProps,
		getInputProps,
		acceptedFiles,
		isDragActive,
		isDragAccept,
		isDragReject,
	} = useDropzone({
		accept: "image/gif, image/jpeg, image/png, image/webp",
		onDrop,
		maxFiles: 1,
	});

	return (
		<div
			{...getRootProps()}
			id="upload-image-dropzone-wrapper"
			className={`${isDragAccept ? "drag-accept" : ""} ${
				isDragReject ? "drag-reject" : ""
			}`}
		>
			<input {...getInputProps()} />

			{uploadProgress && (
				<ProgressBar
					now={uploadProgress}
					label={`${uploadProgress}%`}
					className="my-3"
					animated
					striped
					variant="success"
				/>
			)}

			{isDragActive ? (
				isDragAccept ? (
					<p>Drop it like its hot 🔥!</p>
				) : (
					<p>We don't want that file 😡!</p>
				)
			) : (
				<p>Give me a file 😋!</p>
			)}

			{acceptedFiles && (
				<div className="accepted-files mt-2">
					<ul className="list-unstyled">
						{acceptedFiles.map((file) => (
							<li key={file.name}>
								{file.name} ({Math.round(file.size / 1024)} kb)
							</li>
						))}
					</ul>
				</div>
			)}

			{message && <Alert variant={message.type}>{message.msg}</Alert>}
		</div>
	);
};

export default UploadImageDropzone;
