import React, { useCallback } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import Alert from "react-bootstrap/Alert";
import { useDropzone } from "react-dropzone";

import useUploadImage from "../hooks/useUploadImage";

const UploadImageDropzone = () => {
	const { uploadImage, message, uploadProgress } = useUploadImage();

	const onDrop = useCallback(async (acceptedFiles) => {
		console.log("Got me zum files 😊", acceptedFiles);
		if (acceptedFiles.length > 0) {
			acceptedFiles.map((oneImage) => {
				console.log(`oneImage`, oneImage);
				uploadImage(oneImage);
			});
		}
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
		// maxFiles: 1,
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
