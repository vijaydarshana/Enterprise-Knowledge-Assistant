import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function ProjectDetails() {

    const { id } = useParams();

    const [project, setProject] = useState(null);

    useEffect(() => {
            async function fetchProject() {

        try {

            const res = await api.get(`/projects/${id}`);

            setProject(res.data.data);

        } catch (error) {

            console.log(error);

        }

    }
        fetchProject();
    }, []);



    if (!project) {

        return (
            <div className="text-center mt-20 text-2xl">
                Loading Project...
            </div>
        );

    }

    return (

        <div className="max-w-5xl mx-auto">

            <div className="bg-white rounded-2xl shadow-lg p-8">

                <h1 className="text-4xl font-bold">
                    {project.name}
                </h1>

                <p className="text-gray-500 mt-2">
                    Status : {project.status}
                </p>

                <div className="grid md:grid-cols-3 gap-8 mt-8">

                    <div>

                        <h2 className="text-xl font-bold mb-4">
                            Team Members
                        </h2>

                        {project.employees.map(emp => (

                            <div
                                key={emp}
                                className="border rounded-lg p-3 mb-3"
                            >
                                {emp}
                            </div>

                        ))}

                    </div>

                    <div>

                        <h2 className="text-xl font-bold mb-4">
                            Required Skills
                        </h2>

                        <div className="flex flex-wrap gap-3">

                            {project.skills.map(skill => (

                                <span
                                    key={skill}
                                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
                                >
                                    {skill}
                                </span>

                            ))}

                        </div>

                    </div>

                    <div>

                        <h2 className="text-xl font-bold mb-4">
                            Documents
                        </h2>

                        {project.documents.map(doc => (

                            <div
                                key={doc}
                                className="border rounded-lg p-3 mb-3"
                            >
                                {doc}
                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ProjectDetails;