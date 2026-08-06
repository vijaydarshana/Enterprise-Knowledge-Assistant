import { useEffect, useState } from "react";
import api from "../services/api";

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDocuments() {
    try {
      const res = await api.get("/documents");
      setDocuments(res.data?.data ?? res.data ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
    fetchDocuments();
  }, []);

  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h2 className="text-2xl font-bold">Loading Documents...</h2>
      </div>
    );
  }

  return (
    <div>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Documents
        </h1>

        <span className="bg-green-600 text-white px-4 py-2 rounded-lg">
          Total Documents: {documents.length}
        </span>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {documents.map((doc) => (

          <div
            key={doc.id}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
          >

            <div className="text-5xl text-center mb-4">
              📄
            </div>

            <h2 className="text-xl font-bold text-center">
              {doc.title}
            </h2>

            <p className="text-center text-gray-500 mt-2">
              Document ID: {doc.id}
            </p>

            {doc.description && (
              <p className="mt-4 text-gray-600 text-sm">
                {doc.description}
              </p>
            )}

          </div>

        ))}

      </div>

    </div>
  );
}

export default Documents;