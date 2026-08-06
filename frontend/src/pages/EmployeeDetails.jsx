import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function EmployeeDetails() {

    const { id } = useParams();

    const [employee, setEmployee] = useState(null);

    useEffect(() => {
            async function fetchEmployee() {

        try {

            const res = await api.get(`/employees/${id}`);

            setEmployee(res.data?.data ?? res.data ?? null);

        } catch (err) {

            console.log(err);

        }

    }

        fetchEmployee();

    }, []);



    if (!employee)
        return (
            <div className="text-center mt-20 text-xl">
                Loading...
            </div>
        );

    return (

        <div className="max-w-4xl mx-auto">

            <div className="bg-white rounded-xl shadow p-8">

                <h1 className="text-4xl font-bold">

                    {employee.name}

                </h1>

                <p className="text-gray-500 mt-2">

                    {employee.designation}

                </p>

                <div className="grid md:grid-cols-2 gap-8 mt-8">

                    <div>

                        <h3 className="font-bold mb-3">

                            Email

                        </h3>

                        <p>{employee.email}</p>

                    </div>

                    <div>

                        <h3 className="font-bold mb-3">

                            Department

                        </h3>

                        <p>{employee.department}</p>

                    </div>

                </div>

                <div className="mt-8">

                    <h2 className="text-2xl font-bold">

                        Skills

                    </h2>

                    <div className="flex flex-wrap gap-3 mt-4">

                        {(employee.skills ?? []).map(skill => (

                            <span
                                key={skill}
                                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
                            >
                                {skill}
                            </span>

                        ))}

                    </div>

                </div>

                <div className="mt-8">

                    <h2 className="text-2xl font-bold">

                        Projects

                    </h2>

                    <div className="mt-4">

                        {(employee.projects ?? []).map(project => (

                            <div
                                key={project}
                                className="border rounded-lg p-4 mb-3"
                            >
                                {project}
                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>

    );

}

export default EmployeeDetails;