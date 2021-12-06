import { useEffect, useState } from "react";
import { db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";

const useGetDocument = (collectionName, id) => {
	const [loading, setLoading] = useState(true);

	const [document, setDocument] = useState();

	useEffect(() => {
		getData(collectionName, id);
	}, [id, collectionName]);

	const getData = async (collectionName, id) => {
		setLoading(true);
		//get document reference

		const ref = doc(db, collectionName, id);
		const snapshot = await getDoc(ref);

		// console.log(`snapshot`, snapshot.data());
		if (!snapshot) {
			setDocument(false);
			return;
		}

		setDocument(snapshot.data());
		setLoading(false);
	};

	return { loading, document, getData };
};

export default useGetDocument;
